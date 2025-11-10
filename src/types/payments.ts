/**
 * Types partagés pour les flux de paiement (client + fonctions Netlify).
 * Ces types sont importés en `import type` côté fonctions pour éviter d'embarquer
 * du code runtime — uniquement de la vérification statique.
 */
export type Locale = 'fr' | 'en';

export interface CreateCheckoutPayload {
  amount: number;
  lang?: Locale;
}

export interface CreateCheckoutResponse {
  url: string;
}