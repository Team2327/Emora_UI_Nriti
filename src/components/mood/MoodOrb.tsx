import { moodService } from '../../services/moodService'
import { MOOD_EMOJIS } from '../../types/mood'

export function MoodOrb() {
  const latest = moodService.getLatestMood()
  const emoji = latest ? MOOD_EMOJIS[latest.level] : '🙂'

  return (
    <div className="flex items-center justify-center">
      <div
        className="mood-orb w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl"
        style={{
          background: 'radial-gradient(circle at 30% 30%, var(--color-accent), var(--color-primary))',
        }}
      >
        {emoji}
      </div>
    </div>
  )
}