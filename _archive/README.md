# _archive

Moved here on 2026-10-30 (audit SEC-04): website proxies, dev-tools pages, server actions and
libs for public forms, reviews and coupons. No live page used them, and the proxies had no
Origin check, feature flag, size limit or honeypot.

Excluded from `tsc` and ESLint (see `tsconfig.json`, `eslint.config.mjs`), and outside `app/`, so
Next does not build them as routes. Imports use `@/lib/...`, so they only compile once moved back.

Before restoring anything, copy the hardening of `app/api/website/leads/route.ts`: own env flag
(default `false`), strict Origin, JSON content-type, 16 KB limit, honeypot `website`, `submission_id`.
At the same time add an IP quota: the proxy forwards `client_ip` and the admin applies an IP quota,
which also covers coupon validate/redeem rate limiting (rest of SEC-12). Coupon redeem should happen
on the server inside the booking flow, not from the browser.
