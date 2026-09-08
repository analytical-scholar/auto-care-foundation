import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { FULL_ADDRESS, NAV_LINKS, SITE, TEL_HREF } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo height={40} />
            <p className="max-w-sm text-sm text-muted-foreground">{SITE.description}</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-2">
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              <h2 className="text-eyebrow text-primary">Explore</h2>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2">
              <h2 className="text-eyebrow text-primary">Workshop</h2>
              <a
                href={TEL_HREF}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone aria-hidden className="size-4" />
                {SITE.phone}
              </a>
              <p className="inline-flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
                <span>{FULL_ADDRESS}</span>
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {SITE.hours.map((h) => (
                  <li key={h.days} className="inline-flex items-center gap-2">
                    <Clock aria-hidden className="size-4" />
                    <span>
                      {h.days}: {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-6 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
