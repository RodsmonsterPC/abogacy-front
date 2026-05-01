import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const f = t('footer')

  const footerLinks = [
    { to: '/privacy', label: f.privacy },
    { to: '/terms',   label: f.terms },
    { to: '/contact', label: f.contact },
  ]

  return (
    <footer className="bg-primary-container border-t border-white/5 py-12">
      <div className="max-w-container mx-auto px-margin flex flex-col items-center gap-6 text-center">
        <Link to="/" className="font-serif text-white text-lg tracking-wider uppercase">
          Heritage Law Group
        </Link>
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-sans text-xs text-on-primary-container uppercase tracking-widest
                         hover:text-white opacity-80 hover:opacity-100 transition-opacity underline"
            >
              {label}
            </Link>
          ))}
        </div>
        <p className="font-sans text-xs text-on-primary-container/60">
          © {new Date().getFullYear()} Heritage Law Group. {f.rights}
        </p>
      </div>
    </footer>
  )
}
