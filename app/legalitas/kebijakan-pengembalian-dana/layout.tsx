import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Pengembalian Dana — SiKu',
  description: 'Ketentuan pengembalian dana atas biaya langganan dan pembayaran tagihan sekolah di SiKu.',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
