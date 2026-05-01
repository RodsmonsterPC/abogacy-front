import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/client'

const sideNav = [
  { to: '/dashboard',           icon: 'dashboard',   label: 'Dashboard' },
  { to: '/dashboard/articles',  icon: 'edit_note',   label: 'Articles' },
  { to: '/dashboard/services',  icon: 'gavel',       label: 'Services' },
  { to: '/dashboard/messages',  icon: 'mail',        label: 'Messages' },
]

function Sidebar({ onSignOut }) {
  const { pathname } = useLocation()
  return (
    <aside className="bg-white h-screen w-64 border-r border-slate-200 shadow-sm fixed left-0 top-0 flex flex-col py-6 z-50">
      <div className="px-6 mb-8">
        <h1 className="font-serif text-lg text-slate-900 font-semibold leading-tight mb-1">Admin Console</h1>
        <span className="font-label-sm text-label-sm text-slate-500 uppercase tracking-widest">Heritage Law</span>
      </div>

      <div className="px-6 mb-6">
        <Link to="/dashboard/articles?new=1" className="w-full bg-primary text-on-primary hover:bg-tertiary border-b-2 border-transparent hover:border-secondary transition-all duration-200 py-3 rounded shadow-sm flex items-center justify-center gap-2 font-label-sm text-label-sm uppercase">
          <span className="material-symbols-outlined text-lg">add</span>
          New Article
        </Link>
      </div>

      <nav className="flex-1 flex flex-col text-xs uppercase tracking-widest font-bold">
        {sideNav.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center px-6 py-4 border-l-4 transition-all duration-200 ${
              pathname === to
                ? 'bg-slate-100 text-slate-900 border-amber-500'
                : 'border-transparent text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined mr-4 text-xl">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-200">
        <Link to="/" className="flex items-center px-6 py-4 text-slate-500 hover:bg-slate-50 transition-all duration-200 text-xs uppercase tracking-widest font-bold">
          <span className="material-symbols-outlined mr-4 text-xl">public</span>
          View Site
        </Link>
        <button onClick={onSignOut} className="w-full flex items-center px-6 py-4 text-slate-500 hover:bg-slate-50 transition-all text-xs uppercase tracking-widest font-bold">
          <span className="material-symbols-outlined mr-4 text-xl">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  )
}

export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ articles: 0, services: 0, messages: 0 })
  const [recentMessages, setRecentMessages] = useState([])

  useEffect(() => {
    Promise.all([
      api.get('/articles?all=true&limit=1'),
      api.get('/services?all=true'),
      api.get('/contact?limit=5'),
    ]).then(([articles, services, messages]) => {
      setStats({
        articles: articles.data.total || 0,
        services: services.data.length || 0,
        messages: messages.data.total || 0,
      })
      setRecentMessages(messages.data.messages || [])
    }).catch(() => {})
  }, [])

  const handleSignOut = () => {
    logout()
    navigate('/dashboard/login')
  }

  return (
    <div className="bg-background min-h-screen">
      <Sidebar onSignOut={handleSignOut} />
      <main className="ml-64 p-margin min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-end mb-stack-lg border-b border-outline-variant pb-4">
          <div>
            <h2 className="font-h2 text-h2 text-primary">Dashboard Overview</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Firm performance and recent activities at a glance.</p>
          </div>
          <Link to="/dashboard/articles" className="btn-secondary">
            <span className="material-symbols-outlined text-lg">add</span>
            New Article
          </Link>
        </header>

        {/* Metric Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          {[
            { label: 'Published Articles', value: stats.articles, icon: 'edit_note' },
            { label: 'Active Services', value: stats.services, icon: 'gavel' },
            { label: 'Contact Messages', value: stats.messages, icon: 'mail' },
          ].map(({ label, value, icon }, i) => (
            <div key={label} className="bg-surface-container-lowest border border-[#E2E8F0] shadow-level-1 hover:shadow-level-2 hover:-translate-y-0.5 transition-all duration-300 rounded-lg p-6 relative overflow-hidden flex flex-col justify-between">
              {i === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />}
              <div className="flex justify-between items-start mb-4">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">{label}</span>
                <span className={`material-symbols-outlined ${i === 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>{icon}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="font-h1 text-h1 text-primary">{value}</span>
                <div className="w-24 h-8 bg-gradient-to-r from-transparent to-secondary opacity-20 rounded-sm" />
              </div>
            </div>
          ))}
        </section>

        {/* Recent Messages Table */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
          <div className="xl:col-span-2 bg-surface-container-lowest border border-[#E2E8F0] shadow-level-1 rounded-lg overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
              <h3 className="font-h3 text-h3 text-primary">Recent Messages</h3>
              <Link to="/dashboard/messages" className="text-secondary font-label-sm text-label-sm uppercase hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant">
                    {['Name', 'Email', 'Date', 'Status'].map((h) => (
                      <th key={h} className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase bg-surface-container-low">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentMessages.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-on-surface-variant">No messages yet</td></tr>
                  ) : recentMessages.map((msg) => (
                    <tr key={msg._id} className="border-b border-outline-variant hover:bg-surface-bright transition-colors">
                      <td className="p-4 font-body-md text-body-md text-primary font-medium">{msg.firstName} {msg.lastName}</td>
                      <td className="p-4 font-body-md text-body-md text-on-surface-variant">{msg.email}</td>
                      <td className="p-4 font-body-md text-body-md text-on-surface-variant">{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <span className={msg.status === 'new' ? 'chip-pending' : 'chip-resolved'}>{msg.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Draft */}
          <div className="bg-surface-container-lowest border border-[#E2E8F0] shadow-level-1 rounded-lg p-6 flex flex-col relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
            <h3 className="font-h3 text-h3 text-primary mb-6">Quick Draft</h3>
            <form className="flex-1 flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard/articles?new=1') }}>
              <div>
                <label className="input-label">Article Title</label>
                <input type="text" placeholder="Enter headline..." className="input-field" />
              </div>
              <div className="flex-1">
                <label className="input-label">Content</label>
                <textarea className="input-field resize-none min-h-[160px]" placeholder="Start drafting..." />
              </div>
              <button type="submit" className="btn-ghost justify-center w-full">
                <span className="material-symbols-outlined text-lg">edit_note</span>
                Open Full Editor
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
