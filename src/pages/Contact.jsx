import { useState } from 'react'
import api from '../api/client'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const c = t('contact')

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', practiceArea: '', message: '' })
  const [status, setStatus] = useState(null)
  const [errMsg, setErrMsg] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', practiceArea: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrMsg(err.response?.data?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <main className="pt-20 min-h-screen">
      <div className="pt-[60px] pb-margin px-margin max-w-container mx-auto w-full">
        {/* Header */}
        <div className="mb-stack-lg text-center max-w-3xl mx-auto">
          <h1 className="font-h1 text-h1 mb-stack-sm text-primary">{c.title}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">{c.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Info + Map */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-margin shadow-level-1 relative overflow-hidden hover:-translate-y-0.5 transition-transform duration-300">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-secondary-container" />
              <h3 className="font-h3 text-h3 mb-stack-md text-primary">{c.officeTitle}</h3>
              <div className="space-y-stack-sm">
                {[
                  { icon: 'location_on', content: <><p className="font-semibold">Heritage Law Group</p><p className="text-on-surface-variant whitespace-pre-line">{c.address}</p></> },
                  { icon: 'phone',    content: <p>{c.phone}</p> },
                  { icon: 'mail',     content: <p>{c.email}</p> },
                  { icon: 'schedule', content: <p>{c.hours}</p> },
                ].map(({ icon, content }, i) => (
                  <div key={i} className="flex items-start gap-base font-body-md text-body-md">
                    <span className="material-symbols-outlined text-secondary mt-0.5">{icon}</span>
                    <div>{content}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-primary-container rounded-lg border border-outline-variant shadow-level-1 overflow-hidden h-48 relative group">
              <img
                alt="Map"
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-80 transition-opacity"
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent flex items-end p-margin pointer-events-none">
                <span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-widest">Financial District</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest rounded-lg border border-outline-variant p-margin shadow-level-1">
              <h3 className="font-h3 text-h3 mb-stack-md text-primary">{c.formTitle}</h3>

              {status === 'success' ? (
                <div className="bg-secondary-container/20 border border-secondary rounded-lg p-8 text-center">
                  <span className="material-symbols-outlined text-secondary text-5xl block mb-4">check_circle</span>
                  <h4 className="font-h3 text-h3 text-primary mb-2">{c.successTitle}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">{c.successDesc}</p>
                  <button onClick={() => setStatus(null)} className="btn-primary mt-6 mx-auto">
                    {c.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-stack-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                    <div>
                      <label className="input-label">{c.firstName}</label>
                      <input name="firstName" type="text" value={form.firstName} onChange={handleChange}
                        placeholder="John" required className="input-field" />
                    </div>
                    <div>
                      <label className="input-label">{c.lastName}</label>
                      <input name="lastName" type="text" value={form.lastName} onChange={handleChange}
                        placeholder="Doe" required className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="input-label">{c.emailField}</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="john.doe@example.com" required className="input-field" />
                  </div>
                  <div>
                    <label className="input-label">{c.practiceArea}</label>
                    <select name="practiceArea" value={form.practiceArea} onChange={handleChange} className="input-field">
                      <option value="">—</option>
                      {c.areas.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="input-label">{c.message}</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      rows={5} placeholder={c.messagePlaceholder} required className="input-field resize-none" />
                  </div>
                  {status === 'error' && (
                    <p className="text-error font-body-md text-body-md">{errMsg}</p>
                  )}
                  <div className="pt-stack-sm">
                    <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                      {status === 'loading' ? (
                        <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{c.sending}</>
                      ) : (
                        <>{c.submit} <span className="material-symbols-outlined">send</span></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
