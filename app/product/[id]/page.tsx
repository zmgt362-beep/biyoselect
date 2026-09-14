import Link from 'next/link';

const products:Record<string,{name:string;price:string;description:string}>= {
 'sample-a':{name:'サンプル美容液 A',price:'〜5,000円',description:'開発・UI検証用のサンプル商品です。実在商品の掲載時にはNotionの商品DBを正として置き換えます。'},
 'sample-b':{name:'サンプル美容液 B',price:'5,000〜10,000円',description:'開発・UI検証用のサンプル商品です。'},
 'sample-c':{name:'サンプル美容液 C',price:'〜2,000円',description:'開発・UI検証用のサンプル商品です。'}
};
export default async function Product({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=products[id];if(!p)return <main className="container result"><h1>商品が見つかりません</h1><Link href="/select">選び直す</Link></main>;return <main className="container result"><Link href="/result">← 結果に戻る</Link><div className="card"><p className="muted">商品詳細</p><h1>{p.name}</h1><p>{p.description}</p><p>価格帯：{p.price}</p><p className="muted">広告・アフィリエイトリンクは実案件確認後に設定します。</p></div></main>}
