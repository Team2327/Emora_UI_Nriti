export type MoodLevel = 'very_low' | 'low' | 'neutral' | 'good' | 'great'

export interface MoodEntry {
  id: string
  level: MoodLevel
  note?: string
  timestamp: string
}

export const MOOD_LABELS: Record<MoodLevel, string> = {
  very_low: 'Very Low', low: 'Low', neutral: 'Neutral', good: 'Good', great: 'Great',
}

export const MOOD_EMOJIS: Record<MoodLevel, string> = {
  very_low: '😔', low: '😕', neutral: '😐', good: '🙂', great: '😄',
}

// Meaningful colors, not just blue shades
export const MOOD_COLORS: Record<MoodLevel, string> = {
  very_low: '#6B7A99',  // muted indigo — heaviness
  low: '#7C93B8',       // soft slate — settling
  neutral: '#8FA98C',   // sage — grounded balance
  good: '#F4785B',      // coral — warmth
  great: '#E8A94D',     // amber — radiance
}