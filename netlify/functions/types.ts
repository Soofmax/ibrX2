/**
 * Minimal HTTP event shape for Netlify functions used in this project.
 * Keeps headers case-insensitive and avoids any typing.
 */
export interface HttpEvent {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body?: string | null;
}