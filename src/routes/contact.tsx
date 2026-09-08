import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { EmptyState } from "@/components/common/placeholder-section";
import { Section, SectionHeading } from "@/components/layout/section";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact & Workshop Hours | ${SITE.shortName}` },
      {
        name: "description",
        content:
          "Call, email or visit Solution For All Auto Care. Workshop hours, location and enquiry details.",
      },
      { property: "og:title", content: `Contact | ${SITE.shortName}` },
      {
        property: "og:description",
        content: "Get in touch with our service desk for quotes and bookings.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Section padding="lg">
      <SectionHeading
        as="h1"
        eyebrow="Talk to the service desk"
        title="Contact"
        description="Layout, hours and contact details are in place. The enquiry form is connected in a later phase."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <ul className="space-y-4">
          {[
            { icon: Phone, label: "Phone", value: SITE.phone },
            { icon: Mail, label: "Email", value: SITE.email },
            {
              icon: MapPin,
              label: "Workshop",
              value: `${SITE.address.line1}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`,
            },
          ].map(({ icon: Icon, label, value }) => (
            <li
              key={label}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <Icon aria-hidden className="size-4" />
              </span>
              <div>
                <p className="text-eyebrow text-muted-foreground">{label}</p>
                <p className="mt-1 text-base">{value}</p>
              </div>
            </li>
          ))}
          <li className="rounded-lg border border-border bg-card p-5">
            <p className="text-eyebrow text-muted-foreground">Opening hours</p>
            <dl className="mt-2 space-y-1 text-sm">
              {SITE.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </li>
        </ul>

        <EmptyState
          icon={Mail}
          title="Enquiry form coming next"
          description="These contact details are placeholders — send me the real phone number, email and address and I'll swap them in."
        />
      </div>
    </Section>
  );
}
