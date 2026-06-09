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
    default: 'PakaiSiku - Sistem Keuangan Sekolah Swasta Modern',
    template: '%s | PakaiSiku',
  },
  description: 'Kelola SPP, tagihan, dan laporan keuangan sekolah swasta Indonesia dalam satu platform digital.',
  keywords: 'sistem keuangan sekolah, aplikasi SPP, bendahara sekolah, yayasan pendidikan Indonesia',
  metadataBase: new URL('https://pakaisiku.id'),

  verification: {
    google: 'AYljetFck46XJADB0wAOb8HTXVECATUkGrmylA51ncM',
  },

  openGraph: {
    title: 'PakaiSiku - Sistem Keuangan Sekolah Swasta Modern',
    description: 'Kelola SPP, tagihan, dan laporan keuangan sekolah swasta dalam satu platform digital.',
    url: 'https://pakaisiku.id',
    siteName: 'PakaiSiku',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'PakaiSiku - Sistem Keuangan Sekolah Swasta Modern',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PakaiSiku - Sistem Keuangan Sekolah Swasta Modern',
    description: 'Kelola SPP, tagihan, dan laporan keuangan sekolah swasta dalam satu platform digital.',
    images: ['/opengraph-image'],
  },

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PakaiSiku',
  url: 'https://pakaisiku.id',
  logo: 'https://pakaisiku.id/image/LogoSiKuBaru.png',
  description: 'Sistem manajemen keuangan sekolah swasta Indonesia — SPP otomatis, notifikasi WhatsApp, laporan instan.',
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={dmSans.variable}>
        {children}
        <AudioPlayer />
      </body>
    </html>
  )
}