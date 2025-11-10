import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Stripe SDK
vi.mock('stripe', () => {
  class MockStripe {
    checkout = {
      sessions: {
        create: vi.fn(async () => ({ url: 'https://checkout.stripe.com/session/abc123' })),
      },
    };
  }
  return { default: MockStripe };
});

import { handler } from '../create-checkout-session';

type Headers = Record<string, string | undefined>;

function makeEvent(
  method: string,
  headers: Headers = { origin: 'https://wanderglobers.com' },
  body?: object
) {
  return {
    httpMethod: method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
}

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = 'sk_test_123';
  process.env.SITE_URL = 'https://example.com';
  process.env.ALLOWED_ORIGINS = 'https://wanderglobers.com,https://www.wanderglobers.com';
  delete process.env.RATE_LIMIT_MAX;
});

describe('create-checkout-session', () => {
  it('rejects non-POST with 405', async () => {
    const res = await handler(makeEvent('GET'));
    expect(res.statusCode).toBe(405);
    expect(res.headers?.['Access-Control-Allow-Origin']).toBe('https://wanderglobers.com');
  });

  it('handles OPTIONS preflight', async () => {
    const res = await handler(makeEvent('OPTIONS'));
    expect(res.statusCode).toBe(204);
    expect(res.headers?.['Access-Control-Allow-Methods']).toContain('POST');
  });

  it('rejects invalid JSON with 400', async () => {
    const badEvent: {
      httpMethod: string;
      headers: Headers;
      body?: string | null;
    } = {
      httpMethod: 'POST',
      headers: { origin: 'https://wanderglobers.com' },
      body: '{bad json',
    };
    const res = await handler(badEvent);
    expect(res.statusCode).toBe(400);
    expect(res.headers?.['Access-Control-Allow-Origin']).toBe('https://wanderglobers.com');
  });

  it('rejects invalid amount with 400', async () => {
    const res = await handler(makeEvent('POST', { origin: 'https://wanderglobers.com' }, { amount: 999 }));
    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body as string).error).toBe('Invalid amount');
  });

  it('creates a checkout session with 200', async () => {
    const res = await handler(makeEvent('POST', { origin: 'https://wanderglobers.com' }, { amount: 10, lang: 'en' }));
    expect(res.statusCode).toBe(200);
    const json = JSON.parse(res.body as string);
    expect(json.url).toContain('https://checkout.stripe.com/session/');
    expect(res.headers?.['Access-Control-Allow-Origin']).toBe('https://wanderglobers.com');
  });

  it('applies CORS allowlist: falls back to first allowed origin', async () => {
    const res = await handler(makeEvent('POST', { origin: 'https://evil.com' }, { amount: 10 }));
    expect(res.statusCode).toBe(200);
    expect(res.headers?.['Access-Control-Allow-Origin']).toBe('https://wanderglobers.com');
  });

  it('returns 500 if STRIPE_SECRET_KEY missing', async () => {
    delete process.env.STRIPE_SECRET_KEY;
    const res = await handler(makeEvent('POST', { origin: 'https://wanderglobers.com' }, { amount: 10 }));
    expect(res.statusCode).toBe(500);
    const json = JSON.parse(res.body as string);
    expect(json.error).toMatch(/Stripe secret key not configured/);
  });

  it('rate limits excessive requests (429)', async () => {
    process.env.RATE_LIMIT_MAX = '2';
    // Fire 3 requests from same IP
    const ev = (body: object) => makeEvent('POST', { origin: 'https://wanderglobers.com', 'x-forwarded-for': '1.2.3.4' }, body);
    await handler(ev({ amount: 10 }));
    await handler(ev({ amount: 10 }));
    const res = await handler(ev({ amount: 10 }));
    expect(res.statusCode).toBe(429);
    const json = JSON.parse(res.body as string);
    expect(json.error).toBe('Too Many Requests');
  });
});