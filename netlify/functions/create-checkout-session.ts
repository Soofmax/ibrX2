import Stripe from 'stripe';
import { rateLimit as rateLimitStore } from './lib/store';

type Event = {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body?: string | null;
};

const ALLOWED_AMOUNTS = [1, 5, 10, 25] as const;

// CORS origin allowlist (comma-separated). Defaults to production domain.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://wanderglobers.com')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function corsOrigin(headers: Record<string, string | undefined>): string {
  const origin = headers.origin || headers.Origin || '';
  return origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0] || '*';
}

function siteURLFromEnv(): string {
  const raw = (process.env.SITE_URL || 'https://wanderglobers.com').trim();
  // Remove trailing slashes
  return raw.replace(/\/+$/, '');
}

// Read max from env on each check to allow dynamic tests and config changes
function getRateLimitMax(): number {
  return Number(process.env.RATE_LIMIT_MAX || 20);
}

function getClientIp(headers: Record<string, string | undefined>): string | null {
  // Netlify passes various headers; prefer x-forwarded-for first entry
  const xff = headers['x-forwarded-for'] || headers['X-Forwarded-For'];
  if (xff) {
    const first = xff.split(',')[0].trim();
    if (first) return first;
  }
  const nf = headers['x-nf-client-connection-ip'];
  if (nf) return nf;
  const xr = headers['x-real-ip'] || headers['X-Real-IP'];
  if (xr) return xr;
  return null;
}

export async function handler(event: Event) {
  const origin = corsOrigin(event.headers);

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
      body: JSON.stringify({ error: 'Stripe secret key not configured' }),
    };
  }

  // Basic input parsing/validation
  let amount = 0;
  let lang = 'fr';
  try {
    const payload = JSON.parse(event.body || '{}');
    amount = Number(payload.amount || 0);
    lang = typeof payload.lang === 'string' ? payload.lang : 'fr';
  } catch {
    // invalid JSON
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
      body: JSON.stringify({ error: 'Invalid JSON payload' }),
    };
  }

  if (!Number.isFinite(amount) || amount <= 0 || !ALLOWED_AMOUNTS.includes(amount as (typeof ALLOWED_AMOUNTS)[number])) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
      body: JSON.stringify({ error: 'Invalid amount' }),
    };
  }

  const ip = getClientIp(event.headers);
  if (await rateLimitStore(ip, 60, getRateLimitMax())) {
    return {
      statusCode: 429,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
      body: JSON.stringify({ error: 'Too Many Requests' }),
    };
  }

  const stripe = new Stripe(secret);
  const siteURL = siteURLFromEnv();
  const successURL = `${siteURL}/support?status=success`;
  const cancelURL = `${siteURL}/support?status=cancel`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            unit_amount: amount * 100, // cents
            product_data: {
              name: lang === 'fr' ? `Don — ${amount}€` : `Donation — €${amount}`,
              description:
                lang === 'fr'
                  ? 'WanderGlobers — Remplissez le jerrican, payez au kilomètre.'
                  : 'WanderGlobers — Fill the jerrycan, pay per kilometer.',
            },
          },
          quantity: 1,
        },
      ],
      customer_creation: 'if_required',
      billing_address_collection: 'auto',
      success_url: successURL,
      cancel_url: cancelURL,
      locale: lang === 'fr' ? 'fr' : 'en',
      metadata: { lang, source: 'site_support_jerrycan' },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error';
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': origin,
      },
      body: JSON.stringify({ error: msg }),
    };
  }
}