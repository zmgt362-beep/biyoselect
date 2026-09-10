# BIYOSELECT Architecture

## Target architecture

`Browser → Next.js app → business-data adapter → Notion`

Analytics should be abstracted behind an event interface so the provider can change without rewriting the product flow.

## Layers

### UI

- Landing
- Selector
- Recommendation
- Product detail
- Comparison
- Content

### Decision engine

Pure functions only for the initial scoring logic. Inputs and outputs should be serializable and testable.

### Data adapter

Maps Notion business records into application-safe domain objects. Validation happens at the boundary.

### Analytics

Emit stable event names from `NOTION_CONTRACT.md`. Avoid embedding provider-specific calls throughout UI components.

### Content

Route and metadata structure should support future data-driven pages without requiring a redesign.

## Security / reliability

- Never expose private credentials in client code.
- Never hard-code secrets into the repository.
- Validate external data before rendering.
- Handle missing/invalid records gracefully.
- Keep affiliate links configurable.

## Cost principle

Prefer free/low-cost infrastructure during validation. Do not add infrastructure whose cost cannot be justified by measured incremental profit or required reliability.
