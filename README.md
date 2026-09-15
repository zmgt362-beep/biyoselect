# BIYOSELECT

美容商品の「結局どれ？」を、条件ベースで選べる意思決定メディア。

## Product goal

SNS・検索などで発生した購入意図を、比較・診断・推薦によって具体的な商品選択へ変換し、アフィリエイト成果まで計測する。

## Source of truth

- Notion: 商品・比較・記事・アフィリエイト・SNS・検証・運用情報
- GitHub: アプリケーションコード・技術設定

事業データをGitHubへ二重管理しない。

## MVP principle

最初から巨大な美容データベースを作らない。以下の最短ループを公開して測定する。

`流入 → 条件入力 → 推薦/比較 → 商品詳細 → アフィリエイトクリック → 成果`

成功判定はPVではなく、クリック・成果・利益・利益/作業時間で行う。

## Development

Codexは必須ではない。無料/オープンソースのコーディングエージェント、またはGitHub上での直接実装へ切り替え可能とする。コーディングエージェントは交換可能な実装手段であり、プロジェクトの仕様・データ構造を特定ツールに依存させない。

## Current status (2026-09-16)

- Business model: defined
- Notion data foundation: available
- GitHub repository: initialized
- MVP UI: deployed to Vercel
- Production build: passing
- Vercel ↔ GitHub: connected
- Vercel `NOTION_TOKEN`: configured
- Notion product data adapter: working in production
- Product recommendation flow: working in production
- Product detail → affiliate destination: manually verified
- Current catalog: only confirmed products are eligible for recommendation
- Affiliate click logging: server console logging exists; persistent aggregation is not yet implemented
- Conversion tracking: not yet validated with an actual A8 conversion

## Next priorities

1. Validate affiliate click logging and make measurement persistent enough for MVP operations.
2. Increase the number of verified products without inventing unverified product data.
3. Publish the first SNS acquisition test and measure click-through to BIYOSELECT.
4. Optimize the first-revenue path based on actual clicks and A8 results.
