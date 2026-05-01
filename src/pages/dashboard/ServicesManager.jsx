import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/client'

const MATERIAL_ICONS = ['gavel', 'domain', 'account_balance', 'family_restroom', 'lightbulb', 'history_edu', 'corporate_fare', 'balance', 'policy', 'handshake']
const EMPTY_FORM = { title: '', description: '', icon: 'gavel', details: '', order: 0, isActive: true }

export default function ServicesManager() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)

  const fetch = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/services?all=true')
      setServices(data)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [])

  const openNew = () => { setForm(EMPTY_FORM); setEditing(null); setShowForm(true) }
  const openEdit = (s) => { setForm({ title: s.title, description: s.description, icon: s.icon, details: s.details || '', order: s.order, isActive: s.isActive }); setEditing(s._id); setShowForm(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) { await api.put(`/services/${editing}`, form) } else { await api.post('/services', form) }
      setMsg({ type: 'success', text: editing ? 'Service updated!' : 'Service created!' })
      setShowForm(false)
      fetch()
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Error' })
    } finally { setSaving(false); setTimeout(() => setMsg(null), 4000) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return
    await api.delete(`/services/${id}`)
    fetch()
  }

  return (
    <div className="bg-background min-h-screen">
      <aside className="bg-white h-screen w-64 border-r border-slate-200 shadow-sm fixed left-0 top-0 flex flex-col py-6 z-50">
        <div className="px-6 mb-8">
          <h1 className="font-serif text-lg text-slate-900 font-semibold">Admin Console</h1>
          <span className="font-label-sm text-label-sm text-slate-500 uppercase tracking-widest">Heritage Law</span>
        </div>
        <nav className="flex-1 flex flex-col text-xs uppercase tracking-widest font-bold">
          {[
            { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
            { to: '/dashboard/articles', icon: 'edit_note', label: 'Articles' },
            { to: '/dashboard/services', icon: 'gavel', label: 'Services', active: true },
            { to: '/dashboard/messages', icon: 'mail', label: 'Messages' },
          ].map(({ to, icon, label, active }) => (
            <Link key={to} to={to} className={`flex items-center px-6 py-4 border-l-4 transition-all ${active ? 'bg-slate-100 text-slate-900 border-amber-500' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}>
              <span className="material-symbols-outlined mr-4 text-xl">{icon}</span>{label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-200">
          <button onClick={() => { logout(); navigate('/dashboard/login') }} className="w-full flex items-center px-6 py-4 text-slate-500 hover:bg-slate-50 text-xs uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined mr-4 text-xl">logout</span>Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 p-margin min-h-screen">
        <header className="flex justify-between items-center mb-stack-lg border-b border-outline-variant pb-4">
          <div>
            <h2 className="font-h2 text-h2 text-primary">Services</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage the services shown on the public website</p>
          </div>
          <button onClick={openNew} className="btn-secondary">
            <span className="material-symbols-outlined">add</span>New Service
          </button>
        </header>

        {msg && (
          <div className={`mb-4 p-3 rounded border ${msg.type === 'success' ? 'bg-secondary-container/20 border-secondary' : 'bg-error-container border-error'} font-body-md text-body-md`}>
            {msg.text}
          </div>
        )}

        {showForm && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-8 mb-stack-lg shadow-level-1 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-h3 text-h3 text-primary">{editing ? 'Edit Service' : 'New Service'}</h3>
              <button onClick={() => setShowForm(false)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSave} className="space-y-stack-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div>
                  <label className="input-label">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="Service name" required />
                </div>
                <div>
                  <label className="input-label">Icon (Material Symbol)</label>
                  <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="input-field">
                    {MATERIAL_ICONS.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="input-label">Short Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field resize-none h-24" required />
              </div>
              <div>
                <label className="input-label">Detailed Information</label>
                <textarea value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} className="input-field resize-none h-24" />
              </div>
              <div className="grid grid-cols-2 gap-gutter">
                <div>
                  <label className="input-label">Display Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) })} className="input-field" />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <input id="active" type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-secondary" />
                  <label htmlFor="active" className="font-body-md text-body-md">Active (shown publicly)</label>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-surface-container rounded animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {services.map(s => (
              <div key={s._id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-level-1 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container" />
                <div className="flex justify-between items-start mb-3">
                  <span className="material-symbols-outlined text-3xl text-secondary">{s.icon}</span>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(s)} className="p-1 text-secondary hover:text-primary"><span className="material-symbols-outlined text-lg">edit</span></button>
                    <button onClick={() => handleDelete(s._id)} className="p-1 text-error hover:text-on-error-container"><span className="material-symbols-outlined text-lg">delete</span></button>
                  </div>
                </div>
                <h3 className="font-h3 text-h3 text-primary-container mb-2">{s.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-3">{s.description}</p>
                <div className="mt-3">
                  <span className={s.isActive ? 'chip-resolved' : 'chip-pending'}>{s.isActive ? 'Active' : 'Hidden'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
