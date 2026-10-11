import { useEffect, useState } from 'react'
import { Play, Square } from 'lucide-react'
import type { BreathingPhase } from '../../data/wellnessContent'

export function BreathingExercise({ phases }: { phases: BreathingPhase[] }) {
  const [running, setRunning] = useState(false)
  const [state, setState] = useState({ phase: 0, remaining: phases[0].seconds })

  useEffect(() => {
    if (!running) return

    const id = setInterval(() => {
      setState((prev) => {
        if (prev.remaining > 1) {
          return { phase: prev.phase, remaining: prev.remaining - 1 }
        }
        const next = (prev.phase + 1) % phases.length
        return { phase: next, remaining: phases[next].seconds }
      })
    }, 1000)

    return () => clearInterval(id)
  }, [running, phases])

  function stop() {
    setRunning(false)
    setState({ phase: 0, remaining: phases[0].seconds })
  }

  const current = phases[state.phase]
  const scale = running ? current.scale : 1
  const duration = running ? current.seconds : 0.6

  return (
    <div className="flex flex-col items-center gap-5 py-4">
      <div className="w-56 h-56 flex items-center justify-center">
        <div
          className="w-36 h-36 rounded-full flex flex-col items-center justify-center shadow-2xl"
          style={{
            background: 'radial-gradient(circle at 30% 30%, var(--color-accent), var(--color-primary))',
            color: 'var(--on-primary)',
            transform: `scale(${scale})`,
            transition: `transform ${duration}s ease-in-out`,
          }}
        >
          <span className="text-lg font-semibold" aria-live="polite">
            {running ? current.label : 'Ready'}
          </span>
          {running && <span className="text-2xl font-bold">{state.remaining}</span>}
        </div>
      </div>

      {running ? (
        <button
          onClick={stop}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <Square size={16} /> Stop
        </button>
      ) : (
        <button
          onClick={() => setRunning(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full btn-primary bg-[var(--color-primary)] text-white font-semibold"
        >
          <Play size={16} /> Start
        </button>
      )}
    </div>
  )
}