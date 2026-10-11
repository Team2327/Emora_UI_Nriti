import { useMemo } from 'react'
import { useTheme } from '../theme/ThemeProvider'
import type { DecorKind } from '../../types/theme'

interface DecorItem {
  id: number
  left: number
  top: number
  size: number
  duration: number
  delay: number
  glyph: string
}

const COUNTS: Record<DecorKind, number> = {
  rise: 14,
  fall: 14,
  twinkle: 28,
  bubble: 14,
}

function between(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

export function CozyParticles() {
  const { scene } = useTheme()
  const kind = scene.decor
  const glyphs = scene.glyphs

  const items = useMemo<DecorItem[]>(() => {
    return Array.from({ length: COUNTS[kind] }).map((_, id) => {
      const duration =
        kind === 'twinkle' ? between(3, 7) : kind === 'bubble' ? between(14, 28) : between(16, 32)
      const size =
        kind === 'twinkle' ? between(8, 16) : kind === 'bubble' ? between(10, 40) : between(14, 26)

      return {
        id,
        left: between(0, 100),
        top: between(0, 100),
        size,
        duration,
        delay: -between(0, duration),
        glyph: glyphs.length > 0 ? glyphs[id % glyphs.length] : '',
      }
    })
  }, [kind, glyphs])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {items.map((item) => {
        const key = `${scene.id}-${item.id}`

        if (kind === 'bubble') {
          return (
            <span
              key={key}
              className="decor decor-bubble"
              style={{
                left: `${item.left}%`,
                top: 0,
                width: item.size,
                height: item.size,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            />
          )
        }

        return (
          <span
            key={key}
            className={`decor decor-${kind}`}
            style={{
              left: `${item.left}%`,
              top: kind === 'twinkle' ? `${item.top}%` : 0,
              fontSize: item.size,
              color: kind === 'twinkle' ? 'var(--color-accent)' : undefined,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.glyph}
          </span>
        )
      })}
    </div>
  )
}