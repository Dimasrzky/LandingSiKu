import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi — SiKu',
  description: 'Kebijakan privasi SiKu — cara kami mengumpulkan, menggunakan, dan melindungi data Anda.',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
