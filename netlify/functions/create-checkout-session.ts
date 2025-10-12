import Stripe from 'stripe';

type Event = {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body?: string | null;
};

function resolveSiteURL(headers: Record<string, string | undefined>): string {
  const referer = headers.referer || headers.Referer;
  const origin = headers.origin || headers.Origin;
  // Try origin first, then referer host, fallback to env or example
  const fromReferer =
    referer && referer.startsWith('http') ? referer.replace(/^(https?:\/\/[^/]+).*$/, '$1') : undefined;
  const site =
    (origin && origin.startsWith('http') ? origin : undefined) ||
    fromReferer ||
    process.env.SITE_URL ||
    'https://wanderglobers.com';
  return site;
}

export async function handler(event: Event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Stripe secret key not configured' }),
    };
  }

  let amount = 0;
  let lang = 'fr';
  try {
    const payload = JSON.parse(event.body || '{}');
    amount = Number(payload.amount || 0);
    lang = typeof payload.lang === 'string' ? payload.lang : 'fr';
  } catch {
    // ignore
  }

  const allowed = [1, 5, 10];
  if (!allowed.includes(amount)) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid amount' }),
    };
  }

  const stripe = new Stripe(secret);

  const siteURL = resolveSiteURL(event.headers);
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
      // Optional email collection
      customer_creation: 'if_required',
      billing_address_collection: 'auto',
      success_url: successURL,
      cancel_url: cancelURL,
      locale: lang === 'fr' ? 'fr' : 'en',
      metadata: { lang, source: 'site_support_jerrycan' },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err?.message || 'Stripe error' }),
    };
  }
}