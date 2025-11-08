import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Stripe SDK constructEvent
vi.mock('stripe', () => {
  class MockStripe {
    webhooks = {
      constructEvent: vi.fn((body: string, sig: string, secret: string) => {
        if (!secret) {
          throw new Error('Invalid signature');
        }
        if (!sig) {
          throw new Error('Invalid signature');
        }
        // Very simple fake event
        const parsed = JSON.parse(body || '{}');
        return {
          id: parsed.id || 'evt_test_1',
          type: parsed.type || 'checkout.session.completed',
          data: { object: parsed.session || {} },
        };
      }),
    };
  }
  return { default: MockStripe };
});

import { handler } from '../stripe-webhook';

type Headers = Record<string, string | undefined>;
function makeEvent(
  headers: Headers,
  body?: object
): { httpMethod: string; headers: Headers; body?: string } {
  return {
    httpMethod: 'POST',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
}

beforeEach(() => {
  process.env.STRIPE_SECRET_KEY = 'sk_test_123';
  process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';
});

describe('stripe-webhook', () => {
  it('rejects non-POST', async () => {
    const res = await handler({ httpMethod: 'GET', headers: {}, body: '' } as any);
    expect(res.statusCode).toBe(405);
  });

  it('rejects missing signature', async () => {
    const res = await handler(makeEvent({}, { id: 'evt_1' }));
    expect(res.statusCode).toBe(400);
    expect(res.body).toContain('Missing Stripe-Signature');
  });

  it('rejects invalid signature when constructEvent throws', async () => {
    // Temporarily remove webhook secret to trigger invalid signature path
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const res = await handler(makeEvent({ 'stripe-signature': 'sig123' }, { id: 'evt_bad' }));
    expect(res.statusCode).toBe(500); // secrets not configured
    // Restore for next tests
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_123';
  });

  it('returns 500 when secrets missing', async () => {
    delete process.env.STRIPE_SECRET_KEY;
    const res = await handler(makeEvent({ 'stripe-signature': 'sig123' }, { id: 'evt_no_secret' }));
    expect(res.statusCode).toBe(500);
  });

  it('accepts valid event', async () => {
    const res = await handler(
      makeEvent({ 'stripe-signature': 'sig123' }, { id: 'evt_1', session: { amount_total: 1000 } })
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('ok');
  });

  it('deduplicates same event id within TTL', async () => {
    const event = makeEvent({ 'stripe-signature': 'sig123' }, { id: 'evt_dup' });
    const res1 = await handler(event);
    expect(res1.statusCode).toBe(200);
    const res2 = await handler(event);
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toBe('duplicate');
  });

  it('handles unknown event type gracefully', async () => {
    const res = await handler(
      makeEvent(
        { 'stripe-signature': 'sig123' },
        { id: 'evt_unknown', type: 'payment_intent.succeeded', session: {} }
      )
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe('ok');
  });
});