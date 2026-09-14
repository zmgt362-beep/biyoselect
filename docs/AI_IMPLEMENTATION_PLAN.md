# BIYOSELECT AI Implementation Plan

## Decision

Codex is **not a prerequisite** for implementation.

The project should remain implementable with a free/open-source coding agent or direct GitHub-based development. The coding agent is replaceable; GitHub is the source of truth for code and Notion is the source of truth for business/product data.

## Current architecture

- Notion: product/comparison/article/affiliate/SNS/validation/operations data
- GitHub: application code and technical configuration
- Vercel: deployment target

Do not duplicate business/product data in GitHub.

## MVP loop

`SNS/Search → condition input → recommendation/comparison → product detail → affiliate click → conversion`

## MVP scope

1. Landing page explaining the decision-first concept
2. Condition-based product selection UI
3. Comparison/result screen
4. Product detail screen
5. Affiliate-link placeholder structure
6. Basic click-event structure
7. Mobile-first responsive UI
8. SEO-ready metadata

## Explicitly out of scope for MVP

- Huge beauty-product database
- Complex AI diagnosis
- User accounts
- Payments
- Full CMS
- Automated social posting
- Advanced analytics dashboard

## Implementation rule

Prefer the smallest working implementation. Every feature must justify its effect on acquisition, selection, click-through, conversion, profit, or measurement.

## Execution order

1. Scaffold application
2. Implement one complete decision flow
3. Add sample product data only for development/demo
4. Add affiliate click measurement interface
5. Test mobile/desktop flow
6. Deploy to Vercel
7. Connect real Notion data
8. Measure real user behavior
9. Iterate based on data
