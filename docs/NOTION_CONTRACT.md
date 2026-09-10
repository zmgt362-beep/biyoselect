# Notion ↔ Application Contract

## Ownership

Notion owns business data. GitHub owns code and technical configuration.

## Current business databases

- 商品DB: product master
- 比較DB: comparison candidates and decisions
- 記事DB: content inventory
- アフィリエイトDB: ASP offers and economics
- SNS投稿DB: social distribution and results
- 検証DB: experiments and numeric outcomes
- 運用ログDB: operational history

## Application requirements

1. Never silently invent missing product or affiliate fields.
2. Treat unverified data as unverified.
3. Keep recommendation logic deterministic and inspectable in the MVP.
4. Do not hard-code business facts that should live in Notion.
5. Keep event names stable so experiment results remain comparable.

## Minimum event vocabulary

- `view_landing`
- `start_selector`
- `complete_selector`
- `view_recommendation`
- `view_product`
- `affiliate_click`
- `conversion`

## Data quality

Before publishing a product or offer, confirm the minimum fields needed for the relevant UI and affiliate CTA. Missing evidence should lower confidence or block publication rather than be filled by inference.
