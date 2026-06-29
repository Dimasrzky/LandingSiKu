'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqAccordion from '@/components/FaqAccordion'
import '../legalitas.css'
import '../../bantuan/bantuan.css'


const CATEGORIES = [
  {
    title: 'Pendahuluan',
    items: [
      {
        id: 'kp-3-1',
        question: 'Pendahuluan',
        answer: 'Equanusa, selaku pengelola SiKu, menghormati privasi Anda dan berkomitmen melindungi data pribadi sesuai Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi ("UU PDP") dan peraturan terkait. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data dalam Layanan.',
      },
    ],
  },
  {
    title: 'Data yang Kami Kumpulkan',
    items: [
      {
        id: 'kp-3-2',
        question: 'Data yang Kami Kumpulkan',
        answer: 'Kami mengumpulkan beberapa kategori data berikut:',
        bullets: [
          'Data akun Pengguna: nama, jabatan (misalnya bendahara), email, nomor telepon, dan kredensial akun.',
          'Data sekolah: nama sekolah/yayasan, alamat, dan informasi rekening untuk keperluan penyaluran dana melalui Penyedia Pembayaran.',
          'Data tagihan dan siswa: nama siswa, kelas, nominal tagihan, dan data Wali yang diinput oleh sekolah untuk penerbitan tagihan dan notifikasi.',
          'Data transaksi: catatan pembayaran, status, dan waktu transaksi.',
          'Data teknis: informasi perangkat dan log akses yang diperlukan untuk keamanan dan operasional Layanan.',
        ],
      },
    ],
  },
  {
    title: 'Peran & Tujuan Penggunaan Data',
    items: [
      {
        id: 'kp-3-3',
        question: 'Peran Kami atas Data',
        answer: 'Untuk data akun dan data sekolah, SiKu bertindak sebagai Pengendali Data Pribadi. Untuk data siswa dan Wali yang dimasukkan oleh sekolah, sekolah bertindak sebagai Pengendali Data Pribadi dan SiKu bertindak sebagai Pemroses Data Pribadi yang mengolah data tersebut atas instruksi sekolah, semata-mata untuk menjalankan fungsi Layanan.',
      },
      {
        id: 'kp-3-4',
        question: 'Tujuan Penggunaan Data',
        answer: 'Data digunakan untuk:',
        bullets: [
          'Menyediakan dan mengoperasikan Layanan.',
          'Menerbitkan dan merekonsiliasi tagihan.',
          'Memproses pembayaran melalui Penyedia Pembayaran.',
          'Mengirim notifikasi kepada Wali.',
          'Menyusun laporan keuangan.',
          'Menjaga keamanan sistem.',
          'Memenuhi kewajiban hukum yang berlaku.',
        ],
      },
      {
        id: 'kp-3-5',
        question: 'Dasar Pemrosesan',
        answer: 'Pemrosesan data dilakukan berdasarkan persetujuan, pelaksanaan perjanjian (langganan dan penggunaan Layanan), dan/atau pemenuhan kewajiban hukum yang berlaku.',
      },
    ],
  },
  {
    title: 'Pembagian Data & Keamanan',
    items: [
      {
        id: 'kp-3-6',
        question: 'Pembagian Data kepada Pihak Ketiga',
        answer: 'Kami dapat membagikan data kepada pihak ketiga yang mendukung operasional Layanan secara terbatas. Kami tidak menjual data pribadi Anda kepada pihak mana pun.',
        bullets: [
          'Penyedia Pembayaran untuk memproses transaksi.',
          'Penyedia infrastruktur dan basis data untuk hosting dan penyimpanan.',
          'Penyedia layanan pesan untuk mengirim notifikasi kepada Wali.',
        ],
      },
      {
        id: 'kp-3-7',
        question: 'Keamanan Data',
        answer: 'Kami menerapkan langkah pengamanan yang wajar, termasuk enkripsi pada jalur transmisi, pembatasan akses, dan kontrol kredensial, untuk melindungi data dari akses yang tidak sah. Meski demikian, tidak ada sistem yang sepenuhnya bebas risiko, dan Pengguna turut bertanggung jawab menjaga keamanan kredensial akunnya.',
      },
      {
        id: 'kp-3-8',
        question: 'Penyimpanan dan Retensi',
        answer: 'Data disimpan selama masa langganan aktif dan selama diperlukan untuk tujuan operasional, hukum, dan audit. Setelah tidak lagi diperlukan, data akan dihapus atau dianonimkan sesuai ketentuan yang berlaku.',
      },
    ],
  },
  {
    title: 'Hak Anda',
    items: [
      {
        id: 'kp-3-9',
        question: 'Hak Anda sebagai Subjek Data Pribadi',
        answer: 'Sesuai UU PDP, Anda berhak untuk:',
        bullets: [
          'Memperoleh informasi atas pemrosesan data Anda.',
          'Mengakses dan memperoleh salinan data.',
          'Memperbaiki atau memperbarui data.',
          'Mengakhiri pemrosesan, menghapus, dan/atau memusnahkan data.',
          'Menarik persetujuan.',
          'Mengajukan keberatan atas pemrosesan tertentu.',
          'Menuntut ganti rugi atas pelanggaran.',
        ],
      },
    ],
  },
  {
    title: 'Perubahan & Kontak',
    items: [
      {
        id: 'kp-3-10',
        question: 'Perubahan Kebijakan',
        answer: 'Kebijakan ini dapat diperbarui dari waktu ke waktu. Versi terbaru akan dipublikasikan pada Layanan dengan mencantumkan tanggal pembaruan.',
      },
      {
        id: 'kp-3-11',
        question: 'Kontak',
        answer: 'Untuk pertanyaan, permohonan hak subjek data, atau keluhan terkait privasi, silakan hubungi kami melalui email resmi atau nomor WhatsApp bisnis yang tersedia di halaman Hubungi Kami. Untuk data siswa dan Wali, permohonan dapat diarahkan melalui sekolah selaku Pengendali Data.',
      },
    ],
  },
]

export default function KebijakanPrivasiPage() {
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

  return (
    <>
      <Navbar />
      <main className='bn-main'>

        <section className='bn-header'>
          <div className='bn-header-inner'>
            <div className='bn-header-text'>
              <div className='bn-label' data-bn-animate style={{ '--delay': '0s' } as React.CSSProperties}>
                Legalitas
              </div>
              <h1 className='bn-h1' data-bn-animate style={{ '--delay': '0.1s' } as React.CSSProperties}>
                Kebijakan Privasi
              </h1>
              <p className='bn-desc' data-bn-animate style={{ '--delay': '0.2s' } as React.CSSProperties}>
                Kami menghormati privasi Anda dan berkomitmen melindungi
                data pribadi sesuai UU No. 27 Tahun 2022 tentang
                Pelindungan Data Pribadi.
              </p>
            </div>
            <Image
              src='/image/privacy.png'
              alt=''
              width={220}
              height={220}
              className='bn-header-deco bn-header-img-enter'
              style={{ objectFit: 'contain' }}
              aria-hidden='true'
              priority
            />
          </div>
        </section>

        <section className='lg-content'>
          <div className='lg-content-inner'>
            <FaqAccordion categories={CATEGORIES} />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
