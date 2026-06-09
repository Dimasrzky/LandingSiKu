import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SiKu - Manajemen Keuangan Sekolah Swasta Indonesia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logoData = await fetch('https://pakaisiku.id/image/LogoSiKuBaru.png').then(res => res.arrayBuffer())
  const logoBase64 = btoa(String.fromCharCode(...new Uint8Array(logoData)))

  return new ImageResponse(
    (
      <div
        style={{
          background: '#1A2C4E',
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
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${logoBase64}`}
            width={200}
            height={200}
            alt='PakaiSiku Logo'
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