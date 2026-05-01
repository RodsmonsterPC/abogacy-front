import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/client'

const CATEGORIES = ['Corporate', 'Litigation', 'Real Estate', 'Family Law', 'Intellectual Property', 'Estate Planning', 'General']

const EMPTY_FORM = { title: '', content: '', excerpt: '', image: '', category: 'General', tags: '', published: false }

export default function ArticlesManager() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null) // article id being edited
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/articles?all=true&limit=50')
      setArticles(data.articles || [])
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { fetchArticles() }, [])

  const openNew = () => { setForm(EMPTY_FORM); setEditing(null); setShowForm(true) }
  const openEdit = (article) => {
    setForm({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || '',
      image: article.image || '',
      category: article.category,
      tags: article.tags?.join(', ') || '',
      published: article.published,
    })
    setEditing(article._id)
    setShowForm(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
      if (editing) {
        await api.put(`/articles/${editing}`, payload)
        setMsg({ type: 'success', text: 'Article updated!' })
      } else {
        await api.post('/articles', payload)
        setMsg({ type: 'success', text: 'Article created!' })
      }
      setShowForm(false)
      fetchArticles()
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Error saving article' })
    } finally {
      setSaving(false)
      setTimeout(() => setMsg(null), 4000)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return
    await api.delete(`/articles/${id}`)
    fetchArticles()
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Sidebar (same as dashboard) */}
      <aside className="bg-white h-screen w-64 border-r border-slate-200 shadow-sm fixed left-0 top-0 flex flex-col py-6 z-50">
        <div className="px-6 mb-8">
          <h1 className="font-serif text-lg text-slate-900 font-semibold">Admin Console</h1>
          <span className="font-label-sm text-label-sm text-slate-500 uppercase tracking-widest">Heritage Law</span>
        </div>
        <nav className="flex-1 flex flex-col text-xs uppercase tracking-widest font-bold">
          {[
            { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
            { to: '/dashboard/articles', icon: 'edit_note', label: 'Articles', active: true },
            { to: '/dashboard/services', icon: 'gavel', label: 'Services' },
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
            <h2 className="font-h2 text-h2 text-primary">Articles</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your legal blog posts</p>
          </div>
          <button onClick={openNew} className="btn-secondary">
            <span className="material-symbols-outlined">add</span>New Article
          </button>
        </header>

        {msg && (
          <div className={`mb-4 p-3 rounded border ${msg.type === 'success' ? 'bg-secondary-container/20 border-secondary text-on-secondary-container' : 'bg-error-container border-error text-on-error-container'} font-body-md text-body-md`}>
            {msg.text}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-8 mb-stack-lg shadow-level-1 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-h3 text-h3 text-primary">{editing ? 'Edit Article' : 'New Article'}</h3>
              <button onClick={() => setShowForm(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-stack-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <div>
                  <label className="input-label">Title</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="Article title" required />
                </div>
                <div>
                  <label className="input-label">Category</label>
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="input-label">Excerpt</label>
                <input value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="input-field" placeholder="Short summary..." />
              </div>
              <div>
                <label className="input-label">Image URL</label>
                <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="input-field" placeholder="https://..." />
              </div>
              <div>
                <label className="input-label">Content</label>
                <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="input-field resize-none min-h-[240px]" placeholder="Write article content..." required />
              </div>
              <div>
                <label className="input-label">Tags (comma separated)</label>
                <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="input-field" placeholder="corporate, litigation, M&A" />
              </div>
              <div className="flex items-center gap-3">
                <input id="published" type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-secondary rounded" />
                <label htmlFor="published" className="font-body-md text-body-md text-on-surface">Publish immediately</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                  {saving ? 'Saving...' : editing ? 'Update Article' : 'Create Article'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Articles Table */}
        {loading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-surface-container rounded animate-pulse" />)}</div>
        ) : (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-level-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant">
                  {['Title', 'Category', 'Status', 'Views', 'Date', 'Actions'].map(h => (
                    <th key={h} className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase bg-surface-container-low">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-on-surface-variant">No articles yet. Create your first one!</td></tr>
                ) : articles.map(a => (
                  <tr key={a._id} className="border-b border-outline-variant hover:bg-surface-bright transition-colors">
                    <td className="p-4 font-body-md text-body-md text-primary font-medium max-w-xs truncate">{a.title}</td>
                    <td className="p-4 font-label-sm text-label-sm text-on-surface-variant uppercase">{a.category}</td>
                    <td className="p-4">
                      <span className={a.published ? 'chip-resolved' : 'chip-pending'}>
                        {a.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">{a.views || 0}</td>
                    <td className="p-4 font-body-md text-body-md text-on-surface-variant">{new Date(a.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => openEdit(a)} className="text-secondary hover:text-primary transition-colors" title="Edit">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button onClick={() => handleDelete(a._id)} className="text-error hover:text-on-error-container transition-colors" title="Delete">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
