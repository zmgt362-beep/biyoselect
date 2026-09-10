# BIYOSELECT Status

Last checked: 2026-09-11

## Confirmed

- Notion dashboard exists and contains the core business databases.
- 商品DB, 比較DB, 記事DB, アフィリエイトDB, SNS投稿DB, 検証DB, and 運用ログDB are present.
- Notion is designated as the business-data source of truth.
- GitHub repository `zmgt362-beep/biyoselect` is accessible and writable.
- Repository was empty before this work and is now initialized with the project contracts/specifications.
- GitHub issue #1 contains the MVP implementation queue.
- Vercel Hobby team is accessible.
- No Vercel project currently exists for this account/team.

## Blocked / external dependency

- Actual application implementation requires the coding environment/Codex continuation.
- Vercel deployment requires an application to deploy.
- Live affiliate terms/rewards and private A8 account data cannot be assumed without access to the relevant account screens/data.

## Next highest-value execution

1. Codex implements P0 from `docs/CODEX_TASKS.md`.
2. Build/test locally.
3. Connect repository to Vercel and deploy.
4. Verify selector and affiliate-click events.
5. Publish the first revenue-focused experiment.
6. Record measured results in Notion 検証DB and 運用ログDB.
