import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Mail,
  CheckCircle,
  Clock,
  Calendar,
  Layers,
  Database,
  RefreshCw,
  Eye,
  LogOut,
  Lock,
  Star,
  Plus,
  Trash2,
} from 'lucide-react';
import { translations } from '../translations';
import { Language, QuoteRequest, AppointmentRequest, CustomerReview } from '../types';
import {
  getQuotes,
  getAppointments,
  getReviews,
  addReview,
  toggleReviewPublish,
  deleteReview,
  updateQuoteStatus,
  updateAppointmentStatus,
  getDashboardStats,
} from '../services/db';
import { isFirebaseConfigured } from '../services/firebase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, lang }) => {
  const t = translations[lang];

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mutape_admin_authed') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Data state
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [stats, setStats] = useState({
    newQuotes: 0,
    totalQuotes: 0,
    upcomingAppointments: 0,
    completedProjects: 0,
    publishedReviews: 0,
  });
  const [loading, setLoading] = useState(false);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'quotes' | 'appointments' | 'reviews' | 'settings'>('quotes');
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Selected item modal detail
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRequest | null>(null);

  // New review form state
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    location: '',
    reviewText: '',
    rating: 5,
    date: new Date().toISOString().split('T')[0],
    projectTitle: '',
    published: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [qData, aData, rData, sData] = await Promise.all([
        getQuotes(),
        getAppointments(),
        getReviews(),
        getDashboardStats(),
      ]);
      setQuotes(qData);
      setAppointments(aData);
      setReviews(rData);
      setStats(sData);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'mutape2026' || passwordInput.trim() === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('mutape_admin_authed', 'true');
      setAuthError(null);
      loadData();
    } else {
      setAuthError(lang === 'sn' ? 'Pasiwedi haina kururama' : 'Invalid credentials. Password: mutape2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mutape_admin_authed');
  };

  const handleStatusChange = async (id: string, newStatus: any) => {
    await updateQuoteStatus(id, newStatus);
    loadData();
  };

  const handleAppointmentStatusChange = async (id: string, newStatus: any) => {
    await updateAppointmentStatus(id, newStatus);
    loadData();
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.customerName.trim() || !newReview.reviewText.trim()) return;
    await addReview({
      customerName: newReview.customerName.trim(),
      location: newReview.location.trim() || undefined,
      reviewText: newReview.reviewText.trim(),
      rating: newReview.rating,
      date: newReview.date || new Date().toISOString().split('T')[0],
      projectTitle: newReview.projectTitle.trim() || undefined,
      published: newReview.published,
    });
    setShowAddReviewModal(false);
    setNewReview({
      customerName: '',
      location: '',
      reviewText: '',
      rating: 5,
      date: new Date().toISOString().split('T')[0],
      projectTitle: '',
      published: true,
    });
    loadData();
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await toggleReviewPublish(id, !current);
    loadData();
  };

  const handleDeleteReview = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer review?')) {
      await deleteReview(id);
      loadData();
    }
  };

  // Filtered lists
  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch =
      q.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#060511]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#0f0e26] border border-[#2b255e] rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#231e4e] flex items-center justify-between bg-[#141233]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>Mutape Painters Zim</span>
                <span className="text-xs bg-orange-500 text-[#0c0a1a] px-2 py-0.5 rounded font-bold uppercase">
                  Admin Panel
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Customer Leads, Appointments & Review Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-[#1a173d] transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1c1842] hover:bg-orange-500 hover:text-[#0c0a1a] text-slate-300 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Staff Access Restricted</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Enter your administration password to view customer quote requests, appointments, and reviews.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Password (e.g. mutape2026)"
                  className="w-full px-4 py-3 rounded-xl bg-[#171436] border border-[#2b255e] text-white text-sm focus:outline-none focus:border-orange-500"
                  autoFocus
                />
              </div>

              {authError && (
                <p className="text-xs text-rose-400 font-semibold">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-bold rounded-xl text-sm transition-transform active:scale-95 shadow-lg"
              >
                Sign In to Admin
              </button>
            </form>
          </div>
        ) : (
          /* Main Admin Content */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Top Navigation Tabs */}
            <div className="px-6 pt-4 border-b border-[#231e4e] flex items-center gap-4 bg-[#110f27] overflow-x-auto">
              <button
                type="button"
                onClick={() => { setActiveTab('quotes'); setStatusFilter('all'); }}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'quotes'
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Quote Requests</span>
                <span className="bg-[#1c1842] text-xs px-2 py-0.5 rounded-full text-slate-300">
                  {quotes.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('appointments'); setStatusFilter('all'); }}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'appointments'
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>On-Site Appointments</span>
                <span className="bg-[#1c1842] text-xs px-2 py-0.5 rounded-full text-slate-300">
                  {appointments.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('reviews'); setStatusFilter('all'); }}
                className={`pb-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>Customer Reviews</span>
                <span className="bg-[#1c1842] text-xs px-2 py-0.5 rounded-full text-slate-300">
                  {reviews.length}
                </span>
              </button>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-[#0c0b1d] border-b border-[#231e4e]">
              <div className="p-3 rounded-xl bg-[#141233] border border-[#272154]">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">New Quotes</span>
                <p className="text-xl font-black text-orange-400">{stats.newQuotes}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#141233] border border-[#272154]">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Quotes</span>
                <p className="text-xl font-black text-white">{stats.totalQuotes}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#141233] border border-[#272154]">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Upcoming Visits</span>
                <p className="text-xl font-black text-sky-400">{stats.upcomingAppointments}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#141233] border border-[#272154]">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Published Reviews</span>
                <p className="text-xl font-black text-emerald-400">{stats.publishedReviews}</p>
              </div>
            </div>

            {/* Search & Actions Bar */}
            <div className="p-4 sm:p-6 border-b border-[#231e4e] flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-9 pr-4 py-2 bg-[#171436] border border-[#2b255e] rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {activeTab === 'reviews' && (
                  <button
                    type="button"
                    onClick={() => setShowAddReviewModal(true)}
                    className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-bold text-xs px-3.5 py-2 rounded-xl shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Verified Review</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={loadData}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 bg-[#1a173d] hover:bg-[#252054] text-slate-200 text-xs px-3 py-2 rounded-xl border border-[#2b255e]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Tab Views Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              
              {/* Reviews Management Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <div className="text-center py-12 bg-[#121028] rounded-2xl border border-[#272154] p-8">
                      <Star className="w-10 h-10 text-orange-400/40 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-white mb-1">No Reviews Stored Yet</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                        To respect the authentic review directive, reviews are not fabricated. When satisfied clients send feedback via WhatsApp, add them here to publish them to the live public carousel.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowAddReviewModal(true)}
                        className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-bold text-xs px-4 py-2.5 rounded-xl shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Customer Feedback</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-[#121028] border border-[#272154] rounded-2xl p-5 flex flex-col justify-between shadow-md"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white text-sm">{rev.customerName}</span>
                              <div className="flex text-orange-400">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-orange-400" />
                                ))}
                              </div>
                            </div>

                            {rev.projectTitle && (
                              <p className="text-[11px] text-sky-400 font-semibold mb-2">
                                Project: {rev.projectTitle}
                              </p>
                            )}

                            <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                              "{rev.reviewText}"
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#231e4e] flex items-center justify-between text-xs">
                            <span className="text-[10px] text-slate-400">{rev.date}</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleTogglePublish(rev.id, rev.published)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-colors ${
                                  rev.published
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-slate-700 text-slate-400'
                                }`}
                              >
                                {rev.published ? 'Published' : 'Hidden'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(rev.id)}
                                className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                                title="Delete Review"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quotes Tab */}
              {activeTab === 'quotes' && (
                <div className="space-y-3">
                  {filteredQuotes.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No quotes found matching your filters.
                    </div>
                  ) : (
                    filteredQuotes.map((q) => (
                      <div
                        key={q.id}
                        className="bg-[#121028] border border-[#272154] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-orange-500/40 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">{q.name}</span>
                            <span className="text-xs text-slate-400">• {q.location}</span>
                            <span className="text-xs bg-[#191638] text-orange-400 px-2 py-0.5 rounded border border-[#2b255e]">
                              {q.numberOfRooms} Rooms
                            </span>
                          </div>
                          <p className="text-xs text-sky-400 font-semibold">{q.service}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                            <a href={`tel:${q.phone}`} className="hover:text-white flex items-center gap-1">
                              <Phone className="w-3 h-3 text-orange-400" />
                              <span>{q.phone}</span>
                            </a>
                            <a
                              href={`https://wa.me/${q.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:underline flex items-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={q.status}
                            onChange={(e) => handleStatusChange(q.id, e.target.value)}
                            className="bg-[#171436] border border-[#2b255e] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="booked">Booked</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div className="space-y-3">
                  {filteredAppointments.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No appointments scheduled yet.
                    </div>
                  ) : (
                    filteredAppointments.map((a) => (
                      <div
                        key={a.id}
                        className="bg-[#121028] border border-[#272154] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-white text-sm">{a.fullName}</span>
                            <span className="text-xs text-slate-400">• {a.location}</span>
                          </div>
                          <p className="text-xs text-orange-400 font-semibold">
                            {a.preferredDate} ({a.preferredTime})
                          </p>
                          <p className="text-xs text-slate-300">{a.serviceRequired}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={a.status}
                            onChange={(e) => handleAppointmentStatusChange(a.id, e.target.value)}
                            className="bg-[#171436] border border-[#2b255e] text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                          >
                            <option value="new">New</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#110f27] border border-[#2c2560] rounded-3xl p-6 max-w-lg w-full text-slate-100 shadow-2xl">
            <h4 className="text-lg font-bold text-white mb-4">Add Verified Customer Review</h4>
            <form onSubmit={handleCreateReview} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={newReview.customerName}
                  onChange={(e) => setNewReview({ ...newReview, customerName: e.target.value })}
                  placeholder="e.g. Tendai M."
                  className="w-full px-3 py-2 bg-[#181538] border border-[#2b255e] rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Location / Area</label>
                <input
                  type="text"
                  value={newReview.location}
                  onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  placeholder="e.g. Massa Park, Harare"
                  className="w-full px-3 py-2 bg-[#181538] border border-[#2b255e] rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-[#181538] border border-[#2b255e] rounded-xl text-xs text-white"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Review Text *</label>
                <textarea
                  required
                  rows={3}
                  value={newReview.reviewText}
                  onChange={(e) => setNewReview({ ...newReview, reviewText: e.target.value })}
                  placeholder="Paste authentic customer message or review here..."
                  className="w-full px-3 py-2 bg-[#181538] border border-[#2b255e] rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={newReview.published}
                  onChange={(e) => setNewReview({ ...newReview, published: e.target.checked })}
                  className="accent-orange-500 w-4 h-4"
                />
                <label htmlFor="publishedCheck" className="text-xs text-slate-300">
                  Publish to website immediately
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-[#0c0a1a] font-bold rounded-xl text-xs"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
