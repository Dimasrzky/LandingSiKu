'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './harga.css'

type Plan = {
  name: string
  dot: 'green' | 'amber' | 'green-muted'
  tagline: string
  maxSiswa: string
  price: string
  period: string
  popular: boolean
  comingSoon?: boolean
  href: string
  features: string[]
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    dot: 'green',
    tagline: 'Untuk sekolah kecil yang baru mulai digitalisasi pencatatan keuangan.',
    maxSiswa: 'Maks. 200 siswa',
    price: 'Rp 550.000',
    period: 'Per sekolah / bulan',
    popular: false,
    href: '/daftar',
    features: [
      'Dashboard keuangan real-time',
      'Manajemen SPP & tagihan',
      'Manajemen siswa & import Excel',
      '200 pesan WhatsApp / bulan',
      'Laporan PDF & Excel',
    ],
  },
  {
    name: 'Sekolah',
    dot: 'amber',
    tagline: 'Untuk sekolah menengah yang butuh otomasi pembayaran dan kepatuhan.',
    maxSiswa: 'Maks. 600 siswa',
    price: 'Rp 1.200.000',
    period: 'Per sekolah / bulan',
    popular: true,
    href: '/daftar',
    features: [
      'Semua fitur Starter',
      '800 pesan WhatsApp / bulan',
      'Payment gateway',
      'Rekonsiliasi bank otomatis',
      'Laporan BOS otomatis',
    ],
  },
  {
    name: 'Yayasan',
    dot: 'green-muted',
    tagline: 'Untuk yayasan multi-unit yang butuh konsolidasi lintas jenjang sekolah.',
    maxSiswa: 'Maks. 200 siswa',
    price: 'Rp 3.100.000',
    period: 'Per sekolah / bulan',
    popular: false,
    comingSoon: true,
    href: '#',
    features: [
      'Semua fitur Sekolah',
      '2.500 pesan WhatsApp / bulan',
      'Kelola banyak unit sekolah',
      'Dashboard konsolidasi yayasan',
      'Dedicated onboarding & priority support',
    ],
  },
]


function GachaNumber({ target, from, duration = 1400, format }: {
  target: number; from: number; duration?: number; format: (n: number) => string
}) {
  const [display, setDisplay] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      observer.disconnect()
      const startTime = performance.now()
      let raf: number
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)
        if (progress < 1) {
          const settle = Math.max(0, (progress - 0.55) / 0.45)
          const base = from + (target - from) * settle
          const noise = (1 - settle) * Math.abs(target - from) * (Math.random() - 0.5)
          setDisplay(Math.round(Math.max(0, base + noise)))
          raf = requestAnimationFrame(tick)
        } else {
          setDisplay(target)
        }
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, from, duration])
  return <span ref={ref}>{format(display)}</span>
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke='#00A46A' strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const LockIcon = () => (
  <Image src="/icons/IconsLock.png" alt="Lock" width={52} height={52} />
)

