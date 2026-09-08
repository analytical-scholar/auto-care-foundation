import { createFileRoute } from "@tanstack/react-router";

import { PagePlaceholder } from "@/components/common/placeholder-section";
import { Section } from "@/components/layout/section";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Our Workshop | ${SITE.shortName}` },
      {
        name: "description",
        content:
          "Meet the certified team behind Solution For All Auto Care — honest diagnostics, dealer-level workmanship and clear pricing.",
      },
      { property: "og:title", content: `About | ${SITE.shortName}` },
      {
        property: "og:description",
        content: "Certified technicians, modern equipment, transparent workmanship.",
      },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  "Our story",
  "Certified technicians",
  "Equipment & standards",
  "Warranty promise",
  "Community & partners",
  "Careers",
] as const;

function AboutPage() {
  return (
    <Section padding="lg">
      <PagePlaceholder
        eyebrow="Who we are"
        title="About Us"
        description="Structure and identity are ready. Team profiles, workshop photography and credentials land in a later phase."
        items={PILLARS}
      />
    </Section>
  );
}
