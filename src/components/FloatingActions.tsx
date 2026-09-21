import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  FileText,
  Calendar,
  Layers,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface FloatingActionsProps {
  lang: Language;
  onOpenQuote: () => void;
  onOpenAppointment: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  lang,
  onOpenQuote,
  onOpenAppointment,
}) => {
  const t = translations[lang];
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/263781206184?text=${encodeURIComponent(
    t.whatsappMsgs.general
  )}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Button in bottom-right corner */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="desktop-floating-whatsapp-btn"
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-emerald-400/40"
          aria-label="Chat on WhatsApp with Mutape Painters"
        >
          <MessageSquare className="w-5 h-5 fill-current shrink-0" />
          <span className="text-xs font-bold whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Floating Action Bar with Safe Area Spacing */}
      <div
        id="mobile-bottom-bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0b1e]/98 backdrop-blur-md border-t border-[#252052] px-2.5 py-2 pb-safe flex items-center justify-between gap-1.5 shadow-2xl"
      >
        {/* WhatsApp Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-bar-whatsapp-btn"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-emerald-600 active:bg-emerald-500 text-white font-extrabold py-2.5 px-2 rounded-xl text-xs shadow transition-transform active:scale-95"
        >
          <MessageSquare className="w-4 h-4 fill-current shrink-0" />
          <span className="whitespace-nowrap">{t.floatingBar.whatsapp}</span>
        </a>

        {/* Direct Call Action */}
        <a
          href="tel:+263781206184"
          id="mobile-bar-call-btn"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-[#171436] active:bg-[#201c4a] text-slate-200 font-bold py-2.5 px-2 rounded-xl text-xs border border-[#2b255e] transition-transform active:scale-95"
        >
          <Phone className="w-4 h-4 text-orange-400 shrink-0" />
          <span className="whitespace-nowrap">{t.floatingBar.call}</span>
        </a>

        {/* Instant Free Quote Trigger */}
        <button
          type="button"
          id="mobile-bar-quote-btn"
          onClick={onOpenQuote}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-orange-500 active:bg-orange-400 text-[#0c0a1a] font-black py-2.5 px-2 rounded-xl text-xs shadow-md transition-transform active:scale-95"
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">{t.floatingBar.quote}</span>
        </button>
      </div>
    </>
  );
};
