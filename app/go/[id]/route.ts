import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/notion/catalog";
import { logAffiliateClick } from "@/lib/notion/log";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await getCatalog();
  const product = products.find((item) => item.id === id);

  if (!product?.affiliateConfirmed || !product.affiliateUrl) {
    return NextResponse.json({ ok: false, reason: "affiliate_offer_unavailable" }, { status: 404 });
  }

  const url = new URL(request.url);
  const clickId = url.searchParams.get("click_id");
  const referrer = request.headers.get("referer") ?? "unknown";
  const occurredAt = new Date().toISOString();

  console.info("affiliate_click", {
    clickId,
    productId: product.id,
    productName: product.name,
    referrer,
    occurredAt,
  });

  if (clickId) {
    await logAffiliateClick({
      clickId,
      productId: product.id,
      productName: product.name,
      referrer,
      occurredAt,
    });
  }

  return NextResponse.redirect(product.affiliateUrl, 302);
}
