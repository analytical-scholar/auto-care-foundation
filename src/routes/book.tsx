import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";

import { EmptyState } from "@/components/common/placeholder-section";
import { Section, SectionHeading } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: `Book a Service | ${SITE.shortName}` },
      {
        name: "description",
        content:
          "Reserve a workshop slot with Solution For All Auto Care — servicing, repairs and diagnostics booked around you.",
      },
      { property: "og:title", content: `Book a Service | ${SITE.shortName}` },
      {
        property: "og:description",
        content: "Choose a service, pick a slot and confirm your booking.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <Section padding="lg" size="md">
      <SectionHeading
        as="h1"
        align="center"
        eyebrow="Reserve your slot"
        title="Book a Service"
        description="The booking journey is scaffolded here. Slot selection and confirmation are wired up once the booking engine goes in."
        className="mx-auto"
      />
      <EmptyState
        className="mt-10"
        icon={CalendarCheck}
        title="Booking engine not connected yet"
        description={`For now, bookings go through the service desk on ${SITE.phone}.`}
        action={
          <Button asChild variant="outline" className="mt-2">
            <Link to="/contact">Contact the workshop</Link>
          </Button>
        }
      />
    </Section>
  );
}
