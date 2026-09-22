import Link from 'next/link';

export default function Home(){
  return (
    <main className='home'>
      <section className='home-card'>
        <p className='diagnosis-kicker'>BIYOSELECT / BEAUTY TYPE</p>
        <h1>あなたの美容タイプ、<br/><em>何型？</em></h1>
        <p>たった4問・約30秒。<br/>あなたの美容の選び方を16タイプに分類。</p>
        <Link className='cta big' href='/select'>診断してみる →</Link>
        <p className='home-note'>診断結果から、あなたに合う美容アイテムもチェック。</p>
        <nav className='legal-links' aria-label='Legal'>
          <Link href='/privacy'>Privacy Policy</Link>
          <span> | </span>
          <Link href='/terms'>Terms of Service</Link>
        </nav>
      </section>
    </main>
  );
}
