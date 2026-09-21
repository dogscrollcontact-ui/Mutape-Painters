import React from 'react';
import { MessageSquare, FileText, Calendar, Phone, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { BRAND_ASSETS } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onOpenQuote: () => void;
  onOpenAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenQuote, onOpenAppointment }) => {
  const t = translations[lang];
  const whatsappUrl = `https://wa.me/263781206184?text=${encodeURIComponent(
    t.whatsappMsgs.general
  )}`;

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-[#090914] text-white overflow-hidden"
    >
      {/* Subtle brand grid pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Brand glowing orbs matching logo (Navy, Orange, Sky Blue) */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headings & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Pill / Location */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181538] border border-[#30286b] text-sky-400 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
              <span>MUTAPE PAINTERS ZIM</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-sans">
              Professional Home Painting
              <span className="block text-orange-500 mt-1">
                — Book Now!
              </span>
            </h1>

            {/* Main Description & Subheadline */}
            <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              "Quality painting. Beautiful finishes. Colours you’ll love."
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.description}
            </p>

            {/* Pricing Callout Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#14122d] to-[#1c1840] border-2 border-orange-500/50 shadow-xl max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-[#0c0a1a] flex items-center justify-center font-black text-xl shrink-0 shadow-md">
                  $35
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span>From $35 per standard room — labour only</span>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-extrabold bg-orange-500/20 text-orange-400 rounded-md uppercase border border-orange-500/30">
                      Standard Room
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                    Walls + Ceilings • 2 Full Quality Coats • Dulux & Plascon
                  </p>
                </div>
              </div>
            </div>

            {/* Main Conversion Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-950/40 text-base transition-all hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp Now</span>
              </a>

              <button
                type="button"
                id="hero-quote-btn"
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-black px-6 py-3.5 rounded-xl shadow-lg shadow-orange-950/40 text-base transition-all hover:scale-105 active:scale-95"
              >
                <FileText className="w-5 h-5" />
                <span>Get Free Quote</span>
              </button>

              <button
                type="button"
                id="hero-appointment-btn"
                onClick={onOpenAppointment}
                className="inline-flex items-center justify-center gap-2 bg-[#171436] hover:bg-[#231f4e] text-white font-bold px-5 py-3.5 rounded-xl border border-[#332b6e] text-base transition-all"
              >
                <Calendar className="w-5 h-5 text-orange-400" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Trust and Location Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Massa Park, Harare • Nyatsime, Chitungwiza • Zimbabwe-Wide</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dulux & Plascon 7000+ Colours</span>
              </div>
              <a
                href="tel:+263781206184"
                className="inline-flex items-center gap-1 text-orange-400 hover:underline font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+263 78 120 6184</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Hero Visual from 1st Supplied Project */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Glow Border using Brand Palette */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-sky-500 to-[#1e1b4b] rounded-3xl blur-md opacity-60" />

              {/* Real Project Photo (1st project from Mutape Painters Zim) */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#2f2963] bg-[#0c0a1a] group">
                <img
                  src={BRAND_ASSETS.PROJECT_HERO}
                  alt="Mutape Painters Zim - Authentic Completed Painting Project in Zimbabwe"
                  className="w-full h-80 sm:h-96 lg:h-[470px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090914]/90 via-transparent to-transparent pointer-events-none" />

                {/* Floating Real Badge on Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0f0e26]/90 backdrop-blur-md p-3.5 rounded-xl border border-[#2c265e] flex items-center justify-between shadow-xl">
                  <div>
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block">
                      Authentic Project Work
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      Mutape Painters Zim Project
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30">
                    <span>2 Coats</span>
                  </div>
                </div>
              </div>

              {/* Floating Swatch Card */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#14122d]/95 backdrop-blur-md p-3 rounded-xl border border-orange-500/40 shadow-2xl items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white shadow" />
                <div className="text-left">
                  <span className="text-[10px] text-sky-300 uppercase font-bold block">
                    Dulux & Plascon
                  </span>
                  <span className="text-xs font-black text-white">
                    7000+ Color Match
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
