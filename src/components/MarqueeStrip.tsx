import React from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface MarqueeStripProps {
  lang: Language;
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 py-3 shadow-md select-none border-y border-orange-700">
      {/* Track 1: Brand Primary Orange Marquee */}
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-[#0a0918] font-black text-xs sm:text-sm tracking-wider uppercase">
          <span>{t.marquee.strip1}</span>
          <span className="text-white">★</span>
          <span>{t.marquee.strip1}</span>
          <span className="text-white">★</span>
          <span>{t.marquee.strip1}</span>
        </div>
      </div>

      {/* Track 2: Deep Navy Track with Cyan & Orange accents running underneath */}
      <div className="mt-2 bg-[#121029] py-2 border-t border-orange-400/30 overflow-hidden">
        <div className="animate-marquee-slow whitespace-nowrap flex items-center gap-8 text-sky-300 font-extrabold text-[11px] sm:text-xs tracking-widest uppercase">
          <span>{t.marquee.strip2}</span>
          <span className="text-orange-400">✦</span>
          <span>{t.marquee.strip2}</span>
          <span className="text-orange-400">✦</span>
          <span>{t.marquee.strip2}</span>
        </div>
      </div>
    </div>
  );
};
