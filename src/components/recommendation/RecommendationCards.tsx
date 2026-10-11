import { Link } from 'react-router-dom'
import { Wind, Sparkles, Activity, Heart, MessageCircle, LifeBuoy, ArrowRight, type LucideIcon } from 'lucide-react'
import type { Recommendation, RecommendationCategory } from '../../services/recommendationService'

const ICONS: Record<RecommendationCategory, LucideIcon> = {
  breathing: Wind,
  meditation: Sparkles,
  yoga: Activity,
  'self-care': Heart,
  chat: MessageCircle,
  professional: LifeBuoy,
}

export function RecommendationCards({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {recommendations.map((rec, index) => {
        const Icon = ICONS[rec.category]
        const content = (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/20 flex items-center justify-center">
                <Icon size={16} className="text-[var(--color-primary)]" />
              </div>
              <h4 className="text-white font-semibold text-sm">{rec.title}</h4>
            </div>
            <p className="text-sm text-slate-400">{rec.description}</p>
            {rec.path && rec.actionLabel && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)]">
                {rec.actionLabel} <ArrowRight size={12} />
              </span>
            )}
          </div>
        )

        const className = 'glass cozy-in rounded-2xl p-4 block text-left'
        const style = { animationDelay: `${index * 0.08}s` }

        return rec.path ? (
          <Link key={rec.id} to={rec.path} className={className} style={style}>
            {content}
          </Link>
        ) : (
          <div key={rec.id} className={className} style={style}>
            {content}
          </div>
        )
      })}
    </div>
  )
}