import { type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, LayoutDashboard, MessageCircle, Leaf, Stethoscope, CreditCard, User, ClipboardList, Sun, Moon, LogOut } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { CozyParticles } from './CozyParticles'
import { useTheme } from '../theme/ThemeProvider'
import { authService } from '../../services/authService'

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/assessment', label: 'Assessment', icon: ClipboardList },
  { path: '/chat', label: 'Chat', icon: MessageCircle },
  { path: '/wellness', label: 'Wellness', icon: Leaf },
  { path: '/doctors', label: 'Doctors', icon: Stethoscope },
  { path: '/pricing', label: 'Pricing', icon: CreditCard },
  { path: '/profile', label: 'Profile', icon: User },
]

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { theme, toggleMode } = useTheme()

  function handleLogout() {
    authService.logout()
    navigate('/auth')
  }

  return (
    <>
      <AmbientBackground />
      <CozyParticles />
      <div className="min-h-screen flex flex-col md:flex-row relative">
        <nav className="glass md:w-56 w-full flex md:flex-col justify-around md:justify-start md:p-4 p-2 gap-1 relative z-10 md:h-screen md:sticky md:top-0">
          <div className="hidden md:block text-xl font-bold text-[var(--color-primary)] mb-6 px-2">
            EMORA
          </div>

          {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  active ? 'bg-[var(--color-primary)] text-white' : 'text-slate-300 hover:bg-slate-700 hover:translate-x-1'
                }`}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            )
          })}

          <div className="hidden md:block md:mt-auto space-y-1">
            <button
              onClick={toggleMode}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-700"
            >
              {theme.mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {theme.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
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