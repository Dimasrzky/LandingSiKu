import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import siteIcon from '../app/icon.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Kiri: logo + desc + badge */}
        <div className="footer-left">
          <div className="footer-logo-wrap">
            <Image src={siteIcon} alt="SiKu icon" width={70} height={80} style={{ transform: 'translate(-10px, -13px)' }}/>
            <Image src="/image/LogoSiKuText.png" alt="SiKu" width={92} height={20} style={{ objectFit: 'contain', transform: 'translate(-15px, -15px)' }} />
          </div>
          <p className="footer-by">by Equanusa</p>
          <p className="footer-desc">
            Sistem keuangan sekolah swasta yang simpel, akurat, dan siap audit dirancang untuk yayasan skala kecil hingga menengah di Indonesia.
          </p>
          <div className="footer-badge">
            <span className="footer-badge-dot" />
            Tersedia · Batch Pertama Terbuka
          </div>
        </div>

        {/* Tengah: Legalitas */}
        <div className="footer-mid">
          <h3 className="footer-contact-title">LEGALITAS</h3>
          <div className="footer-legal-links">
            <Link href="/legalitas/syarat-ketentuan" className="footer-legal-link">
              Syarat &amp; Ketentuan
            </Link>
            <Link href="/legalitas/kebijakan-pengembalian-dana" className="footer-legal-link">
              Pengembalian Dana
            </Link>
            <Link href="/legalitas/kebijakan-privasi" className="footer-legal-link">
              Kebijakan Privasi
            </Link>
          </div>
        </div>

        {/* Kanan: kontak */}
        <div className="footer-right">
          <h3 className="footer-contact-title">HUBUNGI KAMI</h3>
          <div className="footer-socials">
            <a href="mailto:equanusa@gmail.com" className="footer-social-btn" aria-label="Email">
              <span className="footer-social-icon">
                <Image src="/icons/IconEmail.png" alt="Email icon" width={22} height={22} style={{ objectFit: 'contain' }} />
              </span>
              <span>equanusa@gmail.com</span>
            </a>
            <a href="https://wa.me/6282260400408" className="footer-social-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <span className="footer-social-icon">
                <Image src="/icons/IconWAWhite.png" alt="WhatsApp icon" width={22} height={22} style={{ objectFit: 'contain' }} />
              </span>
              <span>+62 822-6040-0408</span>
            </a>
            <a href="https://instagram.com/pakaisiku" className="footer-social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <span className="footer-social-icon">
                <Image src="/icons/IconInstagram.png" alt="Instagram icon" width={22} height={22} style={{ objectFit: 'contain' }} />
              </span>
              <span>@pakaisiku</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <address className="footer-address">
          <MapPin size={20} className="footer-address-pin" />
          KM 12, Jl. Kaliurang Jl. Candi 3, RT.01/RW.05, Candi,
          Sardonoharjo, Kec. Ngaglik, Kabupaten Sleman,
          Daerah Istimewa Yogyakarta 55581
        </address>
        <div className="footer-bottom-row">
          <span className="footer-copy-text">© {new Date().getFullYear()} Equanusa. Semua hak dilindungi.</span>
          <a href="https://equanusa.vercel.app/" target="_blank" rel="noopener noreferrer">
            <Image src="/image/LogoEquanusaWhite.png" alt="Equanusa" width={50} height={24} style={{ objectFit: 'contain', opacity: 1 }} />
          </a>
        </div>
      </div>
    </footer>
  )
}
