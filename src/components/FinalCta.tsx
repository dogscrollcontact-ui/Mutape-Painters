import React from 'react';
import { MessageSquare, FileText, Calendar, Phone } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface FinalCtaProps {
  lang: Language;
  onOpenQuote: () => void;
  onOpenAppointment: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  lang,
  onOpenQuote,
  onOpenAppointment,
}) => {
  const t = translations[lang];
  const whatsappUrl = `https://wa.me/263781206184?text=${encodeURIComponent(
    t.whatsappMsgs.general
  )}`;

  return (
    <section className="py-20 bg-[#0c0b1c] text-slate-100 relative overflow-hidden border-t border-[#231e4e]">
      {/* Background Brand Glow matching Logo Palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
          {t.finalCta.headline}
        </h2>

        <p className="text-base sm:text-xl font-medium text-orange-400 max-w-2xl mx-auto mb-10">
          "{t.finalCta.subheadline}"
        </p>

        {/* Buttons Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="final-cta-whatsapp-btn"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-4 rounded-xl shadow-xl text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t.finalCta.whatsappBtn}</span>
          </a>

          <button
            type="button"
            id="final-cta-quote-btn"
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-black px-6 py-4 rounded-xl shadow-xl text-sm sm:text-base transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="w-5 h-5" />
            <span>{t.finalCta.quoteBtn}</span>
          </button>

          <button
            type="button"
            id="final-cta-appointment-btn"
            onClick={onOpenAppointment}
            className="inline-flex items-center gap-2 bg-[#171436] hover:bg-[#252054] text-slate-200 hover:text-white font-semibold px-6 py-4 rounded-xl border border-[#2e2762] text-sm sm:text-base transition-all hover:scale-105"
          >
            <Calendar className="w-5 h-5 text-orange-400" />
            <span>{t.finalCta.appointmentBtn}</span>
          </button>
        </div>

        {/* Direct Phone Dial */}
        <p className="text-xs sm:text-sm text-slate-300 flex items-center justify-center gap-2">
          <Phone className="w-4 h-4 text-orange-400" />
          <span>{t.finalCta.phoneText}</span>
        </p>

      </div>
    </section>
  );
};
