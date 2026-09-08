import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Lightbox } from "@/components/gallery/lightbox";
import { Section, SectionHeading } from "@/components/layout/section";
import { GALLERY_IMAGES } from "@/data/gallery";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Gallery | ${SITE.name}` },
      {
        name: "description",
        content:
          "Browse illustrative automotive visuals showing the kind of repair and maintenance work Solution For All Auto Care carries out in Lagos.",
      },
      { property: "og:title", content: `Gallery | ${SITE.name}` },
      {
        property: "og:description",
        content: "Illustrative automotive visuals from Solution For All Auto Care.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section padding="lg">
      <SectionHeading
        as="h1"
        eyebrow="Visuals"
        title="Gallery"
        description="Temporary illustrative images only — these are stock automotive visuals, not photographs of our own completed jobs. Real workshop photography will replace them."
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_IMAGES.map((image, i) => (
          <li key={image.id} className="animate-fade-up">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open larger view: ${image.caption}`}
              className="group block w-full overflow-hidden rounded-lg border border-border bg-card text-left transition-transform duration-200 hover:-translate-y-1"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                width={1280}
                height={854}
                className="aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="block px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider">
                {image.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted-foreground">
        Images shown are for illustration of service types only.
      </p>

      <Lightbox
        images={GALLERY_IMAGES}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </Section>
  );
}
