import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, GraduationCap, MapPin, Phone } from "lucide-react";

import { Lightbox } from "@/components/gallery/lightbox";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { FULL_ADDRESS, SITE, TEL_HREF } from "@/config/site";
import { GALLERY_IMAGES } from "@/data/gallery";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} | Auto Repairs in Isheri Olofin, Lagos` },
      {
        name: "description",
        content:
          "Solution For All Auto Care — auto repairs and maintenance on Balogun Ave, Isheri Olofin, Lagos. Open every day 8:00 AM – 7:00 PM. Call +234 814 034 7298.",
      },
      {
        property: "og:title",
        content: `${SITE.name} | Auto Repairs in Isheri Olofin, Lagos`,
      },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const HIGHLIGHTS = [
  {
    icon: Clock,
    title: "Open every day",
    copy: `${SITE.hours[0].time}, seven days a week.`,
  },
  {
    icon: MapPin,
    title: "Isheri Olofin, Lagos",
    copy: FULL_ADDRESS,
  },
  {
    icon: Phone,
    title: "Talk to a person",
    copy: `Call ${SITE.phone} and tell us what your vehicle is doing.`,
  },
] as const;

function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const preview = GALLERY_IMAGES.slice(0, 3);

  return (
    <>
      <Section tone="carbon" padding="lg" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl animate-fade-up">
            <span className="text-eyebrow text-primary">{SITE.tagline}</span>
            <h1 className="mt-4 text-4xl uppercase sm:text-5xl lg:text-6xl">
              Solution For All
              <span className="block text-primary">Auto Care</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{SITE.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={TEL_HREF}>Call {SITE.phone}</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Find the workshop</Link>
              </Button>
            </div>
          </div>

          <img
            src={GALLERY_IMAGES[0]!.src}
            alt={GALLERY_IMAGES[0]!.alt}
            width={1280}
            height={854}
            className="w-full rounded-lg border border-border object-cover shadow-elevated"
          />
        </div>
      </Section>

      <Section padding="md">
        <h2 className="sr-only">Why choose us</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map(({ icon: Icon, title, copy }) => (
            <li
              key={title}
              className="racing-stripe rounded-lg border border-border bg-card p-6 pl-7 shadow-elevated transition-transform duration-200 hover:-translate-y-1"
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-secondary text-primary">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-lg uppercase">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" padding="md">
        <SectionHeading
          eyebrow="A look at the work"
          title="Repairs & maintenance"
          description="Illustrative automotive images — not photographs of our own completed jobs."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((image, i) => (
            <li key={image.id}>
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
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/gallery">View gallery</Link>
          </Button>
        </div>

        <Lightbox
          images={preview}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      </Section>

      <Section padding="md">
        <div className="rounded-lg border border-border bg-gradient-carbon p-8 text-center">
          <h2 className="text-3xl uppercase">Need your vehicle looked at?</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
            Call the workshop and we will let you know what to bring and when to come in.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href={TEL_HREF}>Call {SITE.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">About us</Link>
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg uppercase">Student? IT / SIWES placement</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Register and submit an application to be considered for IT, SIWES or
              Industrial Training.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/it-siwes">
              <GraduationCap aria-hidden className="size-4" />
              Apply for placement
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
