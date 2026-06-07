import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SiKu - Manajemen Keuangan Sekolah Swasta Indonesia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Ambil logo dari public folder
  const logoData = await fetch(
    new URL('/logo.png', 'https://pakaisiku.id')
  ).then(res => res.arrayBuffer())

  const logoBase64 = btoa(
    String.fromCharCode(...new Uint8Array(logoData))
  )

  // Ambil icon.png dari folder app
  const iconData = await fetch(
    new URL('./icon.png', import.meta.url)
  ).then(res => res.arrayBuffer())

  const iconBase64 = btoa(
    String.fromCharCode(...new Uint8Array(iconData))
  )

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #064E3B 0%, #059669 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Logo dan Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${logoBase64}`}
            width={180}
            height={180}
            alt='SiKu Logo'
            style={{ objectFit: 'contain' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${iconBase64}`}
            width={80}
            height={80}
            alt='SiKu Icon'
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 40,
          fontWeight: 800,
          color: 'white',
          textAlign: 'center',
          marginBottom: 16,
          display: 'flex',
        }}>
          Manajemen Keuangan Sekolah Swasta Modern
        </div>

        {/* Features */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: 40 }}>
          {['✅ SPP Otomatis', '✅ Notif WhatsApp', '✅ Laporan Instan'].map((f) => (
            <div key={f} style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '10px 20px',
              fontSize: 20,
              color: 'white',
              display: 'flex',
            }}>
              {f}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          fontSize: 22,
          color: 'rgba(255,255,255,0.5)',
          display: 'flex',
        }}>
          pakaisiku.id
        </div>
      </div>
    ),
    { ...size }
  )
}