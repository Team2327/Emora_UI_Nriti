export type PresetName = 'Coral Warmth' | 'Sage Calm' | 'Golden Hour' | 'Lavender Dream' | 'Ocean Deep';
export type ColorMode = 'dark' | 'light';

export interface ThemePreference {
  baseColor: string;
  presetName: PresetName;
  moodAdaptive: boolean;
  mode: ColorMode;
}

export const PRESET_THEMES: Record<PresetName, string> = {
  'Coral Warmth': '#F4785B',
  'Sage Calm': '#8FA98C',
  'Golden Hour': '#E8A94D',
  'Lavender Dream': '#9B8CC4',
  'Ocean Deep': '#4A90A4',
};

export const DEFAULT_THEME: ThemePreference = {
  baseColor: PRESET_THEMES['Coral Warmth'],
  presetName: 'Coral Warmth',
  moodAdaptive: false,
  mode: 'dark',
};