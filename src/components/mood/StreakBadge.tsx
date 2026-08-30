import { Flame } from 'lucide-react'
import { moodService } from '../../services/moodService'

export function StreakBadge() {
  const streak = moodService.getStreak()

  if (streak === 0) return null

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm text-amber-400 font-medium">
      <Flame size={16} className="fill-amber-400" />
      {streak} day{streak > 1 ? 's' : ''} streak
    </div>
  )
}