export default function HargaPage() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-animate]')
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

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.cta-anim')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const delay = parseInt(el.dataset.delay ?? '0', 10)
        setTimeout(() => el.classList.add('visible'), delay)
        observer.unobserve(el)
      })
    }, { threshold: 0.12 })
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      <main className="ph-main">

        {/* ─── HEADER ───────────────────────────────────── */}
        <section className="ph-header">
          <div className="ph-header-inner">
            <div className="ph-header-text">
              <div className="ph-label" data-animate style={{ '--delay': '0s' } as React.CSSProperties}>Harga &amp; Paket</div>
              <h1 className="ph-h1" data-animate style={{ '--delay': '0.12s' } as React.CSSProperties}>
                Pilih paket yang sesuai<br />
                dengan skala sekolah Anda
              </h1>
              <p className="ph-desc" data-animate style={{ '--delay': '0.24s' } as React.CSSProperties}>
                Semua paket mencakup onboarding dan dukungan teknis dari tim kami.
              </p>
              <p className="ph-desc" data-animate style={{ '--delay': '0.34s' } as React.CSSProperties}>
                Mulai dari paket mana pun dan upgrade kapan saja.
              </p>
            </div>
            <div className="ph-header-deco ph-header-deco--anim" aria-hidden="true" />
          </div>
        </section>

        {/* ─── PRICING CARDS ────────────────────────────── */}
        <section className="ph-cards-section">
          <div className="ph-cards">
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                data-animate
                style={{ '--delay': `${i * 0.13}s` } as React.CSSProperties}
                className="ph-card-outer"
              >
                <div
                  className={[
                    'ph-card',
                    plan.popular ? 'ph-card--popular' : '',
                    plan.comingSoon ? 'ph-card--locked' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {/* Siswa badge */}
                  <div className={`ph-siswa-badge${plan.popular ? ' ph-siswa-badge--dark' : ''}`}>
                    <Image src="/icons/IconUsers.png" alt="" width={20} height={20} />
                    {plan.maxSiswa}
                  </div>

                  {/* Plan name */}
                  <div className="ph-plan-row">
                    <span className={`ph-plan-dot ph-plan-dot--${plan.dot}`} />
                    <span className="ph-plan-name">{plan.name}</span>
                  </div>
                  <p className="ph-plan-tagline">{plan.tagline}</p>

                  {/* Price */}
                  <div className="ph-price">{plan.price}</div>
                  <div className="ph-period">{plan.period}</div>

                  <div className="ph-divider" />

                  {/* Features */}
                  <ul className="ph-features">
                    {plan.features.map((f) => (
                      <li key={f}>
                        <CheckIcon />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {plan.comingSoon ? (
                    <button disabled className="ph-cta ph-cta--locked">
                      Mulai Berlangganan
                    </button>
                  ) : (
                    <Link
                      href={plan.href}
                      className={`ph-cta${plan.popular ? ' ph-cta--popular' : ''}`}
                    >
                      Mulai Berlangganan
                    </Link>
                  )}

                  {/* Lock overlay */}
                  {plan.comingSoon && (
                    <div className="ph-lock-overlay">
                      <LockIcon />
                      <span>Segera Hadir</span>
                    </div>
                  )}
                </div>

                {plan.popular && (
                  <div className="ph-popular-footer">Paling Populer</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA HARGA ────────────────────────────── */}
        <section className="cta-harga-section" style={{ position: 'relative', overflow: 'hidden', background: '#CEE1F8' }}>
          <Image
            src="/image/StarHero.png"
            alt="Star"
            width={200}
            height={200}
            className="ph-star-hero"
            style={{ position: 'absolute', top: 20, left: 70, objectFit: 'contain', pointerEvents: 'none', zIndex: 0 }}
          />

          <div className="cta-harga-inner">
            <div className="cta-harga-header">
              <h2 className="cta-harga-title cta-anim" data-delay="120">1 Bulan Gratis<br />Tanpa Syarat Tersembunyi</h2>
              <p className="cta-harga-desc cta-anim" data-delay="240">
                Kami tahu sekolah perlu membuktikan manfaat sebelum berkomitmen.
                Karena itu kami tawarkan akses penuh bukan versi terbatas <br />selama 1 bulan pertama.
              </p>
            </div>

            <div className="cta-card-wrap cta-anim" data-delay="400">
              <div className="cta-card">
                <span className="cta-card-topbadge">Terbatas Batch Pertama</span>

                <div className="cta-card-price">
                  <span className="cta-price-num">
                    Rp <GachaNumber
                      target={0}
                      from={200000}
                      duration={1000}
                      format={(n) => n.toLocaleString('id-ID')}
                    />
                  </span>
                </div>

                <div className="cta-card-sub">
                  <span>Selama 1 bulan pertama</span>
                  <span className="cta-sub-dot" />
                  <span>Tidak perlu kartu kredit</span>
                </div>

                <div className="cta-features">
                  {[
                    ['Semua fitur lengkap',           'Tidak ada batas siswa'],
                    ['Notifikasi WhatsApp otomatis',   'Laporan & Dashboard'],
                    ['Onboarding oleh tim kami',       'Dukungan teknis'],
                    ['Export Excel & PDF',             'Multi-jenjang sekolah'],
                  ].map((row, i) => (
                    <div className="cta-feat-row" key={i}>
                      {row.map((item) => (
                        <div className="cta-feat-item" key={item}>
                          <svg className="cta-feat-check" width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <Link href="/daftar" className="cta-card-btn">
                  Jadwalkan Demo Gratis
                </Link>
                <p className="cta-card-note">Setelah 1 bulan, pilih lanjut atau berhenti – tanpa paksaan</p>
              </div>

            </div>
          </div>

          <div className="cta-info-box">
            <span className="cta-info-icon">
              <Image src="/icons/IconGuard.png" alt="Guard" width={60} height={60} />
            </span>
            <p className="cta-info-text">
              Tim kami siap membantu. Setelah mendaftar, kami menghubungi kamu
              dalam 1×24 jam untuk menjadwalkan sesi demo dan proses onboarding.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
