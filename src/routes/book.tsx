import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Phone } from "lucide-react";

import { EmptyState } from "@/components/common/placeholder-section";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SITE, TEL_HREF } from "@/config/site";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: `Book a Service | ${SITE.name}` },
      {
        name: "description",
        content:
          "Arrange a workshop visit with Solution For All Auto Care in Isheri Olofin, Lagos. Call +234 814 034 7298, open every day 8:00 AM – 7:00 PM.",
      },
      { property: "og:title", content: `Book a Service | ${SITE.name}` },
      {
        property: "og:description",
        content: "Call the workshop to arrange a visit for repairs or maintenance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <Section padding="lg" size="md">
      <SectionHeading
        as="h1"
        align="center"
        eyebrow="Arrange a visit"
        title="Book a Service"
        description="Online booking is on the way. Until then, a phone call is the fastest way to reserve a slot."
        className="mx-auto"
      />
      <EmptyState
        className="mt-10"
        icon={CalendarCheck}
        title="Online booking coming soon"
        description={`Call ${SITE.phone} between ${SITE.hours[0].time} any day and we will book you in.`}
        action={
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={TEL_HREF}>
                <Phone aria-hidden className="size-4" />
                {SITE.phone}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Workshop details</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/it-siwes">IT / SIWES placement</Link>
            </Button>
          </div>
        }
      />
    </Section>
  );
}
