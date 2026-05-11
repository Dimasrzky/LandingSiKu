export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-logo">SiKu</div>
          <div className="footer-tagline">Sistem Keuangan Sekolah Swasta Modern</div>
        </div>
        <div className="footer-links">
          <a href="mailto:halo@siku.id">halo@siku.id</a>
        </div>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} SiKu. Dibuat dengan untuk kemajuan pendidikan Indonesia.
        <br />
        <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>
          * Testimoni merupakan ilustrasi representatif. Program demo gratis berlaku untuk pendaftar terpilih.
        </span>
      </div>
    </footer>
  )
}