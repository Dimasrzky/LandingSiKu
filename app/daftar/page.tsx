'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

interface FormData {
  nama: string
  email: string
  jabatan: string
  sekolah: string
  jenjang: string
  jumlah: string
  provinsi: string
  kota: string
  jadwalTanggal: string
  jadwalWaktu: string
  sumber: string
  tantangan: string
}

interface FormErrors {
  nama?: string
  email?: string
  jabatan?: string
  sekolah?: string
  jenjang?: string
  provinsi?: string
  kota?: string
  jadwalTanggal?: string
  tantangan?: string
  sumber?: string
}

const JENJANG_OPTIONS = [
  'TK / PAUD',
  'SD / MI',
  'SMP / MTs',
  'SMA / SMK / MA',
  'Multi-jenjang (Yayasan)',
]

const JUMLAH_OPTIONS = [
  'Di bawah 100 siswa',
  '100 – 300 siswa',
  '300 – 600 siswa',
  'Di atas 600 siswa',
]

const JABATAN_OPTIONS = [
  'Bendahara Sekolah',
  'Bendahara Yayasan',
  'Kepala Sekolah',
  'Kepala Yayasan',
  'Pemilik / Direktur',
  'Lainnya',
]

const WAKTU_OPTIONS = [
  'Pagi (09:00 – 12:00)',
  'Siang (12:00 – 15:00)',
  'Sore (15:00 – 17:00)',
]

const SUMBER_OPTIONS = [
  'Google / Mesin Pencari',
  'Instagram / Facebook',
  'Rekomendasi Teman / Kolega',
  'WhatsApp / Broadcast',
  'Lainnya',
]

