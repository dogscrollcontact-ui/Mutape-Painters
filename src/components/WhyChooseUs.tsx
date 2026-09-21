import React, { useState } from 'react';
import {
  Award,
  Clock,
  Sparkles,
  Palette,
  FileCheck,
  Building,
  Home,
  MapPin,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'craft' | 'reliability' | 'materials'>('craft');

  const pillars = [
    {
      icon: Award,
      title: t.whyUs.item1Title,
      desc: t.whyUs.item1Desc,
      category: 'craft',
      highlight: 'Clean cuts & zero tape bleed',
    },
    {
      icon: Clock,
      title: t.whyUs.item2Title,
      desc: t.whyUs.item2Desc,
      category: 'reliability',
      highlight: 'Punctual arrival & clear schedules',
    },
    {
      icon: Sparkles,
      title: t.whyUs.item3Title,
      desc: t.whyUs.item3Desc,
      category: 'craft',
      highlight: 'Pre-coating crack repairs',
    },
    {
      icon: Palette,
      title: t.whyUs.item4Title,
      desc: t.whyUs.item4Desc,
      category: 'materials',
      highlight: 'Dulux, Plascon & Astra',
    },
    {
      icon: FileCheck,
      title: t.whyUs.item5Title,
      desc: t.whyUs.item5Desc,
      category: 'reliability',
      highlight: '$35/room transparent labour',
    },
    {
      icon: Building,
      title: t.whyUs.item6Title,
      desc: t.whyUs.item6Desc,
      category: 'craft',
      highlight: 'Offices, complexes & retail',
    },
    {
      icon: Home,
      title: t.whyUs.item7Title,
      desc: t.whyUs.item7Desc,
      category: 'craft',
      highlight: 'Protected floors & covered furniture',
    },
    {
      icon: MapPin,
      title: t.whyUs.item8Title,
      desc: t.whyUs.item8Desc,
      category: 'reliability',
      highlight: 'Harare, Chitungwiza & all provinces',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#0c0b1c] text-slate-100 relative overflow-hidden">
      {/* Decorative Brand Accent Background */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20">
            {t.whyUs.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.whyUs.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.whyUs.subheadline}
          </p>
        </div>

        {/* Interactive Comparison Card: The Mutape Standard vs. Unprofessional Painting */}
        <div className="mb-14 bg-gradient-to-r from-[#141133] to-[#1a1542] rounded-3xl p-6 sm:p-8 border border-[#2b255e] shadow-2xl">
          <h3 className="text-lg sm:text-xl font-black text-white mb-6 text-center">
            How Mutape Painters Zim Protects Your Home
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Unprofessional Way */}
            <div className="p-5 rounded-2xl bg-[#0e0c22] border border-rose-900/30">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Risks with Cheap / Unverified Labour</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Paint splattered across floor tiles, skirting boards, and window glass.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>No proper priming or crack repair — paint bubbles or peels within months.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Thinned down coats with water/solvents to cheat on material coverage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Sudden unexpected price inflations once the job has commenced.</span>
                </li>
              </ul>
            </div>

            {/* The Mutape Standard */}
            <div className="p-5 rounded-2xl bg-[#14122d] border border-emerald-500/40 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>The Mutape Professional Standard</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>Heavy-duty floor drop-sheets and precise masking tape protection on every edge.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>Surface scraping, filling, sanding, and dust removal before paint touches walls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>Two undiluted full coats of reputable paint (Dulux, Plascon, Astra).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>Fixed, transparent quotes ($35/room base labour) with zero hidden surcharges.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8 Feature Pillars with Visual Hierarchy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-[#121028] rounded-2xl p-6 border border-[#272154] hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#191638] text-orange-400 flex items-center justify-center mb-4 border border-[#2e2963] shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {pt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {pt.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#231e4e]">
                  <span className="text-[11px] font-semibold text-sky-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{pt.highlight}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
