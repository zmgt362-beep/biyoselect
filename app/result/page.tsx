import Link from 'next/link';
import { getCatalog } from '@/lib/notion/catalog';
import { rankProducts } from '@/lib/recommendation/score';
import type { Budget, Concern, Priority } from '@/lib/recommendation/types';

const labels: Record<string, string> = { pores: '毛穴', dryness: '乾燥', spots: 'シミ・くすみ', oiliness: '皮脂・テカリ', low: '〜5,000円', mid: '5,000〜10,000円', high: '10,000円〜', fit: '効果・機能', value: 'コスパ', ingredients: '成分' };

export default async function ResultPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const concern = (Array.isArray(params.concern) ? params.concern[0] : params.concern) as Concern | undefined;
  const budget = (Array.isArray(params.budget) ? params.budget[0] : params.budget) as Budget | undefined;
  const priority = (Array.isArray(params.priority) ? params.priority[0] : params.priority) as Priority | undefined;
  if (!concern || !budget || !priority) return <main className="container result"><h1>条件が不足しています</h1><Link href="/select">選び直す →</Link></main>;

  const products = await getCatalog();
  const ranked = rankProducts(products, { concern, budget, priority });
  return <main className="container result">
    <p className="muted">条件：{labels[concern]} / {labels[budget]} / {labels[priority]}</p>
    <h1>おすすめ候補</h1>
    <p className="muted">確認済みの商品だけを条件適合順に表示しています。</p>
    {ranked.length === 0 ? <section className="card"><h2>現在、条件に合う確認済み商品がありません</h2><p>商品DBの確認が完了した商品が増えるまでお待ちください。</p></section> : <>
      <section className="card"><h2>第一候補</h2><ProductCard score={ranked[0]} product={products.find(p => p.id === ranked[0].productId)!} primary /></section>
      {ranked.slice(1).map(score => { const product = products.find(p => p.id === score.productId); return product ? <ProductCard key={product.id} score={score} product={product} /> : null; })}
    </>}
  </main>;
}

function ProductCard({ score, product, primary = false }: any) {
  return <div className="product"><h2>{product.name}</h2><p>{product.brand} / {product.priceYen ? `${product.priceYen.toLocaleString()}円` : '価格不明'}</p><p>{score.reasons.join('・')}</p>{primary && <span className="tag">スコア {score.score}</span>}<p><Link className={primary ? 'cta' : ''} href={`/product/${product.id}`}>商品詳細 →</Link></p></div>;
}
