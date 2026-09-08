import { createFileRoute } from "@tanstack/react-router";

import { PagePlaceholder } from "@/components/common/placeholder-section";
import { Section } from "@/components/layout/section";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Auto Repair & Maintenance Services | ${SITE.shortName}` },
      {
        name: "description",
        content:
          "Servicing, diagnostics, brakes, tyres, AC and engine repairs by certified technicians at Solution For All Auto Care.",
      },
      { property: "og:title", content: `Services | ${SITE.shortName}` },
      {
        property: "og:description",
        content: "Full-service auto repairs and scheduled maintenance packages.",
      },
    ],
  }),
  component: ServicesPage,
});

const AREAS = [
  "Scheduled servicing",
  "Engine diagnostics",
  "Brakes & suspension",
  "Tyres & wheel alignment",
  "Air conditioning",
  "Pre-purchase inspections",
] as const;

function ServicesPage() {
  return (
    <Section padding="lg">
      <PagePlaceholder
        eyebrow="Workshop capability"
        title="Services"
        description="The service catalogue layout is in place. Individual service detail, pricing and booking flows arrive in the next phase."
        items={AREAS}
      />
    </Section>
  );
}
