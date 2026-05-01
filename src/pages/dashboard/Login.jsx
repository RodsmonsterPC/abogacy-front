import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await login(form.email, form.password)
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-primary-container flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-white uppercase tracking-wider">Heritage Law</h1>
          <p className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest mt-2">Admin Console</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-level-2 p-8">
          <h2 className="font-h3 text-h3 text-primary mb-stack-lg">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-stack-sm">
            <div>
              <label className="input-label">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="admin@heritagelaw.com"
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="input-label">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
                className="input-field"
              />
            </div>
            {error && (
              <div className="bg-error-container border border-error/20 rounded p-3">
                <p className="font-body-md text-body-md text-on-error-container">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-4 disabled:opacity-60"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Signing in...</>
              ) : (
                <>Sign In <span className="material-symbols-outlined">login</span></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-4 font-body-md text-body-md text-on-primary-container/60">
          Heritage Law Group — Secure Admin Area
        </p>
      </div>
    </div>
  )
}
