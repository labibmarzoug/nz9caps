import { useEffect, useState } from 'react'

function pad(n) {
  return String(n).padStart(2, '0')
}

export function useCountdown(endIso) {
  const end = new Date(endIso).getTime()
  const [left, setLeft] = useState(() => Math.max(0, end - Date.now()))

  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000)
    return () => clearInterval(id)
  }, [end])

  const s = Math.floor(left / 1000)
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    pad,
  }
}
