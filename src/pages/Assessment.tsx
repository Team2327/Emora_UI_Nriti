import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { ANSWER_OPTIONS } from '../data/assessmentQuestions'
import { assessmentService } from '../services/assessmentService'
import { recommendationService } from '../services/recommendationService'
import {
  ASSESSMENT_TITLES,
  type AssessmentResult,
  type AssessmentType,
  type SeverityKey,
} from '../types/assessment'
import { SafetyCard } from '../components/ui/SafetyCard'
import { RecommendationCards } from '../components/recommendation/RecommendationCards'
import { EmptyState } from '../components/ui/EmptyState'

const SEVERITY_COLORS: Record<SeverityKey, string> = {
  minimal: 'text-green-400',
  mild: 'text-yellow-400',
  moderate: 'text-orange-400',
  moderately_severe: 'text-red-400',
  severe: 'text-red-500',
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function Assessment() {
  const [type, setType] = useState<AssessmentType | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [step, setStep] = useState(0)
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [error, setError] = useState('')

  function reset() {
    setType(null)
    setAnswers({})
    setStep(0)
    setResult(null)
    setError('')
  }

  function start(selected: AssessmentType) {
    setType(selected)
    setAnswers({})
    setStep(0)
    setResult(null)
    setError('')
  }

  // Selection screen + history
  if (!type) {
    const history = assessmentService.getHistory().slice(0, 5)

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Assessments</h1>
          <p className="text-slate-400 text-sm mt-1">
            These are screening tools, not diagnoses. They help you understand how you have been
            feeling over the last two weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => start('phq9')}
            className="glass cozy-in rounded-2xl p-6 text-left"
          >
            <h3 className="text-white font-semibold text-lg">PHQ-9</h3>
            <p className="text-sm text-slate-400 mt-1">Mood and depression screening, 9 questions</p>
          </button>
          <button
            onClick={() => start('gad7')}
            className="glass cozy-in rounded-2xl p-6 text-left"
            style={{ animationDelay: '0.08s' }}
          >
            <h3 className="text-white font-semibold text-lg">GAD-7</h3>
            <p className="text-sm text-slate-400 mt-1">Anxiety screening, 7 questions</p>
          </button>
        </div>

        <div className="space-y-3">
          <h2 className="text-white font-semibold">Your history</h2>
          {history.length === 0 ? (
            <EmptyState
              emoji="📋"
              title="No assessments yet"
              description="Take your first check-in above. Your results will appear here."
            />
          ) : (
            history.map((item) => (
              <div key={item.id} className="glass rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{ASSESSMENT_TITLES[item.type]}</p>
                  <p className="text-xs text-slate-500">{formatDate(item.timestamp)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">
                    {item.score}/{item.maxScore}
                  </p>
                  <p className={`text-xs font-medium ${SEVERITY_COLORS[item.severity]}`}>
                    {item.severityLabel}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  // Result screen
  if (result) {
    const recommendations = recommendationService.getRecommendations()

    return (
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <CheckCircle2 className="mx-auto text-[var(--color-primary)]" size={40} />
        <h1 className="text-2xl font-bold text-white">{ASSESSMENT_TITLES[result.type]} complete</h1>

        <div className="glass cozy-in rounded-2xl p-6 space-y-1">
          <p className="text-slate-400 text-sm">Your score</p>
          <p className="text-4xl font-bold text-white">
            {result.score}
            <span className="text-lg text-slate-500"> / {result.maxScore}</span>
          </p>
          <p className={`font-semibold ${SEVERITY_COLORS[result.severity]}`}>{result.severityLabel}</p>
        </div>

        {result.highRisk && <SafetyCard />}

        <p className="text-xs text-slate-500">
          This is a screening result, not a diagnosis. Please discuss it with a healthcare
          professional if you are concerned.
        </p>

        <div className="space-y-3 text-left">
          <h2 className="text-white font-semibold">Suggested for you</h2>
          <RecommendationCards recommendations={recommendations} />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Back to assessments
          </button>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-full btn-primary bg-[var(--color-primary)] text-white font-semibold"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Question screen
  const questions = assessmentService.getQuestions(type)
  const currentQuestion = questions[step]

  function selectAnswer(value: number) {
    const next = { ...answers, [currentQuestion.id]: value }
    setAnswers(next)
    setError('')

    if (step < questions.length - 1) {
      setStep(step + 1)
      return
    }

    const saved = assessmentService.submit(type as AssessmentType, next)
    if (!saved) {
      setError('Please answer every question before finishing.')
      return
    }
    setResult(saved)
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-400">
          <span>{ASSESSMENT_TITLES[type]}</span>
          <span>
            {step + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] transition-all"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass cozy-in rounded-2xl p-6 space-y-4" key={currentQuestion.id}>
        <p className="text-slate-400 text-sm">
          Over the last 2 weeks, how often have you been bothered by:
        </p>
        <h2 className="text-xl font-semibold text-white">{currentQuestion.text}</h2>

        <div className="space-y-2 pt-2">
          {ANSWER_OPTIONS.map((option) => {
            const selected = answers[currentQuestion.id] === option.value
            return (
              <button
                key={option.value}
                onClick={() => selectAnswer(option.value)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                  selected
                    ? 'bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-[var(--color-primary)]'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>

        {currentQuestion.id === 'phq9' && (
          <p className="text-xs text-slate-500">
            If you are struggling right now, you can call Tele-MANAS at 14416 anytime, free.
          </p>
        )}

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-white disabled:opacity-30"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={reset} className="text-sm text-slate-500 hover:text-red-400">
          Cancel
        </button>
      </div>
    </div>
  )
}