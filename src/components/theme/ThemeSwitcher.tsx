import { Palette, Sparkles, Check, RotateCcw } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { ACCENT_CHOICES, SCENES, SCENE_ORDER, type SceneId } from '../../types/theme'
import { moodService } from '../../services/moodService'
import { MOOD_LABELS } from '../../types/mood'

export function ThemeSwitcher() {
  const { theme, scene, updateTheme } = useTheme()
  const latestMood = moodService.getLatestMood()

  function chooseScene(id: SceneId) {
    updateTheme({ ...theme, scene: id, autoScene: false })
  }

  function toggleAuto() {
    updateTheme({ ...theme, autoScene: !theme.autoScene })
  }

  function setAccent(color: string | null) {
    updateTheme({ ...theme, accentOverride: color })
  }

  const autoNote = theme.autoScene
    ? latestMood
      ? `Right now: ${scene.name}, matched to your latest mood (${MOOD_LABELS[latestMood.level]}).`
      : 'Log a mood and EMORA will pick an atmosphere that fits how you feel.'
    : 'You are choosing the atmosphere yourself.'

  return (
    <div className="glass cozy-in rounded-2xl p-5 space-y-5">
      <div className="flex items-center gap-2">
        <Palette size={18} className="text-[var(--color-primary)]" />
        <h3 className="text-white font-semibold">Customize your space</h3>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white font-medium flex items-center gap-1.5">
            <Sparkles size={14} className="text-[var(--color-primary)]" />
            Auto-match my mood
          </p>
          <p className="text-xs text-slate-400 mt-1">{autoNote}</p>
        </div>
        <button
          role="switch"
          aria-checked={theme.autoScene}
          aria-label="Auto-match my mood"
          onClick={toggleAuto}
          className={`relative shrink-0 w-11 h-6 rounded-full transition-colors ${
            theme.autoScene ? 'bg-[var(--color-primary)]' : 'bg-slate-700'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              theme.autoScene ? 'translate-x-5' : ''
            }`}
          />
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-slate-400">Atmosphere</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SCENE_ORDER.map((id) => {
            const s = SCENES[id]
            const active = scene.id === id
            return (
              <button
                key={id}
                onClick={() => chooseScene(id)}
                className={`relative rounded-xl overflow-hidden text-left transition-transform hover:scale-[1.03] ${
                  active ? 'ring-2 ring-[var(--color-primary)]' : 'ring-1 ring-black/10'
                }`}
              >
                <div
                  className="h-16 flex items-center justify-center text-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${s.preview[0]}, ${s.preview[1]}, ${s.preview[2]})`,
                  }}
                >
                  {s.emoji}
                </div>
                <div className="p-2.5 bg-slate-800">
                  <p className="text-sm text-white font-semibold">{s.name}</p>
                  <p className="text-[11px] text-slate-400 leading-tight">{s.tagline}</p>
                </div>
                {active && (
                  <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                    <Check size={12} className="text-black" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-slate-400">Accent color</p>
        <div className="flex flex-wrap items-center gap-2.5">
          {ACCENT_CHOICES.map((color) => (
            <button
              key={color}
              onClick={() => setAccent(color)}
              aria-label={`Accent ${color}`}
              className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                theme.accentOverride === color ? 'ring-2 ring-offset-2 ring-[var(--color-primary)]' : ''
              }`}
              style={{ backgroundColor: color }}
            />
          ))}

          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
            <input
              type="color"
              value={theme.accentOverride ?? scene.primary}
              onChange={(e) => setAccent(e.target.value)}
              className="w-8 h-8 rounded-full border-0 bg-transparent cursor-pointer"
            />
            Custom
          </label>

          {theme.accentOverride && (
            <button
              onClick={() => setAccent(null)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
            >
              <RotateCcw size={12} /> Use atmosphere color
            </button>
          )}
        </div>
      </div>
    </div>
  )
}