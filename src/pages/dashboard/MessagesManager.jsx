import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/client'

const STATUS_OPTIONS = ['new', 'read', 'replied', 'archived']

export default function MessagesManager() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const params = filter ? { status: filter } : {}
      const { data } = await api.get('/contact', { params })
      setMessages(data.messages || [])
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetchMessages() }, [filter])

  const handleStatusChange = async (id, status) => {
    await api.put(`/contact/${id}`, { status })
    fetchMessages()
    if (selected?._id === id) setSelected({ ...selected, status })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    await api.delete(`/contact/${id}`)
    if (selected?._id === id) setSelected(null)
    fetchMessages()
  }

  const chipClass = (status) => ({
    new: 'chip-pending', read: 'chip-resolved', replied: 'chip-resolved', archived: 'bg-surface-container text-on-surface-variant px-3 py-1 rounded font-label-sm text-label-sm uppercase',
  }[status] || 'chip-pending')

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
            { to: '/dashboard/services', icon: 'gavel', label: 'Services' },
            { to: '/dashboard/messages', icon: 'mail', label: 'Messages', active: true },
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
            <h2 className="font-h2 text-h2 text-primary">Contact Messages</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Incoming client inquiries</p>
          </div>
          <div className="flex gap-2">
            {['', ...STATUS_OPTIONS].map((s) => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded font-label-sm text-label-sm uppercase border transition-colors ${filter === s ? 'bg-primary-container text-on-primary border-primary-container' : 'border-outline-variant text-on-surface-variant hover:border-secondary'}`}>
                {s || 'All'}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
          {/* List */}
          <div className="xl:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-level-1">
            {loading ? (
              <div className="space-y-2 p-4">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-surface-container rounded animate-pulse" />)}</div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant">No messages found</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant">
                    {['Name', 'Subject', 'Date', 'Status', ''].map(h => (
                      <th key={h} className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase bg-surface-container-low">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => (
                    <tr key={msg._id} onClick={() => setSelected(msg)}
                      className={`border-b border-outline-variant hover:bg-surface-bright cursor-pointer transition-colors ${selected?._id === msg._id ? 'bg-surface-container-low' : ''}`}>
                      <td className="p-4 font-body-md text-body-md text-primary font-medium whitespace-nowrap">{msg.firstName} {msg.lastName}</td>
                      <td className="p-4 font-body-md text-body-md text-on-surface-variant">{msg.practiceArea}</td>
                      <td className="p-4 font-body-md text-body-md text-on-surface-variant whitespace-nowrap">{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td className="p-4"><span className={chipClass(msg.status)}>{msg.status}</span></td>
                      <td className="p-4">
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(msg._id) }} className="text-error hover:text-on-error-container">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Detail Panel */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-level-1 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
            {selected ? (
              <>
                <div className="mb-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-h3 text-h3 text-primary">{selected.firstName} {selected.lastName}</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">{selected.email}</p>
                  </div>
                  <span className={chipClass(selected.status)}>{selected.status}</span>
                </div>
                <div className="mb-4">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Practice Area</p>
                  <p className="font-body-md text-body-md">{selected.practiceArea}</p>
                </div>
                <div className="mb-4">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Message</p>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">{selected.message}</p>
                </div>
                <div className="mb-4">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map(s => (
                      <button key={s} onClick={() => handleStatusChange(selected._id, s)}
                        className={`px-3 py-1 rounded font-label-sm text-label-sm uppercase border transition-colors ${selected.status === s ? 'bg-primary-container text-on-primary border-primary-container' : 'border-outline-variant text-on-surface-variant hover:border-secondary'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <a href={`mailto:${selected.email}`} className="btn-secondary w-full justify-center">
                  <span className="material-symbols-outlined">reply</span>Reply via Email
                </a>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-on-surface-variant py-12">
                <span className="material-symbols-outlined text-5xl mb-4 text-outline">mark_email_read</span>
                <p className="font-body-md text-body-md">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
