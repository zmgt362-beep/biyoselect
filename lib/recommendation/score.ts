import type { Product, RecommendationScore, UserConditions } from "./types";

const WEIGHTS = {
  concern: 50,
  budget: 20,
  priority: 20,
  data: 10,
} as const;

export function scoreProduct(
  product: Product,
  conditions: UserConditions,
): RecommendationScore {
  const reasons: string[] = [];
  let score = 0;

  const concernMatch = product.concerns.includes(conditions.concern);
  if (concernMatch) {
    score += WEIGHTS.concern;
    reasons.push("悩みに合う");
  }

  if (product.budget === conditions.budget) {
    score += WEIGHTS.budget;
    reasons.push("予算に合う");
  }

  const priorityTag = conditions.priority === "ingredients"
    ? product.ingredientTags.length > 0
    : conditions.priority === "value"
      ? product.priceYen !== undefined
      : concernMatch;

  if (priorityTag) {
    score += WEIGHTS.priority;
    reasons.push(
      conditions.priority === "ingredients"
        ? "成分・特徴の情報がある"
        : conditions.priority === "value"
          ? "価格情報がある"
          : "条件適合度を優先",
    );
  }

  if (product.dataStatus === "verified") {
    score += WEIGHTS.data;
    reasons.push("情報確認済み");
  }

  const eligible = concernMatch && product.dataStatus === "verified";

  return { productId: product.id, score, reasons, eligible };
}

export function rankProducts(
  products: Product[],
  conditions: UserConditions,
): RecommendationScore[] {
  return products
    .map((product) => scoreProduct(product, conditions))
    .filter((result) => result.eligible)
    .sort((a, b) => b.score - a.score || a.productId.localeCompare(b.productId));
}
