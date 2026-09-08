import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Wrench } from "lucide-react";

import { EmptyState } from "@/components/common/placeholder-section";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SITE, TEL_HREF } from "@/config/site";
import {
  groupServicesByCategory,
  SERVICES,
  SERVICE_CATEGORY_LABELS,
} from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services | ${SITE.name}` },
      {
        name: "description",
        content:
          "Auto repair and maintenance at Solution For All Auto Care in Lagos. Call +234 814 034 7298 to confirm what your vehicle needs.",
      },
      { property: "og:title", content: `Services | ${SITE.name}` },
      {
        property: "og:description",
        content: "Speak to our workshop about repairs and maintenance for your vehicle.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const groups = groupServicesByCategory(SERVICES);

  return (
    <>
      <Section tone="carbon" padding="lg">
        <SectionHeading
          as="h1"
          eyebrow="What we do"
          title="Services"
          description={SITE.description}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={TEL_HREF}>Call {SITE.phone}</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Visit the workshop</Link>
          </Button>
        </div>
      </Section>

      <Section padding="md">
        {groups.length === 0 ? (
          <EmptyState
            icon={Wrench}
            title="Service list being confirmed"
            description="We have not published our service list and pricing yet. Call the workshop and we will tell you exactly what your vehicle needs and what it costs."
            action={
              <Button asChild className="mt-2">
                <a href={TEL_HREF}>
                  <Phone aria-hidden className="size-4" />
                  {SITE.phone}
                </a>
              </Button>
            }
          />
        ) : (
          <div className="space-y-12">
            {groups.map(([category, services]) => (
              <section key={category}>
                <h2 className="text-2xl uppercase">{SERVICE_CATEGORY_LABELS[category]}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <li
                      key={service.id}
                      className="racing-stripe rounded-lg border border-border bg-card p-6 pl-7"
                    >
                      <h3 className="text-lg uppercase">{service.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {service.shortDescription}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
