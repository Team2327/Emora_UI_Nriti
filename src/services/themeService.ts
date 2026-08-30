import { storageService } from './storageService'
import { moodService } from './moodService'
import { subscriptionService } from './subscriptionService'
import type { ThemePreference } from '../types/theme'
import { DEFAULT_THEME } from '../types/theme'
import { MOOD_COLORS } from '../types/mood'

const THEME_KEY = 'emora_theme'

function lighten(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, (num >> 16) + percent)
  const g = Math.min(255, ((num >> 8) & 0x00ff) + percent)
  const b = Math.min(255, (num & 0x0000ff) + percent)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export const themeService = {
  getTheme(): ThemePreference {
    return storageService.get<ThemePreference>(THEME_KEY) ?? DEFAULT_THEME
  },
  saveTheme(theme: ThemePreference): void {
    storageService.set(THEME_KEY, theme)
  },
  canUseCustomPalette(): boolean {
    return subscriptionService.isPremium()
  },
  getEffectiveColors(): { primary: string; accent: string } {
    const theme = this.getTheme()
    let primary = theme.baseColor

    if (theme.moodAdaptive) {
      const latestMood = moodService.getLatestMood()
      if (latestMood) primary = MOOD_COLORS[latestMood.level]
    }

    return { primary, accent: lighten(primary, 40) }
  },
}