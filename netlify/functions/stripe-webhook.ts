import Stripe from 'stripe';
import { seenRecently } from './lib/store';

type Event = {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body?: string | null;
};

export async function handler(event: Event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !whSecret) {
    return { statusCode: 500, body: 'Stripe secrets not configured' };
  }

  const stripe = new Stripe(secret);
  const signature = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  if (!signature) {
    return { statusCode: 400, body: 'Missing Stripe-Signature header' };
  }

  let stripeEvent: Stripe.Event;
  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body || '', signature, whSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid signature';
    return { statusCode: 400, body: msg };
  }

  // Deduplicate events with durable store when configured, else in-memory TTL (~10 minutes)
  if (await seenRecently(stripeEvent.id, 10 * 60)) {
    return { statusCode: 200, body: 'duplicate' };
  }

  try {
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        // Placeholder persistance: here you would persist the session (id, amount_total, etc.)
        void session;
        break;
      }
      // Add more event types as needed, e.g., payment_intent.succeeded, payment_intent.payment_failed
      default:
        break;
    }

    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Processing error';
    return { statusCode: 500, body: msg };
  }
}