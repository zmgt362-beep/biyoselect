import Link from 'next/link';
import { randomUUID } from 'crypto';
import { getCatalog } from '@/lib/notion/catalog';

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getCatalog()).find((item) => item.id === id);
  if (!product) return <main className="container result"><h1>商品が見つかりません</h1><Link href="/select">選び直す</Link></main>;

  const clickId = randomUUID();

  return <main className="container result">
    <Link href="/select">← 条件を変える</Link>
    <div className="card">
      <p className="muted">商品詳細</p>
      <h1>{product.name}</h1>
      <p>{product.brand}</p>
      <p>{product.priceYen ? `${product.priceYen.toLocaleString()}円` : '価格情報なし'}</p>
      <p>悩み適合：{product.concerns.length ? product.concerns.join(' / ') : '未分類'}</p>
      {product.affiliateConfirmed ? <><p className="muted">本ページにはアフィリエイト広告を含みます。</p><Link className="cta" href={`/go/${product.id}?click_id=${clickId}`}>販売ページを見る</Link></> : <p className="muted">現在、確認済みのアフィリエイト案件はありません。</p>}
    </div>
  </main>;
}
