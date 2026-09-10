# Codex Task Queue

Status: READY. Execute only after the current Codex usage limit resets.

## P0 — MVP

1. **Repository audit** — read `docs/IMPLEMENTATION_HANDOFF.md`, `MVP_SPEC.md`, `ARCHITECTURE.md`, and `NOTION_CONTRACT.md`; inspect current files before editing.
2. Bootstrap the web app in the repository using the agreed framework.
3. Build a mobile-first BIYOSELECT landing page.
4. Build the minimum condition selector flow.
5. Implement deterministic, explainable recommendation scoring from structured product data.
6. Build recommendation and product-card UI.
7. Build product detail UI.
8. Add affiliate CTA handling; only show confirmed offers.
9. Add stable analytics events: `view_landing`, `start_selector`, `complete_selector`, `view_recommendation`, `view_product`, `affiliate_click`, `conversion`.
10. Add SEO metadata, canonical URLs, Open Graph metadata, and crawlable content routes.
11. Add required advertising/affiliate disclosure and privacy surfaces.
12. Handle loading, empty, stale/unverified, error, and unavailable-offer states safely.
13. Run lint, typecheck, tests, and production build.

## P1 — Measurement

14. Implement the lowest-cost appropriate event storage/analytics architecture without duplicating business data.
15. Support funnel measurement: landing → selector → recommendation → product → affiliate click → conversion.
16. Add experiment IDs to events so sequential/variant experiments remain attributable.
17. Ensure duplicate event emission is prevented where practical.

## P2 — Content

18. Add a data-driven comparison page template backed by Notion data.
19. Add a data-driven product detail page template backed by Notion data.
20. Add content routes compatible with future Notion-backed ingestion.
21. Preserve source/freshness status so stale or unverified data cannot be presented as verified.

## P3 — Quality / release

22. Verify mobile and desktop layouts.
23. Verify external affiliate links and disclosure placement.
24. Verify deterministic recommendation results for identical input/data.
25. Verify empty Notion data does not crash the app.
26. Verify no manually maintained business-data copy exists in GitHub.
27. Run production build and all available checks.
28. Prepare Vercel deployment configuration but do not add unnecessary paid infrastructure.

## Definition of done

- Production build succeeds.
- Core selector/recommendation/product flow works on mobile and desktop.
- Recommendation is deterministic and explainable.
- Affiliate links are rendered only for confirmed offers.
- Events have stable names and usable funnel attribution.
- Required disclosures are present.
- Unverified/stale data is not silently promoted to verified.
- No business data is duplicated into a manually maintained GitHub dataset.
- No unrelated large features are introduced.

## Stop conditions

Stop and report instead of guessing when:
- a required Notion field cannot be identified;
- an affiliate offer is unconfirmed;
- an external API/credential is required but unavailable;
- existing code conflicts materially with the handoff and cannot be resolved safely;
- a change would create significant recurring cost or irreversible data loss.
