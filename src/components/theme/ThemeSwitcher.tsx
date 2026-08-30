import { useTheme } from './ThemeProvider';
import { PRESET_THEMES, type PresetName } from '../../types/theme';
import { themeService } from '../../services/themeService';
import { Palette, Sparkles, Lock } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, updateTheme } = useTheme();
  const canCustomize = themeService.canUseCustomPalette();

  function selectPreset(name: PresetName) {
    updateTheme({ ...theme, presetName: name, baseColor: PRESET_THEMES[name] });
  }

  function toggleMoodAdaptive() {
    updateTheme({ ...theme, moodAdaptive: !theme.moodAdaptive });
  }

  return (
    <div className="p-4 rounded-lg bg-slate-800 text-white space-y-4">
      <div className="flex items-center gap-2">
        <Palette size={18} />
        <h3 className="font-semibold">Customize Theme</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(PRESET_THEMES) as PresetName[]).map((name) => (
          <button
            key={name}
            onClick={() => selectPreset(name)}
            className={`w-8 h-8 rounded-full border-2 ${
              theme.presetName === name ? 'border-white' : 'border-transparent'
            }`}
            style={{ backgroundColor: PRESET_THEMES[name] }}
            title={name}
          />
        ))}
      </div>

      <button
        onClick={toggleMoodAdaptive}
        className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
      >
        <Sparkles size={16} />
        Mood-adaptive mode: {theme.moodAdaptive ? 'On' : 'Off'}
      </button>

      {!canCustomize && (
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Lock size={14} />
          Full custom color picker is a Premium feature
        </div>
      )}
    </div>
  );
}