# BIYOSELECT PDCA Scorecard

Use this as the fixed evaluation order for every experiment.

| Metric | Rule |
|---|---|
| Expected net profit | Highest priority outcome |
| Success probability | Penalize fragile assumptions |
| Time to result | Prefer faster evidence |
| Net profit/hour | Primary operating KPI |
| ROI | Include actual costs |
| Cost | Prefer low-cost validation |
| Risk | Include compliance/platform/data risk |
| Reproducibility | One-off wins are not enough |
| Difficulty | Penalize operational complexity |
| Opportunity cost | Compare against alternative work |
| Scalability | Prefer winners that can expand |

## Funnel

Evaluate the entire path, not an isolated metric:

`impression → landing → selector start → selector completion → recommendation/product view → affiliate click → conversion → confirmed revenue → costs → net profit → net profit/hour`

## Minimum experiment record

Each experiment must state:
- hypothesis
- baseline
- change
- sample/observation window
- target metric
- actual result
- cost
- operating hours
- net profit
- net profit/hour
- decision: `継続 / 改善 / 撤退`
- next change

## Update rule

After each experiment, change at least one of: topic, acquisition hook, selector UX, recommendation logic, CTA, offer priority, or content format. The change must be justified by the previous observation.

## Decision rule

Do not optimize PV alone. A high-PV route with weak downstream economics can lose to a smaller route with higher profit/hour and reproducibility.

## Stop rule

If a route repeatedly fails to produce downstream economic signal after a reasonable sample, stop it and reallocate effort. Do not preserve a route merely because work has already been invested.
