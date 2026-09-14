import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BIYOSELECT | 美容商品の「結局どれ？」を選ぶ',
  description: '悩み・予算・優先順位から美容商品を比較して選べるBIYOSELECT。',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
