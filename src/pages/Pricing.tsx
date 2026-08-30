import { Check } from 'lucide-react'
import { subscriptionService } from '../services/subscriptionService'
import { useState } from 'react'

const PLANS = {
  free: ['Basic assessments', 'Limited chatbot', '7-day mood history', 'Wellness previews'],
  premium: [
    'Full personalized recommendations', 'Unlimited chatbot access', 'Full mood history & insights',
    'Doctor appointment booking', 'Complete wellness library', 'Custom theme colors',
  ],
}

export default function Pricing() {
  const [isPremium, setIsPremium] = useState(subscriptionService.isPremium())

  function upgrade() {
    subscriptionService.upgradeToPremium()
    setIsPremium(true)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white text-center">Choose Your Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-bold text-lg">Free</h3>
          <p className="text-slate-400 text-sm">Get started with the basics</p>
          <ul className="space-y-2">
            {PLANS.free.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <Check size={14} className="text-green-400" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6 space-y-4 relative border-2 border-[var(--color-primary)]">
          <span className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-amber-500 text-slate-900 text-xs font-bold">
            RECOMMENDED
          </span>
          <h3 className="text-white font-bold text-lg">Premium</h3>
          <p className="text-slate-400 text-sm">Full access to everything</p>
          <ul className="space-y-2">
            {PLANS.premium.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <Check size={14} className="text-green-400" /> {f}
              </li>
            ))}
          </ul>
          <button
            onClick={upgrade}
            disabled={isPremium}
            className="w-full py-2.5 rounded-lg btn-primary bg-[var(--color-primary)] text-white font-semibold disabled:opacity-50"
          >
            {isPremium ? 'Current Plan ✓' : 'Upgrade Now (Simulated)'}
          </button>
        </div>
      </div>
    </div>
  )
}