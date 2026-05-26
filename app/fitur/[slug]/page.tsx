import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
  CreditCard, BarChart3,SlidersHorizontal,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FeatureBanner from '@/components/FeatureBanner'
import SubFeatureCard from '@/components/SubFeatureCard'
import { features, getFeatureBySlug } from '@/lib/features'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const featureIconMap: Record<string, ReactNode> = {
  'manajemen-tagihan': <Image src="/icons/IconWallet.png" width={28} height={28} alt="Manajemen Tagihan" />,
  'notifikasi-whatsapp': <Image src="/icons/IconWaStroke.png" width={28} height={28} alt="Notifikasi WhatsApp" />,
  'pembayaran-digital': <Image src="/icons/IconDebit.png" width={28} height={28} alt="Pembayaran Digital" />,
  'laporan-dashboard': <BarChart3 size={28} />,
  'multi-jenjang': <Image src="/icons/IconSchool.png" width={28} height={28} alt="Multi-Jenjang" />,
  'manajemen-siswa': <Image src="/icons/IconGraduation.png" width={28} height={28} alt="Manajemen Siswa" />,
}

const detailIconMap: Record<string, ReactNode> = {
  IconBanner: <Image src="/icons/IconBanner.png" width={22} height={22} alt="Banner" />,
  IconTab: <Image src="/icons/IconTab.png" width={22} height={22} alt="Tab" />,
  SlidersHorizontal: <SlidersHorizontal size={22} />,
  IconReverb: <Image src="/icons/IconReverb.png" width={22} height={22} alt="Reverb" />,
  IconSettingWhite: <Image src="/icons/IconSettingWhite.png" width={22} height={22} alt="Settings" />,
  IconDate: <Image src="/icons/IconDate.png" width={22} height={22} alt="Date" />,
  IconLoading: <Image src="/icons/IconLoading.png" width={22} height={22} alt="Loading" />,
  IconDocument: <Image src="/icons/IconDocument.png" width={22} height={22} alt="Document" />,
  CreditCard: <CreditCard size={22} />,
  IconBank: <Image src="/icons/IconBank.png" width={22} height={22} alt="Bank" />,
  IconData: <Image src="/icons/IconData.png" width={22} height={22} alt="Data" />,
  IconDashboard: <Image src="/icons/IconDashboard.png" width={22} height={22} alt="Dashboard" />,
  IconRinci: <Image src="/icons/IconRinci.png" width={22} height={22} alt="Rinci" />,
  IconPDF: <Image src="/icons/IconPDF.png" width={22} height={22} alt="PDF" />,
  IconAllinOne: <Image src="/icons/IconAllinOne.png" width={22} height={22} alt="All-in-One" />,
  IconList: <Image src="/icons/IconList.png" width={22} height={22} alt="List" />,
  IconSetting: <Image src="/icons/IconSetting.png" width={22} height={22} alt="Settings" />,
  IconSave: <Image src="/icons/IconSave.png" width={22} height={22} alt="Save" />,
  IconUp: <Image src="/icons/IconUp.png" width={22} height={22} alt="Upload" />,
  IconHistory: <Image src="/icons/IconHistory.png" width={22} height={22} alt="History" />,
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

  const hasFeaturedCard = feature.slug === 'manajemen-tagihan'
  const [featuredDetail, ...restDetails] = feature.details
  const gridDetails = hasFeaturedCard ? restDetails : feature.details

  return (
    <>
      <Navbar />

      <div className="feature-page">

          {/* Top row: banner always on left, featured card only for manajemen-tagihan */}
          <div className="fitur-section-main">
            <FeatureBanner
              title={feature.title}
              desc={feature.desc}
              badge={feature.badge}
              icon={featureIconMap[feature.slug]}
              items={feature.items}
            />
            {hasFeaturedCard && (
              <SubFeatureCard
                heading={featuredDetail.heading}
                body={featuredDetail.body}
                footerInfo={featuredDetail.footerInfo}
                icon={featuredDetail.icon ? detailIconMap[featuredDetail.icon] : undefined}
                featured
              />
            )}
          </div>

          {/* Grid: all cards (other features) or remaining cards (manajemen-tagihan) */}
          {gridDetails.length > 0 && (
            <div className="fitur-section-grid">
              {gridDetails.map((d) => (
                <SubFeatureCard
                  key={d.heading}
                  heading={d.heading}
                  body={d.body}
                  footerInfo={d.footerInfo}
                  icon={d.icon ? detailIconMap[d.icon] : undefined}
                  variant={d.variant}
                />
              ))}
            </div>
          )}

        </div>

      <Footer />
    </>
  )
}
