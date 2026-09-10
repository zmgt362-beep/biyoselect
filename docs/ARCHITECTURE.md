# BIYOSELECT Architecture

## Target architecture

`Browser → Next.js app → business-data adapter → Notion`

Analytics is abstracted behind an event interface so the provider can change without rewriting product flow.

## Source-of-truth boundary

- Notion: product/comparison/article/affiliate/SNS/experiment/operations data.
- GitHub: application code and technical configuration.
- Vercel: deployment/runtime configuration.

Do not copy business data into a manually maintained GitHub dataset.

## Layers

### UI

- Landing
- Selector
- Recommendation
- Product detail
- Comparison
- Content
- Disclosure/privacy surfaces

### Decision engine

Pure deterministic functions for initial scoring. Inputs and outputs must be serializable and testable. Recommendation reasons must be explainable.

Priority order:
1. condition fit
2. evidence/data freshness
3. price/value fit
4. purchase availability
5. affiliate economics as a tie-breaker

### Data adapter

Maps Notion business records into application-safe domain objects. Validate required fields at the boundary. Preserve data-state/freshness; do not silently infer missing facts.

### Analytics

Emit the stable event vocabulary from `NOTION_CONTRACT.md`:
`view_landing`, `start_selector`, `complete_selector`, `view_recommendation`, `view_product`, `affiliate_click`, `conversion`.

Keep provider-specific calls behind one analytics interface.

### Content

Routes and metadata must support data-driven comparison/product pages backed by Notion. Content should not require a separate manually maintained content database in code.

## Security / reliability

- Never expose private credentials in client code.
- Never hard-code secrets into the repository.
- Validate external data before rendering.
- Handle missing, stale, unverified, or invalid records gracefully.
- Render affiliate links only for confirmed offers.
- Do not collect unnecessary personally identifying information.

## Cost principle

Prefer free/low-cost infrastructure during validation. Add recurring infrastructure only when measured incremental profit or required reliability justifies it.

## Testing priorities

- deterministic scoring
- missing/invalid data
- stale/unverified data
- empty datasets
- affiliate-link gating
- stable analytics event emission
- mobile rendering
- production build
