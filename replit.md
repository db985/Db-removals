# House Removals Business Website

A full-stack professional website for a local house removals and clearance company, with a public-facing marketing site and a private admin dashboard.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/removals-site run dev` — run the frontend (auto-assigned port)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Required Secrets

- `ADMIN_PASSWORD` — password for the admin dashboard at `/admin/login`
- `SESSION_SECRET` — already set; used to sign session cookies
- `RESEND_API_KEY` — Resend API key for email notifications on new quote requests
- `NOTIFY_EMAIL` — (optional) email address to receive new quote notification emails

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui, Wouter routing
- API: Express 5 with session auth (express-session + connect-pg-simple)
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Email: Resend
- File uploads: Multer (stored in `artifacts/api-server/uploads/`)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/removals-site/src/pages/` — all frontend pages
- `artifacts/removals-site/src/pages/home.tsx` — Home page
- `artifacts/removals-site/src/pages/services.tsx` — Services page
- `artifacts/removals-site/src/pages/gallery.tsx` — Gallery (ready for real photos)
- `artifacts/removals-site/src/pages/quote.tsx` — Free Quote form
- `artifacts/removals-site/src/pages/contact.tsx` — Contact page
- `artifacts/removals-site/src/pages/admin/` — Admin dashboard pages
- `artifacts/api-server/src/routes/` — backend route handlers
- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/` — database schema (quotes.ts, calendar.ts)

## Public Pages

- `/` — Home: hero, services preview, reviews, contact info
- `/services` — All 6 services with full descriptions
- `/gallery` — Photo gallery (empty state, ready to populate)
- `/quote` — Free quote request form with photo upload
- `/contact` — Contact details + general enquiry form

## Admin Pages (password protected)

- `/admin/login` — Login with ADMIN_PASSWORD
- `/admin` — Dashboard: quote stats, all quote requests, status management
- `/admin/calendar` — Calendar view of accepted jobs

## Architecture decisions

- Session-based admin auth (no JWT) — simple, stateful, appropriate for a single-owner admin tool
- `connect-pg-simple` stores sessions in PostgreSQL — survives restarts, no Redis needed
- File uploads stored on disk (`uploads/` dir) — sufficient for a small business; swap for S3 if volume grows
- Resend email notifications are fire-and-forget — a failed email does not fail the quote submission
- Admin password is required at runtime — the server returns a 500 on login if `ADMIN_PASSWORD` is not set, preventing silent open-door scenarios

## Customisation checklist

- [ ] Replace "YOUR COMPANY NAME" with your real business name (in `home.tsx`, `contact.tsx`, navbar)
- [ ] Replace `0800 123 4567` with your real phone number
- [ ] Replace `hello@yourcompany.co.uk` with your real email
- [ ] Replace `facebook.com/yourcompany` with your real Facebook page
- [ ] Replace "Serving London & Surrounding Areas" with your real service area
- [ ] Add real photos to the Gallery page
- [ ] Set `NOTIFY_EMAIL` secret to receive quote notification emails
- [ ] Update the Resend sender domain in `artifacts/api-server/src/routes/quotes.ts`

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, re-run codegen before touching frontend hooks
- `size="xl"` is a custom addition to the Button component (not default shadcn)
- Uploads are stored relative to `process.cwd()` on the API server — ensure that directory is writable in production
