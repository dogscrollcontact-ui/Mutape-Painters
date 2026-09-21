import React from 'react';
import {
  MessageCircle,
  ClipboardList,
  FileCheck2,
  Palette,
  Paintbrush2,
  Eye,
  Smile,
} from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface ProcessSectionProps {
  lang: Language;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const steps = [
    {
      num: t.process.step1Num,
      title: t.process.step1Title,
      desc: t.process.step1Desc,
      icon: MessageCircle,
    },
    {
      num: t.process.step2Num,
      title: t.process.step2Title,
      desc: t.process.step2Desc,
      icon: ClipboardList,
    },
    {
      num: t.process.step3Num,
      title: t.process.step3Title,
      desc: t.process.step3Desc,
      icon: FileCheck2,
    },
    {
      num: t.process.step4Num,
      title: t.process.step4Title,
      desc: t.process.step4Desc,
      icon: Palette,
    },
    {
      num: t.process.step5Num,
      title: t.process.step5Title,
      desc: t.process.step5Desc,
      icon: Paintbrush2,
    },
    {
      num: t.process.step6Num,
      title: t.process.step6Title,
      desc: t.process.step6Desc,
      icon: Eye,
    },
    {
      num: t.process.step7Num,
      title: t.process.step7Title,
      desc: t.process.step7Desc,
      icon: Smile,
    },
  ];

  return (
    <section id="process" className="py-20 bg-[#090914] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3.5 py-1.5 rounded-full border border-sky-500/20">
            {t.process.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.process.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.process.subheadline}
          </p>
        </div>

        {/* 7 Visual Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-[#121028] rounded-2xl p-5 border border-[#272154] flex flex-col justify-between group hover:border-orange-500/50 transition-all duration-300 shadow-md"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-orange-500/40 group-hover:text-orange-400 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#191638] text-orange-400 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-[#0c0a1a] transition-colors border border-[#2b255e]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Progress Indicator for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-[#2b255e] z-10" />
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
