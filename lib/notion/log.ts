import { Client } from "@notionhq/client";

const LOG_DATA_SOURCE_ID = "77c8fe85-6130-4752-95bd-ee2392525cfc";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export async function logAffiliateClick(input: {
  productId: string;
  productName: string;
  referrer: string;
  occurredAt: string;
}) {
  if (!process.env.NOTION_TOKEN) {
    return;
  }

  try {
    await notion.pages.create({
      parent: { data_source_id: LOG_DATA_SOURCE_ID },
      properties: {
        ログ: {
          title: [
            {
              text: {
                content: `affiliate_click｜${input.productName}`,
              },
            },
          ],
        },
        内容: {
          rich_text: [
            {
              text: {
                content: JSON.stringify({
                  event: "affiliate_click",
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
          select: { name: "成果" },
        },
        関連: {
          rich_text: [{ text: { content: input.productId } }],
        },
      },
    });
  } catch (error) {
    console.error("affiliate_click_persist_failed", error);
  }
}
