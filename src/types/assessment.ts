export type AssessmentType = 'phq9' | 'gad7'

export type SeverityKey = 'minimal' | 'mild' | 'moderate' | 'moderately_severe' | 'severe'

export interface AssessmentResult {
  id: string
  type: AssessmentType
  score: number
  maxScore: number
  severity: SeverityKey
  severityLabel: string
  answers: Record<string, number>
  selfHarmFlag: boolean
  highRisk: boolean
  timestamp: string
}

export const ASSESSMENT_TITLES: Record<AssessmentType, string> = {
  phq9: 'PHQ-9',
  gad7: 'GAD-7',
}