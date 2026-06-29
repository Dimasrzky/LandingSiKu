import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Temukan jawaban atas pertanyaan yang sering ditanyakan seputar SiKu.',
  robots: { index: false, follow: false },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
