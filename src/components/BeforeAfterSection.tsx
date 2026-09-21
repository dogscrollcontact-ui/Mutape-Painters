import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeftRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { BRAND_ASSETS } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';

interface BeforeAfterSectionProps {
  lang: Language;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-20 bg-[#0f0e24] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/25">
            {t.beforeAfter.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.beforeAfter.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.beforeAfter.subheadline}
          </p>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-300 bg-[#191638] px-3.5 py-1.5 rounded-full border border-[#2b2658] shadow-sm">
              <ArrowLeftRight className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.beforeAfter.sliderTip}</span>
            </span>
          </div>

          <div
            ref={containerRef}
            className="relative h-80 sm:h-[480px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#2f2963] cursor-ew-resize select-none bg-[#090914]"
            onMouseDown={(e) => {
              isDragging.current = true;
              handleMove(e.clientX);
            }}
            onMouseUp={() => {
              isDragging.current = false;
            }}
            onMouseLeave={() => {
              isDragging.current = false;
            }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* Background Image: AFTER (Real Supplied Transformation) */}
            <img
              src={BRAND_ASSETS.AFTER_IMAGE}
              alt="After Professional Painting - Mutape Painters Zim Finished Work"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              loading="lazy"
            />
            
            {/* After Tag Badge */}
            <div className="absolute top-4 right-4 bg-emerald-600/95 backdrop-blur-md text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg border border-emerald-400/40 pointer-events-none flex items-center gap-1.5 z-10">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>{t.beforeAfter.afterLabel}</span>
            </div>

            {/* Foreground Clipped Image: BEFORE (Real Supplied Unpainted / Raw Asset) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={BRAND_ASSETS.BEFORE_IMAGE}
                alt="Before Painting Preparation - Mutape Painters Zim"
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none pointer-events-none"
                style={{ width: containerRef.current?.offsetWidth || '100%' }}
                loading="lazy"
              />
              
              {/* Before Tag Badge */}
              <div className="absolute top-4 left-4 bg-[#0d0c1c]/90 backdrop-blur-md text-orange-400 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg border border-[#2b2658] pointer-events-none flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                <span>{t.beforeAfter.beforeLabel}</span>
              </div>
            </div>

            {/* Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-amber-300 to-orange-500 shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-[#0c0a1a] flex items-center justify-center shadow-2xl border-2 border-white">
                <ArrowLeftRight className="w-5 h-5 font-bold" />
              </div>
            </div>

          </div>

          {/* Project Details Footer */}
          <div className="mt-4 p-5 rounded-2xl bg-[#14122d] border border-[#272352] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>{t.beforeAfter.projectTitle}</span>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  Real Project
                </span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {t.beforeAfter.projectDesc}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                2 Full Coats
              </span>
              <span className="text-xs font-semibold text-sky-400 bg-sky-950/80 px-3 py-1.5 rounded-lg border border-sky-500/30">
                Smooth Finish
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
