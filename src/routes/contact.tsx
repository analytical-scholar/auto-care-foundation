import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";

import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { FULL_ADDRESS, SITE, TEL_HREF } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact & Opening Hours | ${SITE.name}` },
      {
        name: "description",
        content:
          "Call Solution For All Auto Care on +234 814 034 7298 or visit Balogun Ave, Isheri Olofin, Lagos. Open every day, 8:00 AM to 7:00 PM.",
      },
      { property: "og:title", content: `Contact | ${SITE.name}` },
      {
        property: "og:description",
        content: "Phone, workshop address and opening hours in Lagos, Nigeria.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: SITE.name,
          description: SITE.description,
          telephone: SITE.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: SITE.address.line1,
            addressLocality: SITE.address.city,
            postalCode: SITE.address.postalCode,
            addressRegion: SITE.address.region,
            addressCountry: "NG",
          },
          openingHours: "Mo-Su 08:00-19:00",
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Section tone="carbon" padding="lg">
        <SectionHeading
          as="h1"
          eyebrow="Talk to the workshop"
          title="Contact"
          description="Call us or stop by the workshop — we are open every day."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={TEL_HREF}>Call {SITE.phone}</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/services">See what we do</Link>
          </Button>
        </div>
      </Section>

      <Section padding="md">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
              <Phone aria-hidden className="size-4" />
            </span>
            <div>
              <h2 className="text-eyebrow text-muted-foreground">Phone</h2>
              <a href={TEL_HREF} className="mt-1 block text-base hover:text-primary">
                {SITE.phone}
              </a>
            </div>
          </li>

          <li className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
              <MapPin aria-hidden className="size-4" />
            </span>
            <div>
              <h2 className="text-eyebrow text-muted-foreground">Workshop</h2>
              <address className="mt-1 text-base not-italic">{FULL_ADDRESS}</address>
            </div>
          </li>

          <li className="flex items-start gap-4 rounded-lg border border-border bg-card p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
              <Clock aria-hidden className="size-4" />
            </span>
            <div>
              <h2 className="text-eyebrow text-muted-foreground">Opening hours</h2>
              <dl className="mt-1 space-y-1 text-base">
                {SITE.hours.map((h) => (
                  <div key={h.days} className="flex flex-wrap gap-x-2">
                    <dt className="text-muted-foreground">{h.days}:</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </li>
        </ul>
      </Section>
    </>
  );
}
