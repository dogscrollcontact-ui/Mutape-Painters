import React, { useState } from 'react';
import { COMPLETED_PROJECTS, PortfolioProject } from '../assets/images';
import { translations } from '../translations';
import { Language } from '../types';
import { X, MessageSquare, Maximize2, ChevronRight, CheckCircle, Sparkles, Layers } from 'lucide-react';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const categories = [
    { id: 'all', label: t.gallery.filterAll },
    { id: 'residential', label: t.gallery.filterResidential },
    { id: 'interior', label: t.gallery.filterInterior },
    { id: 'exterior', label: t.gallery.filterExterior },
    { id: 'walls_ceilings', label: t.gallery.filterWallsCeilings },
  ];

  const filteredProjects = COMPLETED_PROJECTS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const featuredProject = COMPLETED_PROJECTS[0]; // 1st project as featured
  const gridProjects = COMPLETED_PROJECTS.slice(1); // Projects 2 - 6

  const openModal = (project: PortfolioProject, imgIndex = 0) => {
    setActiveModalProject(project);
    setActiveImageIndex(imgIndex);
  };

  return (
    <section id="our-work" className="py-24 bg-[#090914] text-slate-100 relative">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with User Prompt Guidelines */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs sm:text-sm font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.gallery.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 tracking-tight">
            Recent Painting Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-3 leading-relaxed">
            Take a look at some of the painting and finishing work completed by Mutape Painters Zim.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-sky-400">
            <span>See the work. Imagine the transformation.</span>
          </div>
        </div>

        {/* FEATURED PROJECT HERO SHOWCASE */}
        <div className="mb-14 bg-gradient-to-br from-[#151330] to-[#0d0c1e] rounded-3xl overflow-hidden border border-[#2d2760] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Featured Photo Side */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden group bg-[#090914]">
              <img
                src={featuredProject.primaryImage}
                alt={featuredProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090914]/85 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge & Project ID */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-orange-500 text-[#0c0a1a] font-black text-xs px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                  Featured Project
                </span>
                <span className="bg-[#121028]/90 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg border border-[#2b2658] backdrop-blur-sm">
                  {featuredProject.projectNumber}
                </span>
              </div>

              {/* Enlarge trigger */}
              <button
                type="button"
                onClick={() => openModal(featuredProject, 0)}
                className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#0e0c20]/80 hover:bg-orange-500 hover:text-black text-white flex items-center justify-center transition-colors shadow-lg border border-[#2b2658]"
                aria-label="Enlarge featured project"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Multiple photos thumbnail badge if available */}
              {featuredProject.additionalImages && (
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-sky-300 bg-[#121028]/90 px-2.5 py-1 rounded-md border border-[#2c265e] backdrop-blur-md flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-orange-400" />
                    <span>Includes Multi-Angle Views</span>
                  </span>
                </div>
              )}
            </div>

            {/* Featured Description Side */}
            <div className="lg:col-span-5 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-orange-400 block mb-2">
                  {featuredProject.projectNumber} — COMPLETED PROJECT
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {lang === 'sn' ? featuredProject.scopeSn : featuredProject.scope}
                </p>
              </div>

              {/* Quality Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-[#231e4e]">
                {featuredProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/263781206184?text=${encodeURIComponent(
                    `Hello Mutape Painters Zim, I saw ${featuredProject.title} on your website portfolio. I would like to start a project with similar high quality.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Your Project</span>
                </a>

                <button
                  type="button"
                  onClick={() => openModal(featuredProject, 0)}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#1e1b45] hover:bg-[#2b2760] text-white text-sm font-bold px-4 py-3.5 rounded-xl border border-[#3b357a] transition-colors"
                >
                  <span>View Project Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-[#0c0a1a] shadow-lg scale-105'
                  : 'bg-[#14122d] text-slate-300 hover:bg-[#1d1942] hover:text-white border border-[#292455]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* RESPONSIVE PROJECT GRID (ALL 6 SUPPLIED PROJECTS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const allImages = [project.primaryImage, ...(project.additionalImages || [])];
            const itemWhatsappUrl = `https://wa.me/263781206184?text=${encodeURIComponent(
              `Hello Mutape Painters Zim, I saw ${project.projectNumber} — ${project.title} on your website. I would like to enquire about similar painting work for my property.`
            )}`;

            return (
              <div
                key={project.id}
                className="group relative bg-[#121028] rounded-2xl overflow-hidden border border-[#272254] hover:border-orange-500/50 shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                {/* Photo & Zoom Button */}
                <div
                  className="relative h-64 sm:h-72 overflow-hidden bg-[#090914] cursor-pointer"
                  onClick={() => openModal(project, 0)}
                >
                  <img
                    src={project.primaryImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090914]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Project Number Label (e.g. 01, 02, 03) */}
                  <div className="absolute top-3 left-3 bg-[#0d0c1c]/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-black text-orange-400 border border-[#2b2658] flex items-center gap-1.5">
                    <span>{project.projectNumber}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-200">RECENT PROJECT</span>
                  </div>

                  {/* Additional views count pill */}
                  {project.additionalImages && project.additionalImages.length > 0 && (
                    <div className="absolute bottom-3 left-3 bg-[#110f25]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-sky-300 border border-[#292357] flex items-center gap-1">
                      <Layers className="w-3 h-3 text-orange-400" />
                      <span>{project.additionalImages.length + 1} Angles</span>
                    </div>
                  )}

                  {/* Enlarge trigger */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(project, 0);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0e0c20]/80 hover:bg-orange-500 hover:text-black text-white flex items-center justify-center transition-colors border border-[#2b2658]"
                    aria-label="View larger image"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Information Card */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-400">
                        {project.projectNumber} — COMPLETED PROJECT
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {lang === 'sn' ? project.scopeSn : project.scope}
                    </p>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-[#1a1738] text-slate-300 px-2.5 py-1 rounded-md border border-[#2c265e]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={itemWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1b183f] hover:bg-emerald-600 hover:text-white text-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl border border-[#2b265e] transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                      <span>Enquire on WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => openModal(project, 0)}
                      className="px-3 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500 hover:text-[#0c0a1a] text-orange-400 text-xs font-bold border border-orange-500/30 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="mt-16 text-center bg-gradient-to-r from-[#171438] via-[#1f1b4c] to-[#171438] p-8 sm:p-10 rounded-3xl border border-[#302a6b] shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Ready to Transform Your Home or Commercial Property?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
            Book professional home painting with Mutape Painters Zim. Quality finishes, 2 coats guaranteed, starting at $35 per standard room labour.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/263781206184?text=Hello%20Mutape%20Painters%20Zim%2C%20I%20reviewed%20your%20completed%20projects%20and%20would%20like%20to%20start%20my%20painting%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start Your Project</span>
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[#121028] hover:bg-[#1a1738] text-white font-bold text-sm px-6 py-3.5 rounded-xl border border-[#3b3577] transition-colors"
            >
              <span>View Pricing Packages</span>
            </a>
          </div>
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#060511]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative bg-[#100e26] max-w-4xl w-full rounded-3xl overflow-hidden border border-[#2f2963] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#161334]/80 hover:bg-orange-500 hover:text-[#0c0a1a] text-white flex items-center justify-center transition-colors shadow-lg border border-[#2f2963]"
              aria-label="Close Image"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Carousel Display */}
            {(() => {
              const allImages = [
                activeModalProject.primaryImage,
                ...(activeModalProject.additionalImages || [])
              ];
              const currentImg = allImages[activeImageIndex] || activeModalProject.primaryImage;

              return (
                <div className="flex flex-col">
                  <div className="relative max-h-[60vh] sm:max-h-[68vh] overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={currentImg}
                      alt={`${activeModalProject.title} view ${activeImageIndex + 1}`}
                      className="w-full h-full object-contain max-h-[65vh]"
                    />
                  </div>

                  {/* Multiple thumbnail selectors if available */}
                  {allImages.length > 1 && (
                    <div className="p-3 bg-[#0d0c1e] flex items-center justify-center gap-2 border-t border-[#231e4e]">
                      {allImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx
                              ? 'border-orange-500 scale-105'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Modal Footer */}
            <div className="p-6 bg-[#13112d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#231e4e]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black text-orange-400 uppercase tracking-widest">
                    {activeModalProject.projectNumber} — COMPLETED PROJECT
                  </span>
                  <span className="text-[10px] font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/20">
                    Mutape Painters Zim
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {lang === 'sn' ? activeModalProject.scopeSn : activeModalProject.scope}
                </p>
              </div>

              <a
                href={`https://wa.me/263781206184?text=${encodeURIComponent(
                  `Hello Mutape Painters Zim, I saw ${activeModalProject.projectNumber} — ${activeModalProject.title} in your portfolio. Can you quote for a similar project?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl inline-flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
