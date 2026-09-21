export type Language = 'en' | 'sn';

export type QuoteStatus = 'new' | 'contacted' | 'quoted' | 'booked' | 'completed' | 'cancelled';

export interface QuoteRequest {
  id: string;
  createdAt: string; // ISO format
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  location: string;
  service: string;
  scope: 'interior' | 'exterior' | 'both';
  numberOfRooms: number;
  propertySize?: string;
  wallCondition?: 'good' | 'minor_cracks' | 'peeling' | 'severe' | 'new_plaster';
  paintPurchased: boolean;
  preferredColor?: string;
  preferredDate?: string;
  details?: string;
  photoUrl?: string;
  status: QuoteStatus;
  notes?: string;
}

export interface AppointmentRequest {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email?: string;
  location: string;
  propertyType: 'residential_house' | 'flat_apartment' | 'commercial_office' | 'shop_retail' | 'other';
  serviceRequired: string;
  preferredDate: string;
  preferredTime: string;
  numberOfRooms: number;
  message?: string;
  status: 'new' | 'confirmed' | 'completed' | 'cancelled';
}

export interface CustomerReview {
  id: string;
  createdAt: string;
  customerName: string;
  location?: string;
  reviewText: string;
  rating: number; // 1 - 5
  date: string;
  projectTitle?: string;
  published: boolean;
}

export interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  iconName: string;
  tagKey?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  titleEn: string;
  titleSn: string;
  category: 'interior' | 'exterior' | 'walls_ceilings' | 'decorative' | 'residential' | 'commercial';
  location: string;
  descriptionEn: string;
  descriptionSn: string;
}

export interface ColorSwatch {
  name: string;
  shonaName: string;
  hex: string;
  category: 'neutral' | 'warm' | 'cool' | 'bold';
  brand: 'Dulux' | 'Plascon' | 'Both';
  code: string;
}
