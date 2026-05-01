import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  const a = t('about')

  return (
    <main className="pt-20 min-h-screen">
      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-stack-lg px-gutter max-w-container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Portrait */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-primary-container rounded-lg transform translate-x-4 translate-y-4 -z-10" />
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
              alt="Senior Partner Portrait"
              className="w-full h-auto object-cover rounded-lg border border-outline-variant shadow-level-2 grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Bio */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-stack-md lg:pl-margin">
            <div>
              <p className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-base">{a.badge}</p>
              <h1 className="font-h1 text-h1 text-primary mb-stack-sm">{a.name}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{a.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-base mt-stack-md">
              {a.stats.map(({ num, label }) => (
                <div key={label} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-margin shadow-level-1 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="font-h2 text-h2 text-primary">{num}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bio + Timeline ──────────────────────────────────────────── */}
      <section className="py-stack-lg px-gutter max-w-container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Biography */}
        <div className="lg:col-span-7 space-y-stack-md pr-0 lg:pr-margin">
          <h2 className="font-h2 text-h2 text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary fill">account_balance</span>
            {a.bioTitle}
          </h2>
          <div className="space-y-stack-sm text-on-surface-variant font-body-md text-body-md">
            <p>{a.bio1}</p>
            <p>{a.bio2}</p>
            <p>{a.bio3}</p>
          </div>

          <div className="mt-stack-lg space-y-base">
            <h3 className="font-h3 text-h3 text-primary mb-stack-sm">{a.educationTitle}</h3>
            {a.education.map(({ icon, title, sub }) => (
              <div key={title} className="flex items-start gap-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant/50">
                <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-primary text-base">{icon}</span>
                </div>
                <div>
                  <h4 className="font-body-lg text-body-lg text-primary font-semibold">{title}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-5 mt-stack-lg lg:mt-0">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-margin shadow-level-1 h-full">
            <h3 className="font-h3 text-h3 text-primary mb-stack-lg">{a.timelineTitle}</h3>
            <div className="relative pl-8 border-l-2 border-surface-container-highest ml-2 space-y-stack-lg">
              {a.timeline.map(({ period, role, desc, active }) => (
                <div key={period} className="relative">
                  <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full shadow-[0_0_0_6px_theme(colors.surface-container-lowest)] z-10 border border-outline-variant ${active ? 'bg-secondary-fixed' : 'bg-surface-container-high'}`} />
                  <p className={`font-label-sm text-label-sm uppercase mb-1 ${active ? 'text-secondary' : 'text-on-surface-variant'}`}>{period}</p>
                  <h4 className="font-h3 text-primary mb-2 text-xl" style={{ fontFamily: 'Noto Serif, serif' }}>{role}</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
