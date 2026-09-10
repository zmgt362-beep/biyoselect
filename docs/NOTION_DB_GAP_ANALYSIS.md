# Notion DB Gap Analysis

Checked against the current BIYOSELECT Dashboard on 2026-09-11.

## Current state

The core seven databases exist: 商品DB, 比較DB, 記事DB, アフィリエイトDB, SNS投稿DB, 検証DB, 運用ログDB.

## Assessment

### 商品DB

Good MVP foundation: product identity, category, target, concern, features, price, capacity, URLs, status, evaluation memo.

Potential future additions only after evidence: source URL/date, price confirmation date, confidence, recurring cost. Avoid adding fields solely for completeness.

### 比較DB

Good: A/B references, target, comparison condition, winner, reason, verification status, article URL.

Future: quantitative comparison metrics only where they materially improve the decision.

### 記事DB

Good: title, category, target, keyword, status, revenue priority, public URL, relations.

Future: traffic metrics can be derived from analytics rather than manually duplicated if the architecture supports it.

### アフィリエイトDB

Good: ASP, offer, product relation, reward, reward type, conditions, approval status, priority, EPC, confirmation date, placement status.

Critical operational rule: do not populate unknown reward/EPC/approval values by assumption.

### SNS投稿DB

Good: platform, post status, post time, views, clicks, CTR, results, result rate, revenue, learning judgment, related content.

Future: experiment ID/source campaign if attribution requires it.

### 検証DB

Strongest measurement foundation: hypothesis, objective, change, status, work hours, traffic, clicks, affiliate clicks, conversions, revenue, revenue/hour, judgment, next change, relations.

### 運用ログDB

Sufficient for current operational history: type, date, content, before/after, evidence, relation.

## Decision

Do not expand the schema indiscriminately now. The existing structure is sufficient to start the MVP validation loop. Add fields only when a real workflow cannot be measured or operated without them.
