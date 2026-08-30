import { moodService } from '../../services/moodService'
import { MOOD_EMOJIS } from '../../types/mood'

export function MoodOrb() {
  const weeklyMood = moodService.getWeeklyAverageMood()
  const emoji = weeklyMood ? MOOD_EMOJIS[weeklyMood] : '🙂'

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="mood-orb w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-2xl"
        style={{
          background: 'radial-gradient(circle at 30% 30%, var(--color-accent), var(--color-primary))',
        }}
      >
        {emoji}
      </div>
      <span className="text-xs text-slate-500">This week</span>
    </div>
  )
}