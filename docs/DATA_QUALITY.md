# BIYOSELECT Data Quality

## Publication gate

A product/offer is publishable only when the fields required by its page and CTA are verified and fresh enough for the use case.

### Product minimum

- product name
- brand
- category
- target
- relevant purpose/concern
- enough characteristics to justify the recommendation
- official/source URL
- current price when displayed
- source URL
- last confirmation date
- data state

### Affiliate minimum

- offer/program name
- ASP
- destination link
- reward
- reward type
- conversion condition
- approval status
- placement status
- last confirmation date

## Confidence handling

- `確認済`: verified against an appropriate source.
- `調査中`: evidence gathering incomplete.
- `調査前`: not yet checked.
- `停止`: should not be used for publication.

Do not silently promote `調査中` or `調査前` records to confirmed status.

## Staleness

Prices, rewards, availability, approval status, and other volatile facts must be rechecked before publication or when their confirmation date is too old for the use case. If freshness cannot be established, display as unverified or block publication.

## Recommendation safety

Recommendation scores are heuristics. Missing evidence lowers confidence or blocks publication. Affiliate economics must not override materially better condition fit.
