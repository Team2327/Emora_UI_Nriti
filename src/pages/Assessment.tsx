import { useState } from 'react'
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { PHQ9_QUESTIONS, GAD7_QUESTIONS, ANSWER_OPTIONS, type Question } from '../data/assessmentQuestions'

type AssessmentType = 'phq9' | 'gad7'

function getSeverity(type: AssessmentType, score: number) {
  if (type === 'phq9') {
    if (score <= 4) return { label: 'Minimal', color: 'text-green-400' }
    if (score <= 9) return { label: 'Mild', color: 'text-yellow-400' }
    if (score <= 14) return { label: 'Moderate', color: 'text-orange-400' }
    if (score <= 19) return { label: 'Moderately Severe', color: 'text-red-400' }
    return { label: 'Severe', color: 'text-red-500' }
  }
  if (score <= 4) return { label: 'Minimal', color: 'text-green-400' }
  if (score <= 9) return { label: 'Mild', color: 'text-yellow-400' }
  if (score <= 14) return { label: 'Moderate', color: 'text-orange-400' }
  return { label: 'Severe', color: 'text-red-400' }
}

export default function Assessment() {
  const [type, setType] = useState<AssessmentType | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [step, setStep] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions: Question[] = type === 'phq9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS

  function selectAnswer(value: number) {
    const q = questions[step]
    setAnswers((prev) => ({ ...prev, [q.id]: value }))
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      setShowResult(true)
    }
  }

  function reset() {
    setType(null)
    setAnswers({})
    setStep(0)
    setShowResult(false)
  }

  const score = Object.values(answers).reduce((a, b) => a + b, 0)
  const severe = type === 'phq9' && (answers['phq9'] ?? 0) > 0

  // Choose assessment type
  if (!type) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white">Choose an Assessment</h1>
        <p className="text-slate-400">
          These are screening tools, not diagnoses. They help understand how you've been feeling recently.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setType('phq9')}
            className="p-6 rounded-xl bg-slate-800 border border-slate-700 text-left hover:border-[var(--color-primary)] transition"
          >
            <h3 className="text-white font-semibold text-lg">PHQ-9</h3>
            <p className="text-sm text-slate-400 mt-1">Depression screening — 9 questions</p>
          </button>
          <button
            onClick={() => setType('gad7')}
            className="p-6 rounded-xl bg-slate-800 border border-slate-700 text-left hover:border-[var(--color-primary)] transition"
          >
            <h3 className="text-white font-semibold text-lg">GAD-7</h3>
            <p className="text-sm text-slate-400 mt-1">Anxiety screening — 7 questions</p>
          </button>
        </div>
      </div>
    )
  }

  // Result screen
  if (showResult) {
    const severity = getSeverity(type, score)
    return (
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <CheckCircle2 className="mx-auto text-[var(--color-primary)]" size={40} />
        <h1 className="text-2xl font-bold text-white">Assessment Complete</h1>

        <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 space-y-2">
          <p className="text-slate-400 text-sm">Your score</p>
          <p className="text-4xl font-bold text-white">{score}</p>
          <p className={`font-semibold ${severity.color}`}>{severity.label}</p>
        </div>

        {severe && (
          <div className="p-4 rounded-lg bg-red-950/50 border border-red-800 flex gap-3 text-left">
            <AlertTriangle className="text-red-400 shrink-0" size={20} />
            <p className="text-sm text-red-200">
              You indicated thoughts of self-harm. Please consider reaching out to a mental
              health professional or a crisis helpline right away. You don't have to go through this alone.
            </p>
          </div>
        )}

        <p className="text-sm text-slate-500">
          This is a screening result, not a diagnosis. Consider discussing it with a professional.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Take Another
          </button>
          <button className="px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 flex items-center gap-2">
            View Recommendations <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // Question screen
  const currentQuestion = questions[step]
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-400">
          <span>{type === 'phq9' ? 'PHQ-9' : 'GAD-7'}</span>
          <span>{step + 1} / {questions.length}</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] transition-all"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 rounded-xl bg-slate-800 border border-slate-700 space-y-4">
        <p className="text-slate-400 text-sm">Over the last 2 weeks, how often have you been bothered by:</p>
        <h2 className="text-xl font-semibold text-white">{currentQuestion.text}</h2>

        <div className="space-y-2 pt-2">
          {ANSWER_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => selectAnswer(option.value)}
              className="w-full text-left px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:border-[var(--color-primary)] hover:bg-slate-800 transition"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}