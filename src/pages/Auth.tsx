import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { AmbientBackground } from '../components/ui/AmbientBackground'
import { authService } from '../services/authService'

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email || !password || (mode === 'signup' && !name)) {
      setError('Please fill in all fields.')
      return
    }

    if (mode === 'signup') {
      authService.signup(name, email, password)
    } else {
      authService.login(email, password)
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <AmbientBackground />

      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-2xl p-8 border border-slate-700 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-slate-400">
            {mode === 'login'
              ? 'Log in to continue your wellness journey.'
              : 'Start your journey with EMORA today.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:opacity-90 transition"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setError('')
            }}
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}