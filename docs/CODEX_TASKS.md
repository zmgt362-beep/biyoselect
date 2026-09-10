# Codex Task Queue

## P0 — MVP

1. Bootstrap the web app in the repository using the project's agreed framework.
2. Build a mobile-first BIYOSELECT landing page.
3. Build the condition selector flow.
4. Implement deterministic recommendation scoring from structured product data.
5. Build recommendation and product-card UI.
6. Add affiliate CTA handling.
7. Add the minimum event vocabulary defined in `NOTION_CONTRACT.md`.
8. Add SEO metadata and crawlable content routes.
9. Add required disclosure/privacy surfaces.
10. Run lint, typecheck, tests, and production build.

## P1 — Measurement

11. Persist event data in the selected low-cost analytics/storage architecture.
12. Create a measurement view that supports landing → selector → recommendation → affiliate click → conversion.
13. Add experiment identifiers so A/B or sequential experiments remain attributable.

## P2 — Content

14. Add a data-driven comparison page template.
15. Add product detail page template.
16. Make content routes compatible with future Notion-backed data ingestion.

## Definition of done

- Production build succeeds.
- Core selector flow works on mobile and desktop.
- Recommendation result is deterministic for the same input/data.
- Affiliate links are rendered only for confirmed offers.
- Events are emitted with stable names.
- No business data is duplicated into a manually maintained GitHub dataset.
