import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Wallet, MessageCircle, CreditCard, BarChart3, Building2, GraduationCap, ArrowLeft, Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { features, getFeatureBySlug } from '@/lib/features'
import type { Metadata } from 'next'

const iconMap: Record<string, React.ReactNode> = {
  'manajemen-spp': <Wallet size={32} />,
  'notifikasi-whatsapp': <MessageCircle size={32} />,
  'pembayaran-digital': <CreditCard size={32} />,
  'laporan-dashboard': <BarChart3 size={32} />,
  'multi-jenjang': <Building2 size={32} />,
  'manajemen-siswa': <GraduationCap size={32} />,
}

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const feature = getFeatureBySlug(slug)
  if (!feature) return {}
  return {
    title: `${feature.title} — SiKu`,
    description: feature.desc,
  }
}

export default async function FeaturePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const feature = getFeatureBySlug(slug)
  if (!feature) notFound()

  return (
    <>
      <Navbar />

      <div className="feature-page">
        <div className="feature-page-inner">

          {/* Back link */}
          <Link href="/" className="feature-back">
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          {/* Header */}
          <div className="feature-header">
            <div
              className="feature-hero-icon"
              style={{ background: feature.iconBg, color: feature.iconColor }}
            >
              {iconMap[feature.slug]}
            </div>

            {feature.badge && (
              <div className="feature-badge">{feature.badge}</div>
            )}

            <h1 className="feature-title">{feature.title}</h1>
            <p className="feature-lead">{feature.desc}</p>

            <ul className="feature-checklist">
              {feature.items.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Detail sections */}
          <div className="feature-details">
            {feature.details.map((d) => (
              <div className="feature-detail-card" key={d.heading}>
                <h2>{d.heading}</h2>
                <p>{d.body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </>
  )
}
