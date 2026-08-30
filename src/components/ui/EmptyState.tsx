import type { ReactNode } from 'react'

interface EmptyStateProps {
  emoji: string
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ emoji, title, description, action }: EmptyStateProps) {
  return (
    <div className="glass cozy-in rounded-2xl p-8 text-center space-y-2">
      <div className="text-4xl">{emoji}</div>
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="text-sm text-slate-400 max-w-xs mx-auto">{description}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}