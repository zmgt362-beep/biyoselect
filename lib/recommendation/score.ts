import type { Product, RecommendationScore, UserConditions } from "./types";

const WEIGHTS = { concern:45, budget:20, priority:20, data:10, affiliate:5 } as const;

export function scoreProduct(product:Product, conditions:UserConditions):RecommendationScore {
  const reasons:string[]=[]; let score=0;
  const concernMatch=product.concerns.includes(conditions.concern);
  if(concernMatch){score+=WEIGHTS.concern; reasons.push("悩みに合う");}
  else if(product.concerns.length>0){score+=8; reasons.push("関連する悩みに対応");}
  if(product.budget===conditions.budget){score+=WEIGHTS.budget; reasons.push("予算に合う");}
  else if(product.priceYen!==undefined){score+=5; reasons.push("価格を確認できる");}
  const priorityTag=conditions.priority==="ingredients"
    ? product.ingredientTags.length>0
    : conditions.priority==="value" ? product.priceYen!==undefined : concernMatch;
  if(priorityTag){score+=WEIGHTS.priority; reasons.push(conditions.priority==="ingredients"?"成分・特徴の情報がある":conditions.priority==="value"?"価格情報がある":"悩みへの適合度を優先");}
  if(product.dataStatus==="verified"){score+=WEIGHTS.data; reasons.push("情報確認済み");}
  if(product.affiliateConfirmed) score+=WEIGHTS.affiliate;
  return {productId:product.id,score,reasons,eligible:product.dataStatus==="verified"};
}
export function rankProducts(products:Product[],conditions:UserConditions):RecommendationScore[]{
  return products.map(p=>scoreProduct(p,conditions)).filter(r=>r.eligible)
    .sort((a,b)=>b.score-a.score||a.productId.localeCompare(b.productId));
}