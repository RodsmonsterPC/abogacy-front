import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard',          icon: 'dashboard',  label: 'Dashboard' },
  { to: '/dashboard/articles', icon: 'edit_note',  label: 'Articles' },
  { to: '/dashboard/services', icon: 'gavel',      label: 'Services' },
  { to: '/dashboard/messages', icon: 'mail',       label: 'Messages' },
]

export default function DashboardSidebar() {
  const { pathname } = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    logout()
    navigate('/dashboard/login')
  }

  return (
    <aside className="bg-white h-screen w-64 border-r border-slate-200 shadow-sm fixed left-0 top-0 flex flex-col py-6 z-50">
      {/* Brand */}
      <div className="px-6 mb-8">
        <h1 className="font-serif text-lg text-slate-900 font-semibold leading-tight mb-1">
          Admin Console
        </h1>
        <span className="font-label-sm text-label-sm text-slate-500 uppercase tracking-widest">
          Heritage Law
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col text-xs uppercase tracking-widest font-bold">
        {NAV_ITEMS.map(({ to, icon, label }) => (
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

      {/* Bottom actions */}
      <div className="mt-auto pt-4 border-t border-slate-200">
        {/* Regresar al sitio */}
        <Link
          to="/"
          className="flex items-center gap-3 mx-4 mb-3 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 hover:border-amber-400 transition-all duration-200 text-xs uppercase tracking-widest font-bold group"
        >
          <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform duration-200">
            home
          </span>
          <span>Regresar al sitio</span>
          <span className="material-symbols-outlined text-sm ml-auto opacity-60">arrow_outward</span>
        </Link>

        <div className="border-t border-slate-100 mx-4 mb-1" />

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-6 py-3 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all duration-200 text-xs uppercase tracking-widest font-bold"
        >
          <span className="material-symbols-outlined mr-4 text-xl">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
