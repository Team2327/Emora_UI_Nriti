import { assessmentService } from './assessmentService'
import { moodService } from './moodService'
import type { MoodLevel } from '../types/mood'
import type { SeverityKey } from '../types/assessment'

export type RecommendationCategory =
  | 'breathing'
  | 'meditation'
  | 'yoga'
  | 'self-care'
  | 'chat'
  | 'professional'

export interface Recommendation {
  id: string
  category: RecommendationCategory
  title: string
  description: string
  priority: number
  path?: string
  actionLabel?: string
}

const SEVERITY_RANK: Record<SeverityKey, number> = {
  minimal: 0,
  mild: 1,
  moderate: 2,
  moderately_severe: 3,
  severe: 4,
}

function isLow(level: MoodLevel | null): boolean {
  return level === 'very_low' || level === 'low'
}

function isHigh(level: MoodLevel | null): boolean {
  return level === 'good' || level === 'great'
}

export const recommendationService = {
  getRecommendations(): Recommendation[] {
    const phq = assessmentService.getLatest('phq9')
    const gad = assessmentService.getLatest('gad7')
    const latestMood = moodService.getLatestMood()?.level ?? null
    const weeklyMood = moodService.getWeeklyAverageMood()

    const depressionRank = phq ? SEVERITY_RANK[phq.severity] : -1
    const anxietyRank = gad ? SEVERITY_RANK[gad.severity] : -1
    const highRisk = Boolean(phq?.highRisk || gad?.highRisk)
    const lowMood = isLow(latestMood) || isLow(weeklyMood)
    const highMood = isHigh(latestMood) && !isLow(weeklyMood)

    const recs: Recommendation[] = []
    const add = (rec: Recommendation) => recs.push(rec)

    if (highRisk) {
      add({
        id: 'support-urgent',
        category: 'professional',
        title: 'Please reach out for support today',
        description:
          'Talk to someone you trust, or call Tele-MANAS at 14416 (free, 24x7). If you are in immediate danger, call 112.',
        priority: 0,
      })
    } else if (depressionRank >= 2 || anxietyRank >= 2) {
      add({
        id: 'support-professional',
        category: 'professional',
        title: 'Consider talking to a professional',
        description:
          'Your recent answers suggest it could help to speak with a counsellor or doctor. EMORA cannot diagnose, but a professional can guide you.',
        priority: 1,
      })
    }

    if (!phq && !gad) {
      add({
        id: 'take-assessment',
        category: 'self-care',
        title: 'Take your first check-in',
        description: 'A short PHQ-9 or GAD-7 screening helps EMORA personalise your suggestions.',
        priority: 1,
        path: '/assessment',
        actionLabel: 'Start assessment',
      })
    }

    if (!latestMood) {
      add({
        id: 'log-mood',
        category: 'self-care',
        title: 'Log how you feel today',
        description: 'Tracking your mood daily reveals patterns and keeps your streak going.',
        priority: 2,
        path: '/dashboard',
        actionLabel: 'Log mood',
      })
    }

    if (anxietyRank >= 1 || lowMood) {
      add({
        id: 'breathing',
        category: 'breathing',
        title: 'Try box breathing',
        description: 'A few slow, steady breaths can ease tension and help you settle.',
        priority: 2,
        path: '/wellness',
        actionLabel: 'Open wellness',
      })
    }

    if (anxietyRank >= 2) {
      add({
        id: 'meditation',
        category: 'meditation',
        title: 'A short guided pause',
        description: 'Ten calm minutes of body-scan meditation can quiet racing thoughts.',
        priority: 3,
        path: '/wellness',
        actionLabel: 'Open wellness',
      })
    }

    if (depressionRank >= 1) {
      add({
        id: 'self-care',
        category: 'self-care',
        title: 'Build a gentle daily routine',
        description: 'Small steps count: sunlight, water, a short walk, and one thing you enjoy.',
        priority: 3,
        path: '/wellness',
        actionLabel: 'See self-care ideas',
      })
      add({
        id: 'yoga',
        category: 'yoga',
        title: 'Gentle morning yoga',
        description: 'Light movement can lift energy without any pressure.',
        priority: 4,
        path: '/wellness',
        actionLabel: 'Open wellness',
      })
    }

    if (lowMood) {
      add({
        id: 'chat',
        category: 'chat',
        title: 'Talk it out',
        description: 'Share what is on your mind with EMORA. There is no judgment here.',
        priority: 2,
        path: '/chat',
        actionLabel: 'Open chat',
      })
    }

    if (highMood) {
      add({
        id: 'gratitude',
        category: 'self-care',
        title: 'Keep the good momentum',
        description: 'Write down three things that went well today to lock in the feeling.',
        priority: 4,
        path: '/wellness',
        actionLabel: 'See self-care ideas',
      })
      add({
        id: 'yoga',
        category: 'yoga',
        title: 'Move with your good energy',
        description: 'A short yoga flow is a nice way to use today\'s lift.',
        priority: 5,
        path: '/wellness',
        actionLabel: 'Open wellness',
      })
    }

    if (recs.length === 0) {
      add({
        id: 'breathing',
        category: 'breathing',
        title: 'A calm minute',
        description: 'Even when things are steady, a short breathing break is a good habit.',
        priority: 4,
        path: '/wellness',
        actionLabel: 'Open wellness',
      })
      add({
        id: 'self-care',
        category: 'self-care',
        title: 'Keep checking in',
        description: 'Log your mood regularly so EMORA can notice changes early.',
        priority: 5,
        path: '/dashboard',
        actionLabel: 'Go to dashboard',
      })
    }

    const unique = new Map<string, Recommendation>()
    for (const rec of recs) {
      const existing = unique.get(rec.id)
      if (!existing || rec.priority < existing.priority) unique.set(rec.id, rec)
    }

    return [...unique.values()].sort((a, b) => a.priority - b.priority).slice(0, 4)
  },
}