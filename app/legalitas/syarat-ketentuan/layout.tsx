import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan — SiKu',
  description: 'Syarat dan ketentuan penggunaan layanan SiKu, sistem manajemen keuangan sekolah.',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
