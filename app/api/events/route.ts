import { NextResponse } from "next/server";

const allowed = new Set([
  "view_landing",
  "start_selector",
  "complete_selector",
  "view_recommendation",
  "view_product",
  "affiliate_click",
  "conversion",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!allowed.has(body?.name)) return NextResponse.json({ ok: false }, { status: 400 });
    console.info("BIYOSELECT_EVENT", JSON.stringify({ name: body.name, properties: body.properties ?? {}, ts: body.ts ?? Date.now() }));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
