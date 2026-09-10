# BIYOSELECT MVP Specification

## 1. Objective

Validate one complete monetization loop before expanding the product:

`acquisition → condition input → recommendation/comparison → product detail → affiliate click → conversion → revenue → net profit`

Primary success criterion is **net profit per operating hour**, not traffic volume.

## 2. Required MVP

- Mobile-first landing page
- Minimum condition selector
- Deterministic recommendation/decision flow
- Recommendation reasons understandable to the user
- Product cards and product detail
- Affiliate CTA for confirmed offers only
- Stable event tracking
- SEO-friendly content/comparison routes
- Required privacy and advertising/affiliate disclosure surfaces
- Safe loading, empty, stale/unverified, unavailable-offer and error states

## 3. Explicitly defer

- User accounts
- Complex personalization history
- Full cosmetic ingredient graph
- Native app
- Large-scale automated crawling
- Paid advertising
- Opaque LLM-only recommendation
- Features without a measurable path to validation or revenue

## 4. Data boundary

Notion is the business-data source of truth. The application consumes structured Notion-backed data. Do not create a second manually maintained product/article/affiliate database in GitHub.

Canonical business databases:
- 商品DB
- 比較DB
- 記事DB
- アフィリエイトDB
- SNS投稿DB
- 06_EXPERIMENTS / Experiments DB
- 運用ログDB

## 5. Decision model

The initial recommendation score is explicit and auditable. Candidate dimensions:

1. target match
2. concern/purpose match
3. budget fit
4. ingredient/feature fit
5. evidence/data completeness/freshness
6. purchase availability
7. affiliate economics only as a tie-breaker

The score is a product-selection heuristic, not scientifically validated efficacy. Do not make medical or guaranteed-effect claims.

## 6. Measurement

Track at minimum:
- `view_landing`
- `start_selector`
- `complete_selector`
- `view_recommendation`
- `view_product`
- `affiliate_click`
- `conversion`

Funnel:
`landing → selector → recommendation → product → affiliate_click → conversion`

Primary KPI: `net profit / operating hour`.
Secondary KPIs: recommendation completion rate, product-detail rate, affiliate CTR, conversion rate, revenue/visitor, acquisition cost, reproducibility, and revisit/retention where measurable.

## 7. Experimentation

Use 06_EXPERIMENTS / Experiments DB as the only experiment record. Every experiment should capture hypothesis, execution/change, observation, result, decision, next change, cost, operating time, and net profit/hour where measurable.

Initial hypotheses cover problem-led social acquisition, A/B comparison hooks, diagnostic matching, high-purchase-intent search, trend products, high-value affiliate offers, participation/poll content, influencer-mentioned products, social-demand→SEO conversion, and proprietary selection-data accumulation.

Stop weak themes/channels and concentrate resources on measurable winners.

## 8. Implementation handoff

Codex should first read `docs/IMPLEMENTATION_HANDOFF.md`, `docs/CODEX_TASKS.md`, `docs/ARCHITECTURE.md`, and `docs/NOTION_CONTRACT.md`. It must inspect the current repository before changing code, implement in dependency order, run all available checks, and report changed files and blockers.
