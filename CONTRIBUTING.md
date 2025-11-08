# Contributing

Thank you for your interest in contributing! This project uses React 18, TypeScript, Vite, Tailwind, and Netlify Functions.

## Getting Started

- Node: see `.nvmrc` (Node 20)
- Install: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Tests: `npm run test`
- Build: `npm run build`

## Environment Variables

Copy `.env.example` to `.env` and set values:

- Client: `VITE_PLAUSIBLE_DOMAIN`, `VITE_UMAMI_SRC`, `VITE_UMAMI_WEBSITE_ID`, `VITE_GA_ID`
- Server: `STRIPE_SECRET_KEY`, `SITE_URL`, `ALLOWED_ORIGINS`, optional `RATE_LIMIT_MAX`

## Coding Standards

- Prettier formatting; CI may auto-commit formatting fixes on push.
- ESLint + TypeScript strictness.
- Keep components small and reusable; avoid duplication.
- Do not commit secrets; use environment variables.

## Pull Requests

- Create a feature branch from `main`.
- Include tests where appropriate.
- Update docs if behavior changes.
- Ensure CI passes (lint, typecheck, test, build, audit).

## Security

- Do not expose secrets in code or logs.
- Follow CSP and CORS guidelines.
- See `SECURITY.md`.

## License

By contributing, you agree your contributions are licensed under the MIT License.