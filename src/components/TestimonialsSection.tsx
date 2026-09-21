import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { translations } from '../translations';
import { Language, CustomerReview } from '../types';
import { getReviews } from '../services/db';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Touch swipe handling
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    getReviews().then((all) => {
      // Only show published reviews
      const published = all.filter((r) => r.published);
      setReviews(published);
    });
  }, []);

  // Auto-sliding carousel when published reviews exist
  useEffect(() => {
    if (!isPlaying || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, reviews.length]);

  const handlePrev = () => {
    if (reviews.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    if (reviews.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || reviews.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <section id="reviews" className="py-20 bg-[#090914] text-slate-100 relative overflow-hidden">
      {/* Subtle brand ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-500/25">
            {t.testimonials.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            {t.testimonials.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            {t.testimonials.subheadline}
          </p>
        </div>

        {/* Carousel or Authentic Placeholder State */}
        {reviews.length > 0 ? (
          <div
            className="max-w-3xl mx-auto relative"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Active Review Card */}
            <div className="bg-[#121028] rounded-3xl p-8 sm:p-12 border border-[#272154] shadow-2xl text-center relative">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
                <Sparkles className="w-6 h-6" />
              </div>

              {/* Star Rating */}
              <div className="flex justify-center gap-1.5 text-orange-400 mb-4">
                {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Project Category Tag */}
              {reviews[currentIndex].projectTitle && (
                <div className="inline-block text-[11px] font-bold text-sky-400 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 mb-4">
                  {reviews[currentIndex].projectTitle}
                </div>
              )}

              {/* Review Text */}
              <blockquote className="text-base sm:text-xl text-slate-200 font-medium italic leading-relaxed mb-6 max-w-xl mx-auto">
                "{reviews[currentIndex].reviewText}"
              </blockquote>

              {/* Author & Location */}
              <div className="border-t border-[#231e4e] pt-4">
                <p className="text-sm sm:text-base font-black text-white">
                  — {reviews[currentIndex].customerName}
                </p>
                {reviews[currentIndex].location && (
                  <p className="text-xs text-slate-400 mt-0.5">
                    {reviews[currentIndex].location}
                  </p>
                )}
              </div>
            </div>

            {/* Carousel Controls */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-between mt-6 px-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-[#181538] hover:bg-orange-500 hover:text-[#0c0a1a] text-slate-200 flex items-center justify-center border border-[#2b255e] transition-all"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="flex items-center gap-2">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex ? 'w-6 bg-orange-500' : 'w-2 bg-[#2b255e]'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="ml-2 text-slate-400 hover:text-white p-1"
                    title={isPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-[#181538] hover:bg-orange-500 hover:text-[#0c0a1a] text-slate-200 flex items-center justify-center border border-[#2b255e] transition-all"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Transparent Authentic Placeholder per User Directive */
          <div className="max-w-2xl mx-auto bg-[#121028] rounded-3xl p-8 sm:p-10 border border-[#272154] text-center shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="flex justify-center gap-1 text-orange-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
              ))}
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              {t.testimonials.placeholderTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto mb-6">
              {t.testimonials.placeholderDesc}
            </p>

            <a
              href="https://wa.me/263781206184?text=Hello%20Mutape%20Painters%20Zim,%20I%20would%20like%20to%20send%20my%20feedback%20for%20a%20completed%20painting%20job."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.testimonials.inviteReview}</span>
            </a>
          </div>
        )}

      </div>
    </section>
  );
};
