'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics/events';

const steps = [
  { key: 'concern', title: '一番解決したい悩みは？', options: ['毛穴', '乾燥', 'シミ・くすみ', '皮脂・テカリ'] },
  { key: 'skinType', title: '自分の肌質に一番近いのは？', options: ['脂性肌・テカりやすい', '乾燥しやすい', '混合肌', 'よく分からない'] },
  { key: 'symptom', title: '特に気になる状態は？', options: ['黒ずみ・詰まり', 'カサつき・つっぱり', 'くすみ・色ムラ', 'ベタつき・テカり'] },
  { key: 'budget', title: '1商品にかけられる予算は？', options: ['〜2,000円', '2,000〜5,000円', '5,000〜10,000円', '10,000円〜'] },
  { key: 'priority', title: '商品選びで一番重視するのは？', options: ['効果・機能', 'コスパ', '成分'] },
  { key: 'routine', title: '使い続けやすさはどれくらい重視する？', options: ['かなり重視', 'ある程度重視', '価格や効果を優先'] },
];

const concernMap: Record<string, string> = { '毛穴': 'pores', '乾燥': 'dryness', 'シミ・くすみ': 'spots', '皮脂・テカリ': 'oiliness' };
const symptomConcernMap: Record<string, string> = { '黒ずみ・詰まり': 'pores', 'カサつき・つっぱり': 'dryness', 'くすみ・色ムラ': 'spots', 'ベタつき・テカり': 'oiliness' };
const budgetMap: Record<string, string> = { '〜2,000円': 'low', '2,000〜5,000円': 'low', '5,000〜10,000円': 'mid', '10,000円〜': 'high' };
const priorityMap: Record<string, string> = { '効果・機能': 'fit', 'コスパ': 'value', '成分': 'ingredients' };

export default function SelectPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const current = steps[step];

  const choose = (value: string) => {
    const next = { ...answers, [current.key]: value };
    setAnswers(next);
    if (step === 0) trackEvent('start_selector');

    if (step === steps.length - 1) {
      trackEvent('complete_selector');
      const concern = symptomConcernMap[next.symptom] ?? concernMap[next.concern];
      const qs = new URLSearchParams({
        concern,
        budget: budgetMap[next.budget],
        priority: priorityMap[next.priority],
      });
      router.push(`/result?${qs.toString()}`);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <main className="container result">
      <p className="muted">肌悩み診断　{step + 1} / {steps.length}</p>
      <h1>{current.title}</h1>
      <p className="muted">回答内容をもとに、条件に合う商品を絞り込みます。</p>
      <div className="options">
        {current.options.map((option) => (
          <button className="option" key={option} onClick={() => choose(option)}>{option}</button>
        ))}
      </div>
    </main>
  );
}
