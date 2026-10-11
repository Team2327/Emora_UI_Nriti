import { storageService } from './storageService'
import { PHQ9_QUESTIONS, GAD7_QUESTIONS, type Question } from '../data/assessmentQuestions'
import type { AssessmentResult, AssessmentType, SeverityKey } from '../types/assessment'

const ASSESSMENT_KEY = 'emora_assessments'

const MAX_SCORE: Record<AssessmentType, number> = {
  phq9: 27,
  gad7: 21,
}

const SEVERITY_LABELS: Record<SeverityKey, string> = {
  minimal: 'Minimal',
  mild: 'Mild',
  moderate: 'Moderate',
  moderately_severe: 'Moderately Severe',
  severe: 'Severe',
}

export const assessmentService = {
  getQuestions(type: AssessmentType): Question[] {
    return type === 'phq9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS
  },

  calculateScore(type: AssessmentType, answers: Record<string, number>): number {
    return this.getQuestions(type).reduce((sum, q) => sum + (answers[q.id] ?? 0), 0)
  },

  getSeverity(type: AssessmentType, score: number): SeverityKey {
    if (score <= 4) return 'minimal'
    if (score <= 9) return 'mild'
    if (score <= 14) return 'moderate'
    if (type === 'phq9') return score <= 19 ? 'moderately_severe' : 'severe'
    return 'severe'
  },

  isValid(type: AssessmentType, answers: Record<string, number>): boolean {
    return this.getQuestions(type).every((q) => {
      const value = answers[q.id]
      return Number.isInteger(value) && value >= 0 && value <= 3
    })
  },

  submit(type: AssessmentType, answers: Record<string, number>): AssessmentResult | null {
    if (!this.isValid(type, answers)) return null

    const score = this.calculateScore(type, answers)
    const severity = this.getSeverity(type, score)
    const selfHarmFlag = type === 'phq9' && (answers['phq9'] ?? 0) > 0

    const result: AssessmentResult = {
      id: crypto.randomUUID(),
      type,
      score,
      maxScore: MAX_SCORE[type],
      severity,
      severityLabel: SEVERITY_LABELS[severity],
      answers,
      selfHarmFlag,
      highRisk: selfHarmFlag || severity === 'severe',
      timestamp: new Date().toISOString(),
    }

    const all = this.getAll()
    all.push(result)
    storageService.set(ASSESSMENT_KEY, all)
    return result
  },

  getAll(): AssessmentResult[] {
    return storageService.get<AssessmentResult[]>(ASSESSMENT_KEY) ?? []
  },

  getHistory(type?: AssessmentType): AssessmentResult[] {
    const all = this.getAll()
    const filtered = type ? all.filter((r) => r.type === type) : all
    return [...filtered].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  },

  getLatest(type: AssessmentType): AssessmentResult | null {
    return this.getHistory(type)[0] ?? null
  },

  clearAll(): void {
    storageService.remove(ASSESSMENT_KEY)
  },
}