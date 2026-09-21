import React, { useState } from 'react';
import { Palette, MessageSquare, Check, Sparkles } from 'lucide-react';
import { POPULAR_COLORS } from '../data/colors';
import { translations } from '../translations';
import { Language, ColorSwatch } from '../types';

interface ColourSectionProps {
  lang: Language;
}

export const ColourSection: React.FC<ColourSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(POPULAR_COLORS[0]);

  const whatsappColorUrl = `https://wa.me/263781206184?text=${encodeURIComponent(
    `Hello Mutape Painters Zim, I am interested in getting colour advice for the shade: ${selectedColor.name} (${selectedColor.brand} / ${selectedColor.code}).`
  )}`;

  return (
    <section id="colours" className="py-20 bg-[#090914] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-500/25">
            {t.colours.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.colours.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.colours.subheadline}
          </p>
        </div>

        {/* Interactive Wall Colour Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start bg-[#121028] rounded-3xl p-5 sm:p-10 border border-[#272154] shadow-2xl">
          
          {/* Live Room Wall Visualizer (Top on Mobile with order-1, Right column on Desktop with lg:order-2) */}
          <div className="order-1 lg:order-2 lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Live Wall Color Result
              </span>
              <span className="text-xs text-slate-400">
                Tap any shade below to see it live
              </span>
            </div>

            {/* Room simulator frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#2b255e] bg-[#0c0a1a] h-56 sm:h-80 lg:h-96 flex flex-col justify-end p-4 sm:p-6 transition-all">
              
              {/* Ceiling (Always Crisp White) */}
              <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-slate-50 border-b border-slate-300/40 flex items-center justify-between px-3 sm:px-4 z-10">
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-slate-600 bg-white/90 px-2 py-0.5 rounded shadow-sm">
                  White Ceiling (Dulux / Plascon)
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium hidden sm:inline">
                  Crisp Boundary Lines
                </span>
              </div>

              {/* Dynamic Coloured Wall Surface */}
              <div
                className="absolute inset-x-0 top-12 sm:top-16 bottom-0 transition-colors duration-400 flex items-center justify-center p-4 sm:p-6 text-center"
                style={{ backgroundColor: selectedColor.hex }}
              >
                {/* Simulated Wall Shadow / Ambient Light Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/15 pointer-events-none" />

                {/* Wall Plaque previewing current shade */}
                <div className="relative z-10 bg-[#090914]/90 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/20 shadow-2xl max-w-xs text-left w-full sm:w-auto">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-orange-400 block">
                    {t.colours.selectedColor}
                  </span>
                  <span className="text-sm sm:text-base font-black text-white block">
                    {lang === 'sn' ? selectedColor.shonaName : selectedColor.name}
                  </span>
                  <div className="mt-1.5 flex items-center justify-between text-[11px] sm:text-xs text-slate-300 border-t border-slate-700/60 pt-1.5">
                    <span className="font-semibold text-slate-200">{selectedColor.brand}</span>
                    <span className="font-mono text-sky-400 font-bold">{selectedColor.code}</span>
                  </div>
                </div>
              </div>

              {/* Baseboard Trim */}
              <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-4 bg-white border-t border-slate-300 shadow-sm" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs text-slate-300 px-1 pt-1">
              <span>* Digital preview. Authentic physical paint books inspected on site.</span>
              <a
                href={whatsappColorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>Ask Mutape Painters About {selectedColor.name}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Swatches & Advice Selector (order-2 on Mobile, Left column on Desktop with lg:order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 flex items-center gap-2">
                <Palette className="w-5 h-5 text-orange-500" />
                <span>{t.colours.interactiveTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {t.colours.interactiveSubtitle}
              </p>
            </div>

            {/* Swatches Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {POPULAR_COLORS.map((col) => {
                const isSelected = selectedColor.code === col.code;
                return (
                  <button
                    key={col.code}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    className={`relative p-2.5 sm:p-3 rounded-xl border text-left transition-all flex flex-col justify-between h-24 sm:h-28 group ${
                      isSelected
                        ? 'border-orange-500 bg-[#1e1b42] shadow-lg ring-2 ring-orange-500/40 scale-[1.02]'
                        : 'border-[#262152] bg-[#14122d] hover:border-orange-400/50'
                    }`}
                  >
                    {/* Color Swatch Circle */}
                    <div
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/30 shadow-md flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: col.hex }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[3]" />}
                    </div>

                    <div>
                      <span className="text-xs font-bold text-white block line-clamp-1">
                        {lang === 'sn' ? col.shonaName : col.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {col.brand}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Advice Card */}
            <div className="p-4 rounded-2xl bg-[#161433] border border-[#2d2763] space-y-2">
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>{t.colours.adviceCardTitle}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.colours.adviceCardDesc}
              </p>
              <div className="pt-1">
                <a
                  href={whatsappColorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.colours.adviceCta}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
