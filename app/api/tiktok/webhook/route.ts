import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[TikTok Webhook]', JSON.stringify(body));
  } catch {
    console.log('[TikTok Webhook] Received non-JSON payload');
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ ok: true }, { status: 200 });
}
