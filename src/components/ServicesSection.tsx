import React, { useState } from 'react';
import {
  Home,
  Sun,
  Layers,
  Palette,
  Droplets,
  RotateCcw,
  Building2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Check,
  Shield,
} from 'lucide-react';
import { BRAND_ASSETS } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';

interface ServicesSectionProps {
  lang: Language;
  onOpenQuoteWithService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onOpenQuoteWithService,
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'specialist'>('all');

  const servicesData = [
    {
      id: 'walls-ceilings',
      category: 'residential',
      icon: Layers,
      title: t.services.items.wallsCeilings.title,
      desc: t.services.items.wallsCeilings.desc,
      badge: 'From $35 / Room',
      popular: true,
      features: ['2 Full Quality Coats', 'Trim & Edging Included', 'Floor Drop-Sheet Prep'],
    },
    {
      id: 'interior',
      category: 'residential',
      icon: Home,
      title: t.services.items.interior.title,
      desc: t.services.items.interior.desc,
      popular: false,
      features: ['Living Rooms & Bedrooms', 'Kitchens & Bathrooms', 'Crack & Hole Filling'],
    },
    {
      id: 'exterior',
      category: 'residential',
      icon: Sun,
      title: t.services.items.exterior.title,
      desc: t.services.items.exterior.desc,
      badge: 'Weatherproof',
      popular: false,
      features: ['Sun & Rain Protection', 'Boundary Walls & Facades', 'High-Adhesion Undercoats'],
    },
    {
      id: 'colour-consultation',
      category: 'specialist',
      icon: Palette,
      title: t.services.items.colourConsultation.title,
      desc: t.services.items.colourConsultation.desc,
      badge: 'Complimentary Advice',
      popular: false,
      features: ['7000+ Dulux & Plascon Codes', 'Lighting Analysis', 'Swatch Matching'],
    },
    {
      id: 'decorative',
      category: 'specialist',
      icon: Sparkles,
      title: t.services.items.decorative.title,
      desc: t.services.items.decorative.desc,
      popular: false,
      features: ['Feature Accent Walls', 'Textured & Metallic Effects', 'Custom Geometry'],
    },
    {
      id: 'roof-leak-repairs',
      category: 'specialist',
      icon: Droplets,
      title: t.services.items.roofLeakRepairs.title,
      desc: t.services.items.roofLeakRepairs.desc,
      popular: false,
      features: ['Waterproofing Membrane', 'Leak Sealing', 'Anti-Fungal Treatment'],
    },
    {
      id: 'repainting',
      category: 'residential',
      icon: RotateCcw,
      title: t.services.items.repainting.title,
      desc: t.services.items.repainting.desc,
      popular: false,
      features: ['Peeling Paint Stripping', 'Sanding & Priming', 'Full Restorations'],
    },
    {
      id: 'commercial',
      category: 'specialist',
      icon: Building2,
      title: t.services.items.commercial.title,
      desc: t.services.items.commercial.desc,
      badge: 'Corporate',
      popular: false,
      features: ['Offices & Retail Shops', 'Churches & Community Halls', 'Milestone Contracts'],
    },
  ];

  const filteredServices = servicesData.filter((svc) => {
    if (activeTab === 'all') return true;
    return svc.category === activeTab;
  });

  return (
    <section id="services" className="py-20 bg-[#090914] text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-500/25">
            {t.services.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.services.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.services.subheadline}
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-orange-500 text-[#0c0a1a] shadow-lg'
                  : 'bg-[#151233] text-slate-300 hover:text-white border border-[#2b255e]'
              }`}
            >
              All Painting Services (8)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('residential')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'residential'
                  ? 'bg-orange-500 text-[#0c0a1a] shadow-lg'
                  : 'bg-[#151233] text-slate-300 hover:text-white border border-[#2b255e]'
              }`}
            >
              Residential & Homes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specialist')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'specialist'
                  ? 'bg-orange-500 text-[#0c0a1a] shadow-lg'
                  : 'bg-[#151233] text-slate-300 hover:text-white border border-[#2b255e]'
              }`}
            >
              Specialist & Commercial
            </button>
          </div>
        </div>

        {/* Dynamic Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <div
                key={svc.id}
                id={`service-card-${svc.id}`}
                className={`group relative bg-[#121028] rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
                  svc.popular
                    ? 'border-orange-500/80 shadow-lg shadow-orange-950/20'
                    : 'border-[#272154] hover:border-orange-500/50'
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-md ${
                        svc.popular
                          ? 'bg-orange-500 text-[#0c0a1a]'
                          : 'bg-[#191638] text-orange-400 group-hover:bg-orange-500 group-hover:text-[#0c0a1a]'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {svc.badge && (
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/30">
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {svc.desc}
                  </p>

                  {/* Bullet features for visual storytelling */}
                  <div className="space-y-1.5 mb-6">
                    {svc.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-[#231e4e] flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/263781206184?text=${encodeURIComponent(
                      `Hello Mutape Painters Zim, I would like to enquire about your ${svc.title} service.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    id={`request-quote-${svc.id}`}
                    onClick={() => onOpenQuoteWithService(svc.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{t.services.requestQuote}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
