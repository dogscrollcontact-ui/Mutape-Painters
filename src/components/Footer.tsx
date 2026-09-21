import React from 'react';
import { Phone, MessageSquare, Instagram, MapPin, Globe } from 'lucide-react';
import { BRAND_ASSETS } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenQuote: () => void;
  onOpenAppointment: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  onOpenQuote,
  onOpenAppointment,
  onOpenAdmin,
}) => {
  const t = translations[lang];

  return (
    <footer id="contact" className="bg-[#070611] text-slate-300 pt-16 pb-24 md:pb-12 border-t border-[#1e1b43]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/95 rounded-xl p-1 shadow-md border border-slate-200/40 inline-flex">
                <img
                  src={BRAND_ASSETS.LOGO_URL}
                  alt="Mutape Painters Zim Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-black text-white text-base tracking-wider uppercase block">
                  Mutape Painters <span className="text-orange-500">Zim</span>
                </span>
                <span className="text-[11px] text-sky-400 font-semibold block">
                  {t.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/263781206184"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors border border-emerald-500/30"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href="https://www.instagram.com/mutapepainters1/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-pink-600/20 text-pink-400 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors border border-pink-500/30"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="tel:+263781206184"
                className="w-9 h-9 rounded-xl bg-orange-600/20 text-orange-400 hover:bg-orange-600 hover:text-white flex items-center justify-center transition-colors border border-orange-500/30"
                aria-label="Telephone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>{t.footer.quickLinks}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-orange-400 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-orange-400 transition-colors">
                  {t.nav.pricing}
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-orange-400 transition-colors">
                  Before & After Transformations
                </a>
              </li>
              <li>
                <a href="#our-work" className="hover:text-orange-400 transition-colors">
                  Recent Painting Projects
                </a>
              </li>
              <li>
                <a href="#colours" className="hover:text-orange-400 transition-colors">
                  {t.nav.colours}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-orange-400 transition-colors">
                  {t.nav.process}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Breakdown */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>{t.footer.servicesTitle}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Interior 2-Coat Painting</li>
              <li>Exterior Weather-Shielding</li>
              <li>Walls & Ceilings ($35/room labour)</li>
              <li>Decorative & Accent Walls</li>
              <li>Free 7000+ Colour Consultation</li>
              <li>Roof Leak & Plaster Repairs</li>
              <li>Commercial & Rental Repaints</li>
            </ul>
          </div>

          {/* Col 4: Contact & Locations */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{t.footer.contactTitle}</span>
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{t.footer.address1}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{t.footer.address2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:+263781206184" className="hover:text-white font-semibold">
                  {t.footer.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/263781206184"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-semibold"
                >
                  WhatsApp: +263 78 120 6184
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="inline-block bg-[#161334] text-sky-300 text-[11px] font-bold px-3 py-1.5 rounded-lg border border-[#2b255e]">
                {t.footer.coverageNotice}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1c193e] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>{t.footer.copyright}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {t.footer.disclaimer}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Language switch */}
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`hover:text-white ${lang === 'en' ? 'text-orange-400 font-bold' : ''}`}
              >
                English
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onLanguageChange('sn')}
                className={`hover:text-white ${lang === 'sn' ? 'text-orange-400 font-bold' : ''}`}
              >
                Shona
              </button>
            </div>

            <span>|</span>

            {/* Admin trigger */}
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-orange-400 transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
