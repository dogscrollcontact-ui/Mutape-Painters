import React from 'react';
import { Instagram, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { BRAND_ASSETS } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';

interface InstagramSectionProps {
  lang: Language;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section id="instagram" className="py-20 bg-[#090914] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-pink-400 bg-pink-500/10 px-3.5 py-1.5 rounded-full border border-pink-500/20">
            {t.instagram.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.instagram.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.instagram.subheadline}
          </p>
        </div>

        {/* Instagram Grid Cards (Using Real Supplied Project Assets) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="relative group rounded-2xl overflow-hidden border border-[#272154] bg-[#121028] shadow-xl h-80">
            <img
              src={BRAND_ASSETS.PROJECT_HERO}
              alt="Mutape Painters Zim on Instagram - Project 01"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#090914]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
              <span className="flex items-center gap-1 text-sm font-bold">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <span>124</span>
              </span>
              <span className="flex items-center gap-1 text-sm font-bold">
                <Instagram className="w-5 h-5 text-orange-400" />
                <span>@mutapepainters1</span>
              </span>
            </div>
            <div className="absolute bottom-3 left-3 bg-[#0d0c1c]/90 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-slate-200 border border-[#2b2658]">
              01 — Recent Project
            </div>
          </div>

          <div className="relative group rounded-2xl overflow-hidden border border-[#272154] bg-[#121028] shadow-xl h-80">
            <img
              src={BRAND_ASSETS.PROJECT_HERO_ALT}
              alt="Mutape Painters Zim on Instagram - Project 02"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#090914]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
              <span className="flex items-center gap-1 text-sm font-bold">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <span>98</span>
              </span>
              <span className="flex items-center gap-1 text-sm font-bold">
                <Instagram className="w-5 h-5 text-orange-400" />
                <span>@mutapepainters1</span>
              </span>
            </div>
            <div className="absolute bottom-3 left-3 bg-[#0d0c1c]/90 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-slate-200 border border-[#2b2658]">
              02 — Recent Project
            </div>
          </div>

          <div className="relative group rounded-2xl overflow-hidden border border-[#272154] bg-[#121028] shadow-xl h-80">
            <img
              src={BRAND_ASSETS.AFTER_IMAGE}
              alt="Mutape Painters Zim on Instagram - Smooth Finishing"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#090914]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
              <span className="flex items-center gap-1 text-sm font-bold">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                <span>156</span>
              </span>
              <span className="flex items-center gap-1 text-sm font-bold">
                <Instagram className="w-5 h-5 text-orange-400" />
                <span>@mutapepainters1</span>
              </span>
            </div>
            <div className="absolute bottom-3 left-3 bg-[#0d0c1c]/90 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-slate-200 border border-[#2b2658]">
              Transformation Finish
            </div>
          </div>

        </div>

        {/* Instagram Profile CTA Button */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/mutapepainters1/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 via-rose-500 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            <Instagram className="w-4 h-4" />
            <span>{t.instagram.cta}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
