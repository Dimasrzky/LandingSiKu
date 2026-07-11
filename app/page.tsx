'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const ArrowCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#F7DD7D" />
    <line x1="7" y1="12" x2="16" y2="12" stroke="#1A3557" strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="12.5 8 17 12 12.5 16" stroke="#1A3557" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z"
      fill="#fff"
    />
    <path
      d="M17.34 14.24c-.28-.14-1.64-.81-1.9-.9-.25-.09-.44-.14-.62.14-.19.28-.72.9-.88 1.08-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.5-.07-.14-.62-1.5-.86-2.05-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.53-.01-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43 0 1.43 1.03 2.82 1.18 3.01.14.19 2.03 3.1 4.92 4.35.69.3 1.22.48 1.64.61.69.22 1.32.19 1.81.11.55-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33Z"
      fill="#25D366"
    />
  </svg>
)
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useTracking } from '@/hooks/useTracking'

function GachaNumber({ target, from, duration = 1400, format }: {
  target: number
  from: number
  duration?: number
  format: (n: number) => string
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

function TypewriterLoop({ text, typingSpeed = 20, deletingSpeed = 60, holdFull = 1400, holdEmpty = 400 }: {
  text: string
  typingSpeed?: number
  deletingSpeed?: number
  holdFull?: number
  holdEmpty?: number
}) {
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const delay = !deleting && display === text
      ? holdFull
      : deleting && display === ''
        ? holdEmpty
        : deleting ? deletingSpeed : typingSpeed

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (display.length < text.length) {
          setDisplay(text.slice(0, display.length + 1))
        } else {
          setDeleting(true)
        }
      } else {
        if (display.length > 0) {
          setDisplay(display.slice(0, -1))
        } else {
          setDeleting(false)
        }
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [display, deleting, text, typingSpeed, deletingSpeed, holdFull, holdEmpty])

  return (
    <>
      {display}
      <span className="typewriter-cursor" aria-hidden>|</span>
    </>
  )
}

const tickerItems = [
  'Kurangi rekap manual',
  'Laporan akurat siap audit',
  'Selesai dalam 3 langkah',
]

const CALC_STUDENT_MIN = 50
const CALC_STUDENT_MAX = 1000
const CALC_STUDENT_STEP = 50

// Rasio per siswa, dikalibrasi dari acuan 200 siswa = 10 jam, 30 kali, 40 pesan
const CALC_RATE_JAM_REKAP = 10 / 200
const CALC_RATE_RISIKO_CATAT = 30 / 200
const CALC_RATE_PESAN_WA = 40 / 200

const testimonials = [
  {
    name: 'Sri Rahayu, S.Pd',
    role: 'Bendahara · SDIT Al-Hikmah, Yogyakarta',
    initials: 'SR',
    color: '#1A3557',
    stars: 5,
    quote: 'Dulu rekap SPP 3 jenjang bisa sampai 2 hari. Sekarang tinggal buka dashboard, semua sudah tersedia. WA ke orang tua juga otomatis, saya tidak perlu ketik satu-satu lagi.',
  },
  {
    name: 'Bambang Wicaksono',
    role: 'Bendahara Yayasan · Yayasan Pendidikan Nusantara',
    initials: 'BW',
    color: '#059669',
    stars: 5,
    quote: 'Yayasan kami punya 3 sekolah. Sebelumnya laporan keuangan masing-masing tidak bisa dibandingkan. Sekarang bisa lihat konsolidasi semua sekolah dalam satu layar.',
  },
  {
    name: 'Dewi Nuraini',
    role: 'Bendahara · TK & SD Islam Terpadu Ceria',
    initials: 'DN',
    color: '#D97706',
    stars: 4,
    quote: 'Awalnya saya pikir sulit dipakai karena tidak biasa dengan aplikasi. Ternyata mudah sekali. Support-nya juga cepat respons. Orang tua senang bisa bayar SPP lewat transfer langsung.',
  },
  {
    name: 'Sari Rahayu',
    role: 'Bendahara',
    avatar: '/assets/UserTesti.png',
    stars: 4,
    quote:'Sebelum pakai SiKu, saya bisa menghabiskan dua hari penuh hanya untuk rekap pembayaran SPP. Sekarang laporan sudah tersedia otomatis, saya tinggal download dan langsung lapor ke kepala sekolah'
  }
]

export default function HomePage() {
  const [heroReady, setHeroReady] = useState(false)
  const [calcStudents, setCalcStudents] = useState(200)
  const [calcStudentsInput, setCalcStudentsInput] = useState('200')
  const [testiActive, setTestiActive] = useState(0)
  const { lat, lng, granted, requestLocation } = useGeolocation()
  const { trackCTA } = useTracking()

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    requestLocation()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!granted || lat === null || lng === null) return
    fetch('/api/lokasi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng }),
    })
  }, [granted, lat, lng])

  const adjustCalcStudents = (delta: number) => {
    const next = Math.min(CALC_STUDENT_MAX, Math.max(CALC_STUDENT_MIN, calcStudents + delta))
    setCalcStudents(next)
    setCalcStudentsInput(String(next))
  }

  const commitCalcStudentsInput = () => {
    const parsed = parseInt(calcStudentsInput, 10)
    const clamped = Number.isNaN(parsed)
      ? calcStudents
      : Math.min(CALC_STUDENT_MAX, Math.max(CALC_STUDENT_MIN, parsed))
    setCalcStudents(clamped)
    setCalcStudentsInput(String(clamped))
  }


  useEffect(() => {
    const target = sessionStorage.getItem('scrollTo')
    if (target) {
      sessionStorage.removeItem('scrollTo')
      const el = document.getElementById(target)
      if (el) {
        const offset = 72
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll(
      '.pain-card, .feat-card, .testi-card, .step'
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '.masalah-card--light, .masalah-card--dark, .masalah-deco, .kondisi-anim-left, .kondisi-anim-right'
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                el.classList.add('visible')
              })
            })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08 }
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.kcard-anim'))
    const seen = new Set<HTMLElement>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        if (seen.has(el)) return
        seen.add(el)
        observer.unobserve(el)
        const idx = cards.indexOf(el)
        const entranceDelay = idx * 160
        setTimeout(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.classList.add('visible')
              setTimeout(() => {
                el.style.animationDelay = `${idx * 0.3}s`
                el.classList.add('floating')
              }, 650)
            })
          })
        }, entranceDelay)
      })
    }, { threshold: 0.15 })
    cards.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Apa itu SiKu — badge/title/desc fade-in
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.apasiku-anim')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          const delay = parseInt(el.dataset.delay ?? '0', 10)
          setTimeout(() => el.classList.add('visible'), delay)
        }
      })
    }, { threshold: 0.15 })
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Apa itu SiKu — star enter lalu rock
  useEffect(() => {
    const star = document.querySelector<HTMLElement>('.apasiku-star')
    if (!star) return
    let done = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done) return
      done = true
      observer.disconnect()
      star.classList.add('star-entering')
      setTimeout(() => {
        star.classList.remove('star-entering')
        star.classList.add('star-rocking')
      }, 700)
    }, { threshold: 0.3 })
    observer.observe(star)
    return () => observer.disconnect()
  }, [])

  // Apa itu SiKu — feature cards entrance (staggered, triggers when section in view)
  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.apasiku-fcards')
    if (!container) return
    const cards = Array.from(container.querySelectorAll<HTMLElement>('.apasiku-fcard-anim'))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 400)
        })
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.2 })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Apa itu SiKu — dashboard slide-in from right
  useEffect(() => {
    const dash = document.querySelector<HTMLElement>('.apasiku-dash-anim')
    if (!dash) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      setTimeout(() => dash.classList.add('visible'), 200)
    }, { threshold: 0.15 })
    observer.observe(dash)
    return () => observer.disconnect()
  }, [])

  // CTA Harga — staggered entrance
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

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.testi-anim-left, .testi-anim-right')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('testi-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.15 })
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Trigger circle animation on section
    const section = document.querySelector('.closing-section')
    const sectionObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('closing-visible')
      sectionObserver.disconnect()
    }, { threshold: 0.15 })
    if (section) sectionObserver.observe(section)

    // Staggered content animations
    const els = document.querySelectorAll<HTMLElement>('.closing-anim')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        const delay = parseInt(el.dataset.delay ?? '0', 10)
        setTimeout(() => el.classList.add('closing-visible'), delay)
        observer.unobserve(el)
      })
    }, { threshold: 0.15 })
    els.forEach((el) => observer.observe(el))

    return () => { sectionObserver.disconnect(); observer.disconnect() }
  }, [])

  return (
    <>
      <Navbar />

      {/* ─── HERO ─────────────────────────────────── */}
      <section id="beranda" className={`hero${heroReady ? ' hero--ready' : ''}`}>
        <div className="hero-inner">

          {/* Konten kiri */}
          <div className="hero-content">
            <div className="badge-tag">
              Platform Keuangan Sekolah
            </div>

            <h1>
              <span className="hero-h1-primary">Kelola Pembayaran Siswa</span>
              <br />
              <span className="hero-h1-accent">Tanpa Ribet, Tanpa Salah Catat</span>
            </h1>

            <p className="hero-desc">
              SiKu menggantikan tumpukan Excel, buku kas, dan chat WhatsApp dengan satu platform terpadu. Mulai dari tagihan SPP, verifikasi pembayaran, hingga laporan keuangan, semua berjalan otomatis.
            </p>

            <div className="hero-cta">
              <Link href="/carakerja" className="btn-hero-outline" onClick={() => trackCTA('Cara Kerja', '/carakerja')}>
                Cara Kerja
              </Link>
              <Link href="/daftar" className="btn-primary" onClick={() => trackCTA('Coba Gratis Sekarang (Hero)', '/daftar')}>
                Coba Gratis Sekarang <ArrowCircleIcon />
              </Link>
            </div>
          </div>

          {/* Kalkulator kanan */}
          <div className="hero-calc-wrap">
            <div className="hero-calc-card">
              <div className="hero-calc-float hero-calc-float--tr">
                <div className="hero-calc-float-icon hero-calc-float-icon--doc">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" stroke="#1A3557" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M14 2v5h5M8 13h8M8 17h5" stroke="#1A3557" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="hero-calc-float-text">
                  <span className="hero-calc-float-tag">Otomatis</span>
                  <strong>Laporan rapi</strong>
                  <span>Siap audit</span>
                </div>
              </div>

              <div className="hero-calc-header">
                <div className="hero-calc-header-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="2" width="16" height="20" rx="2" stroke="#1A3557" strokeWidth="1.6" />
                    <path d="M8 6h8M7 11h2M11 11h2M15 11h2M7 15h2M11 15h2M15 15h2M7 19h2M11 19h2" stroke="#1A3557" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="hero-calc-title">Kalkulator Waktu</h3>
              </div>
              <p className="hero-calc-subtitle">Seberapa berat beban bendahara?</p>

              <div className="hero-calc-stepper">
                <button
                  type="button"
                  className="hero-calc-stepper-btn"
                  onClick={() => adjustCalcStudents(-CALC_STUDENT_STEP)}
                  aria-label="Kurangi jumlah siswa"
                >
                  &minus;
                </button>
                <div className="hero-calc-stepper-value">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="hero-calc-stepper-input"
                    value={calcStudentsInput}
                    onChange={(e) => setCalcStudentsInput(e.target.value.replace(/[^0-9]/g, ''))}
                    onBlur={commitCalcStudentsInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.currentTarget.blur()
                    }}
                    aria-label="Jumlah siswa"
                  />
                  <span className="hero-calc-stepper-unit">Siswa</span>
                </div>
                <button
                  type="button"
                  className="hero-calc-stepper-btn"
                  onClick={() => adjustCalcStudents(CALC_STUDENT_STEP)}
                  aria-label="Tambah jumlah siswa"
                >
                  +
                </button>
              </div>

              <div className="hero-calc-metrics">
                <div className="hero-calc-metric">
                  <div className="hero-calc-metric-left">
                    <div className="hero-calc-metric-icon hero-calc-metric-icon--blue">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#1A3557" strokeWidth="1.6" />
                        <path d="M12 7v5l3.5 2" stroke="#1A3557" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="hero-calc-metric-info">
                      <span className="hero-calc-metric-label">Waktu rekap manual</span>
                      <span className="hero-calc-metric-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        SiKu: 3 menit
                      </span>
                    </div>
                  </div>
                  <div className="hero-calc-metric-right">
                    <span className="hero-calc-metric-value">{Math.round(calcStudents * CALC_RATE_JAM_REKAP)}</span>
                    <span className="hero-calc-metric-unit">Jam/bulan</span>
                  </div>
                </div>

                <div className="hero-calc-metric">
                  <div className="hero-calc-metric-left">
                    <div className="hero-calc-metric-icon hero-calc-metric-icon--red">
                      <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                        <path d="M12 3 2 20h20L12 3Z" stroke="#DC2626" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M12 10v4" stroke="#DC2626" strokeWidth="1.6" strokeLinecap="round" />
                        <circle cx="12" cy="17" r="0.9" fill="#DC2626" />
                      </svg>
                    </div>
                    <div className="hero-calc-metric-info">
                      <span className="hero-calc-metric-label">Risiko salah catat</span>
                      <span className="hero-calc-metric-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        SiKu: Otomatis
                      </span>
                    </div>
                  </div>
                  <div className="hero-calc-metric-right">
                    <span className="hero-calc-metric-value">{Math.round(calcStudents * CALC_RATE_RISIKO_CATAT)}</span>
                    <span className="hero-calc-metric-unit">Kali/bulan</span>
                  </div>
                </div>

                <div className="hero-calc-metric">
                  <div className="hero-calc-metric-left">
                    <div className="hero-calc-float-icon hero-calc-float-icon--wa">
                      <Image src="/icons/WaIjo.png" alt="" width={23} height={23} />
                    </div>
                    <div className="hero-calc-metric-info">
                      <span className="hero-calc-metric-label">Pesan WA manual</span>
                      <span className="hero-calc-metric-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        SiKu: 1 klik
                      </span>
                    </div>
                  </div>
                  <div className="hero-calc-metric-right">
                    <span className="hero-calc-metric-value">{Math.round(calcStudents * CALC_RATE_PESAN_WA)}</span>
                    <span className="hero-calc-metric-unit">Pesan/bulan</span>
                  </div>
                </div>
              </div>

              <div className="hero-calc-float hero-calc-float--bl">
                <div className="hero-calc-float-icon hero-calc-float-icon--wa">
                  <Image src="/icons/WaIjo.png" alt="" width={22} height={22} />
                </div>
                <div className="hero-calc-float-text">
                  <span className="hero-calc-float-tag">Real-time</span>
                  <strong>Tagihan terkirim</strong>
                  <span>Tanpa ketik manual</span>
                </div>
              </div>
            </div>

            <div className="hero-calc-trust">
              <div className="hero-calc-avatars">
                <span className="hero-calc-avatar hero-calc-avatar--1">MI</span>
                <span className="hero-calc-avatar hero-calc-avatar--2">MA</span>
                <span className="hero-calc-avatar hero-calc-avatar--3">SMA</span>
              </div>
              <div className="hero-calc-trust-text">
                <strong>Telah dicoba</strong>
                <span><TypewriterLoop text="Sekolah swasta di Yogyakarta dan sekitarnya" /></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── TICKER ───────────────────────────────── */}
      <div className="ticker-wrap" aria-hidden>
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems,...tickerItems, ...tickerItems, ...tickerItems].flatMap((item, i) => [
            <span className="ticker-item" key={`item-${i}`}>{item}</span>,
            <span className="ticker-star" key={`star-${i}`}>✦</span>,
          ])}
        </div>
      </div>

      {/* ─── PAIN POINTS ──────────────────────────── */}
      <section className="section masalah-section" id="masalah">
        <div className="section-inner masalah-inner">

          {/* Kartu statistik */}
          <div className="masalah-cards">
            <div className="masalah-card masalah-card--light">
              <div className="masalah-stat-num">80%</div>
              <div className="masalah-stat-label">dari 57.000 sekolah swasta</div>
            </div>
            <div className="masalah-card masalah-card--dark">
              <span className="masalah-quote-o">&ldquo;</span>
              <p className="masalah-quote-text">
                Masih kelola keuangan secara manual. Tanpa sistem yang terintegrasi.
              </p>
              <span className="masalah-quote-c">&rdquo;</span>
            </div>
          </div>

          {/* Dekorasi page masalah kanan */}
          <div className="masalah-deco">
            <Image
              src="/image/StarHero.png"
              alt=""
              width={90}
              height={90}
              className="masalah-star masalah-star--sm"
              aria-hidden
            />
            <Image
              src="/image/StarHero.png"
              alt=""
              width={200}
              height={200}
              className="masalah-star masalah-star--lg"
              aria-hidden
            />
            <Image
              src="/image/PageExcel.png"
              alt=""
              width={600}
              height={600}
              className="masalah-page"
              aria-hidden
            />
            <Image
              src="/image/PopUpTransfer.png"
              alt=""
              width={300}
              height={300}
              className="masalah-popUp"
              aria-hidden
            />
            <Image
              src="/image/PopUpTransfer.png"
              style={{ zIndex: 2 }}
              alt=""
              width={300}
              height={300}
              className="masalah-popUp masalah-popUp--reverse"
              aria-hidden
            />
            <Image
              src="/image/PopUpTransfer.png"
              style={{ zIndex: 3 }}
              alt=""
              width={300}
              height={300}
              className="masalah-popUp masalah-popUp--front"
              aria-hidden
            />

            {/* Bubble chat WhatsApp dekorasi */}
            <div className="masalah-chat masalah-chat--sari" aria-hidden>
              <span className="masalah-chat-icon"><WhatsAppIcon /></span>
              <span className="masalah-chat-text"><strong>Ibu Sari:</strong> Ini bukti SPP bulan Juni 🙏</span>
            </div>
            <div className="masalah-chat masalah-chat--rian" aria-hidden>
              <span className="masalah-chat-icon"><WhatsAppIcon /></span>
              <span className="masalah-chat-text"><strong>Bapak Rian:</strong> Sudah bayar tapi blm dikonfirmasi ❗</span>
            </div>
            <div className="masalah-chat masalah-chat--siti" aria-hidden>
              <span className="masalah-chat-icon"><WhatsAppIcon /></span>
              <span className="masalah-chat-text"><strong>Ibu Siti:</strong> Bukti ekskul + SPP jadi satu</span>
            </div>
            <div className="masalah-chat-badge" aria-hidden>
              <span className="masalah-chat-badge-icon"><WhatsAppIcon /></span>
              <span className="masalah-chat-badge-count">47</span>
              <span className="masalah-chat-badge-text">Pesan belum terbaca</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── KONDISI NYATA ────────────────────────── */}
      <section className="kondisi-section">
        <div className="kondisi-inner">

          {/* Kiri: teks */}
          <div className="kondisi-content kondisi-anim-left">
            <span className="kondisi-label">Kenapa ini penting?</span>
            <div className="kondisi-divider">
              <Image
                src="/image/Line.png"
                alt=""
                width={240}
                height={18}
                className="kondisi-divider-line"
                aria-hidden
              />
            </div>
            <h2 className="kondisi-title">
              Begini kondisi nyata yang terjadi <br className="br-hide-mobile" />
              di banyak sekolah swasta hari ini
            </h2>
            <p className="kondisi-desc">
              Bukan karena tidak mau berubah tapi karena belum ada
              solusi yang benar-benar pas untuk skala mereka.
            </p>
          </div>

          {/* Kanan: tombol */}
          <div className="kondisi-action kondisi-anim-right">
            <Link href="/daftar" className="kondisi-btn" onClick={() => trackCTA('Solusi Kami', '/daftar')}>
              <span>Solusi Kami</span>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#1A3557" />
                <line x1="7" y1="12" x2="16" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                <polyline points="12.5 8 17 12 12.5 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* ─── KONDISI CARDS ────────────────────────── */}
      <section className="kcards-section">
        <div className="kcards-grid">

          {/* Card 1 */}
          <div className="kcards-wrap">
            <div className="kcards-card kcard-anim">
              <div className="kcards-icon kcards-icon--yellow">
                <Image src="/icons/IconProblem1.png" alt="" width={60} height={60} />
              </div>
              <h3 className="kcards-title">Rekap manual <br />rawan salah catat</h3>
              <p className="kcards-desc">Bendahara mencocokan mutasi rekening dengan data siswa satu per satu di Excel. Satu baris terlewat bisa membuat laporan tidak seimbang selama berbulan-bulan.</p>
              <span className="kcards-star">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M 8.91 8.26 L 11.11 3.79 Q 12 2 12.89 3.79 L 15.09 8.26 L 20.02 8.98 Q 22 9.27 20.57 10.67 L 17 14.14 L 17.84 19.05 Q 18.18 21.02 16.41 20.09 L 12 17.77 L 7.59 20.09 Q 5.82 21.02 6.16 19.05 L 7 14.14 L 3.43 10.67 Q 2 9.27 3.98 8.98 Z" fill="#A3CDFE"/></svg>
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="kcards-wrap kcards-wrap--down">
            <div className="kcards-card kcard-anim">
              <div className="kcards-icon kcards-icon--navy">
                <Image src="/icons/IconProblem2.png" alt="" width={55} height={55} />
              </div>
              <h3 className="kcards-title">Verifikasi pembayaran <br />lewat WhatsApp</h3>
              <p className="kcards-desc">Orang tua mengirim screenshot bukti transfer ke nomor admin. Bukti bayar mudah terlewat, hilang di chat, dan tidak ada konfirmasi otomatis yang terkirim balik.</p>
              <span className="kcards-star">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M 8.91 8.26 L 11.11 3.79 Q 12 2 12.89 3.79 L 15.09 8.26 L 20.02 8.98 Q 22 9.27 20.57 10.67 L 17 14.14 L 17.84 19.05 Q 18.18 21.02 16.41 20.09 L 12 17.77 L 7.59 20.09 Q 5.82 21.02 6.16 19.05 L 7 14.14 L 3.43 10.67 Q 2 9.27 3.98 8.98 Z" fill="#A3CDFE"/></svg>
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="kcards-wrap">
            <div className="kcards-card kcard-anim">
              <div className="kcards-icon kcards-icon--navy">
                <Image src="/icons/IconProblem3.png" alt="" width={45} height={45} />
              </div>
              <h3 className="kcards-title">Pengingat tagihan <br />dilakukan satu per satu</h3>
              <p className="kcards-desc">Mengingatkan orang tua yang belum bayar dilakukan manual — dicari dari daftar Excel, dikirim pesan satu per satu. Proses ini bisa menyita setengah hari kerja bendahara.</p>
              <span className="kcards-star">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M 8.91 8.26 L 11.11 3.79 Q 12 2 12.89 3.79 L 15.09 8.26 L 20.02 8.98 Q 22 9.27 20.57 10.67 L 17 14.14 L 17.84 19.05 Q 18.18 21.02 16.41 20.09 L 12 17.77 L 7.59 20.09 Q 5.82 21.02 6.16 19.05 L 7 14.14 L 3.43 10.67 Q 2 9.27 3.98 8.98 Z" fill="#A3CDFE"/></svg>
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="kcards-wrap kcards-wrap--down">
            <div className="kcards-card kcard-anim">
              <div className="kcards-icon kcards-icon--yellow">
                <Image src="/icons/IconProblem4.png" alt="" width={60} height={60} />
              </div>
              <h3 className="kcards-title">Laporan keuangan <br />selalu terlambat</h3>
              <p className="kcards-desc">Kepala sekolah dan yayasan hanya bisa melihat kondisi keuangan setelah rekap selesai disusun — bukan secara real-time. Keputusan penting pun menjadi terhambat.</p>
              <span className="kcards-star">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M 8.91 8.26 L 11.11 3.79 Q 12 2 12.89 3.79 L 15.09 8.26 L 20.02 8.98 Q 22 9.27 20.57 10.67 L 17 14.14 L 17.84 19.05 Q 18.18 21.02 16.41 20.09 L 12 17.77 L 7.59 20.09 Q 5.82 21.02 6.16 19.05 L 7 14.14 L 3.43 10.67 Q 2 9.27 3.98 8.98 Z" fill="#A3CDFE"/></svg>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── APA ITU SIKU ───────────────────────────── */}
      <section className="apasiku-section">
        <div className="apasiku-inner">
          <div className="apasiku-content">
            <span className="apasiku-badge apasiku-anim" data-delay="0">Apa itu SiKu?</span>
            <h2 className="apasiku-title apasiku-anim" data-delay="140">Sistem keuangan sekolah swasta<br className="apasiku-title-br" /> yang simpel, akurat, dan siap audit</h2>
            <p className="apasiku-desc apasiku-anim" data-delay="280">SiKu adalah platform SaaS manajemen keuangan berbasis web yang dirancang khusus untuk sekolah dan yayasan swasta skala kecil hingga menengah — menggantikan Excel, buku kas, dan WhatsApp dengan satu sistem yang terintegrasi penuh.</p>
          </div>
          <div className="apasiku-image">
            <div className="apasiku-star">
              <Image src="/image/StarHero.png" alt="SiKu Star Hero" width={360} height={360} />
            </div>
          </div>
        </div>

        {/* ─ Feature Cards + Dashboard ─ */}
        <div className="apasiku-cards">

          {/* Left: 2×2 feature cards */}
          <div className="apasiku-fcards">

            <div className="apasiku-fcard-wrap apasiku-fcard-anim" data-delay="0">
              <div className="apasiku-fcard">
                <p className="apasiku-fcard-desc">Tidak butuh latar belakang akuntansi atau keahlian IT. SiKu dirancang agar bendahara bisa langsung pakai tanpa pelatihan panjang.</p>
              </div>
              <div className="apasiku-fcard-footer">
                <span className="apasiku-fcard-label">Simpel untuk Semua
                <span className="apasiku-fcard-icon">
                  <Image src="/icons/IconMonitor.png" alt="Monitor" width={23} height={23} />
                </span>
                </span>
              </div>
            </div>

            <div className="apasiku-fcard-wrap apasiku-fcard-anim" data-delay="120">
              <div className="apasiku-fcard">
                <p className="apasiku-fcard-desc">Semua data pembayaran tercatat di satu tempat secara otomatis tidak ada lagi data tersebar di banyak file atau chat yang tidak terorganisir.</p>
              </div>
              <div className="apasiku-fcard-footer">
                <span className="apasiku-fcard-label">Akurat &amp; Terpusat
                <span className="apasiku-fcard-icon">
                  <Image src="/icons/IconDB.png" alt="Database" width={23} height={23} />
                </span>
                </span>
              </div>
            </div>

            <div className="apasiku-fcard-wrap apasiku-fcard-anim" data-delay="240">
              <div className="apasiku-fcard">
                <p className="apasiku-fcard-desc">Laporan keuangan tersusun otomatis dan bisa diakses kapan saja oleh kepala sekolah maupun pengurus yayasan tanpa perlu menunggu rekap manual.</p>
              </div>
              <div className="apasiku-fcard-footer">
                <span className="apasiku-fcard-label">Siap Audit Kapan Saja
                <span className="apasiku-fcard-icon">
                  <Image src="/icons/IconFile.png" alt="File" width={18} height={18} />
                </span>
                </span>
              </div>
            </div>

            <div className="apasiku-fcard-wrap apasiku-fcard-anim" data-delay="360">
              <div className="apasiku-fcard">
                <p className="apasiku-fcard-desc">Kirim pengingat tagihan ke seluruh orang tua sekaligus langsung ke WhatsApp masing-masing tanpa ketik satu per satu, tanpa copy-paste.</p>
              </div>
              <div className="apasiku-fcard-footer">
                <span className="apasiku-fcard-label">Satu Klik Ingatkan
                <span className="apasiku-fcard-icon">
                  <Image src="/icons/IconWaStroke.png" alt="WhatsApp" width={23} height={23} />
                </span>
                </span>
              </div>
            </div>

          </div>

          {/* Right: Dashboard mockup */}
          <div className="apasiku-dashboard apasiku-dash-anim">

            <div className="apasiku-dash-header">STATUS PEMBAYARAN – KELAS 7A</div>

            <div className="apasiku-dash-rows">
              <div className="apasiku-dash-row">
                <span className="apasiku-dash-name">Ahmad Fauzi</span>
                <span className="apasiku-dash-chip apasiku-dash-chip--lunas">Lunas</span>
              </div>
              <div className="apasiku-dash-row">
                <span className="apasiku-dash-name">Siti Rahma</span>
                <span className="apasiku-dash-chip apasiku-dash-chip--menunggu">Menunggu</span>
              </div>
              <div className="apasiku-dash-row">
                <span className="apasiku-dash-name">Budi Santoso</span>
                <span className="apasiku-dash-chip apasiku-dash-chip--lunas">Lunas</span>
              </div>
              <div className="apasiku-dash-row">
                <span className="apasiku-dash-name">Dewi Anggraini</span>
                <span className="apasiku-dash-chip apasiku-dash-chip--belum">Belum Bayar</span>
              </div>
            </div>

            <div className="apasiku-dash-prog-card">
              <div className="apasiku-dash-prog-header">PROGRES PEMBAYARAN BULAN INI</div>
              <div className="apasiku-dash-prog-track">
                <div className="apasiku-dash-prog-fill" style={{ width: '75%' }} />
              </div>
            </div>

            <div className="apasiku-dash-stats">
              <div className="apasiku-dash-stat">
                <span className="apasiku-dash-stat-val">75%</span>
                <span className="apasiku-dash-stat-lbl">Sudah Lunas</span>
              </div>
              <div className="apasiku-dash-stat">
                <span className="apasiku-dash-stat-val">Rp 42jt</span>
                <span className="apasiku-dash-stat-lbl">Terkumpul</span>
              </div>
              <div className="apasiku-dash-stat">
                <span className="apasiku-dash-stat-val">14</span>
                <span className="apasiku-dash-stat-lbl">Belum Bayar</span>
              </div>
            </div>

            <div className="apasiku-dash-action apasiku-dash-action--wa">
              <span className="apasiku-dash-action-ico">
                <Image src="/icons/IconWA.png" alt="WA" width={32} height={32} />
              </span>
              <div className="apasiku-dash-action-txt">
                <span className="apasiku-dash-action-title">14 Orang Tua Belum Bayar</span>
                <span className="apasiku-dash-action-sub">Kirim pengingat ke orang tua</span>
              </div>
              <span className="apasiku-dash-action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="13 6 19 12 13 18"/>
                </svg>
              </span>
            </div>

            <div className="apasiku-dash-action apasiku-dash-action--report">
              <span className="apasiku-dash-action-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                  <rect x="9" y="3" width="6" height="4" rx="1"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </span>
              <div className="apasiku-dash-action-txt">
                <span className="apasiku-dash-action-title">Laporan Juni 2025</span>
                <span className="apasiku-dash-action-sub">Sudah tersedia — Siap diunduh kapan saja</span>
              </div>
              <span className="apasiku-dash-action-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="13 6 19 12 13 18"/>
                </svg>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CARA KERJA ───────────────────────────── */}
      <section className="section" id="cara-kerja">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">Cara Kerja</div>
            <h2 className="section-title">Mulai dalam 4 langkah mudah</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
              Tidak perlu keahlian IT. Tim kami siap membantu <br className="br-hide-mobile" /> setup dari awal hingga sekolah siap pakai.
            </p>
          </div>

          {/* Grid 4 langkah */}
          <div className="howto-grid">

            {/* Card 1 */}
            <div className="howto-card">
              <div className="howto-num">1</div>
              <div className="howto-card-inner">
              <div className="howto-header">
                <div className="howto-header-title">Daftar &amp; Setup</div>
                <span className="howto-header-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                    <rect x="9" y="3" width="6" height="4" rx="1"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </span>
              </div>
              <div className="howto-body">
                <p>Isi formulir singkat seputar profil sekolah dan komponen biaya. Tim kami menghubungi dalam 1x24 jam untuk membantu proses setup awal.</p>
                <span className="badge-tag howto-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A2C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/>
                    <polyline points="12 7 12 12 15 14"/>
                  </svg>
                  Setup &lt; 30 menit
                </span>
                <Image
                  src="/image/carakerja-1-form.png"
                  alt="Preview formulir data sekolah"
                  width={220}
                  height={184}
                  className="howto-preview"
                />
              </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="howto-card">
              <div className="howto-num">2</div>
              <div className="howto-card-inner">
              <div className="howto-header">
                <div className="howto-header-title">Import Data Siswa</div>
                <span className="howto-header-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="8 17 12 21 16 17"/>
                    <line x1="12" y1="12" x2="12" y2="21"/>
                    <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
                  </svg>
                </span>
              </div>
              <div className="howto-body">
                <p>Upload data siswa dari file Excel yang sudah ada. Sistem langsung siap men-generate tagihan untuk seluruh siswa secara otomatis.</p>
                <span className="badge-tag howto-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A2C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                    <path d="M16 3.13a4 4 0 010 7.75"/>
                  </svg>
                  hingga 600+ siswa
                </span>
                <Image
                  src="/image/carakerja-2-excel.png"
                  alt="Preview import data siswa via Excel"
                  width={220}
                  height={184}
                  className="howto-preview"
                />
              </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="howto-card">
              <div className="howto-num">3</div>
              <div className="howto-card-inner">
              <div className="howto-header">
                <div className="howto-header-title">Sistem Berjalan Otomatis</div>
                <span className="howto-header-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <path d="M8 21h8M12 17v4"/>
                  </svg>
                </span>
              </div>
              <div className="howto-body">
                <p>Tagihan terkirim, notifikasi WhatsApp aktif, pembayaran masuk semua terpantau langsung dari dashboard real-time Anda.</p>
                <span className="badge-tag howto-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A2C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" rx="1"/>
                    <rect x="14" y="3" width="7" height="5" rx="1"/>
                    <rect x="14" y="12" width="7" height="9" rx="1"/>
                    <rect x="3" y="16" width="7" height="5" rx="1"/>
                  </svg>
                  Dasbor Real-time
                </span>
                <Image
                  src="/image/carakerja-3-dashboard.png"
                  alt="Preview dashboard status pembayaran real-time"
                  width={220}
                  height={184}
                  className="howto-preview"
                />
              </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="howto-card">
              <div className="howto-num">4</div>
              <div className="howto-card-inner">
              <div className="howto-header">
                <div className="howto-header-title">Reminder Otomatis</div>
                <span className="howto-header-icon">
                  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 01-3.46 0"/>
                  </svg>
                </span>
              </div>
              <div className="howto-body">
                <p>SiKu otomatis mengirim pengingat tagihan lewat WhatsApp lengkap dengan link pembayaran tanpa perlu ketik <br />manual.</p>
                <span className="badge-tag howto-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A2C4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Kirim sekaligus
                </span>
                <Image
                  src="/image/carakerja-4-notifikasi.png"
                  alt="Preview notifikasi pengingat WhatsApp"
                  width={500}
                  height={500}
                  className="howto-preview"
                />
              </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CTA HARGA ────────────────────────────── */}
      <section className="cta-harga-section">
        <div className="cta-harga-inner">

          {/* Header */}
          <div className="cta-harga-header">
            <span className="cta-harga-badge cta-anim" data-delay="0">Harga &amp; Paket</span>
            <h2 className="cta-harga-title cta-anim" data-delay="120">1 Bulan Gratis<br />Tanpa Syarat Tersembunyi</h2>
            <p className="cta-harga-desc cta-anim" data-delay="240">
              Kami tahu sekolah perlu membuktikan manfaat sebelum berkomitmen.
              Karena itu kami tawarkan akses penuh bukan versi terbatas <br />selama 1 bulan pertama.
            </p>
          </div>

          {/* Card besar */}
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

              <Link href="/daftar" className="cta-card-btn" onClick={() => trackCTA('Jadwalkan Demo Gratis (CTA Card)', '/daftar')}>
                Jadwalkan Demo Gratis
              </Link>
              <p className="cta-card-note">Setelah 1 bulan, pilih lanjut atau berhenti – tanpa paksaan</p>
            </div>

            {/* Info box */}
            <div className="cta-info-box">
              <span className="cta-info-icon">
                <Image src="/icons/IconGuard.png" alt="Guard" width={60} height={60} />
              </span>
              <p className="cta-info-text">
                Tim kami siap membantu. Setelah mendaftar, kami menghubungi kamu
                dalam 1×24 jam untuk menjadwalkan sesi demo dan proses onboarding.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── TESTIMONI ────────────────────────────── */}
      <section className="testi-section">
        <div className="testi-section-inner">

          {/* Header: kiri + kanan */}
          <div className="testi-header">
            {/* Kiri: badge + title */}
            <div className="testi-header-left">
              <span className="testi-badge cta-anim" data-delay="0">Testimoni</span>
              <h2 className="testi-title cta-anim" data-delay="150">Kata Mereka yang<br />Sudah Mencoba SiKu</h2>
            </div>

            {/* Kanan: star */}
            <div className="testi-header-right">
              <Image
                src="/image/StarHero.png"
                alt=""
                width={220}
                height={220}
                className="testi-star"
                aria-hidden
              />
            </div>
          </div>

          {/* Slider + CTA */}
          <div className="testi-body">

            {/* Left: testimonial slider */}
            <div className="testi-slider-wrap testi-anim-left">
                {testimonials[testiActive].avatar ? (
                  <div className="testi-slider-avatar testi-slider-avatar--img">
                    <Image src={testimonials[testiActive].avatar} alt={testimonials[testiActive].name} width={200} height={200} style={{ objectFit: 'cover', borderRadius: '50%' }} />
                  </div>
                ) : (
                  <div className="testi-slider-avatar" style={{ background: (testimonials[testiActive] as { color?: string }).color }}>
                    {(testimonials[testiActive] as { initials?: string }).initials}
                  </div>
                )}
              <div className="testi-slider-card">
                {/* Header tetap — tidak ikut animasi slide */}
                <div className="testi-slider-header">
                  <div className="testi-slider-meta">
                    <div className="testi-slider-name">{testimonials[testiActive].name}</div>
                    <div className="testi-slider-role">{testimonials[testiActive].role}</div>
                  </div>
                </div>

                {/* Konten berubah — key memicu re-mount dan replay animasi */}
                <div className="testi-slider-content" key={testiActive}>
                  {/* Stars */}
                  <div className="testi-slider-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < testimonials[testiActive].stars ? '#F7DD7D' : '#D1D5DB'} xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="testi-slider-quote">&ldquo;{testimonials[testiActive].quote}&rdquo;</p>
                </div>

                {/* Navigation */}
                <div className="testi-slider-nav">
                  <div className="testi-slider-dots">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        className={`testi-dot${i === testiActive ? ' testi-dot--active' : ''}`}
                        onClick={() => setTestiActive(i)}
                        aria-label={`Testimoni ${i + 1}`}
                      />
                    ))}
                  </div>
                  <div className="testi-slider-arrows">
                    <button
                      className="testi-arrow"
                      onClick={() => setTestiActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                      aria-label="Sebelumnya"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"/>
                      </svg>
                    </button>
                    <button
                      className="testi-arrow"
                      onClick={() => setTestiActive((prev) => (prev + 1) % testimonials.length)}
                      aria-label="Berikutnya"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA card */}
            <div className="testi-cta-card testi-anim-right" style={{ transitionDelay: '150ms' }}>
              <div className="testi-cta-icon">
                <Image src="/icons/IconRoket.png" alt="" width={80} height={80} style={{ objectFit: 'contain', transform: 'translate(6px, -6px)' }} />
              </div>
              <h3 className="testi-cta-title">Siap merasakan sendiri?</h3>
              <p className="testi-cta-desc">Bergabunglah dengan sekolah-sekolah yang sudah beralih dari Excel dan WhatsApp ke <br />sistem yang benar-benar bekerja.</p>
              <ul className="testi-cta-list">
                {[
                  '1 bulan gratis, semua fitur lengkap',
                  'Onboarding dipandu tim kami',
                  'Aktif dalam 1x24 jam',
                ].map((item) => (
                  <li key={item} className="testi-cta-list-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/daftar" className="testi-cta-btn" onClick={() => trackCTA('Coba Gratis Sekarang (Testimoni)', '/daftar')}>
                Coba Gratis Sekarang <ArrowCircleIcon />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ─── CLOSING CTA ──────────────────────────── */}
      <section className="closing-section">
        <div className="closing-circle closing-circle--tl" />
        <div className="closing-circle closing-circle--br" />
        <div className="closing-inner">
          <span className="closing-badge closing-anim" data-delay="0">Mulai Sekarang</span>
          <h2 className="closing-title closing-anim" data-delay="120">Saatnya beralih ke SiKu.<br />Sudah cukup rekap manual.</h2>
          <p className="closing-desc closing-anim" data-delay="240">Coba gratis 1 bulan penuh tanpa kartu kredit, tanpa risiko.<br className="br-hide-mobile" />Tim kami siap membantu dari awal hingga sistem berjalan.</p>
          <div className="closing-btns closing-anim" data-delay="360">
            {/* <Link href="/harga" className="closing-btn-outline" onClick={() => trackCTA('Lihat Paket & Harga', '/harga')}>Lihat Paket &amp; Harga</Link> */}
            <Link href="/daftar" className="closing-btn-primary" onClick={() => trackCTA('Jadwalkan Demo Gratis (Closing)', '/daftar')}>
              Jadwalkan Demo Gratis <ArrowCircleIcon />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}