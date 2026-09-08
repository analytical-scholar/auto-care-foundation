import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";

import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { FULL_ADDRESS, SITE, TEL_HREF } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Us | ${SITE.name}` },
      {
        name: "description",
        content:
          "Solution For All Auto Care is an auto repair and maintenance workshop on Balogun Ave, Isheri Olofin, Lagos, open every day from 8:00 AM to 7:00 PM.",
      },
      { property: "og:title", content: `About Us | ${SITE.name}` },
      {
        property: "og:description",
        content: "An auto repair workshop in Isheri Olofin, Lagos, open every day.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const FACTS = [
  { icon: MapPin, label: "Where to find us", value: FULL_ADDRESS },
  { icon: Clock, label: "Open", value: `${SITE.hours[0].days}, ${SITE.hours[0].time}` },
  { icon: Phone, label: "Phone", value: SITE.phone },
] as const;

function AboutPage() {
  return (
    <>
      <Section tone="carbon" padding="lg">
        <div className="max-w-3xl animate-fade-up">
          <span className="text-eyebrow text-primary">Who we are</span>
          <h1 className="mt-4 text-4xl uppercase sm:text-5xl">About Us</h1>
          <p className="mt-5 text-lg text-muted-foreground">{SITE.description}</p>
          <p className="mt-4 text-base text-muted-foreground">
            {SITE.name} is an auto repair and maintenance workshop in Isheri Olofin, Lagos.
            We are open every day, and the quickest way to get an answer about your vehicle
            is to call us.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={TEL_HREF}>Call {SITE.phone}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Contact details</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section padding="md">
        <h2 className="sr-only">Workshop details</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map(({ icon: Icon, label, value }) => (
            <li
              key={label}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                <Icon aria-hidden className="size-4" />
              </span>
              <div>
                <h3 className="text-eyebrow text-muted-foreground">{label}</h3>
                <p className="mt-1 text-base">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
