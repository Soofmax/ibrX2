# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-11-08

### Added
- Stripe webhook with signature verification and idempotency (durable when Upstash Redis is configured).
- Durable rate limiting via Upstash Redis REST (fallback to in-memory).
- `.env.example` updated with Upstash variables.
- Integration tests for Stripe webhook.
- Dependabot weekly updates configuration.
- Concurrency in Unified CI to cancel in-progress runs.
- API.md documenting versioned endpoints.

### Changed
- `create-checkout-session` now uses durable rate limiting when available.
- Lighthouse CI runs on local `dist` and uploads artifact rather than committing on PRs.

### Security
- Strengthened payment endpoints with deduplication and rate limiting mechanisms.