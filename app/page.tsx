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
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

const tickerItems = [
  'Kurangi rekap manual',
  'Laporan akurat siap audit',
  'Selesai dalam 3 langkah',
]

const heroSlides = [
  { src: '/assets/AssetsHero1.jpeg', alt: 'Dashboard SiKu' },
  { src: '/assets/AssetsHero2.jpg', alt: 'Laporan Keuangan SiKu' },
]

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [heroReady, setHeroReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

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
      '.masalah-card--light, .masalah-card--dark, .kondisi-anim-left, .kondisi-anim-right'
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
    const els = document.querySelectorAll<HTMLElement>('.ckerja-anim')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target as HTMLElement
        observer.unobserve(el)
        const delay = parseInt(el.dataset.delay ?? '0', 10)
        setTimeout(() => el.classList.add('visible'), delay)
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els.forEach((el) => observer.observe(el))
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
        setTimeout(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              el.classList.add('visible')
            })
          })
        }, idx * 160)
      })
    }, { threshold: 0.15 })
    cards.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
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
              <Link href="/harga" className="btn-hero-outline">
                Harga &amp; Paket
              </Link>
              <Link href="/daftar" className="btn-primary">
                Coba Gratis Sekarang <ArrowCircleIcon />
              </Link>
            </div>
          </div>

          {/* Slide kanan */}
          <div className="hero-slides-wrap">
            <Image
              src="/image/StarHero.png"
              alt=""
              width={110}
              height={110}
              className="hero-star hero-star--tr"
              aria-hidden
            />
            <Image
              src="/image/StarHero.png"
              alt=""
              width={150}
              height={150}
              className="hero-star hero-star--bl"
              aria-hidden
            />
            <div className="hero-slides-clip">
              <div
                className="hero-slides-track"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {heroSlides.map((slide, i) => (
                  <div className="hero-slide" key={i}>
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              className="hero-slide-btn hero-slide-btn--prev"
              onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              aria-label="Slide sebelumnya"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polyline points="15 18 9 12 15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="hero-slide-btn hero-slide-btn--next"
              onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
              aria-label="Slide berikutnya"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <polyline points="9 18 15 12 9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="hero-dots">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot${i === activeSlide ? ' hero-dot--active' : ''}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Anchor — klik scroll ke bagian masalah */}
        <a
          href="#masalah"
          className="hero-anchor-btn"
          aria-label="Lihat masalah yang kami selesaikan"
        >
          <Image
            src="/image/AnchorProblem.png"
            alt=""
            width={340}
            height={120}
            className="hero-anchor"
          />
        </a>
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

          {/* Dekorasi bintang kiri */}
          <div className="masalah-deco">
            <Image
              src="/image/StarHero.png"
              alt=""
              width={152}
              height={152}
              className="masalah-star masalah-star--sm"
              aria-hidden
            />
            <Image
              src="/image/StarHero.png"
              alt=""
              width={250}
              height={250}
              className="masalah-star masalah-star--lg"
              aria-hidden
            />
          </div>

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
              Begini kondisi nyata yang terjadi<br />
              di banyak sekolah swasta hari ini
            </h2>
            <p className="kondisi-desc">
              Bukan karena tidak mau berubah tapi karena belum ada
              solusi yang benar-benar pas untuk skala mereka.
            </p>
          </div>

          {/* Kanan: tombol */}
          <div className="kondisi-action kondisi-anim-right">
            <Link href="/daftar" className="kondisi-btn">
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

      {/* ─── CARA KERJA ───────────────────────────── */}
      <section className="section" id="cara-kerja">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">Cara Kerja</div>
            <h2 className="section-title">Mulai dalam 3 langkah mudah</h2>
            <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
              Tidak perlu keahlian IT. Tim kami siap membantu <br /> setup dari awal hingga sekolah siap pakai.
            </p>
          </div>

          {/* Timeline */}
          <div className="ckerja-timeline">
            <div className="ckerja-vline" />

            {/* Step 1 – kiri */}
            <div className="ckerja-step ckerja-step--left">
              <div className="ckerja-card-wrap ckerja-anim ckerja-anim--left" data-delay="0">
                <div className="ckerja-card">
                  <div className="ckerja-card-header">Daftar &amp; Lengkapi Data Sekolah</div>
                  <div className="ckerja-card-body ckerja-card-body--right">
                    <p>Isi formulir singkat seputar profil sekolah dan komponen biaya. <br />Tim kami menghubungi dalam 1×24 jam untuk membantu proses setup awal.</p>
                    <span className="ckerja-card-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2A5499" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                        <rect x="9" y="3" width="6" height="4" rx="1"/>
                        <path d="M9 12l2 2 4-4"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="ckerja-num">1</div>
              </div>
              <div className="ckerja-center"><div className="ckerja-dot" /></div>
              <div />
            </div>

            {/* Step 2 – kanan */}
            <div className="ckerja-step ckerja-step--right">
              <div />
              <div className="ckerja-center"><div className="ckerja-dot" /></div>
              <div className="ckerja-card-wrap ckerja-anim ckerja-anim--right" data-delay="220">
                <div className="ckerja-card">
                  <div className="ckerja-card-header">Import Data Siswa</div>
                  <div className="ckerja-card-body ckerja-card-body--left">
                    <p>Upload data siswa dari file <br /> Excel yang sudah ada. Sistem langsung siap men-generate tagihan untuk seluruh siswa secara otomatis.</p>
                    <span className="ckerja-card-icon ckerja-card-icon--bl">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2A5499" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="8 17 12 21 16 17"/>
                        <line x1="12" y1="12" x2="12" y2="21"/>
                        <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="ckerja-num">2</div>
              </div>
            </div>

            {/* Step 3 – kiri */}
            <div className="ckerja-step ckerja-step--left">
              <div className="ckerja-card-wrap ckerja-anim ckerja-anim--left" data-delay="440">
                <div className="ckerja-card">
                  <div className="ckerja-card-header">Sistem Berjalan Otomatis</div>
                  <div className="ckerja-card-body ckerja-card-body--right">
                    <p>Tagihan terkirim, notifikasi <br /> WhatsApp aktif, pembayaran <br /> masuk semua terpantau langsung <br /> dari dashboard real-time Anda.</p>
                    <span className="ckerja-card-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2A5499" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <path d="M8 21h8M12 17v4"/>
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="ckerja-num">3</div>
              </div>
              <div className="ckerja-center"><div className="ckerja-dot" /></div>
              <div />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONI ────────────────────────────── */}
      <section className="section features-bg">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Yang mereka rasakan</h2>
          </div>

          <div className="testi-grid">
            {[
              {
                stars: '★★★★★',
                quote: 'Dulu rekap SPP 3 jenjang bisa sampai 2 hari. Sekarang tinggal buka dashboard, semua sudah tersedia. WA ke orang tua juga otomatis, saya tidak perlu ketik satu-satu lagi.',
                initials: 'SR',
                color: '#1A3557',
                name: 'Sri Rahayu, S.Pd',
                school: 'Bendahara · SDIT Al-Hikmah, Yogyakarta',
              },
              {
                stars: '★★★★★',
                quote: 'Yayasan kami punya 3 sekolah. Sebelumnya laporan keuangan masing-masing tidak bisa dibandingkan. Sekarang bisa lihat konsolidasi semua sekolah dalam satu layar.',
                initials: 'BW',
                color: '#059669',
                name: 'Bambang Wicaksono',
                school: 'Bendahara Yayasan · Yayasan Pendidikan Nusantara',
              },
              {
                stars: '★★★★☆',
                quote: 'Awalnya saya pikir sulit dipakai karena tidak biasa dengan aplikasi. Ternyata mudah sekali. Support-nya juga cepat respons. Orang tua senang bisa bayar SPP lewat transfer langsung.',
                initials: 'DN',
                color: '#D97706',
                name: 'Dewi Nuraini',
                school: 'Bendahara · TK & SD Islam Terpadu Ceria',
              },
            ].map((t) => (
              <div className="testi-card" key={t.name}>
                <div className="stars">{t.stars}</div>
                <div className="testi-quote">&ldquo;{t.quote}&rdquo;</div>
                <div className="testi-author">
                  <div className="author-avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-school">{t.school}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING CTA ──────────────────────────── */}
      <section className="section pricing-section" id="harga">
        <div className="pricing-inner">
          <h2 className="pricing-title">
            1 Bulan Gratis.
            <br />Tanpa syarat tersembunyi.
          </h2>
          <p className="pricing-subtitle">
            Kami tahu sekolah perlu membuktikan manfaat sebelum berkomitmen.
            Karena itu kami tawarkan demo penuh — bukan versi terbatas — selama 1 bulan.
          </p>

          <div className="pricing-card">
            <div className="price-tag-wrap">
              <div className="price-tag">
                Rp <GachaNumber
                  target={0}
                  from={299000}
                  duration={500}
                  format={(n) => n.toLocaleString('id-ID')}
                />
              </div>
              <div className="price-tag-original">
                Rp <GachaNumber
                  target={299000}
                  from={0}
                  duration={500}
                  format={(n) => n.toLocaleString('id-ID')}
                />/bln
              </div>
            </div>
            <div className="price-sub">
              Selama 1 bulan pertama · Tidak perlu kartu kredit
            </div>
            <div className="price-features">
              {[
                'Semua fitur lengkap', 'Tidak ada batas siswa',
                'Notifikasi otomatis WhatsApp', 'Laporan & Dashboard',
                'Onboarding oleh tim kami', 'Dukungan teknis',
                'Export Excel & PDF', 'Multi-jenjang sekolah',
              ].map((f) => (
                <span className="price-feat-item" key={f}>{f}</span>
              ))}
            </div>
            <Link href="/daftar" className="btn-cta-big">
              Jadwalkan Demo Gratis
            </Link>
            <div className="cta-note">
              Setelah 1 bulan, pilih lanjut atau berhenti — tanpa paksaan
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}