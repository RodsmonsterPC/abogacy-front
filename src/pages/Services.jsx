import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'
import { useLanguage } from '../context/LanguageContext'

const CACHE_KEY = 'hl_services_cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutos

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts < CACHE_TTL) return data
    return null
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
  } catch { /* cuota llena — ignorar */ }
}

export default function Services() {
  const { t } = useLanguage()
  const s = t('services')

  const cached = useRef(readCache())
  const [services, setServices] = useState(cached.current || [])
  const [loading, setLoading] = useState(!cached.current)

  useEffect(() => {
    // Si hay caché, la UI ya está visible → sólo revalidamos en background (sin spinner)
    api.get('/services')
      .then(({ data }) => {
        const result = data.length > 0 ? data : s.defaultServices
        setServices(result)
        if (data.length > 0) writeCache(data) // sólo cachear datos reales de la BD
      })
      .catch(() => {
        if (!cached.current) setServices(s.defaultServices)
      })
      .finally(() => setLoading(false))
  }, [])

  // When language changes, refresh fallback text if using defaults
  useEffect(() => {
    if (!loading && services.length > 0 && services[0]._id === undefined) {
      setServices(s.defaultServices)
    }
  }, [t])

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="max-w-container mx-auto px-gutter py-stack-lg mt-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-6 pr-0 lg:pr-margin">
            <h1 className="font-h1 text-h1 text-primary-container mb-stack-sm">{s.heroTitle}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-md">{s.heroDesc}</p>
            <div className="w-16 h-1 bg-secondary-container" />
          </div>
          <div className="lg:col-span-6 mt-margin lg:mt-0">
            <div className="relative h-64 md:h-80 w-full rounded overflow-hidden shadow-level-2">
              <img
                alt="Legal volumes"
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-container mx-auto px-gutter py-stack-lg">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-surface-container rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {services.map((service, i) => (
              <div key={service._id || i}
                className="bg-surface-container-lowest border border-outline-variant rounded shadow-level-1 hover:shadow-level-2 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden flex flex-col p-8 group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-container" />
                <span className="material-symbols-outlined text-secondary text-4xl mb-stack-sm group-hover:scale-110 transition-transform duration-300 origin-left">
                  {service.icon || 'gavel'}
                </span>
                <h3 className="font-h3 text-h3 text-primary-container mb-base">{service.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md flex-grow">{service.description}</p>
                <Link to="/contact" className="font-label-sm text-label-sm text-secondary uppercase flex items-center hover:text-primary-container transition-colors">
                  {s.cardCta} <span className="material-symbols-outlined ml-2 text-base">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-container mx-auto px-gutter py-stack-lg mb-margin">
        <div className="bg-primary-container rounded shadow-level-2 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary-container" />
          <h2 className="font-h2 text-h2 text-on-primary mb-stack-sm">{s.ctaTitle}</h2>
          <p className="font-body-md text-body-md text-on-primary-container mb-stack-md max-w-2xl mx-auto">{s.ctaDesc}</p>
          <Link to="/contact" className="btn-primary inline-flex mx-auto">
            {s.ctaBtn}
            <span className="material-symbols-outlined">arrow_outward</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
