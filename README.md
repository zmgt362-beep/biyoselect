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

Codex is responsible for implementation, testing, and GitHub changes. ChatGPT is responsible for research, strategy, specifications, and intermediate decisions.

## Current status

- Business model: defined
- Notion data foundation: available
- GitHub repository: initialized
- Vercel project: not yet created
- MVP implementation: specification stage / Codex continuation required
