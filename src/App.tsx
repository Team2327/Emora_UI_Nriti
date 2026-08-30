import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/ui/Layout'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Assessment from './pages/Assessment'
import Chat from './pages/Chat'
import Wellness from './pages/Wellness'
import Doctors from './pages/Doctors'
import Pricing from './pages/Pricing'
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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  )
}

export default App