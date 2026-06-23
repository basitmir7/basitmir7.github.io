import { useState, useEffect } from 'react'
import './StatusBar.css'

export default function StatusBar() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [scroll, setScroll] = useState(0)
  const [time, setTime] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY })
    const onScroll = () => setScroll(Math.round(window.scrollY))
    const interval = setInterval(() => setTime(((Date.now() - start) / 1000).toFixed(1)), 100)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="status-bar">
      <span><span className="status-dot" />available for work</span>
      <span>X: {cursor.x}</span>
      <span>Y: {cursor.y}</span>
      <span>Scroll: {scroll}</span>
      <span>Time: {time}s</span>
    </div>
  )
}
