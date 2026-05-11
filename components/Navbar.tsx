'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Wallet, MessageCircle, CreditCard, BarChart3, Building2, GraduationCap, ChevronDown } from 'lucide-react'

const fiturItems = [
  { slug: 'manajemen-spp',      label: 'Manajemen SPP & Tagihan',       icon: <Wallet size={16} /> },
  { slug: 'notifikasi-whatsapp', label: 'Notifikasi WhatsApp Otomatis',  icon: <MessageCircle size={16} /> },
  { slug: 'pembayaran-digital',  label: 'Integrasi Pembayaran Digital',  icon: <CreditCard size={16} /> },
  { slug: 'laporan-dashboard',   label: 'Laporan & Dashboard Real-time', icon: <BarChart3 size={16} /> },
  { slug: 'multi-jenjang',       label: 'Multi-Jenjang & Multi-Sekolah', icon: <Building2 size={16} /> },
  { slug: 'manajemen-siswa',     label: 'Manajemen Siswa & Kelas',       icon: <GraduationCap size={16} /> },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

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
    if (isHome) {
      scrollTo(id)
    } else {
      sessionStorage.setItem('scrollTo', id)
      router.push('/')
    }
  }

  return (
    <nav className="nav">
      <Link href="/" className="nav-logo">
        <Image
          src="/image/LogoSiKu.png"
          alt="SiKu"
          height={44}
          width={120}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Link>

      <div className="nav-links">
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
          Harga
        </Link>

        <Link href="/support" className="nav-hide-mobile">
          Dukungan
        </Link>

        <Link
          href="https://si-ku.vercel.app"
          style={{
            color: 'var(--navy)',
            fontSize: '1.125rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          className="nav-hide-mobile"
        >
          Masuk
        </Link>

        <Link href="https://si-ku.vercel.app/daftar" className="btn-nav">
          Coba Gratis
        </Link>
      </div>
    </nav>
  )
}
