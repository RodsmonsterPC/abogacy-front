import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLang, t } = useLanguage()

  const navLinks = [
    { to: '/',         label: t('nav.home') },
    { to: '/about',    label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/blog',     label: t('nav.blog') },
    { to: '/contact',  label: t('nav.contact') },
  ]

  return (
    <nav className="bg-primary-container shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-white/10">
      <div className="max-w-container mx-auto px-margin h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-xl font-bold text-white uppercase tracking-wider">
          Heritage Law
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-serif text-sm tracking-wide uppercase transition-all duration-300 pb-1 ${
                pathname === to
                  ? 'text-white border-b-2 border-secondary-container'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* ─── Language Switch ───────────────────────────────────── */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20
                       rounded-full px-3 py-1.5 transition-all duration-300 group"
          >
            <span className="text-base leading-none">{lang === 'es' ? '🇪🇸' : '🇺🇸'}</span>
            <span className="font-label-sm text-label-sm text-white/80 group-hover:text-white uppercase tracking-wider">
              {lang === 'es' ? 'ES' : 'EN'}
            </span>
            {/* Toggle pill */}
            <span className="relative inline-flex h-4 w-7 ml-1">
              <span className={`absolute inset-0 rounded-full transition-colors duration-300 ${lang === 'en' ? 'bg-secondary-container' : 'bg-white/30'}`} />
              <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform duration-300 ${lang === 'en' ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
            </span>
          </button>

          {/* CTA */}
          <Link
            to="/contact"
            className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider px-6 py-3 rounded hover:bg-secondary-fixed transition-colors"
          >
            {t('nav.cta')}
          </Link>

          {/* Admin link */}
          <Link
            to="/dashboard/login"
            className="text-white/50 hover:text-white/80 transition-colors"
            title="Admin"
          >
            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary-container border-t border-white/10 px-margin py-4 animate-fade-in">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`block font-serif text-sm tracking-wide uppercase py-3 border-b border-white/10 transition-colors ${
                pathname === to ? 'text-secondary-container' : 'text-white/70 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-2"
            >
              <span>{lang === 'es' ? '🇪🇸' : '🇺🇸'}</span>
              <span className="font-label-sm text-label-sm text-white uppercase">{lang.toUpperCase()}</span>
            </button>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-secondary-container text-on-secondary-container text-center font-label-sm text-label-sm uppercase tracking-wider px-6 py-3 rounded"
            >
              {t('nav.cta')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
