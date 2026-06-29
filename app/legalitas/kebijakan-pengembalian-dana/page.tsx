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
    title: 'Ruang Lingkup',
    items: [
      {
        id: 'kpd-2-1',
        question: 'Ruang Lingkup',
        answer: 'Kebijakan ini menjelaskan ketentuan pengembalian dana atas dua jenis transaksi yang berbeda: (a) biaya langganan Layanan antara sekolah dan SiKu, dan (b) pembayaran tagihan sekolah oleh Wali. Penting untuk dipahami bahwa kedua jenis transaksi ini ditangani oleh pihak yang berbeda.',
      },
    ],
  },
  {
    title: 'Pengembalian Biaya Langganan',
    items: [
      {
        id: 'kpd-2-2',
        question: 'Pengembalian Biaya Langganan (antara Sekolah dan SiKu)',
        answer: 'Biaya langganan yang telah dibayarkan untuk periode aktif pada dasarnya tidak dapat dikembalikan, kecuali dalam dua kondisi berikut. Dalam kondisi yang memenuhi syarat, pengembalian dapat berupa pengembalian dana proporsional atau perpanjangan masa langganan sesuai kesepakatan.',
        bullets: [
          'Kegagalan teknis SiKu: Layanan tidak dapat digunakan secara wajar selama lebih dari [7] hari berturut-turut dalam satu periode langganan.',
          'Penagihan ganda (double charge): terjadi kesalahan penagihan lebih dari sekali untuk periode yang sama.',
        ],
      },
    ],
  },
  {
    title: 'Pembayaran Tagihan Sekolah',
    items: [
      {
        id: 'kpd-2-3',
        question: 'Pembayaran Tagihan Sekolah (antara Wali dan Sekolah)',
        answer: 'Pembayaran tagihan (misalnya SPP) yang dilakukan Wali diterima langsung oleh sekolah melalui Penyedia Pembayaran. SiKu tidak memegang dana ini, sehingga permohonan pengembalian atas pembayaran tagihan merupakan kewenangan dan tanggung jawab sekolah yang bersangkutan. SiKu dapat membantu secara teknis (misalnya menyediakan bukti dan rincian transaksi), namun keputusan dan pelaksanaan pengembalian berada pada sekolah. Untuk pembayaran yang gagal namun dana telah terdebet, Wali dapat melaporkannya melalui sekolah atau menghubungi kami untuk ditelusuri bersama Penyedia Pembayaran.',
      },
    ],
  },
  {
    title: 'Prosedur & Waktu Proses',
    items: [
      {
        id: 'kpd-2-4',
        question: 'Prosedur Permohonan',
        answer: 'Permohonan pengembalian dana atas biaya langganan diajukan melalui email resmi dengan menyertakan: identitas sekolah, bukti transaksi, dan alasan permohonan.',
      },
      {
        id: 'kpd-2-5',
        question: 'Waktu Proses',
        answer: 'Permohonan yang memenuhi syarat akan diverifikasi dalam waktu maksimal [14] hari kerja sejak dokumen lengkap diterima.',
      },
      {
        id: 'kpd-2-6',
        question: 'Metode Pengembalian',
        answer: 'Dana yang disetujui untuk dikembalikan akan ditransfer ke rekening yang sama dengan rekening pembayaran awal, kecuali disepakati lain.',
      },
      {
        id: 'kpd-2-7',
        question: 'Kontak',
        answer: 'Permohonan dan pertanyaan dapat disampaikan melalui email resmi atau nomor WhatsApp bisnis yang tersedia di halaman Hubungi Kami.',
      },
    ],
  },
]

export default function KebijanPengembalianDanaPage() {
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
                Kebijakan Pengembalian Dana
              </h1>
              <p className='bn-desc' data-bn-animate style={{ '--delay': '0.2s' } as React.CSSProperties}>
                Ketentuan pengembalian dana atas biaya langganan SiKu
                dan pembayaran tagihan sekolah. Dua jenis transaksi ini
                ditangani oleh pihak yang berbeda.
              </p>
            </div>
            <Image
              src='/image/Refund.png'
              alt=''
              width={200}
              height={200}
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
