import { subscriptionService } from '../services/subscriptionService'
import { authService } from '../services/authService'
import { User, Mail, Crown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const isPremium = subscriptionService.isPremium()
  const user = authService.getCurrentUser()
  const navigate = useNavigate()

  function handleLogout() {
    authService.logout()
    navigate('/auth')
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Profile</h1>

      <div className="glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
            <User size={22} className="text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-white font-semibold">{user?.name ?? 'Demo User'}</p>
            <p className="text-sm text-slate-400 flex items-center gap-1">
              <Mail size={12} /> {user?.email ?? 'demo@emora.app'}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-700">
          <span className="text-sm text-slate-400">Plan</span>
          <span className={`flex items-center gap-1 text-sm font-medium ${isPremium ? 'text-amber-400' : 'text-slate-300'}`}>
            {isPremium && <Crown size={14} />}
            {isPremium ? 'Premium' : 'Free'}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-800 text-red-400 hover:bg-red-950/30 mt-2"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  )
}