import { QuoteRequest, AppointmentRequest, QuoteStatus, CustomerReview } from '../types';
import {
  getFirebaseDb,
  isFirebaseConfigured,
  handleFirestoreError,
  OperationType,
} from './firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

const QUOTES_STORAGE_KEY = 'mutape_painters_quotes_v1';
const APPOINTMENTS_STORAGE_KEY = 'mutape_painters_appointments_v1';
const REVIEWS_STORAGE_KEY = 'mutape_painters_reviews_v1';

// Initial sample quote based on real business scenario
const INITIAL_SAMPLE_QUOTES: QuoteRequest[] = [
  {
    id: 'quote-sample-01',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    name: 'Tinashe Chikwanha',
    phone: '+263 77 234 5678',
    whatsapp: '+263 77 234 5678',
    email: 'tinashe.chikwanha@example.co.zw',
    location: 'Massa Park, Harare',
    service: 'Interior & Exterior Painting',
    scope: 'both',
    numberOfRooms: 4,
    propertySize: 'Main house + cottage',
    wallCondition: 'minor_cracks',
    paintPurchased: false,
    preferredColor: 'Dulux Warm Cream & White Ceiling',
    preferredDate: '2026-10-01',
    details: 'Looking to paint 3 bedrooms and living room before the rainy season starts. Ceilings need fresh coats.',
    status: 'new'
  },
  {
    id: 'quote-sample-02',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    name: 'Nyasha Mukandi',
    phone: '+263 71 890 1234',
    whatsapp: '+263 71 890 1234',
    email: 'nyasha.m@example.com',
    location: 'Nyatsime Phase 4, Chitungwiza',
    service: 'Walls & Ceilings',
    scope: 'interior',
    numberOfRooms: 2,
    propertySize: '2 Standard Bedrooms',
    wallCondition: 'good',
    paintPurchased: true,
    preferredColor: 'Plascon Crisp Alabaster',
    preferredDate: '2026-09-28',
    details: 'Interested in the $35 per room labour package. Paint already on site.',
    status: 'contacted'
  }
];

const INITIAL_SAMPLE_APPOINTMENTS: AppointmentRequest[] = [
  {
    id: 'app-sample-01',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    fullName: 'Farai Marere',
    phone: '+263 78 555 4321',
    whatsapp: '+263 78 555 4321',
    email: 'farai.m@example.co.zw',
    location: 'Braeside, Harare',
    propertyType: 'residential_house',
    serviceRequired: 'Colour Consultation & Inspection',
    preferredDate: '2026-09-25',
    preferredTime: 'Morning (08:00 - 12:00)',
    numberOfRooms: 5,
    message: 'Need help choosing between Dulux Earth tones and Plascon neutral greys.',
    status: 'new'
  }
];

/**
 * Generated Customer Reviews populated per user request.
 * Managed and editable through the Staff Admin Panel.
 */
const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-01',
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    customerName: 'Tendai Mutasa',
    location: 'Borrowdale, Harare',
    reviewText:
      'Mutape Painters transformed our 4-bedroom house with absolute professionalism. The borders between the white ceilings and warm beige walls are razor-sharp. No paint drops on our tiles!',
    rating: 5,
    date: 'September 2026',
    projectTitle: 'Full Interior Repaint',
    published: true,
  },
  {
    id: 'rev-02',
    createdAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    customerName: 'Chipo Moyo',
    location: 'Avondale West, Harare',
    reviewText:
      'The $35 per room labour package is truly transparent — no hidden surprise fees. They prepared all wall cracks before applying two solid coats of Dulux. Highly recommended team.',
    rating: 5,
    date: 'September 2026',
    projectTitle: 'Bedroom & Living Room Labour Package',
    published: true,
  },
  {
    id: 'rev-03',
    createdAt: new Date(Date.now() - 3600000 * 24 * 12).toISOString(),
    customerName: 'Kudakwashe Sibanda',
    location: 'Unit K, Chitungwiza',
    reviewText:
      'Very punctual painters! They arrived with their own drop cloths and masking tape, protected our furniture, and finished 3 rooms in two days. Ceilings look brand new.',
    rating: 5,
    date: 'August 2026',
    projectTitle: 'Walls & Ceiling Coating',
    published: true,
  },
  {
    id: 'rev-04',
    createdAt: new Date(Date.now() - 3600000 * 24 * 18).toISOString(),
    customerName: 'Dr. V. Sithole',
    location: 'Mount Pleasant, Harare',
    reviewText:
      'We hired Mutape Painters for our medical consulting rooms. They worked cleanly, respected our working hours, and their colour consultation gave us a calming, professional atmosphere.',
    rating: 5,
    date: 'August 2026',
    projectTitle: 'Commercial Clinic Repaint',
    published: true,
  },
  {
    id: 'rev-05',
    createdAt: new Date(Date.now() - 3600000 * 24 * 25).toISOString(),
    customerName: 'Ruvimbo Marufu',
    location: 'Westgate, Harare',
    reviewText:
      'I was worried about our exterior walls after the last rainy season. They scraped all peeling areas, sealed the plaster properly, and applied weather-shield paint that looks fantastic.',
    rating: 5,
    date: 'July 2026',
    projectTitle: 'Exterior Weather-Shield Project',
    published: true,
  },
];

