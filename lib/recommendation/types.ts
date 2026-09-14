export type Concern = "pores" | "oiliness" | "dryness" | "spots";
export type Budget = "low" | "mid" | "high";
export type Priority = "fit" | "value" | "ingredients";

export type UserConditions = {
  concern: Concern;
  budget: Budget;
  priority: Priority;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  concerns: Concern[];
  budget: Budget;
  ingredientTags: string[];
  priceYen?: number;
  dataStatus: "verified" | "unverified" | "stale";
  affiliateConfirmed: boolean;
  affiliateUrl?: string;
};

export type RecommendationScore = {
  productId: string;
  score: number;
  reasons: string[];
  eligible: boolean;
};
