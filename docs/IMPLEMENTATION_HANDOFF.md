# BIYOSELECT — Implementation Handoff

Status: **READY FOR CODEX IMPLEMENTATION** once the current Codex usage limit resets.

## 1. Source of truth

- Notion: business data and operating state.
- GitHub: application code and technical configuration.
- Do not duplicate product/article/affiliate/SNS/experiment business data in GitHub.

## 2. MVP outcome

Build the smallest public loop that can prove monetization:

`acquisition → condition input → recommendation/comparison → product detail → affiliate click → conversion`

Primary business KPI: **net profit per hour**, not page views.

## 3. Notion data model

### Product DB
Canonical fields include:
- 商品名
- ブランド
- カテゴリ
- 価格
- 容量
- 対象
- 悩み
- 成分・特徴
- 公式URL
- 販売URL
- 情報源URL
- 最終確認日
- データ状態
- 評価メモ

### Comparison DB
Canonical fields include:
- 比較タイトル
- 商品A / 商品A参照
- 商品B / 商品B参照
- 比較条件
- ターゲット
- 理由
- 勝者
- 判定スコア
- 検証状態
- 最終確認日
- 記事URL

### Article DB
Canonical fields include:
- 記事タイトル
- 狙うキーワード
- 検索意図
- ターゲット
- カテゴリ
- 比較DB参照
- アフィリエイトDB参照
- 公開URL
- ステータス
- 収益優先度
- 作成日 / 更新日
- 最終確認日

### Affiliate DB
Canonical fields include:
- 案件
- ASP
- 商品DB参照
- 成果条件
- 報酬
- 報酬種別
- 確定率
- EPC
- 想定売上価値
- リンク
- 承認状況
- 掲載状況
- 優先度
- 最終確認日

### SNS Post DB
Canonical fields include:
- 投稿
- 媒体
- 投稿日時
- ステータス
- 記事DB参照
- 比較DB参照
- 関連商品
- 関連URL
- 表示回数
- クリック
- CTR
- 成果
- 成果率
- 収益
- 学習判定

### Experiments DB
This is the **only** BIYOSELECT experiment database.
Track:
- 仮説
- 実行
- 結果
- 学習
- 判定
- 次の変更
- 次アクション
- 表示回数
- クリック
- アフィリエイトクリック
- 成果
- 収益
- 費用
- 作業時間h
- 純利益
- 純利益/h
- 成功確率
- 媒体

Decision values: `継続 / 改善 / 撤退`.

## 4. Recommendation logic

For MVP, use explainable rule-based scoring rather than an opaque LLM recommendation.

Priority:
1. Fit to explicit user conditions.
2. Data confidence / freshness.
3. Price/value fit.
4. Purchase availability.
5. Monetization value as a tie-breaker.

Never recommend a worse-fit product solely because its affiliate reward is higher.

## 5. Measurement

Track distinct events:
- landing/entry
- condition input
- result display
- comparison/detail view
- affiliate click
- conversion

Avoid collecting personally identifying information.

## 6. Compliance

- Clearly disclose advertising/affiliate relationships where required.
- Follow applicable Japanese advertising, consumer-protection and pharmaceutical/medical-claim rules, ASP rules, and platform rules.
- Never invent price, reward, availability, efficacy, or approval status.
- Never make medical or guaranteed efficacy claims.

## 7. Implementation order

1. Next.js project/base layout
2. Notion data access layer
3. Product list/detail
4. Condition input
5. Comparison/recommendation
6. Affiliate outbound link
7. Event measurement
8. SEO metadata / OG
9. Empty/error states
10. Tests
11. Vercel deployment preparation

## 8. Definition of done

- `npm run build` succeeds.
- Existing lint/typecheck/test commands pass.
- Empty Notion data does not crash the application.
- Unverified data is not displayed as verified.
- External links work.
- Mobile layout is usable.
- Required advertising/affiliate disclosure is present.
- Measurement events are not duplicated.
- UI data matches Notion canonical data.

## 9. Codex operating rules

- Read this file and the existing docs before changing code.
- Inspect the repository before assuming any file exists.
- Do not introduce unrelated architecture or large features.
- Do not hard-code business data.
- Do not guess missing data.
- Preserve explainability of recommendations.
- Prefer the smallest change that satisfies the next task.
- Run tests/build after meaningful changes.
- Report blockers and exact next action.

## 10. First task after limit reset

Compare the current repository against this handoff and `docs/MVP_SPEC.md`, `docs/NOTION_CONTRACT.md`, and `docs/ARCHITECTURE.md`. Resolve conflicts in favor of the latest confirmed Notion architecture and this handoff. Then implement only the minimum missing MVP pieces in dependency order.
