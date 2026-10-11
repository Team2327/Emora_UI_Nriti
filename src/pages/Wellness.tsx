import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react'
import {
  CATEGORY_LABELS,
  WELLNESS_ITEMS,
  type WellnessCategory,
  type WellnessItem,
} from '../data/wellnessContent'
import { wellnessService } from '../services/wellnessService'
import { BreathingExercise } from '../components/wellness/BreathingExercise'

type Filter = WellnessCategory | 'all'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...(Object.keys(CATEGORY_LABELS) as WellnessCategory[]).map((category) => ({
    value: category as Filter,
    label: CATEGORY_LABELS[category],
  })),
]

export default function Wellness() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<WellnessItem | null>(null)
  const [loggedId, setLoggedId] = useState<string | null>(null)

  const weekCount = wellnessService.getRecent(7).length

  function openItem(item: WellnessItem) {
    setSelected(item)
    setLoggedId(null)
  }

  function markDone(item: WellnessItem) {
    wellnessService.logActivity(item.id, item.title)
    setLoggedId(item.id)
  }

  if (selected) {
    return (
      <div className="max-w-2xl mx-auto space-y-5">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} /> Back to library
        </button>

        <div className="glass cozy-in rounded-2xl p-6 space-y-4" key={selected.id}>
          <div>
            <span className="text-xs text-[var(--color-primary)]">
              {CATEGORY_LABELS[selected.category]}
            </span>
            <h1 className="text-2xl font-bold text-white mt-1">{selected.title}</h1>
            <p className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <Clock size={12} /> {selected.duration}
            </p>
          </div>

          <p className="text-slate-300 text-sm">{selected.summary}</p>

          {selected.breathing && <BreathingExercise phases={selected.breathing} />}

          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
            {selected.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          {loggedId === selected.id ? (
            <p className="flex items-center gap-2 text-sm text-green-400">
              <CheckCircle2 size={16} /> Logged. Nice work looking after yourself 🌿
            </p>
          ) : (
            <button
              onClick={() => markDone(selected)}
              className="px-5 py-2.5 rounded-full btn-primary bg-[var(--color-primary)] text-white font-semibold"
            >
              Mark as done
            </button>
          )}
        </div>
      </div>
    )
  }

  const items = WELLNESS_ITEMS.filter((item) => filter === 'all' || item.category === filter)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Wellness Library</h1>
        <p className="text-slate-400 text-sm mt-1">
          Breathing, meditation, yoga and self-care you can do right now.
          {weekCount > 0 && ` You've done ${weekCount} this week.`}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === f.value
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => openItem(item)}
            className="glass cozy-in rounded-2xl p-4 text-left space-y-1"
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <span className="text-xs text-[var(--color-primary)]">
              {CATEGORY_LABELS[item.category]}
            </span>
            <h3 className="text-white font-semibold">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.summary}</p>
            <p className="flex items-center gap-1 text-xs text-slate-500 pt-1">
              <Clock size={12} /> {item.duration}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}