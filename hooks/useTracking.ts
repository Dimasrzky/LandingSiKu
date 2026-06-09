'use client'

import { useEffect, useCallback } from 'react'

export function useTracking() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmSource   = params.get('utm_source')   ?? '-'
    const utmMedium   = params.get('utm_medium')   ?? '-'
    const utmCampaign = params.get('utm_campaign') ?? '-'
    const referrer    = document.referrer           || '-'
    const url         = window.location.href

    fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'utm', utmSource, utmMedium, utmCampaign, referrer, url }),
    })
  }, [])

  const trackCTA = useCallback((button: string, destination: string) => {
    const params = new URLSearchParams(window.location.search)
    fetch('/api/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'cta',
        button,
        destination,
        utmSource: params.get('utm_source') ?? '-',
      }),
    })
  }, [])

  return { trackCTA }
}