export default function DaftarPage() {
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#091828'
    return () => { document.body.style.backgroundColor = prev }
  }, [])

  const [form, setForm] = useState<FormData>({
    nama: '',
    email: '',
    jabatan: '',
    sekolah: '',
    jenjang: '',
    jumlah: '',
    provinsi: '',
    kota: '',
    jadwalTanggal: '',
    jadwalWaktu: '',
    sumber: '',
    tantangan: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Hapus error saat user mulai mengetik
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const [validationAlert, setValidationAlert] = useState<string[]>([])
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    const missing: string[] = []

    if (!form.nama.trim())        { newErrors.nama = 'Nama wajib diisi';            missing.push('Nama Lengkap') }
    if (!form.email.trim())       { newErrors.email = 'Email wajib diisi';           missing.push('Email') }
    else if (!/\S+@\S+\.\S+/.test(form.email)) { newErrors.email = 'Format email tidak valid'; missing.push('Email (format tidak valid)') }
    if (!form.jabatan)            { newErrors.jabatan = 'Pilih jabatan Anda';        missing.push('Jabatan') }
    if (!form.sekolah.trim())     { newErrors.sekolah = 'Nama sekolah wajib diisi'; missing.push('Nama Sekolah / Yayasan') }
    if (!form.jenjang)            { newErrors.jenjang = 'Pilih jenjang sekolah';    missing.push('Jenjang Sekolah') }
    if (!form.provinsi.trim())    { newErrors.provinsi = 'Provinsi wajib diisi';    missing.push('Provinsi') }
    if (!form.kota.trim())        { newErrors.kota = 'Kota wajib diisi';            missing.push('Kota / Kabupaten') }
    if (!form.jadwalTanggal)      { newErrors.jadwalTanggal = 'Tanggal demo wajib diisi'; missing.push('Preferensi Tanggal Demo') }
    if (!form.tantangan.trim())   { newErrors.tantangan = 'Tantangan wajib diisi';  missing.push('Tantangan yang Ingin Diselesaikan') }
    if (!form.sumber)             { newErrors.sumber = 'Pilih sumber informasi';    missing.push('Sumber Informasi') }

    setErrors(newErrors)
    setValidationAlert(missing)
    return missing.length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) {
      setTimeout(() => alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
      return
    }

    setValidationAlert([])
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/daftar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.message || 'server error')
      }

      setIsSuccess(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Gagal mengirim pendaftaran.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div
        className="form-page"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/image/BgDaftarSiKu.jpg')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="form-page-inner">

          <div className="form-wrapper">
            <Link href="/" className="form-page-back fp-fade" style={{ '--fd': '0.25s' } as React.CSSProperties}>
              ← Kembali ke beranda
            </Link>
            {!isSuccess ? (
              <>
                <div className="form-header-label fp-fade" style={{ '--fd': '0.32s' } as React.CSSProperties}>Demo Gratis 1 Bulan</div>
                <h1 className="form-title fp-fade" style={{ '--fd': '0.4s' } as React.CSSProperties}>Jadwalkan Sekarang</h1>
                <p className="form-subtitle fp-fade" style={{ '--fd': '0.48s' } as React.CSSProperties}>
                  Isi formulir di bawah. Tim kami akan menghubungi Anda melalui
                  Email dalam <strong>1×24 jam</strong> untuk proses onboarding.
                  Tidak perlu tanda tangan kontrak, tidak perlu kartu kredit.
                </p>

                {validationAlert.length > 0 && (
                  <div className="form-validation-alert" ref={alertRef}>
                    <div className="form-validation-alert-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      Mohon lengkapi {validationAlert.length} formulir berikut:
                    </div>
                    <ul className="form-validation-alert-list">
                      {validationAlert.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                )}

                {/* Nama & Email */}
                <div className="form-row fp-fade" style={{ '--fd': '0.56s' } as React.CSSProperties}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="nama">
                      Nama Lengkap <span>*</span>
                    </label>
                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      className={`form-input${errors.nama ? ' error' : ''}`}
                      placeholder="cth: Bu Sari Dewi"
                      value={form.nama}
                      onChange={handleChange}
                    />
                    {errors.nama && (
                      <div className="form-error-msg">{errors.nama}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email <span>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-input${errors.email ? ' error' : ''}`}
                      placeholder="cth: bu.sari.dewi@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="form-error-msg">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Jabatan */}
                <div className="form-group fp-fade" style={{ '--fd': '0.62s' } as React.CSSProperties}>
                  <label className="form-label" htmlFor="jabatan">
                    Jabatan Anda <span>*</span>
                  </label>
                  <select
                    id="jabatan"
                    name="jabatan"
                    className={`form-select${errors.jabatan ? ' error' : ''}`}
                    value={form.jabatan}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Jabatan --</option>
                    {JABATAN_OPTIONS.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                  {errors.jabatan && (
                    <div className="form-error-msg">{errors.jabatan}</div>
                  )}
                </div>

                {/* Nama Sekolah */}
                <div className="form-group fp-fade" style={{ '--fd': '0.68s' } as React.CSSProperties}>
                  <label className="form-label" htmlFor="sekolah">
                    Nama Sekolah / Yayasan <span>*</span>
                  </label>
                  <input
                    id="sekolah"
                    name="sekolah"
                    type="text"
                    className={`form-input${errors.sekolah ? ' error' : ''}`}
                    placeholder="cth: SD Islam Terpadu Al-Hikmah"
                    value={form.sekolah}
                    onChange={handleChange}
                  />
                  {errors.sekolah && (
                    <div className="form-error-msg">{errors.sekolah}</div>
                  )}
                </div>

                {/* Jenjang & Jumlah Siswa */}
                <div className="form-row fp-fade" style={{ '--fd': '0.74s' } as React.CSSProperties}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="jenjang">
                      Jenjang Sekolah <span>*</span>
                    </label>
                    <select
                      id="jenjang"
                      name="jenjang"
                      className={`form-select${errors.jenjang ? ' error' : ''}`}
                      value={form.jenjang}
                      onChange={handleChange}
                    >
                      <option value="">-- Pilih Jenjang --</option>
                      {JENJANG_OPTIONS.map((j) => (
                        <option key={j} value={j}>{j}</option>
                      ))}
                    </select>
                    {errors.jenjang && (
                      <div className="form-error-msg">{errors.jenjang}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="jumlah">
                      Jumlah Siswa (estimasi)
                    </label>
                    <select
                      id="jumlah"
                      name="jumlah"
                      className="form-select"
                      value={form.jumlah}
                      onChange={handleChange}
                    >
                      <option value="">-- Pilih Rentang --</option>
                      {JUMLAH_OPTIONS.map((j) => (
                        <option key={j} value={j}>{j}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Provinsi */}
                <div className="form-group fp-fade" style={{ '--fd': '0.80s' } as React.CSSProperties}>
                  <label className="form-label" htmlFor="provinsi">
                    Provinsi <span>*</span>
                  </label>
                  <input
                    id="provinsi"
                    name="provinsi"
                    type="text"
                    className={`form-input${errors.provinsi ? ' error' : ''}`}
                    placeholder="cth: DI Yogyakarta"
                    value={form.provinsi}
                    onChange={handleChange}
                  />
                  {errors.provinsi && (
                    <div className="form-error-msg">{errors.provinsi}</div>
                  )}
                </div>

                {/* Kota */}
                <div className="form-group fp-fade" style={{ '--fd': '0.86s' } as React.CSSProperties}>
                  <label className="form-label" htmlFor="kota">
                    Kota / Kabupaten <span>*</span>
                  </label>
                  <input
                    id="kota"
                    name="kota"
                    type="text"
                    className={`form-input${errors.kota ? ' error' : ''}`}
                    placeholder="cth: Sleman"
                    value={form.kota}
                    onChange={handleChange}
                  />
                  {errors.kota && (
                    <div className="form-error-msg">{errors.kota}</div>
                  )}
                </div>

                {/* Preferensi Jadwal Demo */}
                <div className="form-row fp-fade" style={{ '--fd': '0.92s' } as React.CSSProperties}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="jadwalTanggal">
                      Preferensi Tanggal Demo <span>*</span>
                    </label>
                    <input
                      id="jadwalTanggal"
                      name="jadwalTanggal"
                      type="date"
                      className={`form-input${errors.jadwalTanggal ? ' error' : ''}`}
                      value={form.jadwalTanggal}
                      onChange={handleChange}
                    />
                    {errors.jadwalTanggal && (
                      <div className="form-error-msg">{errors.jadwalTanggal}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="jadwalWaktu">
                      Preferensi Waktu
                    </label>
                    <select
                      id="jadwalWaktu"
                      name="jadwalWaktu"
                      className="form-select"
                      value={form.jadwalWaktu}
                      onChange={handleChange}
                    >
                      <option value="">-- Pilih Waktu --</option>
                      {WAKTU_OPTIONS.map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tantangan */}
                <div className="form-group fp-fade" style={{ '--fd': '0.98s' } as React.CSSProperties}>
                  <label className="form-label" htmlFor="tantangan">
                    Tantangan utama yang ingin diselesaikan <span>*</span>
                  </label>
                  <textarea
                    id="tantangan"
                    name="tantangan"
                    className={`form-textarea${errors.tantangan ? ' error' : ''}`}
                    rows={3}
                    placeholder="cth: Rekap SPP masih manual di Excel, susah pantau tunggakan..."
                    value={form.tantangan}
                    onChange={handleChange}
                  />
                  {errors.tantangan && (
                    <div className="form-error-msg">{errors.tantangan}</div>
                  )}
                </div>

                {/* Sumber Informasi */}
                <div className="form-group fp-fade" style={{ '--fd': '1.04s' } as React.CSSProperties}>
                  <label className="form-label" htmlFor="sumber">
                    Dari mana Anda mengetahui SiKu? <span>*</span>
                  </label>
                  <select
                    id="sumber"
                    name="sumber"
                    className={`form-select${errors.sumber ? ' error' : ''}`}
                    value={form.sumber}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Sumber --</option>
                    {SUMBER_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.sumber && (
                    <div className="form-error-msg">{errors.sumber}</div>
                  )}
                </div>

                <button
                  className="submit-btn fp-fade"
                  style={{ '--fd': '1.1s' } as React.CSSProperties}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Mendaftarkan...'
                    : 'Jadwalkan Sekarang — 100% Gratis 1 Bulan ✦'}
                </button>

                {submitError && (
                  <div className="form-submit-error">{submitError}</div>
                )}

                <div className="form-privacy">
                  <span>
                    Data Anda aman dan tidak akan disebarkan ke pihak ketiga manapun.<br />
                    Dengan mendaftar, Anda setuju untuk dihubungi oleh tim SiKu melalui Email.
                  </span>
                </div>
              </>
            ) : (
              /* ─── SUCCESS STATE ─── */
              <div className="success-state">
                <svg className="success-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle className="circle" cx="50" cy="50" r="46" />
                  <path className="check" d="M 28 50 L 43 66 L 72 34" />
                </svg>
                <div className="success-title">Pendaftaran Berhasil!</div>
                <div className="success-desc">
                  Terima kasih sudah mendaftar, <strong>{form.nama}</strong>!
                  <br /><br />
                  Tim SiKu akan menghubungi Anda melalui Email dalam{' '}
                  <strong>1×24 jam</strong> untuk memulai proses onboarding
                  sekolah <strong>{form.sekolah}</strong>.
                  <br /><br />
                  Sambil menunggu, Anda bisa langsung chat dengan tim kami.
                </div>

                <a
                  href={`mailto:info@siku.id?subject=Pendaftaran&body=Halo Tim SiKu, saya ${form.nama} dari ${form.sekolah}. Saya ingin mendaftar untuk menggunakan layanan SiKu.`}
                  className="email-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat Email Tim SiKu
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}