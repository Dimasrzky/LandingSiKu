'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '../bantuan.css'

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
  </svg>
)

const InstagramIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' />
  </svg>
)

const EmailIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <rect x='2' y='4' width='20' height='16' rx='2' />
    <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
  </svg>
)

const contacts = [
  {
    id: 'wa',
    platform: 'WhatsApp',
    handle: '+62 822-6040-0408',
    desc: 'Chat langsung dengan tim kami. Respon tercepat di jam operasional.',
    href: 'https://wa.me/6282260400408',
    btnLabel: 'Mulai Chat',
    icon: <WhatsAppIcon size={28} />,
    iconColor: '#25D366',
  },
  {
    id: 'ig',
    platform: 'Instagram',
    handle: '@pakaisiku',
    desc: 'Ikuti kami untuk update fitur, tips, dan info terbaru dari SiKu.',
    href: 'https://instagram.com/pakaisiku',
    btnLabel: 'Buka Instagram',
    icon: <InstagramIcon size={28} />,
    iconColor: '#E1306C',
  },
  {
    id: 'email',
    platform: 'Email',
    handle: 'equanusa@gmail.com',
    desc: 'Untuk pertanyaan detail atau laporan teknis yang memerlukan tindak lanjut.',
    href: 'mailto:equanusa@gmail.com',
    btnLabel: 'Kirim Email',
    icon: <EmailIcon size={28} />,
    iconColor: '#2A5499',
  },
]

export default function HubungiKamiPage() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-bn-animate]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main className='bn-main'>

        {/* ─── HEADER ─────────────────────────────────── */}
        <section className='bn-header'>
          <div className='bn-header-inner'>
            <div className='bn-header-text'>
              <div className='bn-label' data-bn-animate style={{ '--delay': '0s' } as React.CSSProperties}>
                Bantuan
              </div>
              <h1 className='bn-h1' data-bn-animate style={{ '--delay': '0.1s' } as React.CSSProperties}>
                Hubungi Kami
              </h1>
              <p className='bn-desc' data-bn-animate style={{ '--delay': '0.2s' } as React.CSSProperties}>
                Tim SiKu siap membantu Anda melalui berbagai platform.<br />
                Pilih kanal yang paling nyaman untuk Anda.
              </p>
            </div>
            <Image
              src='/image/Support.png'
              alt=''
              width={240}
              height={240}
              className='bn-header-deco bn-header-img-enter'
              style={{ objectFit: 'contain' }}
              aria-hidden='true'
              priority
            />
          </div>
        </section>

        {/* ─── CONTACT CARDS ──────────────────────────── */}
        <section className='hk-section'>
          <div className='hk-section-inner'>

            <div className='hk-cards'>
              {contacts.map((c, i) => (
                <div
                  key={c.id}
                  className={`hk-card hk-card--${c.id}`}
                  data-bn-animate
                  style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
                >
                  <div className='hk-card-icon' style={{ color: c.iconColor }}>
                    {c.icon}
                  </div>
                  <div className='hk-card-body'>
                    <div className='hk-card-platform'>{c.platform}</div>
                    <div className='hk-card-handle'>{c.handle}</div>
                    <div className='hk-card-desc'>{c.desc}</div>
                  </div>
                  <a
                    href={c.href}
                    className='hk-card-btn'
                    target={c.id !== 'email' ? '_blank' : undefined}
                    rel={c.id !== 'email' ? 'noopener noreferrer' : undefined}
                  >
                    {c.btnLabel}
                  </a>
                </div>
              ))}
            </div>

            {/* Jam Operasional */}
            <div
              className='hk-hours-card'
              data-bn-animate
              style={{ '--delay': '0.3s' } as React.CSSProperties}
            >
              <div className='hk-hours-icon'>
                <Clock size={22} strokeWidth={2} />
              </div>
              <div className='hk-hours-content'>
                <h3>Jam Operasional Tim SiKu</h3>
                <p>
                  <strong>Senin – Sabtu, 09.00 – 18.00 WIB</strong> &mdash; respon dalam kurang dari 1 jam.
                  Di luar jam operasional atau hari libur, pesan Anda tetap kami terima dan akan
                  ditindaklanjuti pada hari kerja berikutnya.
                </p>
              </div>
            </div>

            {/* Alamat & Map */}
            <div
              className='hk-address-card'
              data-bn-animate
              style={{ '--delay': '0.4s' } as React.CSSProperties}
            >
              <div className='hk-hours-icon'>
                <MapPin size={22} strokeWidth={2} />
              </div>
              <div className='hk-address-content'>
                <h3>Alamat Kantor</h3>
                <address className='hk-address-text'>
                  KM 12, Jl. Kaliurang Jl. Candi 3, RT.01/RW.05, Candi,
                  Sardonoharjo, Kec. Ngaglik, Kabupaten Sleman,
                  Daerah Istimewa Yogyakarta 55581
                </address>
                <div className='hk-map-wrap'>
                  <iframe
                    title='Lokasi Kantor Equanusa'
                    src='https://www.openstreetmap.org/export/embed.html?bbox=110.401%2C-7.716%2C110.421%2C-7.696&layer=mapnik&marker=-7.705972%2C110.411341'
                    width='100%'
                    height='260'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                  />
                </div>
              </div>
            </div>

            {/* CTA ke FAQ */}
            <div style={{ textAlign: 'center', paddingTop: '8px' }}>
              <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '12px' }}>
                Mungkin pertanyaan Anda sudah terjawab di halaman FAQ kami.
              </p>
              <Link
                href='/bantuan/faq'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#2A5499',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  border: '1.5px solid #A4CEFF',
                  borderRadius: '10px',
                  transition: 'background 0.15s',
                }}
              >
                Lihat FAQ
              </Link>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
