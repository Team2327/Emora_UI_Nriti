import { useEffect, useState, useRef } from 'react'

interface FloatingItem { id: string; emoji: string; left: number; duration: number }

export function FloatingEmojiLayer({ trigger, emoji }: { trigger: number; emoji: string }) {
  const [items, setItems] = useState<FloatingItem[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (trigger === 0) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    const newItems: FloatingItem[] = Array.from({ length: 10 }).map((_, i) => ({
      id: `${trigger}-${i}`,
      emoji,
      left: Math.random() * 90 + 5,
      duration: 3 + Math.random() * 2,
    }))
    setItems(newItems)

    timeoutRef.current = setTimeout(() => setItems([]), 4000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [trigger, emoji])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {items.map((item) => (
        <span key={item.id} className="absolute text-3xl float-up" style={{ left: `${item.left}%`, bottom: '-10%', animationDuration: `${item.duration}s` }}>
          {item.emoji}
        </span>
      ))}
    </div>
  )
}