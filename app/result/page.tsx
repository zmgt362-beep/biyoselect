import Link from 'next/link';
import ShareButton from './ShareButton';
import {getBeautyType} from '@/lib/diagnosis/types';
import {getCatalog} from '@/lib/notion/catalog';
import {rankProducts} from '@/lib/recommendation/score';
import type {Budget,Concern,Priority} from '@/lib/recommendation/types';

const labels:Record<string,string>={pores:'毛穴',dryness:'乾燥',spots:'シミ・くすみ',oiliness:'皮脂・テカリ',firmness:'ハリ・リフト',low:'〜5,000円',mid:'5,000〜10,000円',high:'10,000円〜',fit:'効果・機能',value:'コスパ',ingredients:'成分'};

export default async function ResultPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  const p=await searchParams;
  const type=Array.isArray(p.type)?p.type[0]:p.type;
  const beauty=getBeautyType(type??'P-A-S-R');
  const concern=((Array.isArray(p.concern)?p.concern[0]:p.concern)??'pores') as Concern;
  const budget=((Array.isArray(p.budget)?p.budget[0]:p.budget)??'mid') as Budget;
  const priority=((Array.isArray(p.priority)?p.priority[0]:p.priority)??'value') as Priority;
  const products=await getCatalog();
  const ranked=rankProducts(products,{concern,budget,priority});
  return <main className='result-page'>
    <section className='type-result'>
      <p className='diagnosis-kicker'>YOUR BEAUTY TYPE</p><div className='type-code'>{beauty.code}</div><h1>{beauty.name}</h1>
      <p className='type-catch'>{beauty.catchphrase}</p><p className='type-description'>{beauty.description}</p>
      <div className='type-grid'><span>✓ 自分の選び方がわかる</span><span>✓ 商品選びの軸ができる</span><span>✓ 診断に合わせて候補を比較</span><span>✓ 結果を友達とシェア</span></div>
      <div className='share-row'><ShareButton name={beauty.name}/><Link href='/select'>もう一度診断</Link></div>
    </section>
    <section className='recommendation'>
      <p className='diagnosis-kicker'>YOUR MATCH</p><h2>あなたに合う美容アイテム</h2>
      <p className='muted'>「{labels[concern]} / {labels[budget]} / {labels[priority]}」を軸に、情報確認済みの商品を適合度順に表示しています。</p>
      {ranked.length===0?<div className='card'><h3>現在、表示できる確認済み商品がありません</h3><p>商品データを追加・確認中です。</p></div>:
      ranked.slice(0,3).map((score,i)=>{const product=products.find(x=>x.id===score.productId);if(!product)return null;return <div className='product' key={product.id}>
        <div><span className='tag'>{i===0?'第1候補':`候補 ${i+1}`}</span><h3>{product.name}</h3>
        <p>{product.brand} / {product.priceYen?product.priceYen.toLocaleString()+'円':'価格不明'}</p><p>{score.reasons.join('・')}</p>
        {!product.affiliateConfirmed&&<small className='muted'>購入リンクは現在準備中</small>}</div>
        <Link className='cta' href={'/product/'+product.id}>詳細を見る →</Link>
      </div>})}
    </section>
  </main>;
}