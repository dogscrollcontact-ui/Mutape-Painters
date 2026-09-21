import React from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface BrandTrackerProps {
  lang: Language;
}

/**
 * Genuine & approved brand names for Mutape Painters Zim.
 * Featuring the official paint brands that Mutape Painters Zim works with,
 * applies, and recommends (Dulux, Plascon, Astra Paints, Nash Paints, Chameleon).
 * Continuous, smooth horizontal ticker.
 */
const APPROVED_BRANDS = [
  { name: 'DULUX', tag: 'Certified Specialist' },
  { name: 'PLASCON', tag: 'Preferred Applicator' },
  { name: 'ASTRA PAINTS', tag: 'Quality Partner' },
  { name: 'NASH PAINTS', tag: 'Approved Paints' },
  { name: 'CHAMELEON PAINTS', tag: 'Architectural Coatings' },
  { name: 'DULUX TRADE', tag: 'Interior & Exterior' },
  { name: 'PLASCON TRADE', tag: 'Durable Finishes' },
];

export const BrandTracker: React.FC<BrandTrackerProps> = ({ lang }) => {
  const headingText = lang === 'sn' ? 'Pende Dzinovimbika Dzatinoshandisa' : 'TRUSTED PAINT BRANDS WE WORK WITH';
  const subtitle = lang === 'sn' 
    ? 'Tinoshandisa mhando dzepamusoro dzakavimbika muZimbabwe chete' 
    : 'We work with and apply Zimbabwe’s leading premium paint manufacturers';

  // Double the list for seamless continuous infinite marquee
  const loopedBrands = [...APPROVED_BRANDS, ...APPROVED_BRANDS, ...APPROVED_BRANDS];

  return (
    <div className="relative overflow-hidden bg-[#0c0b1d] border-y border-[#262252] py-4 select-none">
      {/* Subtle brand glow behind marquee */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#38bdf8]/5 to-transparent pointer-events-none" />

      {/* Header Label */}
      <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-sky-400">
            {headingText}
          </span>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium">
          {subtitle}
        </span>
      </div>

      {/* Moving Track */}
      <div className="flex w-full overflow-hidden mask-fade">
        <div className="animate-marquee-brands whitespace-nowrap flex items-center gap-8 text-slate-200">
          {loopedBrands.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="inline-flex items-center gap-3 bg-[#161430] hover:bg-[#1f1b45] px-4 py-2 rounded-xl border border-[#2d2860] transition-colors"
            >
              <Award className="w-4 h-4 text-orange-500 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-xs sm:text-sm tracking-wider text-white font-sans">
                  {brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-sky-300 font-semibold">
                  {brand.tag}
                </span>
              </div>
              <span className="text-orange-500/50 font-bold ml-2">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
