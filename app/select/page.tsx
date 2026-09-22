'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {trackEvent} from '@/lib/analytics/events';

type Question = {
  category:string;
  title:string;
  a:string;
  b:string;
  axis:'concern'|'selection'|'care'|'budget';
  aCode:string;
  bCode:string;
};

const qs:Question[]=[
  {category:'肌悩み',title:'今いちばん気になるのは？',a:'毛穴・皮脂・テカリ',b:'乾燥・つっぱり・ハリ不足',axis:'concern',aCode:'P',bCode:'D'},
  {category:'肌悩み',title:'朝の肌状態に近いのは？',a:'皮脂やベタつきが気になる',b:'乾燥やつっぱりが気になる',axis:'concern',aCode:'P',bCode:'D'},
  {category:'肌悩み',title:'ケアで優先したいのは？',a:'気になる部分を集中的に整える',b:'肌全体のうるおいを整える',axis:'concern',aCode:'P',bCode:'D'},
  {category:'選び方',title:'商品ページで最初に見るのは？',a:'成分・機能・スペック',b:'口コミ・評判・使用感',axis:'selection',aCode:'A',bCode:'G'},
  {category:'選び方',title:'2つの商品で迷ったら？',a:'成分や特徴を比較して決める',b:'口コミや評価を比較して決める',axis:'selection',aCode:'A',bCode:'G'},
  {category:'選び方',title:'美容情報で信頼するのは？',a:'成分・データなどの客観情報',b:'実際に使った人のリアルな声',axis:'selection',aCode:'A',bCode:'G'},
  {category:'ケア方針',title:'美容ではどちらを優先したい？',a:'効果をしっかり実感したい',b:'肌への負担をできるだけ抑えたい',axis:'care',aCode:'S',bCode:'D'},
  {category:'ケア方針',title:'新しい成分を試すなら？',a:'多少攻めた成分でも効果を狙いたい',b:'まずは肌にやさしいものから試したい',axis:'care',aCode:'S',bCode:'D'},
  {category:'ケア方針',title:'理想の美容ケアは？',a:'短期間でも変化を感じたい',b:'無理なく長く続けて整えたい',axis:'care',aCode:'S',bCode:'D'},
  {category:'購入スタイル',title:'商品価格については？',a:'できるだけコスパを重視したい',b:'多少高くても納得できれば買う',axis:'budget',aCode:'R',bCode:'I'},
  {category:'購入スタイル',title:'セールで気になる商品を見つけたら？',a:'お得なら試してみたい',b:'安さより自分に合うかを優先したい',axis:'budget',aCode:'R',bCode:'I'},
  {category:'購入スタイル',title:'最終的に一番大事なのは？',a:'価格に対して十分な満足が得られること',b:'価格に関係なく自分に合うこと',axis:'budget',aCode:'R',bCode:'I'},
];

function majority(values:string[],a:string,b:string){
  const aCount=values.filter(v=>v===a).length;
  const bCount=values.filter(v=>v===b).length;
  return aCount>=bCount?a:b;
}

export default function SelectPage(){
  const router=useRouter();
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState<string[]>([]);
  const q=qs[step];

  const choose=(code:string)=>{
    const next=[...answers,code];
    if(step===0) trackEvent('start_selector');

    if(step===qs.length-1){
      const byAxis=(axis:Question['axis'])=>qs
        .map((question,index)=>question.axis===axis?next[index]:null)
        .filter((value):value is string=>value!==null);

      const concern=majority(byAxis('concern'),'P','D');
      const selection=majority(byAxis('selection'),'A','G');
      const care=majority(byAxis('care'),'S','D');
      const budgetCode=majority(byAxis('budget'),'R','I');
      const type=`${concern}-${selection}-${care}-${budgetCode}`;

      trackEvent('complete_selector',{type_code:type});
      const priority=selection==='A'?'ingredients':'value';
      const budget=budgetCode==='R'?'low':'mid';

      router.push('/result?'+new URLSearchParams({type,concern,priority,budget}).toString());
      return;
    }

    setAnswers(next);
    setStep(step+1);
  };

  return (
    <main className='diagnosis-shell'>
      <section className='diagnosis-card'>
        <div className='diagnosis-top'>
          <span>BIYOSELECT</span>
          <span>{step+1} / {qs.length}</span>
        </div>
        <div className='progress'><span style={{width:`${((step+1)/qs.length)*100}%`}} /></div>
        <p className='diagnosis-kicker'>{q.category}</p>
        <h1>{q.title}</h1>
        <p className='diagnosis-sub'>あなたの傾向をより正確に見るため、いくつかの角度から診断します。</p>
        <div className='binary-options'>
          <button onClick={()=>choose(q.aCode)}><b>A</b><span>{q.a}</span></button>
          <button onClick={()=>choose(q.bCode)}><b>B</b><span>{q.b}</span></button>
        </div>
        <p className='diagnosis-note'>全12問・約2分</p>
      </section>
    </main>
  );
}
