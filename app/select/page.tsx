'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {trackEvent} from '@/lib/analytics/events';
const qs=[
{title:'美容の悩み、どっちに近い？',a:'気になる悩みがハッキリしている',b:'肌全体の調子を整えたい',aCode:'P',bCode:'D'},
{title:'商品を選ぶときは？',a:'成分や機能を詳しく見る',b:'口コミや評判をまず見る',aCode:'A',bCode:'G'},
{title:'美容アイテムは？',a:'効果を優先して選びたい',b:'肌へのやさしさを優先したい',aCode:'S',bCode:'D'},
{title:'買い物では？',a:'価格をかなり重視する',b:'価格より納得感を重視する',aCode:'R',bCode:'I'}
];
export default function SelectPage(){
const router=useRouter();const [step,setStep]=useState(0);const [answers,setAnswers]=useState<string[]>([]);const q=qs[step];
const choose=(code:string)=>{const next=[...answers,code];if(step===0)trackEvent('start_selector');if(step===qs.length-1){const type=next.join('-');trackEvent('complete_selector',{type_code:type});const concern=next[0]==='P'?'pores':'dryness';const priority=next[1]==='A'?'ingredients':'value';const budget=next[3]==='R'?'low':'mid';router.push('/result?'+new URLSearchParams({type,concern,priority,budget}).toString());}else{setAnswers(next);setStep(step+1);}};
return <main className='diagnosis-shell'><section className='diagnosis-card'><div className='diagnosis-top'><span>BIYOSELECT</span><span>{step+1} / {qs.length}</span></div><div className='progress'><span style={{width:((step+1)/qs.length*100)+'%'}}/></div><p className='diagnosis-kicker'>BEAUTY TYPE診断</p><h1>{q.title}</h1><p className='diagnosis-sub'>直感で近いほうを選んでください。</p><div className='binary-options'><button onClick={()=>choose(q.aCode)}><b>A</b><span>{q.a}</span></button><button onClick={()=>choose(q.bCode)}><b>B</b><span>{q.b}</span></button></div><p className='diagnosis-note'>全4問・約30秒</p></section></main>;
}