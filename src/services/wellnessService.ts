import { storageService } from './storageService'

export interface WellnessLog {
  id: string
  itemId: string
  title: string
  timestamp: string
}

const WELLNESS_KEY = 'emora_wellness_log'

export const wellnessService = {
  getAll(): WellnessLog[] {
    return storageService.get<WellnessLog[]>(WELLNESS_KEY) ?? []
  },

  logActivity(itemId: string, title: string): WellnessLog {
    const log: WellnessLog = {
      id: crypto.randomUUID(),
      itemId,
      title,
      timestamp: new Date().toISOString(),
    }
    const all = this.getAll()
    all.push(log)
    storageService.set(WELLNESS_KEY, all)
    return log
  },

  getRecent(days: number): WellnessLog[] {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    return this.getAll().filter((log) => new Date(log.timestamp).getTime() >= cutoff)
  },

  clearAll(): void {
    storageService.remove(WELLNESS_KEY)
  },
}