import { createFileRoute } from "@tanstack/react-router";

import { PagePlaceholder } from "@/components/common/placeholder-section";
import { Section } from "@/components/layout/section";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Workshop Gallery | ${SITE.shortName}` },
      {
        name: "description",
        content:
          "A look inside the Solution For All Auto Care workshop: repairs, restorations and completed jobs.",
      },
      { property: "og:title", content: `Gallery | ${SITE.shortName}` },
      {
        property: "og:description",
        content: "Workshop bays, repairs in progress and finished vehicles.",
      },
    ],
  }),
  component: GalleryPage,
});

const GROUPS = [
  "Workshop bays",
  "Repairs in progress",
  "Before & after",
  "Diagnostics lab",
  "Detailing",
  "Customer rides",
] as const;

function GalleryPage() {
  return (
    <Section padding="lg">
      <PagePlaceholder
        eyebrow="Inside the bay"
        title="Gallery"
        description="Gallery grid and media slots are scaffolded, ready for real workshop photography."
        items={GROUPS}
      />
    </Section>
  );
}
