'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  { key: 'concern', title: '一番近い悩みは？', options: ['毛穴', '乾燥', 'シミ・くすみ', 'ニキビ'] },
  { key: 'budget', title: '予算は？', options: ['〜2,000円', '2,000〜5,000円', '5,000〜10,000円', '10,000円〜'] },
  { key: 'priority', title: '何を優先する？', options: ['効果・機能', 'コスパ', '使いやすさ'] },
];

export default function SelectPage() {
  const router = useRouter(); const [step, setStep] = useState(0); const [answers, setAnswers] = useState<Record<string,string>>({});
  const current = steps[step];
  const choose = (value:string) => { const next={...answers,[current.key]:value}; setAnswers(next); if(step===steps.length-1){sessionStorage.setItem('biyoselect_answers',JSON.stringify(next)); router.push('/result')} else setStep(step+1); };
  return <main className="container result"><p className="muted">{step+1} / {steps.length}</p><h1>{current.title}</h1><div className="options">{current.options.map(o=><button className="option" key={o} onClick={()=>choose(o)}>{o}</button>)}</div></main>;
}
