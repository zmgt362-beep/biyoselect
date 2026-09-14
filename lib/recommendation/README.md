# Recommendation engine

`score.ts` is the MVP recommendation core.

- Deterministic: identical product data + conditions produce identical results.
- Explainable: every awarded score has a user-readable reason.
- Safety gate: only verified products matching the requested concern are eligible.
- Monetization is intentionally not part of the score in this first implementation; affiliate economics must not override user fit.
- Business/product data belongs in Notion. Files in this directory contain only application logic and types.

## Score model

| Factor | Weight |
|---|---:|
| Concern fit | 50 |
| Budget fit | 20 |
| Priority fit | 20 |
| Verified data | 10 |

This is an implementation baseline, not a claim that these weights are optimal. They should be validated through experiments before being treated as final business logic.
