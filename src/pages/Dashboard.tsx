import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { MoodIndicator } from '../components/mood/MoodIndicator'
import { MoodOrb } from '../components/mood/MoodOrb'
import { StreakBadge } from '../components/mood/StreakBadge'
import { ThemeSwitcher } from '../components/theme/ThemeSwitcher'
import { PremiumGate } from '../components/premium/PremiumGate'
import { EmptyState } from '../components/ui/EmptyState'
import { moodService } from '../services/moodService'
import { authService } from '../services/authService'
import { MOOD_LABELS, MOOD_EMOJIS, type MoodLevel } from '../types/mood'
import { Sparkles } from 'lucide-react'

const MOOD_TO_NUMBER: Record<MoodLevel, number> = {
  very_low: 1, low: 2, neutral: 3, good: 4, great: 5,
}

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0)
  const user = authService.getCurrentUser()

  const recentEntries = moodService.getRecentEntries(7)
  const chartData = recentEntries.map((entry) => ({
    date: new Date(entry.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
    value: MOOD_TO_NUMBER[entry.level],
    label: MOOD_LABELS[entry.level],
  }))

  const latestMood = moodService.getLatestMood()

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Welcome back{user ? `, ${user.name}` : ''}
          </h1>
          <p className="text-slate-400 text-sm">Here's how you've been doing lately.</p>
          <StreakBadge />
        </div>
        <MoodOrb />
      </div>

      <MoodIndicator onLogged={() => setRefreshKey((k) => k + 1)} />

      <div className="glass cozy-in rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">Mood Trend (Last 7 Days)</h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} key={refreshKey}>
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis domain={[0, 5]} hide />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
                formatter={(_value, _name, props) => [props.payload.label, 'Mood']}
              />
              <Line type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: 'var(--color-primary)', r: 4 }} />
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

      <PremiumGate featureName="Mood Insights">
        <div className="glass cozy-in rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-amber-400" />
            <h3 className="text-white font-semibold">Insights</h3>
          </div>
          <p className="text-sm text-slate-300">
            {latestMood
              ? `Your mood has been trending ${MOOD_LABELS[latestMood.level].toLowerCase()} recently. Based on your patterns, evenings seem to affect your mood more than mornings.`
              : 'Log a few moods to unlock personalized insights.'}
          </p>
        </div>
      </PremiumGate>

      <div className="glass cozy-in rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-2">Today's Recommendation</h3>
        <p className="text-sm text-slate-300">
          {latestMood && (latestMood.level === 'very_low' || latestMood.level === 'low')
            ? 'Try a 5-minute breathing exercise — it can help ease tension when things feel heavy.'
            : 'Keep up the momentum! A short walk or journaling session could add to your good mood.'}
        </p>
        <span className="inline-block mt-3 text-2xl">{latestMood ? MOOD_EMOJIS[latestMood.level] : '🙂'}</span>
      </div>

      <ThemeSwitcher />
    </div>
  )
}