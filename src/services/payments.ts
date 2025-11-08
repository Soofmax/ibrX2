export type CreateSessionPayload = {
  amount: number;
  lang?: 'fr' | 'en';
};

export async function createCheckoutSession(payload: CreateSessionPayload): Promise<{ url: string }> {
  const res = await fetch('/.netlify/functions/v1-create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Checkout session error: ${res.status} ${text}`);
  }
  return res.json();
}