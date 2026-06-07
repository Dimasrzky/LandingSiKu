import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import AudioPlayer from '../components/AudioPlayer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {    
    default: 'SiKu - Sistem Keuangan Sekolah Swasta Modern',
    template: '%s | SiKu',
  },
  description: 'Kelola SPP, tagihan, dan laporan keuangan sekolah swasta Indonesia dalam satu platform digital.',
  keywords: 'sistem keuangan sekolah, aplikasi SPP, bendahara sekolah, yayasan pendidikan Indonesia',

  verification: {
    google: 'AYljetFck46XJADB0wAOb8HTXVECATUkGrmylA51ncM',
  },

  openGraph: {
  title: 'SiKu - Sistem Keuangan Sekolah Swasta Modern',
  description: 'Kelola SPP, tagihan, dan laporan keuangan sekolah swasta dalam satu platform digital.',
  url: 'https://pakaisiku.id',
  siteName: 'SiKu',
  locale: 'id_ID',
  type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className={dmSans.variable}>
        {children}
        <AudioPlayer />
      </body>
    </html>
  )
}