
import type { MoodLevel } from './mood'

export type SceneId = 'sunrise' | 'meadow' | 'ocean' | 'lavender' | 'starlit'
export type DecorKind = 'rise' | 'fall' | 'twinkle' | 'bubble'

export interface SceneConfig {
  id: SceneId
  name: string
  emoji: string
  tagline: string
  tone: 'light' | 'dark'
  primary: string
  accent: string
  preview: [string, string, string]
  decor: DecorKind
  glyphs: string[]
}

export interface ThemePreference {
  scene: SceneId
  accentOverride: string | null
  autoScene: boolean
}

export const SCENES: Record<SceneId, SceneConfig> = {
  sunrise: {
    id: 'sunrise',
    name: 'Sunrise',
    emoji: '🌅',
    tagline: 'Warm, hopeful, a fresh start',
    tone: 'light',
    primary: '#d9532f',
    accent: '#f59e73',
    preview: ['#fff3e2', '#ffd2b8', '#ffc4d6'],
    decor: 'rise',
    glyphs: ['✨'],
  },
  meadow: {
    id: 'meadow',
    name: 'Meadow',
    emoji: '🌿',
    tagline: 'Fresh air and calm focus',
    tone: 'light',
    primary: '#2f8f5b',
    accent: '#7fcb9b',
    preview: ['#eaf7ec', '#c9ebd4', '#c5e8ec'],
    decor: 'fall',
    glyphs: ['🍃'],
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Breeze',
    emoji: '🌊',
    tagline: 'Cool, clear and steady',
    tone: 'light',
    primary: '#0f7fa8',
    accent: '#6cc3e0',
    preview: ['#e4f5fc', '#bfe5f5', '#d5dafa'],
    decor: 'bubble',
    glyphs: [],
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender Dusk',
    emoji: '🌸',
    tagline: 'Soft, gentle and kind',
    tone: 'light',
    primary: '#7c5cc4',
    accent: '#b9a4ec',
    preview: ['#f4eefd', '#dccff7', '#f8d6e8'],
    decor: 'fall',
    glyphs: ['🌸'],
  },
  starlit: {
    id: 'starlit',
    name: 'Starlit Night',
    emoji: '🌙',
    tagline: 'Quiet, cosy and restful',
    tone: 'dark',
    primary: '#a596ff',
    accent: '#d2c9ff',
    preview: ['#1f1745', '#2b1f58', '#3a2466'],
    decor: 'twinkle',
    glyphs: ['✦', '✧'],
  },
}

export const SCENE_ORDER: SceneId[] = ['sunrise', 'meadow', 'ocean', 'lavender', 'starlit']

// Which atmosphere EMORA picks for each mood when "Auto-match my mood" is on
export const MOOD_SCENES: Record<MoodLevel, SceneId> = {
  very_low: 'lavender',
  low: 'ocean',
  neutral: 'meadow',
  good: 'sunrise',
  great: 'sunrise',
}

export const ACCENT_CHOICES: string[] = [
  '#d9532f',
  '#2f8f5b',
  '#0f7fa8',
  '#7c5cc4',
  '#c2417a',
  '#b7791f',
]

export const DEFAULT_THEME: ThemePreference = {
  scene: 'sunrise',
  accentOverride: null,
  autoScene: true,
}