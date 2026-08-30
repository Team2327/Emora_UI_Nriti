import { moodService } from '../../services/moodService'
import { MOOD_COLORS } from '../../types/mood'
import { useTheme } from '../theme/ThemeProvider'

export function AmbientBackground() {
  const latest = moodService.getLatestMood()
  const { theme } = useTheme()
  const moodColor = latest ? MOOD_COLORS[latest.level] : MOOD_COLORS.neutral
  const opacity = theme.mode === 'light' ? '15' : '25'

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-700 ${theme.mode === 'light' ? 'bg-[#FAF7F2]' : 'bg-slate-950'}`}>
      <div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-slow"
        style={{ backgroundColor: `${moodColor}${opacity}` }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[130px] animate-pulse-slower"
        style={{ backgroundColor: `var(--color-accent)${opacity}` }}
      />
    </div>
  )
}