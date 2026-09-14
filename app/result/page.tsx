'use client';
import Link from 'next/link';

const products=[
 {id:'sample-a',name:'サンプル美容液 A',price:'〜5,000円',tags:['毛穴','コスパ'],reason:'毛穴ケアとコスパを重視する人向けの開発用サンプルです。'},
 {id:'sample-b',name:'サンプル美容液 B',price:'5,000〜10,000円',tags:['乾燥','使いやすさ'],reason:'乾燥対策と使いやすさを重視する人向けの開発用サンプルです。'},
 {id:'sample-c',name:'サンプル美容液 C',price:'〜2,000円',tags:['シミ・くすみ','効果・機能'],reason:'機能性を優先したい人向けの開発用サンプルです。'}
];
export default function Result(){return <main className="container result"><p className="muted">あなたの条件から選定</p><h1>おすすめ候補</h1><section className="card"><h2>第一候補</h2><div className="product"><h3>{products[0].name}</h3><p>{products[0].reason}</p><p><span className="tag">{products[0].price}</span>{products[0].tags.map(t=><span className="tag" key={t}>{t}</span>)}</p><Link className="cta" href={`/product/${products[0].id}`}>詳しく見る</Link></div></section><h2>代替候補</h2>{products.slice(1).map(p=><div className="product" key={p.id}><h3>{p.name}</h3><p>{p.reason}</p><Link href={`/product/${p.id}`}>商品詳細 →</Link></div>)}</main>}
