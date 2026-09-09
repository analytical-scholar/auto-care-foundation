import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Phone } from "lucide-react";

import { Section, SectionHeading } from "@/components/layout/section";
import { PlacementForm } from "@/components/placement/placement-form";
import { Button } from "@/components/ui/button";
import { FULL_ADDRESS, SITE, TEL_HREF } from "@/config/site";

const TITLE = `IT / SIWES Placement Application | ${SITE.name}`;
const DESCRIPTION =
  "Students can register and submit an IT, SIWES or Industrial Training application to Solution For All Auto Care, Isheri Olofin, Lagos, for consideration.";

export const Route = createFileRoute("/it-siwes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/it-siwes" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/it-siwes" }],
  }),
  component: PlacementPage,
});

function PlacementPage() {
  return (
    <>
      <Section tone="carbon" padding="lg">
        <div className="max-w-2xl animate-fade-up">
          <span className="text-eyebrow text-primary">Students</span>
          <h1 className="mt-3 text-4xl uppercase sm:text-5xl">
            IT / SIWES <span className="text-primary">Placement</span>
          </h1>
          <p className="mt-5 text-base text-muted-foreground">
            Students can register and submit an application to be considered for IT, SIWES
            or Industrial Training at our workshop. Submitting an application does not
            confirm a placement — each one is reviewed.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#application-form">
                <GraduationCap aria-hidden className="size-4" />
                Start your application
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={TEL_HREF}>
                <Phone aria-hidden className="size-4" />
                {SITE.phone}
              </a>
            </Button>
          </div>
        </div>
      </Section>

      <Section padding="md">
        <h2 className="sr-only">What to expect</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="racing-stripe rounded-lg border border-border bg-card p-6 pl-7">
            <h3 className="text-lg uppercase">Register</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in your details, school information and the training type your school
              requires.
            </p>
          </li>
          <li className="racing-stripe rounded-lg border border-border bg-card p-6 pl-7">
            <h3 className="text-lg uppercase">Submit</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Attach your CV and any supporting document, then submit the application for
              consideration.
            </p>
          </li>
          <li className="racing-stripe rounded-lg border border-border bg-card p-6 pl-7">
            <h3 className="text-lg uppercase">Reviewed</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Applications are reviewed. We do not promise a slot, a start date or a
              response time.
            </p>
          </li>
        </ul>
      </Section>

      <Section tone="surface" padding="lg" size="md" id="application-form">
        <SectionHeading
          eyebrow="Application"
          title="Student placement application"
          description="Fields marked with an asterisk are required. Please use details that match your school records."
        />
        <div className="mt-10">
          <PlacementForm />
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          Workshop: {FULL_ADDRESS}. Open every day {SITE.hours[0].time}. Questions about a
          placement? <Link to="/contact" className="underline">Contact the workshop</Link>.
        </p>
      </Section>
    </>
  );
}
