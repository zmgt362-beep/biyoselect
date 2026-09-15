import { Redis } from "@upstash/redis";
import { Client } from "@notionhq/client";

const LOG_DATA_SOURCE_ID = "77c8fe85-6130-4752-95bd-ee2392525cfc";
const CLICK_DEDUP_TTL_SECONDS = 60 * 60 * 24 * 30;

const notion = new Client({ auth: process.env.NOTION_TOKEN });

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  return Redis.fromEnv();
}

export async function logAffiliateClick(input: {
  clickId: string;
  productId: string;
  productName: string;
  referrer: string;
  occurredAt: string;
}) {
  if (!process.env.NOTION_TOKEN || !input.clickId) {
    return;
  }

  const redis = getRedis();
  if (!redis) {
    console.error("affiliate_click_dedup_unavailable", {
      reason: "UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing",
      clickId: input.clickId,
    });
    return;
  }

  try {
    // SET NX is atomic. Concurrent requests carrying the same clickId can
    // therefore produce at most one Notion log.
    const dedupKey = `biyoselect:affiliate_click:${input.clickId}`;
    const acquired = await redis.set(dedupKey, "1", {
      nx: true,
      ex: CLICK_DEDUP_TTL_SECONDS,
    });

    if (acquired !== "OK") {
      console.info("affiliate_click_duplicate_ignored", {
        clickId: input.clickId,
        productId: input.productId,
      });
      return;
    }

    await notion.pages.create({
      parent: { data_source_id: LOG_DATA_SOURCE_ID },
      properties: {
        ログ: {
          title: [{ text: { content: `affiliate_click｜${input.productName}` } }],
        },
        内容: {
          rich_text: [
            {
              text: {
                content: JSON.stringify({
                  event: "affiliate_click",
                  clickId: input.clickId,
                  productId: input.productId,
                  productName: input.productName,
                  referrer: input.referrer,
                }),
              },
            },
          ],
        },
        日付: {
          date: { start: input.occurredAt },
        },
        種別: {
          select: { name: "検証" },
        },
        関連: {
          rich_text: [{ text: { content: input.clickId } }],
        },
      },
    });
  } catch (error) {
    console.error("affiliate_click_persist_failed", error);
  }
}