// Helper to get local quotes
function getLocalQuotes(): QuoteRequest[] {
  try {
    const raw = localStorage.getItem(QUOTES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_QUOTES));
      return INITIAL_SAMPLE_QUOTES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local quotes:', err);
    return INITIAL_SAMPLE_QUOTES;
  }
}

function saveLocalQuotes(quotes: QuoteRequest[]): void {
  try {
    localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));
  } catch (err) {
    console.error('Error writing local quotes:', err);
  }
}

// Helper to get local appointments
function getLocalAppointments(): AppointmentRequest[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_APPOINTMENTS));
      return INITIAL_SAMPLE_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local appointments:', err);
    return INITIAL_SAMPLE_APPOINTMENTS;
  }
}

function saveLocalAppointments(appointments: AppointmentRequest[]): void {
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  } catch (err) {
    console.error('Error writing local appointments:', err);
  }
}

// Helper to get local reviews
function getLocalReviews(): CustomerReview[] {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    return parsed;
  } catch (err) {
    console.error('Error reading local reviews:', err);
    return INITIAL_REVIEWS;
  }
}

function saveLocalReviews(reviews: CustomerReview[]): void {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch (err) {
    console.error('Error writing local reviews:', err);
  }
}

/**
 * Submit a new Quote Request
 */
export async function submitQuoteRequest(
  data: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>
): Promise<QuoteRequest> {
  const newId = `quote-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const newQuote: QuoteRequest = {
    ...data,
    id: newId,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  // 1. Always save locally so it works immediately and survives reloads
  const localList = getLocalQuotes();
  localList.unshift(newQuote);
  saveLocalQuotes(localList);

  // 2. If Firestore is configured, persist to cloud
  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = `quotes/${newId}`;
    try {
      await setDoc(doc(db, 'quotes', newId), newQuote);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  return newQuote;
}

/**
 * Fetch all quotes
 */
export async function getQuotes(): Promise<QuoteRequest[]> {
  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = 'quotes';
    try {
      const q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const cloudQuotes: QuoteRequest[] = [];
      snapshot.forEach((docSnap) => {
        cloudQuotes.push(docSnap.data() as QuoteRequest);
      });
      if (cloudQuotes.length > 0) {
        saveLocalQuotes(cloudQuotes);
        return cloudQuotes;
      }
    } catch (err) {
      console.warn('Firestore fetch failed, falling back to local storage:', err);
    }
  }

  return getLocalQuotes();
}

/**
 * Update quote status
 */
export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus,
  notes?: string
): Promise<void> {
  const quotes = getLocalQuotes();
  const updated = quotes.map((q) =>
    q.id === id ? { ...q, status, ...(notes !== undefined ? { notes } : {}) } : q
  );
  saveLocalQuotes(updated);

  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = `quotes/${id}`;
    try {
      await updateDoc(doc(db, 'quotes', id), {
        status,
        ...(notes !== undefined ? { notes } : {}),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }
}

/**
 * Delete a quote
 */
export async function deleteQuote(id: string): Promise<void> {
  const quotes = getLocalQuotes();
  saveLocalQuotes(quotes.filter((q) => q.id !== id));

  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = `quotes/${id}`;
    try {
      await deleteDoc(doc(db, 'quotes', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  }
}

/**
 * Submit an Appointment Request
 */
export async function submitAppointment(
  data: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>
): Promise<AppointmentRequest> {
  const newId = `app-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const newAppointment: AppointmentRequest = {
    ...data,
    id: newId,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const list = getLocalAppointments();
  list.unshift(newAppointment);
  saveLocalAppointments(list);

  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = `appointments/${newId}`;
    try {
      await setDoc(doc(db, 'appointments', newId), newAppointment);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  return newAppointment;
}

/**
 * Get all appointments
 */
export async function getAppointments(): Promise<AppointmentRequest[]> {
  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = 'appointments';
    try {
      const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const cloudApps: AppointmentRequest[] = [];
      snapshot.forEach((docSnap) => {
        cloudApps.push(docSnap.data() as AppointmentRequest);
      });
      if (cloudApps.length > 0) {
        saveLocalAppointments(cloudApps);
        return cloudApps;
      }
    } catch (err) {
      console.warn('Firestore appointments fetch failed, falling back to local storage:', err);
    }
  }

  return getLocalAppointments();
}

/**
 * Update appointment status
 */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentRequest['status']
): Promise<void> {
  const apps = getLocalAppointments();
  const updated = apps.map((a) => (a.id === id ? { ...a, status } : a));
  saveLocalAppointments(updated);

  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = `appointments/${id}`;
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }
}

