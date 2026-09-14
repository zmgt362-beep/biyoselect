import Link from 'next/link';

export default function Home() {
  return <main className="container hero"><section><div className="eyebrow">BIYOSELECT</div><h1>美容商品、<br/>結局どれ？</h1><p>悩み・予算・優先順位から、あなたに合う候補を絞り込みます。</p><Link className="cta" href="/select">選び始める</Link></section></main>;
}
