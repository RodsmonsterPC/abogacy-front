import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'

// Dashboard pages
import Login from './pages/dashboard/Login'
import Dashboard from './pages/dashboard/Dashboard'
import ArticlesManager from './pages/dashboard/ArticlesManager'
import ServicesManager from './pages/dashboard/ServicesManager'
import MessagesManager from './pages/dashboard/MessagesManager'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Public pages ──────────────────────────────────────────── */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
            <Route path="/blog/:id" element={<PublicLayout><BlogPost /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

            {/* ── Dashboard ─────────────────────────────────────────────── */}
            <Route path="/dashboard/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/articles" element={<ProtectedRoute><ArticlesManager /></ProtectedRoute>} />
            <Route path="/dashboard/services" element={<ProtectedRoute><ServicesManager /></ProtectedRoute>} />
            <Route path="/dashboard/messages" element={<ProtectedRoute><MessagesManager /></ProtectedRoute>} />

            {/* ── Fallback ──────────────────────────────────────────────── */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  )
}
