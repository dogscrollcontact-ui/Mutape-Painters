import React from 'react';
import { MapPin, Globe, CheckCircle2, MessageSquare } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface CoverageSectionProps {
  lang: Language;
}

export const CoverageSection: React.FC<CoverageSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="coverage" className="py-20 bg-[#0c0b1c] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            {t.coverage.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.coverage.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.coverage.subheadline}
          </p>
        </div>

        {/* Operational Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Hub 1: Harare */}
          <div className="bg-[#121028] rounded-2xl p-7 border border-[#272154] flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#191638] text-orange-400 flex items-center justify-center mb-4 border border-[#2c265e]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.coverage.loc1Name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.coverage.loc1Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#231e4e] flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Full Daily Coverage</span>
            </div>
          </div>

          {/* Hub 2: Chitungwiza */}
          <div className="bg-[#121028] rounded-2xl p-7 border border-[#272154] flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#191638] text-orange-400 flex items-center justify-center mb-4 border border-[#2c265e]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.coverage.loc2Name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.coverage.loc2Desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#231e4e] flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Direct Operational Presence</span>
            </div>
          </div>

          {/* Hub 3: Zimbabwe-Wide */}
          <div className="bg-[#121028] rounded-2xl p-7 border border-[#272154] flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#191638] text-sky-400 flex items-center justify-center mb-4 border border-[#2c265e]">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t.coverage.allZimTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.coverage.allZimDesc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#231e4e] flex items-center gap-1.5 text-xs text-sky-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Nationwide Site Inspections</span>
            </div>
          </div>

        </div>

        {/* Coverage WhatsApp Banner */}
        <div className="p-6 rounded-2xl bg-[#171438] border border-[#2e2863] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white">
              Not sure if we cover your area?
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              Send us your location on WhatsApp and we will immediately confirm our team's schedule.
            </p>
          </div>
          <a
            href="https://wa.me/263781206184?text=Hello%20Mutape%20Painters%20Zim%2C%20I%20would%20like%20to%20confirm%20if%20you%20cover%20my%20area."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow transition-transform active:scale-95 shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Location on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
