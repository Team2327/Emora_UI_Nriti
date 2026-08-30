import { useState } from 'react'
import { moodService } from '../../services/moodService'
import { MOOD_EMOJIS, MOOD_LABELS, type MoodLevel } from '../../types/mood'
import { FloatingEmojiLayer } from './FloatingEmoji'

const MOODS: MoodLevel[] = ['very_low', 'low', 'neutral', 'good', 'great']

export function MoodIndicator({ onLogged }: { onLogged?: () => void }) {
  const [selected, setSelected] = useState<MoodLevel | null>(null)
  const [trigger, setTrigger] = useState(0)
  const [showNote, setShowNote] = useState(false)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  function handleSelect(level: MoodLevel) {
    setSelected(level)
    setShowNote(true)
    setSaved(false)
    setTrigger((t) => t + 1)
  }

  function handleSaveNote() {
    if (selected) {
      moodService.addEntry(selected, note.trim() || undefined)
      setSaved(true)
      setShowNote(false)
      setNote('')
      onLogged?.()
    }
  }

  function handleSkipNote() {
    if (selected) {
      moodService.addEntry(selected)
      setSaved(true)
      setShowNote(false)
      onLogged?.()
    }
  }

  return (
    <>
      <div className="glass cozy-in rounded-2xl p-5">
        <p className="mb-3 text-sm text-slate-300">How are you feeling today?</p>
        <div className="flex gap-3">
          {MOODS.map((level) => (
            <button
              key={level}
              onClick={() => handleSelect(level)}
              title={MOOD_LABELS[level]}
              className={`text-2xl p-2 rounded-full transition-all duration-200 ${
                selected === level ? 'bg-[var(--color-primary)] scale-125' : 'hover:bg-slate-700 hover:scale-110'
              }`}
            >
              {MOOD_EMOJIS[level]}
            </button>
          ))}
        </div>

        {showNote && (
          <div className="mt-4 space-y-2 cozy-in">
            <p className="text-xs text-slate-400">Want to add a note? (optional)</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)] resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNote}
                className="px-4 py-1.5 rounded-full btn-primary bg-[var(--color-primary)] text-white text-sm font-medium"
              >
                Save
              </button>
              <button
                onClick={handleSkipNote}
                className="px-4 py-1.5 rounded-full text-slate-400 text-sm hover:text-slate-300"
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {saved && (
          <p className="mt-3 text-xs text-green-400 cozy-in">Mood logged 🌿</p>
        )}
      </div>
      {selected && <FloatingEmojiLayer trigger={trigger} emoji={MOOD_EMOJIS[selected]} />}
    </>
  )
}