import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandTracker } from './components/BrandTracker';
import { MarqueeStrip } from './components/MarqueeStrip';
import { AboutSection } from './components/AboutSection';
import { PricingSection } from './components/PricingSection';
import { ColourSection } from './components/ColourSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { ProjectCarouselSection } from './components/ProjectCarouselSection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { CoverageSection } from './components/CoverageSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AppointmentModal } from './components/AppointmentModal';
import { AdminPanel } from './components/AdminPanel';
import { FloatingActions } from './components/FloatingActions';
import { SectionDivider } from './components/SectionDivider';

export default function App() {
  // Language state (defaults to 'en', persisted in localStorage)
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('mutape_lang');
    return saved === 'sn' ? 'sn' : 'en';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('mutape_lang', newLang);
  };

  // Modals state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const handleOpenQuoteWithService = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsQuoteOpen(true);
  };

  const handleOpenQuoteDefault = () => {
    setSelectedService('');
    setIsQuoteOpen(true);
  };

  // Ensure smooth scroll is enabled
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="min-h-screen bg-[#090914] text-slate-100 font-sans selection:bg-orange-500 selection:text-[#0c0a1a] flex flex-col pb-16 md:pb-0 overflow-x-hidden">
      {/* Top Fixed Header */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenQuote={handleOpenQuoteDefault}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Page Sections with Fluid Transitions */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          lang={lang}
          onOpenQuote={handleOpenQuoteDefault}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />

        {/* 2. Horizontal Brand Tracker (Dulux, Plascon, Astra) */}
        <BrandTracker lang={lang} />

        {/* 3. Live Dynamic Marquee Strips */}
        <MarqueeStrip lang={lang} />

        {/* 4. About Section - Visual Storytelling & Pillars */}
        <AboutSection
          lang={lang}
          onOpenQuote={handleOpenQuoteDefault}
        />

        <SectionDivider variant="band" />

        {/* 5. Pricing Section & Labour Cost Estimator */}
        <PricingSection
          lang={lang}
          onOpenQuote={handleOpenQuoteDefault}
        />

        <SectionDivider variant="subtle" />

        {/* 6. Colour Consultation & Interactive Wall Previewer */}
        <ColourSection lang={lang} />

        <SectionDivider variant="subtle" />

        {/* 7. Interactive Before / After Comparison Slider */}
        <BeforeAfterSection lang={lang} />

        <SectionDivider variant="subtle" />

        {/* 8. Instagram-Style Auto-Sliding Project Showcase Carousel (6 Authentic Projects) */}
        <ProjectCarouselSection
          lang={lang}
          onOpenQuoteWithService={handleOpenQuoteWithService}
        />

        <SectionDivider variant="subtle" />

        {/* 9. Comprehensive Portfolio Gallery Grid */}
        <GallerySection lang={lang} />

        <SectionDivider variant="band" />

        {/* 10. Structured 7-Step Process */}
        <ProcessSection lang={lang} />

        <SectionDivider variant="subtle" />

        {/* 13. Operational Coverage (Harare, Chitungwiza & All Zimbabwe) */}
        <CoverageSection lang={lang} />

        <SectionDivider variant="subtle" />

        {/* 14. Client Reviews & Feedback Carousel */}
        <TestimonialsSection lang={lang} />

        <SectionDivider variant="subtle" />

        {/* 15. FAQ Accordion */}
        <FaqSection lang={lang} />

        {/* 16. Final High-Impact CTA */}
        <FinalCta
          lang={lang}
          onOpenQuote={handleOpenQuoteDefault}
          onOpenAppointment={() => setIsAppointmentOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenQuote={handleOpenQuoteDefault}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Action Bars */}
      <FloatingActions
        lang={lang}
        onOpenQuote={handleOpenQuoteDefault}
        onOpenAppointment={() => setIsAppointmentOpen(true)}
      />

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        lang={lang}
        initialService={selectedService}
      />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        lang={lang}
      />

      {/* Staff Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
      />
    </div>
  );
}
