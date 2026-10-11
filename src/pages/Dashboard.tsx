import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { MoodIndicator } from '../components/mood/MoodIndicator'
import { MoodOrb } from '../components/mood/MoodOrb'
import { StreakBadge } from '../components/mood/StreakBadge'
import { ThemeSwitcher } from '../components/theme/ThemeSwitcher'
import { useTheme } from '../components/theme/ThemeProvider'
import { EmptyState } from '../components/ui/EmptyState'
import { SafetyCard } from '../components/ui/SafetyCard'
import { RecommendationCards } from '../components/recommendation/RecommendationCards'
import { moodService } from '../services/moodService'
import { authService } from '../services/authService'
import { assessmentService } from '../services/assessmentService'
import { recommendationService } from '../services/recommendationService'
import { wellnessService } from '../services/wellnessService'
import { REMINDERS } from '../data/reminders'
import { MOOD_LABELS, MOOD_EMOJIS } from '../types/mood'
import {
  ASSESSMENT_TITLES,
  type AssessmentResult,
  type AssessmentType,
  type SeverityKey,
} from '../types/assessment'

const SEVERITY_COLORS: Record<SeverityKey, string> = {
  minimal: 'text-green-400',
  mild: 'text-yellow-400',
  moderate: 'text-orange-400',
  moderately_severe: 'text-red-400',
  severe: 'text-red-500',
}

function getGreeting(): { text: string; emoji: string } {
  const hour = new Date().getHours()
  if (hour < 5) return { text: 'Still up', emoji: '🌙' }
  if (hour < 12) return { text: 'Good morning', emoji: '🌅' }
  if (hour < 17) return { text: 'Good afternoon', emoji: '☀️' }
  if (hour < 21) return { text: 'Good evening', emoji: '🌆' }
  return { text: 'Good night', emoji: '🌙' }
}

function getTodaysReminder(): string {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000)
  return REMINDERS[dayOfYear % REMINDERS.length]
}

function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="glass cozy-in rounded-2xl p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-xl font-bold text-white mt-1">{value}</p>
      {hint && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
    </div>
  )
}

function AssessmentTile({ type, result }: { type: AssessmentType; result: AssessmentResult | null }) {
  return (
    <Link to="/assessment" className="glass cozy-in rounded-2xl p-4 block">
      <p className="text-xs text-slate-400">Latest {ASSESSMENT_TITLES[type]}</p>
      {result ? (
        <>
          <p className="text-xl font-bold text-white mt-1">
            {result.score}
            <span className="text-sm text-slate-500"> / {result.maxScore}</span>
          </p>
          <p className={`text-xs font-medium ${SEVERITY_COLORS[result.severity]}`}>
            {result.severityLabel}
          </p>
        </>
      ) : (
        <>
          <p className="text-xl font-bold text-white mt-1">Not taken yet</p>
          <p className="text-xs text-[var(--color-primary)]">Take it now</p>
        </>
      )}
    </Link>
  )
}

export default function Dashboard() {
  const [, setTick] = useState(0)
  const { refreshColors } = useTheme()
  const user = authService.getCurrentUser()
  const greeting = getGreeting()
  const firstName = user ? user.name.split(' ')[0] : ''

  const trend = moodService.getDailyTrend(7)
  const chartData = trend.map((point) => ({
    date: point.label,
    value: point.value,
    label: point.level ? MOOD_LABELS[point.level] : '',
  }))
  const hasTrendData = trend.some((point) => point.value !== null)

  const weeklyMood = moodService.getWeeklyAverageMood()
  const weekLogs = moodService.getRecentEntries(7).length
  const wellnessCount = wellnessService.getRecent(7).length
  const moodHistory = moodService.getHistory(5)

  const phq = assessmentService.getLatest('phq9')
  const gad = assessmentService.getLatest('gad7')
  const showSafety = Boolean(phq?.highRisk || gad?.highRisk)
  const recommendations = recommendationService.getRecommendations()

  function handleLogged() {
    refreshColors()
    setTick((t) => t + 1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            {greeting.text}
            {firstName ? `, ${firstName}` : ''} {greeting.emoji}
          </h1>
          <p className="text-slate-400 text-sm">Here's how you've been doing lately.</p>
          <StreakBadge />
        </div>
        <MoodOrb />
      </div>

      <MoodIndicator onLogged={handleLogged} />

      <div className="glass cozy-in rounded-2xl p-5 flex items-start gap-3">
        <span className="text-2xl">✨</span>
        <div>
          <p className="text-xs text-[var(--color-primary)] font-semibold">Today's gentle reminder</p>
          <p className="text-white mt-1">{getTodaysReminder()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <StatTile label="Mood logs this week" value={String(weekLogs)} />
        <StatTile
          label="Average mood"
          value={weeklyMood ? `${MOOD_EMOJIS[weeklyMood]} ${MOOD_LABELS[weeklyMood]}` : 'No data'}
          hint="Last 7 days"
        />
        <StatTile label="Wellness this week" value={String(wellnessCount)} hint="Activities done" />
        <AssessmentTile type="phq9" result={phq} />
        <AssessmentTile type="gad7" result={gad} />
      </div>

      {showSafety && <SafetyCard />}

      <div className="glass cozy-in rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">Mood Trend (Last 7 Days)</h3>
        {hasTrendData ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                stroke="var(--line)"
                tick={{ fill: 'var(--ink-muted)', fontSize: 12 }}
              />
              <YAxis domain={[0.5, 5.5]} hide />
              <Tooltip
                contentStyle={{
                  background: 'var(--glass-solid)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                }}
                labelStyle={{ color: 'var(--ink)' }}
                itemStyle={{ color: 'var(--ink-soft)' }}
                formatter={(_value, _name, props) => [props.payload.label || 'No entry', 'Mood']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-primary)"
                strokeWidth={3}
                connectNulls
                dot={{ fill: 'var(--color-primary)', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState
            emoji="🌱"
            title="Your journey starts here"
            description="Log your first mood above and watch your patterns unfold over time."
          />
        )}
      </div>

      <div className="space-y-3">
        <h3 className="text-white font-semibold">Suggested for you</h3>
        <RecommendationCards recommendations={recommendations} />
      </div>

      <div className="glass cozy-in rounded-2xl p-5 space-y-3">
        <h3 className="text-white font-semibold">Recent mood entries</h3>
        {moodHistory.length === 0 ? (
          <p className="text-sm text-slate-500">No entries yet. Your logs will appear here.</p>
        ) : (
          moodHistory.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3">
              <span className="text-2xl">{MOOD_EMOJIS[entry.level]}</span>
              <div className="flex-1">
                <p className="text-sm text-white">{MOOD_LABELS[entry.level]}</p>
                {entry.note && <p className="text-xs text-slate-400">{entry.note}</p>}
              </div>
              <span className="text-xs text-slate-500">
                {new Date(entry.timestamp).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </span>
            </div>
          ))
        )}
      </div>

      <ThemeSwitcher />

      <p className="text-xs text-slate-500 text-center">
        EMORA is a screening and support tool. It does not diagnose or prescribe, and it cannot
        replace a healthcare professional.
      </p>
    </div>
  )
}