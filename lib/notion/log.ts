import { Client } from "@notionhq/client";

const LOG_DATA_SOURCE_ID = "77c8fe85-6130-4752-95bd-ee2392525cfc";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

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

  try {
    // One rendered product page gets one unique clickId. If the browser,
    // crawler, or redirect path retries the same URL, do not count it twice.
    const existing = await notion.dataSources.query({
      data_source_id: LOG_DATA_SOURCE_ID,
      filter: {
        property: "関連",
        rich_text: { equals: input.clickId },
      },
      page_size: 1,
    });

    if (existing.results.length > 0) {
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
