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
    title: 'Pendahuluan & Definisi',
    items: [
      {
        id: 'sk-1-1',
        question: 'Pendahuluan',
        answer: 'Selamat datang di SiKu. Syarat & Ketentuan ini ("Ketentuan") mengatur penggunaan layanan SiKu — sistem manajemen keuangan sekolah berbasis SaaS — yang dikelola oleh Equanusa ("kami", "SiKu"), yang dapat diakses melalui situs pakaisiku.id dan aplikasi app.pakaisiku.id (secara bersama-sama disebut "Layanan"). Dengan mendaftar, mengakses, atau menggunakan Layanan, Anda dianggap telah membaca, memahami, dan menyetujui seluruh isi Ketentuan ini. Apabila Anda tidak menyetujui, mohon untuk tidak menggunakan Layanan.',
      },
      {
        id: 'sk-1-2',
        question: 'Definisi',
        answer: 'Istilah-istilah berikut digunakan dalam Ketentuan ini:',
        bullets: [
          'Pengguna: sekolah atau yayasan yang berlangganan Layanan, beserta perwakilannya (misalnya bendahara dan administrator).',
          'Wali: orang tua atau wali murid yang melakukan pembayaran tagihan melalui Layanan.',
          'Tagihan: kewajiban pembayaran (misalnya SPP) yang diterbitkan oleh sekolah kepada Wali melalui Layanan.',
          'Penyedia Pembayaran: pihak ketiga berlisensi yang memproses transaksi pembayaran melalui Layanan.',
        ],
      },
      {
        id: 'sk-1-3',
        question: 'Deskripsi Layanan',
        answer: 'SiKu menyediakan perangkat lunak untuk pencatatan keuangan sekolah, penerbitan dan pengelolaan tagihan, rekonsiliasi pembayaran, pelaporan keuangan, serta pengiriman notifikasi kepada Wali. SiKu berperan sebagai penyedia perangkat lunak dan fasilitator teknis, bukan sebagai lembaga keuangan maupun penampung dana.',
      },
    ],
  },
  {
    title: 'Akun & Langganan',
    items: [
      {
        id: 'sk-1-4',
        question: 'Pendaftaran dan Keamanan Akun',
        answer: 'Pengguna wajib memberikan informasi yang benar, akurat, dan terkini saat pendaftaran, serta menjaga kerahasiaan kredensial akun. Seluruh aktivitas yang terjadi melalui akun menjadi tanggung jawab pemilik akun. Pengguna wajib segera memberitahukan kepada kami apabila terdapat indikasi penyalahgunaan akun.',
      },
      {
        id: 'sk-1-5',
        question: 'Langganan dan Pembayaran Layanan',
        answer: 'Penggunaan Layanan oleh sekolah dikenakan biaya langganan sesuai paket yang dipilih. Biaya langganan dibayarkan di muka untuk periode yang berlaku. Kami berhak meninjau dan mengubah skema harga dengan pemberitahuan sebelumnya melalui kanal resmi.',
      },
    ],
  },
  {
    title: 'Transaksi & Kewajiban',
    items: [
      {
        id: 'sk-1-6',
        question: 'Peran SiKu dalam Transaksi Pembayaran Tagihan',
        answer: 'Dalam transaksi pembayaran tagihan antara sekolah dan Wali, dana mengalir langsung kepada rekening sekolah melalui Penyedia Pembayaran. SiKu tidak menerima, menampung, menahan, atau menyalurkan dana milik sekolah maupun Wali — SiKu hanya menyediakan sarana teknis agar transaksi dapat berlangsung dan tercatat. Tanggung jawab atas keabsahan tagihan, nominal, serta penyelesaian dana berada pada sekolah sebagai penerbit tagihan.',
      },
      {
        id: 'sk-1-7',
        question: 'Kewajiban Pengguna',
        answer: 'Pengguna setuju untuk tidak menyalahgunakan Layanan, termasuk namun tidak terbatas pada: memasukkan data palsu, melanggar hukum yang berlaku, mengganggu keamanan sistem, atau menggunakan Layanan untuk tujuan di luar pengelolaan keuangan sekolah.',
      },
    ],
  },
  {
    title: 'Hak & Tanggung Jawab',
    items: [
      {
        id: 'sk-1-8',
        question: 'Hak Kekayaan Intelektual',
        answer: 'Seluruh hak kekayaan intelektual atas Layanan, termasuk perangkat lunak, desain, logo, dan merek "SiKu", merupakan milik Equanusa. Pengguna tidak memperoleh hak kepemilikan apa pun selain hak terbatas untuk menggunakan Layanan selama masa langganan.',
      },
      {
        id: 'sk-1-9',
        question: 'Batasan Tanggung Jawab',
        answer: 'Layanan disediakan "sebagaimana adanya". Dalam batas yang diizinkan hukum, kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan Layanan, gangguan dari pihak ketiga (termasuk Penyedia Pembayaran atau penyedia infrastruktur), maupun kesalahan input data oleh Pengguna. Kami berupaya menjaga ketersediaan Layanan, namun tidak menjamin Layanan bebas gangguan sepenuhnya.',
      },
      {
        id: 'sk-1-10',
        question: 'Penangguhan dan Penghentian',
        answer: 'Kami berhak menangguhkan atau menghentikan akses Pengguna apabila terjadi pelanggaran Ketentuan ini, tunggakan pembayaran langganan, atau atas dasar hukum yang berlaku, dengan pemberitahuan yang wajar.',
      },
    ],
  },
  {
    title: 'Ketentuan Lainnya',
    items: [
      {
        id: 'sk-1-11',
        question: 'Perubahan Ketentuan',
        answer: 'Kami dapat memperbarui Ketentuan ini dari waktu ke waktu. Perubahan akan diumumkan melalui Layanan. Penggunaan Layanan secara berkelanjutan setelah perubahan dianggap sebagai persetujuan terhadap Ketentuan yang diperbarui.',
      },
      {
        id: 'sk-1-12',
        question: 'Hukum yang Berlaku',
        answer: 'Ketentuan ini tunduk pada hukum Republik Indonesia. Setiap perselisihan akan diupayakan diselesaikan secara musyawarah terlebih dahulu.',
      },
      {
        id: 'sk-1-13',
        question: 'Kontak',
        answer: 'Pertanyaan terkait Ketentuan ini dapat disampaikan melalui email resmi atau nomor WhatsApp bisnis yang tersedia di halaman Hubungi Kami.',
      },
    ],
  },
]

export default function SyaratKetentuanPage() {
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
                Syarat &amp; Ketentuan
              </h1>
              <p className='bn-desc' data-bn-animate style={{ '--delay': '0.2s' } as React.CSSProperties}>
                Syarat dan Ketentuan ini mengatur penggunaan layanan SiKu.
                Dengan mengakses atau menggunakan layanan, Anda dianggap
                telah menyetujui seluruh isi ketentuan ini.
              </p>
            </div>
            <Image
              src='/image/TC.png'
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
