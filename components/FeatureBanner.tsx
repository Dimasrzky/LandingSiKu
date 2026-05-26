import { ReactNode } from 'react'

type FeatureBannerProps = {
  title: string
  desc: string
  badge?: string
  icon: ReactNode
  items: string[]
}

export default function FeatureBanner({
  title,
  desc,
  badge,
  icon,
  items,
}: FeatureBannerProps) {
  return (
    <div className="fb-banner">
      <div className="fb-chip">
        {badge && <span className="fb-chip-badge">{badge}</span>}
        <div className="fb-chip-icon">
          {icon}
        </div>
      </div>

      <h2 className="fb-title">{title}</h2>
      <p className="fb-desc">{desc}</p>
      <div className="fb-tags">
        {items.map((item) => (
          <span key={item} className="fb-tag">{item}</span>
        ))}
      </div>
    </div>
  )
}
