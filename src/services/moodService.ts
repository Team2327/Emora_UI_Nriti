import { storageService } from './storageService'
import type { MoodEntry, MoodLevel } from '../types/mood'

const MOOD_KEY = 'emora_mood_entries'

export const moodService = {
  getAllEntries(): MoodEntry[] {
    return storageService.get<MoodEntry[]>(MOOD_KEY) ?? []
  },

  addEntry(level: MoodLevel, note?: string): MoodEntry {
    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      level,
      note,
      timestamp: new Date().toISOString(),
    }
    const entries = this.getAllEntries()
    entries.push(entry)
    storageService.set(MOOD_KEY, entries)
    return entry
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

  getStreak(): number {
    const entries = this.getAllEntries()
    if (entries.length === 0) return 0

    const daysWithEntry = new Set(
      entries.map((e) => new Date(e.timestamp).toDateString())
    )

    let streak = 0
    const cursor = new Date()

    while (daysWithEntry.has(cursor.toDateString())) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    }

    return streak
  },
}