// ==========================================
// REVIEW REPOSITORY & ADMIN PERSISTENCE
// ==========================================

export async function getReviews(): Promise<CustomerReview[]> {
  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = 'reviews';
    try {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const cloudReviews: CustomerReview[] = [];
      snapshot.forEach((docSnap) => {
        cloudReviews.push(docSnap.data() as CustomerReview);
      });
      if (cloudReviews.length > 0) {
        saveLocalReviews(cloudReviews);
        return cloudReviews;
      }
    } catch (err) {
      console.warn('Firestore reviews fetch failed, falling back to local:', err);
    }
  }
  return getLocalReviews();
}

export async function addReview(
  data: Omit<CustomerReview, 'id' | 'createdAt'>
): Promise<CustomerReview> {
  const newId = `review-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const review: CustomerReview = {
    ...data,
    id: newId,
    createdAt: new Date().toISOString(),
  };

  const list = getLocalReviews();
  list.unshift(review);
  saveLocalReviews(list);

  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = `reviews/${newId}`;
    try {
      await setDoc(doc(db, 'reviews', newId), review);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  }

  return review;
}

export async function toggleReviewPublish(id: string, published: boolean): Promise<void> {
  const reviews = getLocalReviews();
  const updated = reviews.map((r) => (r.id === id ? { ...r, published } : r));
  saveLocalReviews(updated);

  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = `reviews/${id}`;
    try {
      await updateDoc(doc(db, 'reviews', id), { published });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  }
}

export async function deleteReview(id: string): Promise<void> {
  const reviews = getLocalReviews();
  saveLocalReviews(reviews.filter((r) => r.id !== id));

  const db = getFirebaseDb();
  if (isFirebaseConfigured && db) {
    const path = `reviews/${id}`;
    try {
      await deleteDoc(doc(db, 'reviews', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  }
}

/**
 * Calculate dynamic dashboard stats strictly from real data
 */
export async function getDashboardStats() {
  const quotes = await getQuotes();
  const appointments = await getAppointments();
  const reviews = await getReviews();

  const newQuotes = quotes.filter((q) => q.status === 'new').length;
  const totalQuotes = quotes.length;
  const upcomingAppointments = appointments.filter((a) => a.status === 'new' || a.status === 'confirmed').length;
  const completedProjects = quotes.filter((q) => q.status === 'completed').length;
  const publishedReviews = reviews.filter((r) => r.published).length;

  return {
    newQuotes,
    totalQuotes,
    upcomingAppointments,
    completedProjects,
    publishedReviews,
  };
}
