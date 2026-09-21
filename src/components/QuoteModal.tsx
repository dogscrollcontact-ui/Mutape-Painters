import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Upload, AlertCircle } from 'lucide-react';
import { translations } from '../translations';
import { Language, QuoteRequest } from '../types';
import { submitQuoteRequest } from '../services/db';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialService = '',
}) => {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    location: '',
    service: initialService || 'Interior & Exterior Painting',
    scope: 'both' as QuoteRequest['scope'],
    numberOfRooms: 3,
    propertySize: '',
    wallCondition: 'good' as QuoteRequest['wallCondition'],
    paintPurchased: false,
    preferredColor: '',
    preferredDate: '',
    details: '',
    photoUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.location.trim()) {
      setErrorMessage(
        lang === 'sn'
          ? 'Ndapota zadzai zita renyu, runhare, nenharaunda.'
          : 'Please provide your name, phone number, and property location.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const quote = await submitQuoteRequest({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        whatsapp: (formData.whatsapp || formData.phone).trim(),
        email: formData.email.trim() || undefined,
        location: formData.location.trim(),
        service: formData.service,
        scope: formData.scope,
        numberOfRooms: Number(formData.numberOfRooms) || 1,
        propertySize: formData.propertySize.trim() || undefined,
        wallCondition: formData.wallCondition,
        paintPurchased: formData.paintPurchased,
        preferredColor: formData.preferredColor.trim() || undefined,
        preferredDate: formData.preferredDate || undefined,
        details: formData.details.trim() || undefined,
        photoUrl: formData.photoUrl || undefined,
      });

      setSubmittedQuote(quote);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(
        lang === 'sn'
          ? 'Chikanganiso pakuendesa. Ndapota edzai zvakare kana kubata paWhatsApp.'
          : 'Failed to submit quote request. Please try again or reach out on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getWhatsappFollowupUrl = () => {
    if (!submittedQuote) return '';
    const text = `Hello Mutape Painters Zim, I just requested a quote (#${submittedQuote.id.slice(-6)}) on your website.\nName: ${submittedQuote.name}\nLocation: ${submittedQuote.location}\nRooms: ${submittedQuote.numberOfRooms}\nService: ${submittedQuote.service}`;
    return `https://wa.me/263781206184?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#060511]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#110f27] border border-[#2b255e] rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#181438] hover:bg-orange-500 hover:text-[#0c0a1a] text-slate-300 transition-colors border border-[#2b255e] flex items-center justify-center"
          aria-label={t.quoteForm.closeBtn}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success View */}
        {submittedQuote ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              {t.quoteForm.successTitle}
            </h3>

            <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              {t.quoteForm.successDesc}
            </p>

            <div className="p-4 rounded-xl bg-stone-850 border border-stone-750 text-left text-xs text-stone-300 space-y-1">
              <p><strong>{t.quoteForm.nameLabel}:</strong> {submittedQuote.name}</p>
              <p><strong>{t.quoteForm.locationLabel}:</strong> {submittedQuote.location}</p>
              <p><strong>{t.quoteForm.roomsLabel}:</strong> {submittedQuote.numberOfRooms}</p>
              <p><strong>{t.quoteForm.serviceLabel}:</strong> {submittedQuote.service}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getWhatsappFollowupUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.quoteForm.whatsappFollowup}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold py-3 px-6 rounded-xl text-sm"
              >
                {t.quoteForm.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          /* Input Form View */
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">
                {t.quoteForm.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                {t.quoteForm.subtitle}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.quoteForm.namePlaceholder}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.quoteForm.phonePlaceholder}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.whatsappLabel}
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder={t.quoteForm.whatsappPlaceholder}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.locationLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={t.quoteForm.locationPlaceholder}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Row 3: Service & Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.serviceLabel}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Interior Painting">Interior Painting</option>
                    <option value="Exterior Painting">Exterior Painting</option>
                    <option value="Walls & Ceilings ($35/room)">Walls & Ceilings ($35/room)</option>
                    <option value="Decorative Finishes">Decorative Finishes</option>
                    <option value="Colour Consultation">Colour Consultation</option>
                    <option value="Roof Leak Repairs">Roof Leak Repairs</option>
                    <option value="Commercial Painting">Commercial Painting</option>
                    <option value="Full House Transformation">Full House Transformation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.scopeLabel}
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) =>
                      setFormData({ ...formData, scope: e.target.value as QuoteRequest['scope'] })
                    }
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="interior">{t.quoteForm.scopeInterior}</option>
                    <option value="exterior">{t.quoteForm.scopeExterior}</option>
                    <option value="both">{t.quoteForm.scopeBoth}</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Number of Rooms & Wall Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.roomsLabel}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.numberOfRooms}
                    onChange={(e) =>
                      setFormData({ ...formData, numberOfRooms: parseInt(e.target.value, 10) || 1 })
                    }
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.wallConditionLabel}
                  </label>
                  <select
                    value={formData.wallCondition}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wallCondition: e.target.value as QuoteRequest['wallCondition'],
                      })
                    }
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="good">{t.quoteForm.conditionGood}</option>
                    <option value="minor_cracks">{t.quoteForm.conditionMinor}</option>
                    <option value="peeling">{t.quoteForm.conditionPeeling}</option>
                    <option value="severe">{t.quoteForm.conditionSevere}</option>
                    <option value="new_plaster">{t.quoteForm.conditionPlaster}</option>
                  </select>
                </div>
              </div>

              {/* Paint Purchased Checkbox */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-850 border border-stone-750">
                <input
                  type="checkbox"
                  id="paint-purchased-checkbox"
                  checked={formData.paintPurchased}
                  onChange={(e) => setFormData({ ...formData, paintPurchased: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <label htmlFor="paint-purchased-checkbox" className="text-xs sm:text-sm text-stone-300 cursor-pointer">
                  {t.quoteForm.paintPurchasedLabel} (
                  {formData.paintPurchased ? t.quoteForm.paintYes : t.quoteForm.paintNo})
                </label>
              </div>

              {/* Preferred Colour & Start Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.preferredColorLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.preferredColor}
                    onChange={(e) => setFormData({ ...formData, preferredColor: e.target.value })}
                    placeholder={t.quoteForm.preferredColorPlaceholder}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.quoteForm.preferredDateLabel}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Details Textarea */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  {t.quoteForm.detailsLabel}
                </label>
                <textarea
                  rows={2}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder={t.quoteForm.detailsPlaceholder}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  {t.quoteForm.photoUploadLabel}
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white px-4 py-2 rounded-xl border border-stone-700 cursor-pointer text-xs font-medium transition-colors">
                    <Upload className="w-4 h-4 text-amber-500" />
                    <span>Upload Wall Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-stone-400">
                    {formData.photoUrl ? 'Photo attached ✓' : t.quoteForm.photoHelp}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 text-stone-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg shadow-amber-950/40"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting ? t.quoteForm.submitting : t.quoteForm.submitBtn}
                  </span>
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
