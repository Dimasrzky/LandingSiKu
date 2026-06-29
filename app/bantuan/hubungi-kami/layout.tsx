import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Tim SiKu siap membantu Anda melalui berbagai platform. Pilih kanal yang paling nyaman untuk Anda.',
  robots: { index: false, follow: false },
}

export default function HubungiKamiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
