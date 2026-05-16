'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FileSpreadsheet, PhoneCall, Clock4, ShieldAlert } from 'lucide-react'

const ArrowCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#F7DD7D" />
    <line x1="7" y1="12" x2="16" y2="12" stroke="#1A3557" strokeWidth="2" strokeLinecap="round" />
    <polyline points="12.5 8 17 12 12.5 16" stroke="#1A3557" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

  return (
    <>
      <Navbar />

      {/* ─── HERO ─────────────────────────────────── */}
      <section className={`hero${heroReady ? ' hero--ready' : ''}`}>
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
      </section>

      {/* ─── PAIN POINTS ──────────────────────────── */}
      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">Masalah Yang Sering Terjadi</div>
            <h2 className="section-title">
              Keuangan kewalahan?
              <br />Kami paham.
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
              Tanpa sistem yang tepat, pekerjaan administratif keuangan sekolah
              bisa memakan waktu berjam-jam setiap hari.
            </p>
          </div>

          <div className="pain-grid">
            {[
              {
                num: '1',
                icon: <FileSpreadsheet size={22} />,
                title: 'Rekap SPP Manual di Excel',
                desc: 'Data ratusan siswa diinput satu per satu. Rentan salah ketik, susah dicari, sering tidak sinkron antar jenjang.',
              },
              {
                num: '2',
                icon: <PhoneCall size={22} />,
                title: 'Menghubungi Orang Tua Secara Manual',
                desc: 'Reminder tunggakan SPP lewat telepon atau WhatsApp satu-satu. Menyita waktu, sering tidak tersampaikan.',
              },
              {
                num: '3',
                icon: <Clock4 size={22} />,
                title: 'Laporan Keuangan yang Tidak Real-time',
                desc: 'Kepala sekolah dan yayasan harus menunggu akhir bulan untuk melihat kondisi keuangan. Keputusan terlambat.',
              },
              {
                num: '4',
                icon: <ShieldAlert size={22} />,
                title: 'Data Berceceran & Tidak Aman',
                desc: 'File Excel bisa hilang, tertimpa, atau diakses sembarang pihak. Tidak ada backup otomatis dan audit trail.',
              },
            ].map((item) => (
              <div className="pain-card" data-num={item.num} key={item.num}>
                <div className="pain-icon">{item.icon}</div>
                <div className="pain-title">{item.title}</div>
                <div className="pain-desc">{item.desc}</div>
              </div>
            ))}
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
              Tidak perlu keahlian IT. Tim kami siap bantu setup dari awal
              hingga sekolah siap pakai.
            </p>
          </div>

          <div className="steps">
            {[
              {
                num: '1',
                title: 'Daftar & Isi Data Sekolah',
                desc: 'Isi formulir singkat. Tim kami hubungi dalam 1x24 jam untuk membantu proses setup awal sistem Anda.',
              },
              {
                num: '2',
                title: 'Import Data Siswa',
                desc: 'Upload data siswa dari Excel yang sudah ada. Sistem langsung siap generate tagihan untuk seluruh siswa.',
              },
              {
                num: '3',
                title: 'Sistem Berjalan Otomatis',
                desc: 'Tagihan dikirim, WA terkirim, pembayaran masuk — semua terpantau di dashboard real-time Anda.',
              },
            ].map((step) => (
              <div className="step" key={step.num}>
                <div className="step-num">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
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