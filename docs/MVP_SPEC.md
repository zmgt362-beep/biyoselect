# BIYOSELECT MVP Specification

## 1. Objective

Validate one complete monetization loop before expanding the product:

`acquisition → condition input → recommendation/comparison → product detail → affiliate click → conversion → revenue`

## 2. MVP scope

### Required
- Mobile-first landing page
- Product selection/decision flow
- Condition inputs
- Recommendation result with reasons
- Product cards
- Affiliate CTA
- Basic event tracking
- SEO-friendly content pages
- Privacy / disclosure / affiliate disclosure surfaces as required

### Not required initially
- User accounts
- Complex personalization history
- Full cosmetic ingredient graph
- Native app
- Large-scale automated crawling
- Paid advertising

## 3. Data boundary

Notion remains the business-data source of truth. The application should consume structured data without creating a second manually maintained product database.

## 4. Decision model

Initial recommendation score should be explicit and auditable. Candidate dimensions:

- target match
- concern/purpose match
- budget fit
- ingredient/feature fit
- evidence/data completeness
- affiliate availability

Do not present a score as scientifically validated. It is a product-selection heuristic until user outcome data validates it.

## 5. Measurement

Track at minimum:

- landing view
- decision-flow start
- decision-flow completion
- recommendation view
- product detail click
- affiliate click
- conversion/revenue when available

Primary business KPI: `net profit / operating hour`.
Secondary KPIs: conversion rate, affiliate CTR, revenue per visitor, reproducibility, acquisition cost, and retention/revisit where measurable.

## 6. Experimentation

Every meaningful experiment must have:

- hypothesis
- change
- target metric
- observation window
- result
- decision
- next change

Stop weak channels and themes rather than accumulating content for its own sake.

## 7. Implementation handoff

Codex should implement this specification incrementally, run tests/build checks, and report changed files and remaining blockers.
