# BIYOSELECT Data Quality

## Publication gate

A product/offer is publishable only when the fields required by its page and CTA are verified.

### Product minimum

- product name
- brand
- category
- relevant purpose/concern
- enough product characteristics to justify the recommendation
- current source URL
- price when displayed

### Affiliate minimum

- offer/program name
- ASP
- destination link
- reward
- reward type
- conversion condition
- approval status
- last confirmation date

## Confidence handling

- `確認済`: verified against an appropriate source.
- `調査中`: evidence gathering incomplete.
- `調査前`: not yet checked.
- `停止`: should not be used for publication.

Do not silently promote `調査中` or `調査前` records to confirmed status.
