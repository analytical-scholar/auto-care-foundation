/**
 * Backend-ready domain types for Solution For All Auto Care.
 * Phase 1: types only — no persistence, no API implementation.
 */

export type ID = string;
export type ISODateString = string;

export type ServiceCategory =
  | "servicing"
  | "diagnostics"
  | "brakes"
  | "tyres"
  | "electrical"
  | "air-conditioning"
  | "bodywork"
  | "inspection";

export interface Service {
  id: ID;
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  description?: string;
  /** Minor currency units (e.g. cents) to avoid float rounding. */
  priceFromMinor?: number;
  currency?: "USD" | "EUR" | "GBP";
  estimatedDurationMinutes?: number;
  isFeatured?: boolean;
  imageUrl?: string;
}

export interface Vehicle {
  id: ID;
  ownerId?: ID;
  make: string;
  model: string;
  year: number;
  registration?: string;
  vin?: string;
  mileage?: number;
  fuelType?: "petrol" | "diesel" | "hybrid" | "electric";
}

export interface Customer {
  id: ID;
  fullName: string;
  email: string;
  phone?: string;
  vehicles?: Vehicle[];
  createdAt?: ISODateString;
}

export type BookingStatus =
  | "draft"
  | "pending"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: ID;
  reference?: string;
  customerId?: ID;
  vehicleId?: ID;
  serviceIds: ID[];
  status: BookingStatus;
  scheduledFor: ISODateString;
  notes?: string;
  createdAt?: ISODateString;
}

export interface BookingRequest {
  serviceIds: ID[];
  scheduledFor: ISODateString;
  customer: Pick<Customer, "fullName" | "email" | "phone">;
  vehicle: Pick<Vehicle, "make" | "model" | "year" | "registration">;
  notes?: string;
}

export interface TimeSlot {
  start: ISODateString;
  end: ISODateString;
  available: boolean;
}

export interface Testimonial {
  id: ID;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  vehicle?: string;
  publishedAt?: ISODateString;
}

export interface TeamMember {
  id: ID;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  certifications?: string[];
}

export interface GalleryItem {
  id: ID;
  title: string;
  imageUrl: string;
  category?: string;
  alt: string;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };
