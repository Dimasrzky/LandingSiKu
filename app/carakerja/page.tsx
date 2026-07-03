'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTracking } from '@/hooks/useTracking'

const ArrowCircleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#F7DD7D" />
    <line x1="7" y1="12" x2="16" y2="12" stroke="#1A3557" strokeWidth="1.5" strokeLinecap="round" />
    <polyline points="12.5 8 17 12 12.5 16" stroke="#1A3557" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function CaraKerjaPage() {
  const { trackCTA } = useTracking()
  // Scroll-linked vline grow (lerp + RAF)
  useEffect(() => {
    const vline    = document.querySelector<HTMLElement>('.ckerja-vline')
    const timeline = document.querySelector<HTMLElement>('.ckerja-timeline')
    const endIcon  = document.querySelector<HTMLElement>('.ckerja-end-icon')
    const endEl    = document.querySelector<HTMLElement>('.ckerja-end')
    if (!vline || !timeline) return
    let current = 0
    let raf = 0
    let endTriggered = false
    const getTarget = () => {
      const { top, height } = timeline.getBoundingClientRect()
      const wh = window.innerHeight
      return Math.min(1, Math.max(0, (wh * 0.8 - top) / height))
    }
    const tick = () => {
      current += (getTarget() - current) * 0.07
      const bottom = Math.round((1 - current) * 100 * 100) / 100
      vline.style.clipPath = `inset(0 0 ${bottom}% 0)`
      if (!endTriggered && current >= 0.95) {
        endTriggered = true
        endIcon?.classList.add('visible')
        endEl?.classList.add('active')
      }
      if (endTriggered && current < 0.9) {
        endTriggered = false
        endIcon?.classList.remove('visible')
        endEl?.classList.remove('active')
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Dot pop-in/out per step
  useEffect(() => {
    const dots = document.querySelectorAll<HTMLElement>('.ckerja-dot')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) el.classList.add('visible')
        else el.classList.remove('visible')
      })
    }, { threshold: 0.5 })
    dots.forEach((dot) => observer.observe(dot))
    return () => observer.disconnect()
  }, [])

  // Card animation
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.ckerja-anim')
    const timers = new Map<HTMLElement, ReturnType<typeof setTimeout>>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          el.classList.remove('leaving')
          const delay = parseInt(el.dataset.delay ?? '0', 10)
          timers.set(el, setTimeout(() => el.classList.add('visible'), delay))
        } else if (el.classList.contains('visible')) {
          clearTimeout(timers.get(el))
          el.classList.remove('visible')
          el.classList.add('leaving')
          const onEnd = () => {
            el.classList.remove('leaving')
            el.removeEventListener('transitionend', onEnd)
          }
          el.addEventListener('transitionend', onEnd)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })
    els.forEach((el) => observer.observe(el))
    return () => { observer.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  return (
    <>
      <Navbar />
      <main>

        {/* ─── CARA KERJA ───────────────────────────── */}
        <section className="section" id="cara-kerja">
          <div className="section-inner">
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <div className="section-label">Cara Kerja</div>
              <h2 className="section-title">Mulai dalam 3 langkah mudah</h2>
              <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
                Tidak perlu keahlian IT. Tim kami siap membantu <br className="br-hide-mobile" /> setup dari awal hingga sekolah siap pakai.
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
                      <p>Isi formulir singkat seputar profil sekolah dan komponen biaya. <br className="br-hide-mobile" />Tim kami menghubungi dalam <br className="br-hide-mobile" />1×24 jam untuk membantu <br className="br-hide-mobile" />proses setup awal.</p>
                      <span className="ckerja-card-icon">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#A4CEFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <p>Upload data siswa dari file <br /> Excel yang sudah ada. Sistem langsung siap men-generate tagihan untuk seluruh siswa<br /> secara otomatis.</p>
                      <span className="ckerja-card-icon ckerja-card-icon--bl">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#A4CEFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <p>Tagihan terkirim, notifikasi <br /> WhatsApp aktif, pembayaran <br /> masuk semua terpantau <br />langsung dari dashboard <br />real-time Anda.</p>
                      <span className="ckerja-card-icon">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#A4CEFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2"/>
                          <path d="M8 21h8M12 17v4"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="ckerja-num">3</div>
                </div>
                <div className="ckerja-center"><div className="ckerja-dot" /></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Image
                    src="/image/StarHero.png"
                    alt="StarHero"
                    width={250}
                    height={250}
                    className="ckerja-star"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* End marker */}
              <div className="ckerja-end">
                {[...Array(7)].map((_, i) => (
                  <span key={i} className={`ckerja-drop ckerja-drop--${i + 1}`} />
                ))}
                <svg className="ckerja-end-icon" width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" fill="#2A5499" stroke="#A4CEFF" strokeWidth="3"/>
                  <polyline points="14,24 21,31 34,17" stroke="#F7DD7D" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

          </div>
        </section>

        {/* ─── PREVIEW PENGINGAT WHATSAPP ───────────── */}
        <section className="section ckerja-wa-section" id="preview-wa">
          <div className="section-inner">
            <div style={{ textAlign: 'center' }}>
              <div className="section-label">Notifikasi Otomatis</div>
              <h2 className="section-title">Begini pengingat yang diterima orang tua</h2>
              <p className="section-subtitle" style={{ margin: '0 auto 2.5rem', textAlign: 'center' }}>
                Begitu tagihan terbit, SiKu otomatis mengirim pengingat lewat WhatsApp lengkap <br className="br-hide-mobile" />
                dengan link pembayaran — seperti contoh berikut.
              </p>
            </div>

            <div className="ckerja-wa-phone">
              <div className="ckerja-wa-bubble">
                <div className="ckerja-wa-bubble-header">
                  <span className="ckerja-wa-avatar">S</span>
                  <span>SiKu Notifikasi</span>
                </div>
                <p className="ckerja-wa-msg">🔔 <strong>Pengingat Tagihan SPP</strong></p>
                <p className="ckerja-wa-msg">
                  Halo Bapak/Ibu, tagihan SPP ananda bulan ini sudah terbit. Yuk selesaikan pembayaran melalui link berikut:
                </p>
                <Link
                  href="/demo-pembayaran"
                  className="ckerja-wa-link"
                  onClick={() => trackCTA('Link Demo Pembayaran (Preview WA)', '/demo-pembayaran')}
                >
                  👉 pakaisiku.id/demo-pembayaran
                </Link>
                <span className="ckerja-wa-time">09:15</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link
                href="/demo-pembayaran"
                className="btn-primary"
                onClick={() => trackCTA('Coba Demo Pembayaran (Cara Kerja)', '/demo-pembayaran')}
              >
                Coba Demo Pembayaran <ArrowCircleIcon />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
