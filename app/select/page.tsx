'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics/events';

const steps = [
  { key: 'concern', title: '一番近い悩みは？', options: ['毛穴', '乾燥', 'シミ・くすみ', '皮脂・テカリ'] },
  { key: 'budget', title: '予算は？', options: ['〜2,000円', '2,000〜5,000円', '5,000〜10,000円', '10,000円〜'] },
  { key: 'priority', title: '何を優先する？', options: ['効果・機能', 'コスパ', '成分'] },
];

const concernMap: Record<string, string> = { '毛穴': 'pores', '乾燥': 'dryness', 'シミ・くすみ': 'spots', '皮脂・テカリ': 'oiliness' };
const budgetMap: Record<string, string> = { '〜2,000円': 'low', '2,000〜5,000円': 'low', '5,000〜10,000円': 'mid', '10,000円〜': 'high' };
const priorityMap: Record<string, string> = { '効果・機能': 'fit', 'コスパ': 'value', '成分': 'ingredients' };

export default function SelectPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const current = steps[step];
  const choose = (value: string) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (step === 0) trackEvent('start_selector');
    if (step === steps.length - 1) {
      trackEvent('complete_selector');
      const qs = new URLSearchParams({
        concern: concernMap[next.concern],
        budget: budgetMap[next.budget],
        priority: priorityMap[next.priority],
      });
      router.push(`/result?${qs.toString()}`);
    } else setStep(step + 1);
  };
  return <main className="container result"><p className="muted">{step + 1} / {steps.length}</p><h1>{current.title}</h1><div className="options">{current.options.map(o => <button className="option" key={o} onClick={() => choose(o)}>{o}</button>)}</div></main>;
}
