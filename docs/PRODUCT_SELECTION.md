# BIYOSELECT Product Selection Logic

## Goal

Convert user conditions into a transparent shortlist rather than a black-box claim of objective superiority.

## Initial inputs

- concern/purpose
- target
- budget
- category

## Candidate scoring

For each candidate, calculate a simple weighted match score:

`score = purpose_match × 40 + target_match × 20 + budget_fit × 15 + feature_match × 15 + data_confidence × 10`

Each component is normalized to 0–1.

## Interpretation

- Higher score = better match to the selected conditions.
- It does **not** mean the product is objectively better.
- If required source data is missing, confidence must fall rather than be fabricated.
- If two products are close, show the trade-off instead of forcing a false winner.

## Future optimization

Once real user behavior exists, evaluate whether the weights predict downstream outcomes. Replace heuristic weights only when observed data supports the change.
