import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, LogOut, Database, Trash2 } from 'lucide-react'
import { authService } from '../services/authService'
import { moodService } from '../services/moodService'
import { assessmentService } from '../services/assessmentService'
import { chatService } from '../services/chatService'
import { wellnessService } from '../services/wellnessService'
import { demoDataService } from '../services/demoDataService'
import { useTheme } from '../components/theme/ThemeProvider'

export default function Profile() {
  const navigate = useNavigate()
  const { refreshColors } = useTheme()
  const user = authService.getCurrentUser()
  const [confirmReset, setConfirmReset] = useState(false)
  const [notice, setNotice] = useState('')

  const moodCount = moodService.getAllEntries().length
  const assessmentCount = assessmentService.getAll().length
  const chatCount = chatService.getHistory().filter((m) => m.sender === 'user').length
  const wellnessCount = wellnessService.getAll().length

  function handleLogout() {
    authService.logout()
    navigate('/auth')
  }

  function handleLoadSample() {
    demoDataService.loadSample()
    refreshColors()
    setConfirmReset(false)
    setNotice('Sample data loaded. Check your dashboard.')
  }

  function handleReset() {
    demoDataService.reset()
    refreshColors()
    setConfirmReset(false)
    setNotice('Your mood, assessment, chat and wellness data was cleared.')
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Profile</h1>

      <div className="glass cozy-in rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
            <User size={22} className="text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-white font-semibold">{user?.name ?? 'Guest'}</p>
            <p className="text-sm text-slate-400 flex items-center gap-1">
              <Mail size={12} /> {user?.email ?? 'Not signed in'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-800 text-red-400 hover:bg-red-950/30"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="glass cozy-in rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Database size={18} className="text-[var(--color-primary)]" />
          <h2 className="text-white font-semibold">Your data</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-slate-500 text-xs">Mood logs</p>
            <p className="text-white font-semibold">{moodCount}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Assessments</p>
            <p className="text-white font-semibold">{assessmentCount}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Chat messages sent</p>
            <p className="text-white font-semibold">{chatCount}</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Wellness activities</p>
            <p className="text-white font-semibold">{wellnessCount}</p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Your data is stored only in this browser. Nothing is sent to a server in this prototype.
        </p>

        <div className="space-y-2 pt-2 border-t border-slate-700">
          <button
            onClick={handleLoadSample}
            className="w-full py-2.5 rounded-lg btn-primary bg-[var(--color-primary)] text-white text-sm font-semibold"
          >
            Load sample data (for demo)
          </button>

          {confirmReset ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 rounded-lg bg-red-500/20 text-red-300 text-sm font-semibold hover:bg-red-500/30"
              >
                Yes, clear my data
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 py-2.5 rounded-lg border border-slate-700 text-slate-300 text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-700 text-slate-300 text-sm hover:bg-slate-800"
            >
              <Trash2 size={16} /> Reset my data
            </button>
          )}

          {notice && <p className="text-xs text-green-400 pt-1">{notice}</p>}
        </div>
      </div>
    </div>
  )
}