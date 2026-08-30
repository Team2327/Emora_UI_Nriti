import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { themeService } from '../../services/themeService'
import type { ThemePreference } from '../../types/theme'

interface ThemeContextValue {
  theme: ThemePreference
  colors: { primary: string; accent: string }
  updateTheme: (theme: ThemePreference) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemePreference>(themeService.getTheme())
  const [colors, setColors] = useState(themeService.getEffectiveColors())

  useEffect(() => {
    const effective = themeService.getEffectiveColors()
    setColors(effective)
    document.documentElement.style.setProperty('--color-primary', effective.primary)
    document.documentElement.style.setProperty('--color-accent', effective.accent)
    document.documentElement.classList.toggle('light-mode', theme.mode === 'light')
  }, [theme])

  function updateTheme(newTheme: ThemePreference) {
    themeService.saveTheme(newTheme)
    setTheme(newTheme)
  }

  function toggleMode() {
    updateTheme({ ...theme, mode: theme.mode === 'dark' ? 'light' : 'dark' })
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, updateTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}