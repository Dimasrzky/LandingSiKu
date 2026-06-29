'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqAccordion from '@/components/FaqAccordion'
import '../bantuan.css'

const FAQ_CATEGORIES = [
  {
    title: 'Tentang SiKu',
    items: [
      {
        id: '1-1',
        question: 'Apa itu SiKu?',
        answer:
          'SiKu adalah platform SaaS berbasis web untuk membantu sekolah mengelola keuangan secara lebih rapi dan otomatis, mulai dari pembuatan tagihan digital, verifikasi pembayaran, pengingat tagihan ke orang tua melalui WhatsApp, hingga pembuatan laporan keuangan yang siap diaudit. SiKu dirancang untuk menggantikan proses manual yang biasa dilakukan lewat Excel, buku kas, dan WhatsApp.',
      },
      {
        id: '1-2',
        question: 'SiKu ditujukan untuk siapa?',
        answer:
          'SiKu ditujukan untuk sekolah swasta kecil hingga menengah (sekitar 50–600 siswa) dan homeschooling center yang:',
        bullets: [
          'Belum menggunakan sistem keuangan digital, atau masih semi-manual',
          'Mengandalkan Excel, WhatsApp, atau buku kas untuk pencatatan dan penagihan',
          'Memiliki anggaran operasional terbatas',
        ],
      },
      {
        id: '1-3',
        question: 'Apakah SiKu dapat digunakan oleh semua jenjang pendidikan?',
        answer:
          'SiKu saat ini dirancang dan divalidasi untuk jenjang TK, SD, SMP, SMA, dan SMK swasta, serta homeschooling terorganisir.',
      },
      {
        id: '1-4',
        question: 'Apa saja proses administrasi yang dapat dikelola melalui SiKu?',
        answer: 'SiKu dapat membantu mengelola berbagai proses administrasi keuangan sekolah, antara lain:',
        bullets: [
          'Pembuatan tagihan digital multi-komponen per siswa/kelas (SPP, seragam, ekskul, dan biaya lainnya)',
          'Verifikasi status pembayaran secara otomatis melalui payment gateway',
          'Pengingat tagihan otomatis ke orang tua melalui WhatsApp',
          'Dashboard real-time yang dapat diakses bendahara dan kepala sekolah secara bersamaan',
          'Pembuatan laporan keuangan otomatis (pemasukan & pengeluaran) yang siap diserahkan ke yayasan',
        ],
      },
    ],
  },
  {
    title: 'Implementasi & Penggunaan',
    items: [
      {
        id: '2-1',
        question: 'Bagaimana proses implementasi SiKu di sekolah?',
        answer:
          'Proses implementasi terdiri dari konsultasi awal kebutuhan sekolah, pembuatan akun, pendampingan setup data siswa dan komponen tagihan, pelatihan untuk bendahara/staf administrasi, dan pendampingan saat penggunaan awal. Seluruh proses ini tidak dikenakan biaya — ini merupakan bentuk komitmen dari SiKu kepada sekolah.',
      },
      {
        id: '2-2',
        question: 'Berapa lama proses implementasi hingga SiKu siap digunakan?',
        answer:
          'Lama implementasi bergantung pada ukuran sekolah dan kesiapan data (jumlah siswa, kompleksitas komponen tagihan, kondisi data lama). Tim SiKu akan memberikan estimasi waktu implementasi secara spesifik setelah sesi konsultasi awal dengan sekolah Anda.',
      },
      {
        id: '2-3',
        question: 'Apakah sekolah memerlukan instalasi atau perangkat khusus?',
        answer:
          'Tidak. SiKu berbasis web, sehingga dapat diakses melalui browser di komputer, laptop, atau smartphone tanpa instalasi aplikasi tambahan. Sekolah hanya memerlukan koneksi internet, dan orang tua menerima notifikasi melalui WhatsApp.',
      },
      {
        id: '2-4',
        question: 'Apakah SiKu menyediakan pelatihan bagi guru dan staf administrasi?',
        answer:
          'Ya. SiKu menyediakan pelatihan dan pendampingan langsung bagi bendahara dan staf administrasi sekolah secara gratis, mengingat banyak bendahara sekolah bukan berlatar belakang akuntansi sehingga literasi digitalnya bervariasi.',
      },
      {
        id: '2-5',
        question: 'Apakah data dari sistem lama dapat dipindahkan ke SiKu?',
        answer:
          'Ya, tim SiKu membantu proses migrasi data dasar (misalnya data siswa dan riwayat tagihan) dari Excel atau pencatatan manual ke SiKu sebagai bagian dari proses onboarding. Kompleksitas dan kelengkapan migrasi akan dibahas pada sesi konsultasi awal, karena kualitas data lama di setiap sekolah berbeda-beda.',
      },
    ],
  },
  {
    title: 'Dukungan & Bantuan',
    items: [
      {
        id: '3-1',
        question: 'Siapa yang dapat saya hubungi jika mengalami kendala?',
        answer:
          'Sekolah dapat menghubungi tim dukungan SiKu melalui nomor WhatsApp atau email tim Equanusa yang tertera pada website SiKu.',
      },
      {
        id: '3-2',
        question: 'Pada jam berapa layanan dukungan tersedia?',
        answer:
          'Layanan dukungan tim SiKu tersedia setiap Senin – Sabtu, pukul 09.00 – 18.00 WIB.',
      },
      {
        id: '3-3',
        question: 'Berapa lama estimasi waktu respon dari tim SiKu?',
        answer:
          'Tim berkomitmen untuk memberikan respon awal dalam waktu kurang dari 1 jam selama jam operasional (Senin–Sabtu). Apabila Anda menghubungi kami di luar jam operasional atau pada hari libur, pesan Anda akan kami tindak lanjuti pada hari kerja berikutnya secepatnya.',
      },
      {
        id: '3-4',
        question: 'Bagaimana jika sekolah membutuhkan bantuan di luar jam operasional?',
        answer:
          'Anda tetap dapat menghubungi tim kapan saja melalui kanal layanan yang tersedia. Seluruh pesan yang masuk di luar jam operasional akan kami terima dan menjadi prioritas untuk ditindaklanjuti pada hari kerja berikutnya.',
      },
    ],
  },
  {
    title: 'Data & Keamanan',
    items: [
      {
        id: '4-1',
        question: 'Bagaimana SiKu menjaga keamanan data sekolah?',
        answer:
          'Data SiKu disimpan menggunakan infrastruktur database dengan Row Level Security, yang memastikan setiap sekolah hanya dapat mengakses datanya sendiri dalam arsitektur multitenant. Sistem juga didukung backup otomatis harian untuk mencegah kehilangan data.',
      },
      {
        id: '4-2',
        question: 'Siapa yang dapat mengakses data sekolah?',
        answer:
          'Hanya pihak sekolah yang berwenang (bendahara dan kepala sekolah/yayasan sesuai peran akses masing-masing) yang dapat mengakses data keuangan sekolahnya. Data satu sekolah tidak dapat diakses oleh sekolah lain pengguna SiKu, karena arsitektur sistem memisahkan data setiap sekolah secara terstruktur.',
      },
      {
        id: '4-3',
        question: 'Apakah data akan tetap aman jika terjadi gangguan sistem?',
        answer:
          'SiKu menjalankan backup data otomatis setiap hari, sehingga risiko kehilangan data akibat gangguan sistem dapat diminimalkan. Untuk skenario gangguan layanan pihak ketiga (payment gateway atau WhatsApp API), SiKu tetap menyimpan riwayat transaksi yang sudah tercatat di sistem.',
      },
      {
        id: '4-4',
        question: 'Apakah sekolah tetap memiliki hak atas seluruh data yang tersimpan di SiKu?',
        answer:
          'Ya. Seluruh data keuangan, data siswa, dan riwayat transaksi yang dimasukkan ke SiKu tetap menjadi milik sekolah. SiKu berfungsi sebagai platform pengelola, bukan pemilik data.',
      },
    ],
  },
  {
    title: 'Berlangganan & Layanan',
    items: [
      {
        id: '5-1',
        question: 'Bagaimana cara mulai menggunakan SiKu?',
        answer:
          'Sekolah dapat mengisi form yang ada pada website SiKu untuk mengikuti program demo, dilanjutkan dengan sesi konsultasi, onboarding gratis, dan pendampingan implementasi awal.',
      },
      {
        id: '5-2',
        question: 'Apakah tersedia demo atau uji coba sebelum berlangganan?',
        answer:
          'Ya. SiKu menawarkan program pilot tanpa biaya awal, sehingga sekolah dapat merasakan langsung manfaat sistem sebelum memutuskan berlangganan secara penuh.',
      },
      {
        id: '5-3',
        question: 'Apakah SiKu memproses atau menyimpan pembayaran sekolah?',
        answer:
          'Tidak. SiKu tidak menampung dana sekolah. Pembayaran dari orang tua diproses melalui payment gateway resmi dan dana masuk langsung ke rekening sekolah. SiKu hanya mencatat dan merekap transaksi yang berhasil untuk keperluan laporan dan penagihan biaya layanan (transaction fee) ke sekolah setiap bulan.',
      },
      {
        id: '5-4',
        question: 'Bagaimana jika terjadi kendala pada proses pembayaran?',
        answer:
          'Jika orang tua mengalami kendala saat membayar (misalnya kegagalan transaksi melalui virtual account/QRIS), sekolah dapat menghubungi tim dukungan SiKu untuk membantu penelusuran status transaksi melalui sistem dan payment gateway terkait.',
      },
    ],
  },
]

