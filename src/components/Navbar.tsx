import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, Shield, Globe } from 'lucide-react';
import { BRAND_ASSETS } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenQuote: () => void;
  onOpenAppointment: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenQuote,
  onOpenAppointment,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#before-after', label: 'Before & After' },
    { href: '#our-work', label: t.nav.ourWork },
    { href: '#colours', label: t.nav.colours },
    { href: '#process', label: t.nav.process },
    { href: '#coverage', label: t.nav.coverage },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  const whatsappUrl = `https://wa.me/263781206184?text=${encodeURIComponent(
    t.whatsappMsgs.general
  )}`;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0918]/95 backdrop-blur-md shadow-xl py-2.5 border-b border-[#24204d]'
          : 'bg-gradient-to-b from-[#060511]/90 via-[#0a0918]/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Name - Official Logo prominently featured on clean neutral backing */}
          <a
            href="#home"
            id="nav-brand-link"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-xl p-1"
          >
            {/* Clean backing to ensure the official logo remains crisp, authentic, and perfectly legible */}
            <div className="bg-white/95 rounded-xl p-1 shadow-md border border-slate-200/40 flex items-center justify-center">
              <img
                src={BRAND_ASSETS.LOGO_URL}
                alt="Mutape Painters Zim Logo"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                loading="eager"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black tracking-wider text-white text-base sm:text-lg leading-tight uppercase font-sans">
                Mutape Painters <span className="text-orange-500">Zim</span>
              </span>
              <span className="text-[10px] sm:text-xs text-sky-300 font-semibold tracking-wide">
                {t.subTagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-semibold text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`desktop-nav-${link.href.replace('#', '')}`}
                className="px-2.5 py-1.5 rounded-lg hover:text-orange-400 hover:bg-[#1a1738] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#151230] rounded-xl p-0.5 border border-[#2b255c] text-xs">
              <button
                type="button"
                id="lang-btn-en"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-orange-500 text-[#0c0a1a] shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                id="lang-btn-sn"
                onClick={() => onLanguageChange('sn')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  lang === 'sn'
                    ? 'bg-orange-500 text-[#0c0a1a] shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Shandura kuShona"
              >
                Shona
              </button>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-cta"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-3.5 py-2 rounded-xl shadow-sm transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Now</span>
            </a>

            {/* Free Quote Header CTA */}
            <button
              type="button"
              id="nav-quote-cta"
              onClick={onOpenQuote}
              className="inline-flex items-center gap-1 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] text-xs font-black px-3.5 py-2 rounded-xl shadow-md transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <span>Free Quote</span>
            </button>
          </div>

          {/* Mobile Right Bar: Language & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick Lang toggle */}
            <button
              type="button"
              onClick={() => onLanguageChange(lang === 'en' ? 'sn' : 'en')}
              className="px-2 py-1 rounded-lg bg-[#181438] text-xs font-bold text-sky-300 border border-[#2b2658]"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'Shona' : 'EN'}
            </button>

            {/* Hamburger Button */}
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#181438] text-slate-200 hover:text-white border border-[#2b2658] focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-orange-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#0c0b1e]/98 backdrop-blur-xl border-b border-[#252052] shadow-2xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
        >
          {/* Quick Contact Info */}
          <div className="pb-3 mb-3 border-b border-[#231e4e] flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold text-orange-400">Harare & Chitungwiza</span>
            <a href="tel:+263781206184" className="font-bold text-sky-400 flex items-center gap-1">
              <Phone className="w-3 h-3" />
              <span>+263 78 120 6184</span>
            </a>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-orange-400 hover:bg-[#1a1738] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Actions */}
          <div className="space-y-2 pt-2 border-t border-[#231e4e]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-black py-3 rounded-xl shadow text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Now</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-orange-500 text-[#0c0a1a] font-black py-2.5 rounded-xl text-xs shadow"
              >
                Get Free Quote
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full bg-[#1e1b42] text-white font-bold py-2.5 rounded-xl text-xs border border-[#3b3577]"
              >
                Book Inspection
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-[11px] text-slate-400 hover:text-orange-400 inline-flex items-center gap-1"
              >
                <Shield className="w-3 h-3 text-orange-400" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
