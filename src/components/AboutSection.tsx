import React from 'react';
import { ShieldCheck, Clock, Paintbrush, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { BRAND_ASSETS } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';

interface AboutSectionProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, onOpenQuote }) => {
  const t = translations[lang];

  return (
    <section id="about" className="py-20 bg-[#0c0b1c] text-slate-100 relative overflow-hidden">
      {/* Subtle brand glow orb */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/25">
            {t.about.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.about.headline}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-sky-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Visual Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Project Image & Floating Visual Callout */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2b255e] group">
              <img
                src={BRAND_ASSETS.PROJECT_HERO_ALT}
                alt="Mutape Painters Zim - Completed Project"
                className="w-full h-80 sm:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090914] via-[#090914]/40 to-transparent" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#0f0e26]/95 backdrop-blur-md border border-[#2b2658] shadow-xl">
                <div className="flex items-center gap-2 mb-1 text-orange-400 font-black text-sm uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>"Don't Wait for Opportunity, Paint It!"</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Transforming houses into homes across Harare, Chitungwiza, and throughout Zimbabwe with pride, precision, and reliable paints.
                </p>
              </div>
            </div>

            {/* Quick stats / facts strip below image */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-2xl bg-[#14122d] border border-[#262152] text-center">
                <span className="text-[11px] text-slate-400 block">Pricing Model</span>
                <span className="text-xs sm:text-sm font-black text-orange-400">$35 / Room</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#14122d] border border-[#262152] text-center">
                <span className="text-[11px] text-slate-400 block">Paint Standards</span>
                <span className="text-xs sm:text-sm font-black text-sky-400">Dulux & Plascon</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#14122d] border border-[#262152] text-center">
                <span className="text-[11px] text-slate-400 block">Service Scope</span>
                <span className="text-xs sm:text-sm font-black text-emerald-400">All Zimbabwe</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Journey & Value Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-base text-slate-300 leading-relaxed">
              <p className="border-l-2 border-orange-500 pl-4 text-white font-medium">
                {t.about.p1}
              </p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>

            {/* 4 Core Pillars - Structured Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#14122d] border border-[#262152] hover:border-orange-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1.5">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>{t.about.value1Title}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {t.about.value1Desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#14122d] border border-[#262152] hover:border-sky-400/40 transition-colors">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1.5">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                    <Paintbrush className="w-4 h-4" />
                  </div>
                  <span>{t.about.value2Title}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {t.about.value2Desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#14122d] border border-[#262152] hover:border-orange-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1.5">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{t.about.value3Title}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {t.about.value3Desc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#14122d] border border-[#262152] hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm mb-1.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>{t.about.value4Title}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {t.about.value4Desc}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenQuote}
                className="bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <span>Request Free Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+263781206184"
                className="text-xs font-bold text-slate-300 hover:text-white transition-colors"
              >
                Direct Call: +263 78 120 6184
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
