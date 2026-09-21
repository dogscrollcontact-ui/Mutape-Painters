import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { translations } from '../translations';
import { Language, AppointmentRequest } from '../types';
import { submitAppointment } from '../services/db';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    location: '',
    propertyType: 'residential_house' as AppointmentRequest['propertyType'],
    serviceRequired: 'On-Site Inspection & Free Quotation',
    preferredDate: '',
    preferredTime: 'Morning (08:00 - 12:00)',
    numberOfRooms: 3,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppointment, setSubmittedAppointment] =
    useState<AppointmentRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.location.trim() || !formData.preferredDate) {
      setErrorMessage(
        lang === 'sn'
          ? 'Ndapota zadzai zita, nhamba yerunhare, kero, nezuva ramunoda.'
          : 'Please complete all required fields (Name, Phone, Location, Date).'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const app = await submitAppointment({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        whatsapp: (formData.whatsapp || formData.phone).trim(),
        email: formData.email.trim() || undefined,
        location: formData.location.trim(),
        propertyType: formData.propertyType,
        serviceRequired: formData.serviceRequired,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        numberOfRooms: Number(formData.numberOfRooms) || 1,
        message: formData.message.trim() || undefined,
      });

      setSubmittedAppointment(app);
    } catch (err) {
      console.error('Appointment booking error:', err);
      setErrorMessage(
        lang === 'sn'
          ? 'Chikanganiso pakuendesa. Ndapota edzai zvakare kana kubata paWhatsApp.'
          : 'Failed to record appointment. Please try again or message on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsappFollowupUrl = () => {
    if (!submittedAppointment) return '';
    const text = `Hello Mutape Painters Zim, I have booked a consultation appointment (#${submittedAppointment.id.slice(-6)}) on your website.\nName: ${submittedAppointment.fullName}\nDate: ${submittedAppointment.preferredDate} (${submittedAppointment.preferredTime})\nLocation: ${submittedAppointment.location}\nService: ${submittedAppointment.serviceRequired}`;
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
        className="relative bg-[#110f27] border border-[#2b255e] rounded-3xl max-w-xl w-full p-6 sm:p-8 my-8 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#181438] hover:bg-orange-500 hover:text-[#0c0a1a] text-slate-300 transition-colors border border-[#2b255e] flex items-center justify-center"
          aria-label={t.appointmentForm.closeBtn}
        >
          <X className="w-5 h-5" />
        </button>

        {submittedAppointment ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              {t.appointmentForm.successTitle}
            </h3>

            <p className="text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
              {t.appointmentForm.successDesc}
            </p>

            <div className="p-4 rounded-xl bg-stone-850 border border-stone-750 text-left text-xs text-stone-300 space-y-1">
              <p><strong>{t.appointmentForm.fullName}:</strong> {submittedAppointment.fullName}</p>
              <p><strong>{t.appointmentForm.preferredDate}:</strong> {submittedAppointment.preferredDate} ({submittedAppointment.preferredTime})</p>
              <p><strong>{t.appointmentForm.location}:</strong> {submittedAppointment.location}</p>
              <p><strong>{t.appointmentForm.serviceRequired}:</strong> {submittedAppointment.serviceRequired}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getWhatsappFollowupUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold py-3 px-6 rounded-xl text-sm"
              >
                {t.appointmentForm.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          /* Form Input */
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">
                {t.appointmentForm.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                {t.appointmentForm.subtitle}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.appointmentForm.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Tendai Moyo"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.appointmentForm.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+263 77 123 4567"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* WhatsApp & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.appointmentForm.whatsapp}
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="+263 78 120 6184"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.appointmentForm.location} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Massa Park, Harare"
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Property Type & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.appointmentForm.propertyType}
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        propertyType: e.target.value as AppointmentRequest['propertyType'],
                      })
                    }
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="residential_house">{t.appointmentForm.propResidential}</option>
                    <option value="flat_apartment">{t.appointmentForm.propFlat}</option>
                    <option value="commercial_office">{t.appointmentForm.propOffice}</option>
                    <option value="shop_retail">{t.appointmentForm.propShop}</option>
                    <option value="other">{t.appointmentForm.propOther}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.appointmentForm.serviceRequired}
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="On-Site Inspection & Free Quotation">On-Site Inspection & Free Quotation</option>
                    <option value="Colour Consultation Session">Colour Consultation Session</option>
                    <option value="Standard Room Painting ($35/room)">Standard Room Painting ($35/room)</option>
                    <option value="Exterior Wall Inspection">Exterior Wall Inspection</option>
                    <option value="Roof Leak Assessment">Roof Leak Assessment</option>
                    <option value="Commercial Project Walkthrough">Commercial Project Walkthrough</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.appointmentForm.preferredDate} *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    {t.appointmentForm.preferredTime}
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Morning (08:00 - 12:00)">{t.appointmentForm.timeMorning}</option>
                    <option value="Afternoon (12:00 - 16:30)">{t.appointmentForm.timeAfternoon}</option>
                    <option value="Anytime / Flexible">{t.appointmentForm.timeFlexible}</option>
                  </select>
                </div>
              </div>

              {/* Number of Rooms */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  {t.appointmentForm.numberOfRooms}
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

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  {t.appointmentForm.message}
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us any special directions or requests..."
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 text-stone-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-lg shadow-amber-950/40"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isSubmitting ? t.appointmentForm.submitting : t.appointmentForm.submitBtn}
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
