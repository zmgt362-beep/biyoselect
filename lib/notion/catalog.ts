import { Client } from "@notionhq/client";
import type { Product } from "@/lib/recommendation/types";

const PRODUCT_DS = "71f675c4-1110-4581-bdf5-74f44eacb9fe";
const AFFILIATE_DS = "f277398a-dc70-4630-b626-7cb33cd709d7";

function richText(value: any): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map((v) => v?.plain_text ?? "").join("");
  return value?.title?.map((v: any) => v?.plain_text ?? "").join("") ?? value?.rich_text?.map((v: any) => v?.plain_text ?? "").join("") ?? "";
}

function prop(page: any, name: string): any {
  return page?.properties?.[name];
}

function text(page: any, name: string): string {
  const p = prop(page, name);
  if (!p) return "";
  if (p.type === "title") return richText(p.title);
  if (p.type === "rich_text") return richText(p.rich_text);
  if (p.type === "select") return p.select?.name ?? "";
  if (p.type === "url") return p.url ?? "";
  if (p.type === "number") return p.number == null ? "" : String(p.number);
  return "";
}

function pageIdFromRelation(page: any, name: string): string | undefined {
  const relation = prop(page, name)?.relation;
  return Array.isArray(relation) && relation[0]?.id ? relation[0].id : undefined;
}

function budget(price?: number): Product["budget"] {
  if (price == null) return "mid";
  if (price <= 3000) return "low";
  if (price <= 10000) return "mid";
  return "high";
}

function concerns(raw: string): Product["concerns"] {
  const value = raw.toLowerCase();
  const result: Product["concerns"] = [];
  if (/毛穴|角栓|黒ずみ/.test(value)) result.push("pores");
  if (/皮脂|テカ|脂性|油/.test(value)) result.push("oiliness");
  if (/乾燥|うるおい|保湿/.test(value)) result.push("dryness");
  if (/シミ|くすみ|色素|美白/.test(value)) result.push("spots");
  return result;
}

export async function getCatalog(): Promise<Product[]> {
  if (!process.env.NOTION_TOKEN) return [];

  const notion = new Client({ auth: process.env.NOTION_TOKEN, notionVersion: "2026-03-11" });
  const [products, affiliates] = await Promise.all([
    notion.dataSources.query({ data_source_id: PRODUCT_DS, page_size: 100 }),
    notion.dataSources.query({
      data_source_id: AFFILIATE_DS,
      page_size: 100,
      filter: {
        and: [
          { property: "承認状況", select: { equals: "承認" } },
          { property: "掲載状況", select: { equals: "掲載中" } },
        ],
      },
    }),
  ]);

  const offerByProduct = new Map<string, string>();
  for (const offer of affiliates.results as any[]) {
    const productId = pageIdFromRelation(offer, "商品DB参照");
    const url = text(offer, "リンク");
    if (productId && url) offerByProduct.set(productId, url);
  }

  return (products.results as any[]).map((page) => {
    const priceText = text(page, "価格");
    const priceYen = priceText ? Number(priceText) : undefined;
    const concernList = concerns(text(page, "悩み") + text(page, "成分・特徴"));
    const status = text(page, "データ状態");
    return {
      id: page.id,
      name: text(page, "商品名"),
      brand: text(page, "ブランド"),
      concerns: concernList,
      budget: budget(priceYen),
      ingredientTags: text(page, "成分・特徴").split(/[、,，\s]+/).filter(Boolean).slice(0, 12),
      priceYen,
      dataStatus: status === "確認済" ? "verified" : status === "停止" ? "stale" : "unverified",
      affiliateConfirmed: offerByProduct.has(page.id),
      affiliateUrl: offerByProduct.get(page.id),
    } satisfies Product;
  }).filter((product) => product.name);
}
