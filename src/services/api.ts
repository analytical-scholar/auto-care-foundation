/**
 * Service layer placeholders.
 *
 * Phase 1 contains signatures and typed stubs only. Each function throws
 * NotImplementedError until the backend (database + server functions) lands
 * in a later phase. UI code should import from here so that swapping the
 * implementation requires no component changes.
 */
import type {
  Booking,
  BookingRequest,
  ContactMessage,
  GalleryItem,
  Paginated,
  Service,
  ServiceCategory,
  TeamMember,
  Testimonial,
  TimeSlot,
} from "@/types/domain";

export class NotImplementedError extends Error {
  constructor(operation: string) {
    super(`${operation} is not implemented in Phase 1.`);
    this.name = "NotImplementedError";
  }
}

/** Stable query keys for TanStack Query, ready for the data phase. */
export const queryKeys = {
  services: (category?: ServiceCategory) => ["services", category ?? "all"] as const,
  service: (slug: string) => ["service", slug] as const,
  availability: (isoDate: string) => ["availability", isoDate] as const,
  bookings: () => ["bookings"] as const,
  testimonials: () => ["testimonials"] as const,
  team: () => ["team"] as const,
  gallery: () => ["gallery"] as const,
} as const;

export const servicesApi = {
  list(_params?: {
    category?: ServiceCategory;
    page?: number;
  }): Promise<Paginated<Service>> {
    throw new NotImplementedError("servicesApi.list");
  },
  getBySlug(_slug: string): Promise<Service | null> {
    throw new NotImplementedError("servicesApi.getBySlug");
  },
};

export const bookingsApi = {
  getAvailability(_isoDate: string): Promise<TimeSlot[]> {
    throw new NotImplementedError("bookingsApi.getAvailability");
  },
  create(_request: BookingRequest): Promise<Booking> {
    throw new NotImplementedError("bookingsApi.create");
  },
  listForCustomer(_customerId: string): Promise<Booking[]> {
    throw new NotImplementedError("bookingsApi.listForCustomer");
  },
};

export const contentApi = {
  listTestimonials(): Promise<Testimonial[]> {
    throw new NotImplementedError("contentApi.listTestimonials");
  },
  listTeam(): Promise<TeamMember[]> {
    throw new NotImplementedError("contentApi.listTeam");
  },
  listGallery(): Promise<GalleryItem[]> {
    throw new NotImplementedError("contentApi.listGallery");
  },
};

export const contactApi = {
  send(_message: ContactMessage): Promise<{ received: true }> {
    throw new NotImplementedError("contactApi.send");
  },
};
