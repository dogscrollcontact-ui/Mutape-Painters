import React, { useState } from 'react';
import { Check, Info, Calculator, MessageSquare, AlertCircle } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface PricingSectionProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ lang, onOpenQuote }) => {
  const t = translations[lang];

  // Interactive Calculator State
  const [numRooms, setNumRooms] = useState<number>(3);
  const [wallCondition, setWallCondition] = useState<'good' | 'fair' | 'rough'>('good');

  // Calculation logic
  // Base $35/room for good condition, $45/room for fair (minor crack filling), $55/room for rough (heavy scraping/prep)
  const ratePerRoom =
    wallCondition === 'good' ? 35 : wallCondition === 'fair' ? 45 : 55;
  const estimatedLabourTotal = numRooms * ratePerRoom;

  const calculatorWhatsappMsg = `Hello Mutape Painters Zim, I calculated an estimate of approximately $${estimatedLabourTotal} for ${numRooms} rooms (${wallCondition} wall condition) on your website calculator. Can we discuss?`;
  const calcWhatsappUrl = `https://wa.me/263781206184?text=${encodeURIComponent(
    calculatorWhatsappMsg
  )}`;

  return (
    <section id="pricing" className="py-20 bg-[#0c0b1c] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/25">
            {t.pricing.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.pricing.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.pricing.subheadline}
          </p>
        </div>

        {/* 3 Main Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          
          {/* Card 1: Standard Room Special (Highlighted) */}
          <div className="relative bg-gradient-to-b from-[#181438] to-[#110f27] rounded-3xl p-7 border-2 border-orange-500 shadow-2xl flex flex-col justify-between transform hover:-translate-y-1 transition-transform">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-[#0c0a1a] text-xs font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
              Most Popular Offer
            </div>

            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {t.pricing.standardRoom.title}
                </h3>
                <p className="text-xs text-sky-400 font-semibold mt-1">
                  {t.pricing.standardRoom.sub}
                </p>
              </div>

              {/* Price display */}
              <div className="my-5 pb-5 border-b border-[#2a245d]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    {t.pricing.standardRoom.price}
                  </span>
                  <span className="text-xs text-slate-300">
                    {t.pricing.standardRoom.period}
                  </span>
                </div>
                <p className="text-[11px] text-orange-400 font-semibold mt-1">
                  * Labour only • 2 Full coats of paint
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200 mb-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.standardRoom.feature1}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.standardRoom.feature2}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.standardRoom.feature3}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.standardRoom.feature4}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.standardRoom.feature5}</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-black text-sm py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95 text-center"
            >
              {t.pricing.standardRoom.cta}
            </button>
          </div>

          {/* Card 2: Custom Home Project */}
          <div className="bg-[#121028] rounded-3xl p-7 border border-[#272154] shadow-xl flex flex-col justify-between hover:border-[#3d347d] transition-all">
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {t.pricing.customProject.title}
                </h3>
                <p className="text-xs text-sky-400 font-semibold mt-1">
                  {t.pricing.customProject.sub}
                </p>
              </div>

              {/* Price display */}
              <div className="my-5 pb-5 border-b border-[#231e4e]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    {t.pricing.customProject.price}
                  </span>
                  <span className="text-xs text-slate-300">
                    {t.pricing.customProject.period}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tailored to exact dimensions & prep required
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.customProject.feature1}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.customProject.feature2}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.customProject.feature3}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.customProject.feature4}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.customProject.feature5}</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full bg-[#1b173c] hover:bg-[#272254] text-white font-bold text-sm py-3 px-4 rounded-xl border border-[#373070] transition-colors text-center"
            >
              {t.pricing.customProject.cta}
            </button>
          </div>

          {/* Card 3: Commercial / Estate Project */}
          <div className="bg-[#121028] rounded-3xl p-7 border border-[#272154] shadow-xl flex flex-col justify-between hover:border-[#3d347d] transition-all">
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  {t.pricing.commercialProject.title}
                </h3>
                <p className="text-xs text-sky-400 font-semibold mt-1">
                  {t.pricing.commercialProject.sub}
                </p>
              </div>

              {/* Price display */}
              <div className="my-5 pb-5 border-b border-[#231e4e]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">
                    {t.pricing.commercialProject.price}
                  </span>
                  <span className="text-xs text-slate-300">
                    {t.pricing.commercialProject.period}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Formal project assessment & milestones
                </p>
              </div>

              {/* Feature list */}
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.commercialProject.feature1}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.commercialProject.feature2}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.commercialProject.feature3}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.commercialProject.feature4}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t.pricing.commercialProject.feature5}</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full bg-[#1b173c] hover:bg-[#272254] text-white font-bold text-sm py-3 px-4 rounded-xl border border-[#373070] transition-colors text-center"
            >
              {t.pricing.commercialProject.cta}
            </button>
          </div>

        </div>

        {/* Transparent Disclaimer Callout */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#14122d] border border-orange-500/30 flex items-start gap-3 mb-12">
          <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5">
              {t.pricing.disclaimerTitle}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.pricing.disclaimerText}
            </p>
          </div>
        </div>

        {/* Interactive Labour Cost Estimator */}
        <div className="bg-[#121028] rounded-3xl p-6 sm:p-10 border border-[#292359] shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {t.pricing.calculatorTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Plan your budget with realistic Zimbabwean labour estimates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Input Controls */}
            <div className="space-y-6">
              {/* Slider for Number of Rooms */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="num-rooms-slider" className="text-xs sm:text-sm font-bold text-slate-200">
                    {t.pricing.calcRoomsLabel}
                  </label>
                  <span className="text-lg font-black text-orange-400 bg-[#191638] px-3 py-1 rounded-lg border border-[#2b2658]">
                    {numRooms} {numRooms === 1 ? 'Room' : 'Rooms'}
                  </span>
                </div>
                <input
                  id="num-rooms-slider"
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={numRooms}
                  onChange={(e) => setNumRooms(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#1f1b47] rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 Room</span>
                  <span>6 Rooms</span>
                  <span>12 Rooms</span>
                </div>
              </div>

              {/* Wall Condition Selector */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-200 mb-2">
                  {t.pricing.calcConditionLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setWallCondition('good')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      wallCondition === 'good'
                        ? 'bg-orange-500/15 border-orange-500 text-white'
                        : 'bg-[#151330] border-[#292455] text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold block">{t.pricing.calcConditionGood}</span>
                    <span className="text-[10px] text-slate-400">$35/room base</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWallCondition('fair')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      wallCondition === 'fair'
                        ? 'bg-orange-500/15 border-orange-500 text-white'
                        : 'bg-[#151330] border-[#292455] text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold block">{t.pricing.calcConditionFair}</span>
                    <span className="text-[10px] text-slate-400">+$10 prep/room</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWallCondition('rough')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      wallCondition === 'rough'
                        ? 'bg-orange-500/15 border-orange-500 text-white'
                        : 'bg-[#151330] border-[#292455] text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold block">{t.pricing.calcConditionRough}</span>
                    <span className="text-[10px] text-slate-400">+$20 prep/room</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Calculated Output Card */}
            <div className="bg-[#181538] rounded-2xl p-6 sm:p-8 border border-[#2f2963] text-center space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-sky-400 block">
                {t.pricing.calcEstimatedLabour}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white">
                ${estimatedLabourTotal}
                <span className="text-xs text-slate-400 font-normal ml-2 block sm:inline">
                  (Estimated labour for {numRooms} rooms)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t.pricing.calcDisclaimer}
              </p>

              <a
                href={calcWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.pricing.calcCta}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
