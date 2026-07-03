'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTracking } from '@/hooks/useTracking'
import './demo-pembayaran.css'

const STEPS = [
  'Admin sekolah membuat tagihan SPP otomatis tiap bulan untuk seluruh siswa.',
  'Orang tua menerima notifikasi WhatsApp berisi rincian tagihan beserta link pembayaran.',
  'Orang tua membayar melalui link tersebut — VA Bank dan QRIS via iPaymu.',
  'Status tagihan otomatis berubah menjadi "Lunas" di dashboard sekolah begitu pembayaran diterima, tanpa input manual.',
]

function DemoPembayaranContent() {
  const { trackCTA } = useTracking()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const statusParam = searchParams.get('status')
  const status = statusParam === 'success' || statusParam === 'cancel' ? statusParam : null

  const handleBayar = async () => {
    setLoading(true)
    setError(null)
    trackCTA('Bayar Tagihan Demo Rp 10.000 (Demo Pembayaran)', '/api/demo-pembayaran')
    try {
      const res = await fetch('/api/demo-pembayaran', { method: 'POST' })
      const { data, error: apiError } = await res.json()
      if (apiError || !data?.url) {
        setError(apiError || 'Gagal membuat transaksi demo. Coba lagi.')
        setLoading(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Terjadi kesalahan jaringan. Coba lagi.')
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="dp-main">
        <div className="dp-inner">

          <div className="dp-header">
            <div className="section-label">Demo Interaktif</div>
            <h1 className="dp-title">Coba Alur Pembayaran Tagihan SPP</h1>
            <p className="dp-subtitle">
              Halaman ini menampilkan simulasi tautan pembayaran yang diterima orang tua siswa
              melalui pengingat WhatsApp. Tombol pembayaran di bawah terhubung langsung ke sistem
              iPaymu dalam <strong>mode uji coba</strong>, sehingga Anda dapat merasakan
              alur transaksi yang sesungguhnya tanpa ada dana yang benar-benar berpindah.
            </p>
          </div>

          {status === 'success' && (
            <div className="dp-banner dp-banner--success">
              Transaksi sandbox selesai dibuat. Silakan cek status pembayaran di halaman checkout iPaymu.
            </div>
          )}
          {status === 'cancel' && (
            <div className="dp-banner dp-banner--cancel">
              Pembayaran demo dibatalkan. Anda bisa mencoba lagi kapan saja.
            </div>
          )}

          <div className="dp-grid">
            <div className="dp-card">
              <div className="dp-card-label">Cara Kerja Tagihan SPP di SiKu</div>
              <ol className="dp-steps">
                {STEPS.map((step, i) => (
                  <li key={i} className="dp-step">
                    <span className="dp-step-num">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="dp-card dp-card--pay">
              <div className="dp-sandbox-badge">Mode Sandbox</div>
              <div className="dp-card-label">Contoh Tagihan</div>
              <div className="dp-invoice">
                <div className="dp-invoice-row">
                  <span>Siswa</span>
                  <span>Contoh Siswa (Demo)</span>
                </div>
                <div className="dp-invoice-row">
                  <span>Tagihan</span>
                  <span>SPP Bulan Ini</span>
                </div>
                <div className="dp-invoice-row dp-invoice-row--total">
                  <span>Total</span>
                  <span>Rp 10.000</span>
                </div>
              </div>

              <button
                type="button"
                className="dp-pay-btn"
                onClick={handleBayar}
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Bayar Tagihan Demo Rp 10.000'}
              </button>

              {error && <p className="dp-error">{error}</p>}

              <p className="dp-note">
                Anda akan diarahkan ke halaman checkout resmi iPaymu (sandbox) untuk memilih metode
                pembayaran.
              </p>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

export default function DemoPembayaranPage() {
  return (
    <Suspense fallback={null}>
      <DemoPembayaranContent />
    </Suspense>
  )
}
