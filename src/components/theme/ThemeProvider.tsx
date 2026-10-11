import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react'
import { themeService, type EffectiveColors } from '../../services/themeService'
import { SCENES, type SceneConfig, type ThemePreference } from '../../types/theme'

interface ThemeContextValue {
  theme: ThemePreference
  scene: SceneConfig
  colors: EffectiveColors
  updateTheme: (theme: ThemePreference) => void
  refreshColors: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemePreference>(() => themeService.getTheme())
  const [, setTick] = useState(0)

  const scene = SCENES[themeService.getActiveSceneId(theme)]
  const colors = themeService.getEffectiveColors(theme)

  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.scene = scene.id
    root.dataset.tone = scene.tone
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-accent', colors.accent)
    root.style.setProperty('--on-primary', colors.onPrimary)
  }, [scene.id, scene.tone, colors.primary, colors.accent, colors.onPrimary])

  function updateTheme(newTheme: ThemePreference) {
    themeService.saveTheme(newTheme)
    setTheme(newTheme)
  }

  function refreshColors() {
    setTick((t) => t + 1)
  }

  return (
    <ThemeContext.Provider value={{ theme, scene, colors, updateTheme, refreshColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}