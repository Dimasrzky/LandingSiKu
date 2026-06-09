import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/daftar', '/harga', '/fitur/multi-jenjang', '/fitur/notifikasi-whatsapp', '/fitur/manajemen-tagihan', '/fitur/laporan-dashboard', '/fitur/pembayaran-digital', '/fitur/manajemen-siswa', '/carakerja', '/api/'],
      },
    ],
    sitemap: 'https://pakaisiku.id/sitemap.xml',
  }
}
