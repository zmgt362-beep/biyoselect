import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/notion/catalog";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await getCatalog();
  const product = products.find((item) => item.id === id);

  if (!product?.affiliateConfirmed || !product.affiliateUrl) {
    return NextResponse.json({ ok: false, reason: "affiliate_offer_unavailable" }, { status: 404 });
  }

  return NextResponse.redirect(product.affiliateUrl, 302);
}
