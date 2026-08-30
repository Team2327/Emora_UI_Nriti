import { Link } from 'react-router-dom'
import { Heart, Brain, MessageCircle, TrendingUp } from 'lucide-react'

const FEATURES = [
  { icon: Brain, title: 'Guided Assessments', description: 'PHQ-9 & GAD-7 screening tools to understand how you\'re really doing.' },
  { icon: MessageCircle, title: 'AI Support Chat', description: 'Talk it out anytime with a rule-based companion built for emotional support.' },
  { icon: TrendingUp, title: 'Mood Tracking', description: 'Log your mood daily and see patterns emerge over time on your dashboard.' },
  { icon: Heart, title: 'Personalized Wellness', description: 'Recommendations tailored to your assessment results and mood history.' },
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 py-8">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-slate-300">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
          Your mental wellness companion
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Understand your mind.
          <br />
          <span className="text-[var(--color-primary)]">One day at a time.</span>
        </h1>

        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          EMORA helps you track your mood, screen for anxiety and depression,
          and get personalized, judgment-free support — all in one place.
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            to="/auth"
            className="px-6 py-3 rounded-full btn-primary bg-[var(--color-primary)] text-white font-semibold"
          >
            Get Started
          </Link>
          <Link
            to="/wellness"
            className="px-6 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
          >
            Explore Wellness
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="glass rounded-2xl p-5 space-y-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center">
              <Icon size={20} className="text-[var(--color-primary)]" />
            </div>
            <h3 className="text-white font-semibold">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        ))}
      </section>

      <section className="text-center text-xs text-slate-500 max-w-lg mx-auto">
        EMORA is a screening and support tool, not a diagnostic service. It does not
        replace professional medical advice. If you're in crisis, please reach out to
        a mental health professional or emergency services.
      </section>
    </div>
  )
}