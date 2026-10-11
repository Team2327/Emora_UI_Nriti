import { storageService } from './storageService'
import { moodService } from './moodService'
import {
  DEFAULT_THEME,
  MOOD_SCENES,
  SCENES,
  type SceneId,
  type ThemePreference,
} from '../types/theme'

export interface EffectiveColors {
  primary: string
  accent: string
  onPrimary: string
}

const THEME_KEY = 'emora_theme_v2'

function isSceneId(value: unknown): value is SceneId {
  return typeof value === 'string' && value in SCENES
}

function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value)
}

function channel(value: number): number {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function luminance(hex: string): number {
  const num = parseInt(hex.slice(1), 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16)
  const r = Math.min(255, ((num >> 16) & 255) + amount)
  const g = Math.min(255, ((num >> 8) & 255) + amount)
  const b = Math.min(255, (num & 255) + amount)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export const themeService = {
  getTheme(): ThemePreference {
    const stored = storageService.get<Partial<ThemePreference>>(THEME_KEY)
    const storedScene = stored?.scene
    const storedAccent = stored?.accentOverride
    const storedAuto = stored?.autoScene

    return {
      scene: isSceneId(storedScene) ? storedScene : DEFAULT_THEME.scene,
      accentOverride: isHexColor(storedAccent) ? storedAccent : null,
      autoScene: typeof storedAuto === 'boolean' ? storedAuto : DEFAULT_THEME.autoScene,
    }
  },

  saveTheme(theme: ThemePreference): void {
    storageService.set(THEME_KEY, theme)
  },

  getActiveSceneId(theme: ThemePreference): SceneId {
    if (theme.autoScene) {
      const latest = moodService.getLatestMood()
      if (latest) return MOOD_SCENES[latest.level]
    }
    return theme.scene
  },

  getEffectiveColors(theme: ThemePreference): EffectiveColors {
    const scene = SCENES[this.getActiveSceneId(theme)]
    const primary = theme.accentOverride ?? scene.primary
    const accent = theme.accentOverride ? lighten(primary, 45) : scene.accent
    const onPrimary = luminance(primary) <= 0.25 ? '#ffffff' : '#1b1630'
    return { primary, accent, onPrimary }
  },
}