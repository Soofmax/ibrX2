# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and
uses date-based versions (YYYY-MM-DD) until semantic releases are defined.

## [2025-11-10] — Branding SmarterLogicWeb

### Added
- Professional README with SmarterLogicWeb branding, badges, and structure.
- GitHub templates: bug report, feature request, pull request template.
- Documentation structure scaffold (getting-started, API, architecture, deployment, troubleshooting).
- Script: `add-copyright-headers.sh`.

### Changed
- SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md updated for SmarterLogicWeb.
- LICENSE updated to MIT © 2025 SmarterLogicWeb.
- Package.json metadata recommendations (author, homepage, repository, bugs).

### Security
- Security Policy updated with SmarterLogicWeb contact and hardening summary.

## [2025-11-08]

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