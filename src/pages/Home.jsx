import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'
import { useLanguage } from '../context/LanguageContext'

export default function Home() {
  const { t } = useLanguage()
  const h = t('home') // shorthand for the whole home namespace
  const [services, setServices] = useState([])

  useEffect(() => {
    api.get('/services').then(({ data }) => {
      if (data.length > 0) setServices(data.slice(0, 3))
    }).catch(() => {})
  }, [])

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[820px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary-container">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')] bg-cover bg-center opacity-25 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-container w-full px-margin mx-auto text-center flex flex-col items-center py-32">
          <p className="font-label-sm text-label-sm text-secondary-container uppercase tracking-widest mb-4 animate-fade-in-up">
            {h.badge}
          </p>
          <h1 className="font-h1 text-h1 text-white mb-stack-md max-w-4xl drop-shadow-lg leading-tight animate-fade-in-up animation-delay-100">
            {h.heroTitle}
          </h1>
          <p className="font-body-lg text-body-lg text-inverse-on-surface mb-stack-lg max-w-2xl opacity-90 animate-fade-in-up animation-delay-200">
            {h.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <Link to="/contact" className="btn-secondary shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
              {h.ctaPrimary}
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link to="/services" className="btn-ghost border-white/30 text-white hover:bg-white/10">
              {h.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Services Bento ──────────────────────────────────────────── */}
      <section className="py-stack-lg max-w-container mx-auto px-margin">
        <div className="mb-stack-lg text-center">
          <h2 className="font-h2 text-h2 text-on-background mb-stack-sm">{h.servicesTitle}</h2>
          <div className="h-1 w-16 bg-secondary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Feature card */}
          <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant shadow-level-1 rounded-lg p-margin relative overflow-hidden group hover:-translate-y-1 hover:shadow-level-2 transition-all duration-300">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary" />
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="material-symbols-outlined text-4xl text-primary-container mb-stack-sm block">corporate_fare</span>
                <h3 className="font-h3 text-h3 text-on-background mb-stack-sm">{h.featuredService.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{h.featuredService.desc}</p>
              </div>
              <Link to="/services" className="mt-stack-md font-label-sm text-label-sm uppercase text-secondary tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                {h.featuredService.link} <span className="material-symbols-outlined text-sm">chevron_right</span>
              </Link>
            </div>
          </div>

          {/* Side cards */}
          {services.slice(1, 3).map((s) => (
            <div key={s._id} className="bg-surface-container-lowest border border-outline-variant shadow-level-1 rounded-lg p-gutter hover:-translate-y-1 hover:shadow-level-2 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-3xl text-primary-container mb-stack-sm block">{s.icon}</span>
                <h3 className="font-h3 text-on-background text-xl mb-base">{s.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">{s.description}</p>
              </div>
            </div>
          ))}

          {/* CTA banner */}
          <div className="md:col-span-2 bg-primary-container text-on-primary border border-primary/20 shadow-level-1 rounded-lg p-margin relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-secondary opacity-10 rounded-bl-full" />
            <div className="flex flex-col sm:flex-row items-center justify-between h-full relative z-10 gap-4">
              <div className="max-w-lg">
                <h3 className="font-h3 text-h3 text-white mb-stack-sm">{h.needCounsel.title}</h3>
                <p className="font-body-md text-body-md text-on-primary-container">{h.needCounsel.desc}</p>
              </div>
              <Link to="/contact" className="btn-secondary flex-shrink-0">{h.needCounsel.btn}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── About Teaser ────────────────────────────────────────────── */}
      <section className="py-stack-lg bg-surface-container-low">
        <div className="max-w-container mx-auto px-margin grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-stack-md">
            <p className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">{h.aboutBadge}</p>
            <h2 className="font-h2 text-h2 text-primary">{h.aboutTitle}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{h.aboutDesc}</p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {h.stats.map(({ num, label }) => (
                <div key={label} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 text-center shadow-level-1">
                  <p className="font-serif text-2xl font-bold text-primary">{num}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-primary inline-flex mt-2">
              {h.aboutCta} <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary-container rounded-lg transform translate-x-4 translate-y-4 -z-10" />
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
              alt="Senior legal partner"
              className="w-full h-auto object-cover rounded-lg border border-outline-variant shadow-level-2 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>
    </>
  )
}
