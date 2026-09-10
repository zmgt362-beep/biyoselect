# BIYOSELECT Product Domain

The application-facing product object should normalize the current Notion 商品DB without copying business data into source code.

## Required domain fields

- id
- name
- brand
- category
- price
- capacity
- target
- concerns
- features
- evaluationNote
- officialUrl
- salesUrl
- dataStatus

## Rules

- `dataStatus` controls publication eligibility.
- URLs are external data and must be validated before rendering.
- Price is optional at the domain level because source data may be incomplete; UI must not fabricate it.
- Recommendation explanations must be derived from explicit fields and selection criteria.

## Future fields

Only add fields when an experiment or product requirement demonstrates that they improve recommendation quality or economics.
