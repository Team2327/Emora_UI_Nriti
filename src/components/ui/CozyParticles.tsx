import { useMemo } from 'react'

interface Particle {
  id: number
  left: number
  size: number
  duration: number
  delay: number
}

export function CozyParticles() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 10,
      })),
    []
  )

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full drift"
          style={{
            left: `${p.left}%`,
            bottom: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'var(--color-primary)',
            opacity: 0.35,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}