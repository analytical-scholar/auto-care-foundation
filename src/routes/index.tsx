import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, ShieldCheck, Timer, Wrench } from "lucide-react";

import { SkeletonBlock } from "@/components/common/placeholder-section";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} | ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: `${SITE.name} | ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
    ],
  }),
  component: Home,
});

const PROMISES = [
  {
    icon: Wrench,
    title: "Certified technicians",
    copy: "Dealer-level workmanship across every make and model we take in.",
  },
  {
    icon: Gauge,
    title: "Real diagnostics",
    copy: "We measure before we quote, so you only pay for work you need.",
  },
  {
    icon: Timer,
    title: "Same-day servicing",
    copy: "Routine services and inspections turned around inside the day.",
  },
  {
    icon: ShieldCheck,
    title: "Workmanship warranty",
    copy: "Every repair backed in writing, parts and labour included.",
  },
] as const;

function Home() {
  return (
    <>
      <Section tone="carbon" padding="lg" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative max-w-3xl animate-fade-up">
          <span className="text-eyebrow text-primary">{SITE.tagline}</span>
          <h1 className="mt-4 text-4xl uppercase sm:text-6xl">
            Precision auto care,
            <span className="block text-primary">without the guesswork</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{SITE.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/book">Book a service</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">View services</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section padding="md">
        <SectionHeading
          eyebrow="Why the workshop"
          title="Built on four promises"
          description="Foundation phase: identity, layout and components are live. Full page content follows."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(({ icon: Icon, title, copy }) => (
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
          eyebrow="Coming next"
          title="Service catalogue"
          description="Placeholder slots reserved for the full service list, pricing and booking flow."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6">
              <SkeletonBlock lines={4} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
