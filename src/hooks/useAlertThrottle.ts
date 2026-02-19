import { useEffect, useRef, useState } from 'react'

export function useAlertThrottle(postureScore: number) {
  const [shouldAlert, setShouldAlert] = useState(false)
  const badTimer = useRef<number>(0)
  const lastAlertTime = useRef<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (postureScore <= 0.2) {
        badTimer.current += 1

        if (badTimer.current >= 10) {
          const now = Date.now()
          if (now - lastAlertTime.current > 60000) {
            setShouldAlert(true)
            lastAlertTime.current = now
            badTimer.current = 0
          }
        }
      } else {
        badTimer.current = 0
        setShouldAlert(false)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [postureScore])

  return { shouldAlert }
}