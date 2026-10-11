import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/ui/Layout'
import { ProtectedRoute } from './components/ui/ProtectedRoute'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Assessment from './pages/Assessment'
import Chat from './pages/Chat'
import Wellness from './pages/Wellness'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/wellness" element={<ProtectedRoute><Wellness /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App