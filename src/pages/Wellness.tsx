import { Lock } from 'lucide-react'
import { subscriptionService } from '../services/subscriptionService'

const WELLNESS_ITEMS = [
  { title: 'Box Breathing', category: 'Breathing', free: true },
  { title: '5-Minute Morning Yoga', category: 'Yoga', free: true },
  { title: 'Body Scan Meditation', category: 'Meditation', free: false },
  { title: 'Progressive Muscle Relaxation', category: 'Self-care', free: false },
  { title: 'Gratitude Journaling Guide', category: 'Self-care', free: false },
  { title: '4-7-8 Breathing Technique', category: 'Breathing', free: false },
]

export default function Wellness() {
  const isPremium = subscriptionService.isPremium()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Wellness Library</h1>
      <p className="text-slate-400">Yoga, breathing, meditation and self-care resources.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {WELLNESS_ITEMS.map((item) => {
          const locked = !item.free && !isPremium
          return (
            <div key={item.title} className={`glass rounded-2xl p-4 relative ${locked ? 'opacity-60' : ''}`}>
              <span className="text-xs text-[var(--color-primary)]">{item.category}</span>
              <h3 className="text-white font-semibold mt-1">{item.title}</h3>
              {locked && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-slate-400">
                  <Lock size={12} /> Premium
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}