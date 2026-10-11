import { storageService } from './storageService'
import type { MoodEntry, MoodLevel } from '../types/mood'

const MOOD_KEY = 'emora_mood_entries'

const LEVEL_TO_NUMBER: Record<MoodLevel, number> = {
  very_low: 1,
  low: 2,
  neutral: 3,
  good: 4,
  great: 5,
}

const NUMBER_TO_LEVEL: MoodLevel[] = ['very_low', 'low', 'neutral', 'good', 'great']

export interface DailyMoodPoint {
  label: string
  value: number | null
  level: MoodLevel | null
}

function levelFromAverage(average: number): MoodLevel {
  const rounded = Math.min(5, Math.max(1, Math.round(average)))
  return NUMBER_TO_LEVEL[rounded - 1]
}

export const moodService = {
  getAllEntries(): MoodEntry[] {
    return storageService.get<MoodEntry[]>(MOOD_KEY) ?? []
  },

  addEntryAt(level: MoodLevel, timestamp: string, note?: string): MoodEntry {
    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      level,
      note: note?.trim().slice(0, 300) || undefined,
      timestamp,
    }
    const entries = this.getAllEntries()
    entries.push(entry)
    storageService.set(MOOD_KEY, entries)
    return entry
  },

  addEntry(level: MoodLevel, note?: string): MoodEntry {
    return this.addEntryAt(level, new Date().toISOString(), note)
  },

  getLatestMood(): MoodEntry | null {
    const entries = this.getAllEntries()
    if (entries.length === 0) return null
    return entries[entries.length - 1]
  },

  getRecentEntries(days: number): MoodEntry[] {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    return this.getAllEntries().filter((e) => new Date(e.timestamp).getTime() >= cutoff)
  },

  getHistory(limit: number): MoodEntry[] {
    return [...this.getAllEntries()].reverse().slice(0, limit)
  },

  getStreak(): number {
    const entries = this.getAllEntries()
    if (entries.length === 0) return 0

    const daysWithEntry = new Set(entries.map((e) => new Date(e.timestamp).toDateString()))

    const cursor = new Date()
    if (!daysWithEntry.has(cursor.toDateString())) {
      cursor.setDate(cursor.getDate() - 1)
    }

    let streak = 0
    while (daysWithEntry.has(cursor.toDateString())) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    }
    return streak
  },

  getWeeklyAverageMood(): MoodLevel | null {
    const entries = this.getRecentEntries(7)
    if (entries.length === 0) return null
    const sum = entries.reduce((acc, e) => acc + LEVEL_TO_NUMBER[e.level], 0)
    return levelFromAverage(sum / entries.length)
  },

  getDailyTrend(days: number): DailyMoodPoint[] {
    const entries = this.getAllEntries()
    const points: DailyMoodPoint[] = []

    for (let i = days - 1; i >= 0; i--) {
      const day = new Date()
      day.setDate(day.getDate() - i)
      const key = day.toDateString()
      const label = day.toLocaleDateString('en-US', { weekday: 'short' })
      const dayEntries = entries.filter((e) => new Date(e.timestamp).toDateString() === key)

      if (dayEntries.length === 0) {
        points.push({ label, value: null, level: null })
        continue
      }

      const average =
        dayEntries.reduce((acc, e) => acc + LEVEL_TO_NUMBER[e.level], 0) / dayEntries.length
      points.push({ label, value: Math.round(average * 10) / 10, level: levelFromAverage(average) })
    }

    return points
  },

  clearAll(): void {
    storageService.remove(MOOD_KEY)
  },
}