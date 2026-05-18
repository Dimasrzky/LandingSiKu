'use client'

import { useEffect, useRef, useState } from 'react'

const FreqIcon = () => (
  <span className="audio-freq">
    <span className="audio-freq-bar" style={{ animationDelay: '0ms' }} />
    <span className="audio-freq-bar" style={{ animationDelay: '160ms' }} />
    <span className="audio-freq-bar" style={{ animationDelay: '80ms' }} />
    <span className="audio-freq-bar" style={{ animationDelay: '240ms' }} />
    <span className="audio-freq-bar" style={{ animationDelay: '40ms' }} />
  </span>
)

const MuteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="2" y1="2" x2="22" y2="22" />
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/lofi-music.mp3" loop preload="none" />
      <button
        className={`audio-player-btn${visible ? ' audio-player-btn--visible' : ''}${playing ? ' audio-player-btn--playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause musik' : 'Putar musik'}
        title={playing ? 'Pause musik' : 'Putar musik'}
      >
        {playing ? <FreqIcon /> : <MuteIcon />}
        <span className="audio-player-label">{playing ? 'Music On' : 'Music Off'}</span>
      </button>
    </>
  )
}
