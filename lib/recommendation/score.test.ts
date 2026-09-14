import { rankProducts, scoreProduct } from "./score";
import type { Product, UserConditions } from "./types";

const conditions: UserConditions = {
  concern: "pores",
  budget: "mid",
  priority: "fit",
};

const products: Product[] = [
  {
    id: "a",
    name: "A",
    brand: "A",
    concerns: ["pores"],
    budget: "mid",
    ingredientTags: ["niacinamide"],
    priceYen: 2000,
    dataStatus: "verified",
    affiliateConfirmed: true,
    affiliateUrl: "https://example.com/a",
  },
  {
    id: "b",
    name: "B",
    brand: "B",
    concerns: ["oiliness"],
    budget: "mid",
    ingredientTags: [],
    priceYen: 1500,
    dataStatus: "verified",
    affiliateConfirmed: true,
    affiliateUrl: "https://example.com/b",
  },
  {
    id: "c",
    name: "C",
    brand: "C",
    concerns: ["pores"],
    budget: "mid",
    ingredientTags: [],
    priceYen: 1800,
    dataStatus: "unverified",
    affiliateConfirmed: true,
    affiliateUrl: "https://example.com/c",
  },
];

test("scores matching verified products highest", () => {
  expect(scoreProduct(products[0], conditions)).toEqual({
    productId: "a",
    score: 100,
    reasons: ["悩みに合う", "予算に合う", "条件適合度を優先", "情報確認済み"],
    eligible: true,
  });
});

test("excludes non-matching and unverified products", () => {
  expect(rankProducts(products, conditions).map((item) => item.productId)).toEqual(["a"]);
});

test("ranking is deterministic for identical inputs", () => {
  expect(rankProducts(products, conditions)).toEqual(rankProducts(products, conditions));
});