type FormState = { nama: string; email: string; pertanyaan: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function FaqPage() {
  const [form, setForm] = useState<FormState>({ nama: '', email: '', pertanyaan: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const els = document.querySelectorAll('[data-bn-animate]')
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/bantuan-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        setForm({ nama: '', email: '', pertanyaan: '' })
      } else {
        setStatus('error')
        setErrorMsg(json.message || 'Terjadi kesalahan. Coba lagi.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Terjadi kesalahan. Periksa koneksi Anda dan coba lagi.')
    }
  }

  return (
    <>
      <Navbar />
      <main className='bn-main'>

        {/* ─── HEADER ─────────────────────────────────── */}
        <section className='bn-header'>
          <div className='bn-header-inner'>
            <div className='bn-header-text'>
              <div className='bn-label' data-bn-animate style={{ '--delay': '0s' } as React.CSSProperties}>
                Bantuan
              </div>
              <h1 className='bn-h1' data-bn-animate style={{ '--delay': '0.1s' } as React.CSSProperties}>
                Pertanyaan yang Sering<br />Ditanyakan
              </h1>
              <p className='bn-desc' data-bn-animate style={{ '--delay': '0.2s' } as React.CSSProperties}>
                Temukan jawaban atas pertanyaan umum seputar SiKu.<br />
                Belum menemukan jawaban? Kirim pertanyaan Anda di bawah.
              </p>
            </div>
            <Image
              src='/image/FAQ.png'
              alt=''
              width={280}
              height={280}
              className='bn-header-deco bn-header-img-enter'
              style={{ objectFit: 'contain' }}
              aria-hidden='true'
              priority
            />
          </div>
        </section>

        {/* ─── FAQ ACCORDION ──────────────────────────── */}
        <section className='faq-section'>
          <div className='faq-section-inner'>
            <FaqAccordion categories={FAQ_CATEGORIES} />
          </div>
        </section>

        {/* ─── FORM SECTION ──────────────────────────── */}
        <section className='faq-form-section'>
          <div className='faq-form-inner'>
            <h2 className='faq-form-title' data-bn-animate style={{ '--delay': '0s' } as React.CSSProperties}>
              Belum menemukan jawaban<br />yang Anda cari?
            </h2>
            <p className='faq-form-desc' data-bn-animate style={{ '--delay': '0.1s' } as React.CSSProperties}>
              Kirim pertanyaan Anda dan tim SiKu akan membalas melalui email dalam kurang dari 1 jam di jam operasional.
            </p>

            <form className='faq-form' onSubmit={handleSubmit} noValidate>
              <div className='faq-form-row'>
                <label className='faq-form-label' htmlFor='nama'>Nama Lengkap</label>
                <input
                  id='nama'
                  name='nama'
                  type='text'
                  className='faq-form-input'
                  placeholder='Nama Anda'
                  value={form.nama}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div className='faq-form-row'>
                <label className='faq-form-label' htmlFor='email'>Email</label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  className='faq-form-input'
                  placeholder='email@sekolah.com'
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div className='faq-form-row'>
                <label className='faq-form-label' htmlFor='pertanyaan'>Pertanyaan Anda</label>
                <textarea
                  id='pertanyaan'
                  name='pertanyaan'
                  className='faq-form-textarea'
                  placeholder='Tuliskan pertanyaan Anda di sini...'
                  value={form.pertanyaan}
                  onChange={handleChange}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'success' && (
                <div className='faq-form-feedback faq-form-feedback--success'>
                  Pertanyaan Anda berhasil dikirim. Tim kami akan segera membalas melalui email.
                </div>
              )}

              {status === 'error' && (
                <div className='faq-form-feedback faq-form-feedback--error'>
                  {errorMsg}
                </div>
              )}

              <button
                type='submit'
                className='faq-form-btn'
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Mengirim...' : 'Kirim Pertanyaan'}
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
