# Security Policy

We take security seriously and appreciate responsible disclosure.

- Supported branches: `main` (actively maintained).
- Reporting a vulnerability: Email security@wanderglobers.com or open a private security advisory on GitHub.
- Please include a clear description, reproduction steps, and potential impact.

## Scope

- Client app (React + Vite)
- Netlify serverless functions (Stripe checkout)
- Configuration (Netlify, CI, CSP headers)

## Best Practices Implemented

- Strict CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- Locked-down CORS for serverless functions (allowlist + preflight)
- Minimal IP-based rate limiting for Stripe function
- Environment variables for secrets, no secrets committed
- CI includes lint, typecheck, tests, and dependency audit

## Vulnerability Disclosure

1. Do not publicly disclose before we have a fix.
2. Provide a PoC and version details.
3. We aim to acknowledge within 48 hours and provide a remediation timeline.

## Security Scanning

- Run `npm audit` locally and in CI.
- Recommended external scans: Snyk, OSV-Scanner, CodeQL.
- Run secret scanning on git history using gitleaks or TruffleHog.

## Data Practices (GDPR)

- Analytics are gated behind user consent and configured via environment variables.
- Stripe payments handled via Checkout; no card data processed or stored on our servers.
- See `docs/privacy.md` (to be added) for details.