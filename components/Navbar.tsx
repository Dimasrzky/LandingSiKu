'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Wallet, CreditCard, BarChart3, Building2, GraduationCap, ChevronDown, Menu, X } from 'lucide-react'

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const fiturItems = [
  { slug: 'manajemen-spp',      label: 'Manajemen SPP & Tagihan',       icon: <Wallet size={16} /> },
  { slug: 'notifikasi-whatsapp', label: 'Notifikasi WhatsApp Otomatis',  icon: <WhatsAppIcon size={16} /> },
  { slug: 'pembayaran-digital',  label: 'Integrasi Pembayaran Digital',  icon: <CreditCard size={16} /> },
  { slug: 'laporan-dashboard',   label: 'Laporan & Dashboard Real-time', icon: <BarChart3 size={16} /> },
  { slug: 'multi-jenjang',       label: 'Multi-Jenjang & Multi-Sekolah', icon: <Building2 size={16} /> },
  { slug: 'manajemen-siswa',     label: 'Manajemen Siswa & Kelas',       icon: <GraduationCap size={16} /> },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 72
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const goToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setMenuOpen(false)
    if (isHome) {
      scrollTo(id)
    } else {
      sessionStorage.setItem('scrollTo', id)
      router.push('/')
    }
  }

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-logo-card">
          <Image
            src="/image/LogoSiKuBaru.png"
            alt="SiKu"
            height={20}
            width={100}
            style={{ objectFit: 'contain', transform: 'translateY(-3px)' }}
            priority
          />
        </Link>

        <div className="nav-links-card">
          <Link
            href="/"
            className="nav-hide-mobile"
            onClick={(e) => goToSection(e, 'beranda')}
          >
            Beranda
          </Link>

          {/* Fitur dropdown */}
          <div className="nav-dropdown nav-hide-mobile">
            <button className="nav-dropdown-trigger" type="button">
              Fitur <ChevronDown size={14} strokeWidth={2.5} />
            </button>
            <div className="nav-dropdown-menu">
              <div className="nav-dropdown-menu-inner">
                {fiturItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/fitur/${item.slug}`}
                    className="nav-dropdown-item"
                  >
                    <span className="nav-dropdown-icon">{item.icon}</span>
                    <span>
                      <span className="nav-dropdown-item-label">{item.label}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="nav-hide-mobile"
            onClick={(e) => goToSection(e, 'cara-kerja')}
          >
            Cara Kerja
          </Link>

          <Link href="/harga" className="nav-hide-mobile">
            Harga &amp; Paket
          </Link>

          <Link href="/daftar" className="btn-nav nav-hide-mobile">
            Coba Gratis
          </Link>

          {/* Hamburger button */}
          <button
            className="nav-hamburger"
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="nav-mobile-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile menu drawer */}
      <div className={`nav-mobile-menu${menuOpen ? ' nav-mobile-menu--open' : ''}`}>
        <div className="nav-mobile-section-label">Fitur</div>
        {fiturItems.map((item) => (
          <Link
            key={item.slug}
            href={`/fitur/${item.slug}`}
            className="nav-mobile-item"
            onClick={() => setMenuOpen(false)}
          >
            <span className="nav-dropdown-icon">{item.icon}</span>
            <span className="nav-dropdown-item-label">{item.label}</span>
          </Link>
        ))}

        <div className="nav-mobile-divider" />

        <Link
          href="/"
          className="nav-mobile-item"
          onClick={(e) => goToSection(e, 'cara-kerja')}
        >
          Cara Kerja
        </Link>
        <Link href="/harga" className="nav-mobile-item" onClick={() => setMenuOpen(false)}>
          Harga
        </Link>
        <Link href="/support" className="nav-mobile-item" onClick={() => setMenuOpen(false)}>
          Dukungan
        </Link>

        <div className="nav-mobile-divider" />

        <Link href="/daftar" className="btn-nav nav-mobile-cta" onClick={() => setMenuOpen(false)}>
          Coba Gratis
        </Link>
      </div>
    </>
  )
}
