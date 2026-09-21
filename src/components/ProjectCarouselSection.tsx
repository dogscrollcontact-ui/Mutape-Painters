import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Pause,
  Play,
  X,
  FileText,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { COMPLETED_PROJECTS, PortfolioProject } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';

interface ProjectCarouselSectionProps {
  lang: Language;
  onOpenQuoteWithService: (serviceName: string) => void;
}

export const ProjectCarouselSection: React.FC<ProjectCarouselSectionProps> = ({
  lang,
  onOpenQuoteWithService,
}) => {
  const t = translations[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const projects = COMPLETED_PROJECTS;
  const totalProjects = projects.length;

  // Auto-slide every 4.5 seconds when not hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalProjects);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, totalProjects]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="instagram"
      className="py-20 bg-[#070612] text-slate-100 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Engaging Social Showcase Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/25">
            Real Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            See What We've Been Painting
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            Real projects. Real transformations. A closer look at the work behind Mutape Painters Zim across Zimbabwe.
          </p>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Track with Smooth Sliding */}
          <div className="overflow-hidden py-4">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className="w-full shrink-0 px-2 sm:px-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#110f27] border border-[#2b255e] rounded-3xl p-6 sm:p-8 shadow-2xl hover:border-orange-500/40 transition-colors">
                    
                    {/* Left: Social Post Visual Card */}
                    <div className="lg:col-span-7 relative group">
                      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-[#0c0a1a] shadow-xl">
                        <img
                          src={proj.primaryImage}
                          alt={proj.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090818]/80 via-transparent to-transparent" />
                        
                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="bg-[#0e0c24]/90 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-full border border-[#2c265e]">
                            Project {proj.projectNumber}
                          </span>
                          <span className="bg-orange-500 text-[#0c0a1a] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                            {proj.category.replace('_', ' & ')}
                          </span>
                        </div>

                        {/* Click to Enlarge Overlay */}
                        <button
                          type="button"
                          onClick={() => setSelectedProject(proj)}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs text-white"
                          aria-label={`View full details for ${proj.title}`}
                        >
                          <span className="inline-flex items-center gap-2 bg-[#171436] px-5 py-2.5 rounded-full border border-orange-500/50 font-bold text-xs shadow-lg">
                            <Eye className="w-4 h-4 text-orange-400" />
                            <span>Click to Enlarge & Details</span>
                          </span>
                        </button>
                      </div>

                      {/* Alternate thumbnail gallery if multi-angle images available */}
                      {proj.additionalImages && proj.additionalImages.length > 0 && (
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-[11px] text-slate-400 font-semibold mr-1">Angles:</span>
                          <img
                            src={proj.primaryImage}
                            alt="Angle 1"
                            className="w-12 h-10 object-cover rounded-lg border-2 border-orange-500"
                          />
                          {proj.additionalImages.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`Angle ${i + 2}`}
                              className="w-12 h-10 object-cover rounded-lg border border-[#2b255e] opacity-75 hover:opacity-100 cursor-pointer"
                              onClick={() => setSelectedProject(proj)}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Instagram-Style Narrative & Action */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20 font-black">
                          {proj.projectNumber}
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-white">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-sky-400 font-semibold">
                            Mutape Painters Zim Case Study
                          </p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {lang === 'sn' ? proj.descriptionSn : proj.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="space-y-2 pt-1">
                        {proj.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Social Hashtags */}
                      <p className="text-[11px] text-slate-400 font-mono">
                        #MutapePaintersZim #PaintingZimbabwe #HararePainters #QualityFinish
                      </p>

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(proj)}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1b173e] hover:bg-[#282259] text-white font-bold text-xs py-3 px-4 rounded-xl border border-[#2f2766] transition-colors"
                        >
                          <Eye className="w-4 h-4 text-orange-400" />
                          <span>View Project Details</span>
                        </button>

                        <a
                          href={`https://wa.me/263781206184?text=${encodeURIComponent(
                            `Hello Mutape Painters Zim, I saw ${proj.title} (Project ${proj.projectNumber}) on your website and would like a quote for similar painting work on my property.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Get Similar Work</span>
                        </a>
                      </div>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls (Previous / Next / Pause) */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-[#151233] hover:bg-orange-500 hover:text-[#0c0a1a] text-slate-200 flex items-center justify-center border border-[#2b255e] transition-all shadow-md active:scale-95"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Pagination Dots with Project Numbers */}
            <div className="flex items-center gap-2">
              {projects.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-orange-500'
                      : 'w-2.5 bg-[#272152] hover:bg-[#383074]'
                  }`}
                  aria-label={`Go to Project ${idx + 1}`}
                />
              ))}

              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="ml-3 text-slate-400 hover:text-white p-1"
                title={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#151233] hover:bg-orange-500 hover:text-[#0c0a1a] text-slate-200 flex items-center justify-center border border-[#2b255e] transition-all shadow-md active:scale-95"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

        </div>

      </div>

      {/* Lightbox / Project Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#060511]/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-[#110f27] border border-[#2b255e] rounded-3xl max-w-3xl w-full p-6 sm:p-8 my-8 shadow-2xl text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1a163d] hover:bg-orange-500 hover:text-[#0c0a1a] text-slate-300 flex items-center justify-center transition-colors border border-[#2b255e]"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#0c0a1a] border border-[#2b255e]">
                <img
                  src={selectedProject.primaryImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails if present */}
              {selectedProject.additionalImages && selectedProject.additionalImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  <img
                    src={selectedProject.primaryImage}
                    alt="Main"
                    className="w-16 h-12 object-cover rounded-lg border-2 border-orange-500 shrink-0"
                  />
                  {selectedProject.additionalImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i + 2}`}
                      className="w-16 h-12 object-cover rounded-lg border border-[#2b255e] shrink-0"
                    />
                  ))}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-orange-500 text-[#0c0a1a] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {selectedProject.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">
                    Project {selectedProject.projectNumber}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {lang === 'sn' ? selectedProject.descriptionSn : selectedProject.description}
                </p>
              </div>

              {/* Features Pill */}
              <div className="p-4 rounded-xl bg-[#161334] border border-[#292359] grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProject.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/263781206184?text=${encodeURIComponent(
                    `Hello Mutape Painters Zim, I am interested in getting similar work to ${selectedProject.title} (Project ${selectedProject.projectNumber}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp About This Project</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenQuoteWithService(selectedProject.title);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Free Quote</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
