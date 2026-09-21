import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#0c0b1c] text-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3.5 py-1.5 rounded-full border border-orange-500/20">
            {t.faq.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.faq.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.faq.subheadline}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#121028] rounded-2xl border border-[#272154] overflow-hidden transition-all duration-200 shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-[#181538]"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#231e4e] animate-in fade-in duration-200">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#161334] border border-[#2a245d]">
          <p className="text-xs sm:text-sm text-slate-300 mb-3">
            Have a specific question about your home, wall prep, or colours?
          </p>
          <a
            href="https://wa.me/263781206184?text=Hello%20Mutape%20Painters%20Zim%2C%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-400 hover:text-orange-300"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Directly on WhatsApp (+263 78 120 6184)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
