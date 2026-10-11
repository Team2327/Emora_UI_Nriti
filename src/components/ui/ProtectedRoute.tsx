import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { authService } from '../../services/authService'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/auth" replace />
  }
  return <>{children}</>
}