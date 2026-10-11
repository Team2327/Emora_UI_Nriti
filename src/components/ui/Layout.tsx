import { type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, LayoutDashboard, MessageCircle, Leaf, User, ClipboardList, LogOut, Sparkles } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { useTheme } from '../theme/ThemeProvider'
import { authService } from '../../services/authService'
import { SCENES, SCENE_ORDER, type SceneId } from '../../types/theme'

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/assessment', label: 'Assessment', icon: ClipboardList },
  { path: '/chat', label: 'Chat', icon: MessageCircle },
  { path: '/wellness', label: 'Wellness', icon: Leaf },
  { path: '/profile', label: 'Profile', icon: User },
]

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, scene, updateTheme } = useTheme()

  function handleLogout() {
    authService.logout()
    navigate('/auth')
  }

  function chooseScene(id: SceneId) {
    updateTheme({ ...theme, scene: id, autoScene: false })
  }

  function enableAuto() {
    updateTheme({ ...theme, autoScene: true })
  }

  return (
    <>
      <AmbientBackground />
      <div className="min-h-screen flex flex-col md:flex-row relative">
        <nav className="glass md:w-56 w-full flex md:flex-col justify-around md:justify-start md:p-4 p-2 gap-1 relative z-10 md:h-screen md:sticky md:top-0">
          <div className="hidden md:block text-xl font-extrabold text-[var(--color-primary)] mb-6 px-2">
            EMORA
          </div>

          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  active
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:translate-x-1'
                }`}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            )
          })}

          <div className="hidden md:block md:mt-auto space-y-3">
            <div className="space-y-2">
              <p className="text-xs text-slate-500 px-1">Atmosphere</p>
              <div className="flex items-center justify-between">
                {SCENE_ORDER.map((id) => {
                  const s = SCENES[id]
                  const active = scene.id === id
                  return (
                    <button
                      key={id}
                      onClick={() => chooseScene(id)}
                      title={s.name}
                      aria-label={s.name}
                      className={`w-7 h-7 rounded-full text-sm flex items-center justify-center transition-transform hover:scale-110 ${
                        active ? 'ring-2 ring-[var(--color-primary)]' : 'ring-1 ring-black/10'
                      }`}
                      style={{ background: `linear-gradient(135deg, ${s.preview[0]}, ${s.preview[1]})` }}
                    >
                      {s.emoji}
                    </button>
                  )
                })}
                <button
                  onClick={enableAuto}
                  title="Match my mood automatically"
                  aria-label="Match my mood automatically"
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 bg-slate-700 ${
                    theme.autoScene ? 'ring-2 ring-[var(--color-primary)]' : 'ring-1 ring-black/10'
                  }`}
                >
                  <Sparkles size={14} className="text-[var(--color-primary)]" />
                </button>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-red-950/30 hover:text-red-400"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </nav>

        <main className="flex-1 p-6 relative z-10 page-enter">{children}</main>
      </div>
    </>
  )
}