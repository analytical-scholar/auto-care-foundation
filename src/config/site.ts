/**
 * Central brand + navigation configuration.
 * Placeholder contact details — replace with the real business details.
 */
export const SITE = {
  name: "Solution For All Auto Care",
  shortName: "S4A Auto Care",
  tagline: "Auto Repairs & Maintenance Services",
  description:
    "Premium auto repairs, servicing and maintenance from certified technicians. Honest diagnostics, dealer-level care.",
  phone: "+1 (555) 018-4402",
  email: "hello@s4aautocare.com",
  address: {
    line1: "1420 Ignition Way",
    city: "Springfield",
    region: "IL",
    postalCode: "62704",
    country: "US",
  },
  hours: [
    { days: "Mon – Fri", time: "7:30am – 6:00pm" },
    { days: "Saturday", time: "8:00am – 3:00pm" },
    { days: "Sunday", time: "Closed" },
  ],
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;

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
