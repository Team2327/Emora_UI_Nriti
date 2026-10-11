import { moodService } from './moodService'
import { assessmentService } from './assessmentService'
import { chatService } from './chatService'
import { wellnessService } from './wellnessService'
import type { MoodLevel } from '../types/mood'

const DAY_MS = 24 * 60 * 60 * 1000

// Oldest to newest (7 days)
const SAMPLE_MOODS: { level: MoodLevel; note?: string }[] = [
  { level: 'low', note: 'Heavy assignment load' },
  { level: 'neutral' },
  { level: 'low', note: 'Could not sleep well' },
  { level: 'neutral' },
  { level: 'good', note: 'Finished a big task' },
  { level: 'good' },
  { level: 'great', note: 'Good day with friends' },
]

const SAMPLE_PHQ9: Record<string, number> = {
  phq1: 2, phq2: 2, phq3: 2, phq4: 1, phq5: 1, phq6: 1, phq7: 1, phq8: 0, phq9: 0,
}

const SAMPLE_GAD7: Record<string, number> = {
  gad1: 2, gad2: 1, gad3: 2, gad4: 1, gad5: 1, gad6: 0, gad7: 1,
}

export const demoDataService = {
  reset(): void {
    moodService.clearAll()
    assessmentService.clearAll()
    chatService.clearHistory()
    wellnessService.clearAll()
  },

  loadSample(): void {
    this.reset()

    SAMPLE_MOODS.forEach((sample, index) => {
      const daysAgo = SAMPLE_MOODS.length - 1 - index
      const timestamp = new Date(Date.now() - daysAgo * DAY_MS - 60000).toISOString()
      moodService.addEntryAt(sample.level, timestamp, sample.note)
    })

    assessmentService.submit('phq9', SAMPLE_PHQ9)
    assessmentService.submit('gad7', SAMPLE_GAD7)
    wellnessService.logActivity('box-breathing', 'Box Breathing')
  },
}