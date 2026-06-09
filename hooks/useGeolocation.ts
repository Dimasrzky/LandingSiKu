'use client'

import { useState } from 'react'

interface GeolocationState {
  lat: number | null
  lng: number | null
  error: string | null
  loading: boolean
  granted: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    error: null,
    loading: false,
    granted: false,
  })

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, error: 'Browser tidak mendukung geolocation' }))
      return
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          loading: false,
          granted: true,
        })
      },
      () => {
        setState({ lat: null, lng: null, error: null, loading: false, granted: false })
      }
    )
  }

  return { ...state, requestLocation }
}
