import { Star } from 'lucide-react'
import { ReactNode } from 'react'

type SubFeatureCardProps = {
  heading: string
  body: string
  footerInfo?: string
  icon?: ReactNode
  featured?: boolean
  variant?: 'side-icon'
}

export default function SubFeatureCard({
  heading,
  body,
  footerInfo,
  icon,
  featured = false,
  variant,
}: SubFeatureCardProps) {
  const isSideIcon = variant === 'side-icon'

  return (
    <div className={`sfc-card${featured ? ' sfc-card--featured' : ''}${isSideIcon ? ' sfc-card--side-icon' : ''}`}>

      {isSideIcon ? (
        /* Side-icon variant: full-width title header, icon raised on body top-left */
        <>
          <div className="sfc-header sfc-header--title-only">
            <h3 className="sfc-title">{heading}</h3>
          </div>
          <div className="sfc-content sfc-content--raised-icon">
            <div className="sfc-corner-tab" />
            {icon && <div className="sfc-raised-icon">{icon}</div>}
            <div className="sfc-body sfc-body--has-raised-icon">
              <p>{body}</p>
              {footerInfo && (
              <div className="sfc-footer sfc-footer--rounded">
                <div className="sfc-footer-star">
                  <Star size={22} fill="currentColor" strokeWidth={0} />
                </div>
                <span>{footerInfo}</span>
              </div>
            )}
            </div>
          </div>
        </>
      ) : (
        /* Default: title + icon at bottom-right inside header */
        <>
          <div className="sfc-header">
            <h3 className="sfc-title">{heading}</h3>
            {icon && <div className="sfc-icon">{icon}</div>}
          </div>
          <div className="sfc-content">
            <div className="sfc-body">
              <p>{body}</p>
            </div>
            {footerInfo && (
              <div className="sfc-footer">
                <div className="sfc-footer-star">
                  <Star size={22} fill="currentColor" strokeWidth={0} />
                </div>
                <span>{footerInfo}</span>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  )
}
