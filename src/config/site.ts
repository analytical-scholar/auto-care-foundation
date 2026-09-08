/**
 * Central brand + navigation configuration.
 * Only confirmed business details are stored here.
 */
export const SITE = {
  name: "Solution For All Auto Care",
  shortName: "Solution For All Auto Care",
  tagline: "Auto Repairs & Maintenance Services",
  description: "We revolutionize auto repair experience with innovative solutions.",
  phone: "+234 814 034 7298",
  address: {
    line1: "Balogun Ave, Isheri Olofin",
    city: "Idimu/Isheri Olofin",
    postalCode: "102213",
    region: "Lagos",
    country: "Nigeria",
  },
  hours: [{ days: "Every day", time: "8:00 AM – 7:00 PM" }],
} as const;

export const FULL_ADDRESS = `${SITE.address.line1}, ${SITE.address.city} ${SITE.address.postalCode}, ${SITE.address.region}, ${SITE.address.country}`;

export const TEL_HREF = `tel:${SITE.phone.replace(/[^\d+]/g, "")}`;

export type NavLink = {
  readonly to: "/" | "/services" | "/about" | "/gallery" | "/contact" | "/book";
  readonly label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];
