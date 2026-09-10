# Notion ↔ Application Contract

## Ownership

Notion owns business data. GitHub owns application code and technical configuration.

## Canonical business databases

- 商品DB: product master, source/freshness state
- 比較DB: comparison definitions and decisions
- 記事DB: content inventory and publishing state
- アフィリエイトDB: ASP offers and economics
- SNS投稿DB: social distribution and results
- 06_EXPERIMENTS / Experiments DB: the **only** experiment database
- 運用ログDB: operational history

The former BIYOSELECT `検証DB` and duplicate `運用ログDB` were empty and have been removed. Do not recreate them.

## Product minimum contract

`商品名`, `ブランド`, `カテゴリ`, `価格`, `容量`, `対象`, `悩み`, `成分・特徴`, `公式URL`, `販売URL`, `情報源URL`, `最終確認日`, `データ状態`, `評価メモ`.

## Comparison minimum contract

`比較タイトル`, `商品A参照`, `商品B参照`, `比較条件`, `ターゲット`, `理由`, `勝者`, `判定スコア`, `検証状態`, `最終確認日`, `記事URL`.

## Article minimum contract

`記事タイトル`, `狙うキーワード`, `検索意図`, `ターゲット`, `カテゴリ`, `比較DB参照`, `アフィリエイトDB参照`, `公開URL`, `ステータス`, `収益優先度`, `作成日`, `更新日`, `最終確認日`.

## Affiliate minimum contract

`案件`, `ASP`, `商品DB参照`, `成果条件`, `報酬`, `報酬種別`, `確定率`, `EPC`, `想定売上価値`, `リンク`, `承認状況`, `掲載状況`, `優先度`, `最終確認日`.

## SNS minimum contract

`投稿`, `媒体`, `投稿日時`, `ステータス`, `記事DB参照`, `比較DB参照`, `関連商品`, `関連URL`, `表示回数`, `クリック`, `CTR`, `成果`, `成果率`, `収益`, `学習判定`.

## Experiment minimum contract

`実験`, `プロジェクト`, `ステータス`, `仮説`, `実行`, `結果`, `学習`, `判定`, `次の変更`, `次アクション`, `媒体`, `表示回数`, `クリック`, `アフィリエイトクリック`, `成果`, `収益`, `費用`, `作業時間h`, `純利益`, `純利益/h`, `成功確率`.

Decision values: `継続 / 改善 / 撤退`.

## Application requirements

1. Never silently invent missing product or affiliate fields.
2. Treat unverified/stale data as unverified/stale.
3. Keep recommendation logic deterministic and inspectable in the MVP.
4. Do not hard-code business facts that belong in Notion.
5. Keep event names stable so experiment results remain comparable.
6. Never rank a worse-fit product above a better-fit product solely for affiliate economics.

## Minimum event vocabulary

- `view_landing`
- `start_selector`
- `complete_selector`
- `view_recommendation`
- `view_product`
- `affiliate_click`
- `conversion`

## Funnel

`landing → selector → recommendation → product → affiliate_click → conversion`

## Data quality

Before publishing a product or offer, confirm the minimum fields needed for the relevant UI and affiliate CTA. Missing evidence should block publication or visibly remain unverified rather than be filled by inference.
