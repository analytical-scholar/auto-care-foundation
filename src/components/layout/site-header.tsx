import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SECONDARY_NAV_LINKS, SITE } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container>
        <div className="flex h-18 items-center justify-between gap-4">
          <Logo height={40} />

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            {SECONDARY_NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 transition-colors hover:text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone aria-hidden className="size-4" />
              {SITE.phone}
            </a>
            <Button asChild size="sm">
              <Link to="/book">Book a service</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </Button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className={cn("border-t border-border bg-surface lg:hidden", open && "animate-fade-in")}
      >
        <Container>
          <nav aria-label="Mobile navigation" className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="racing-stripe py-3 pl-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            {SECONDARY_NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="racing-stripe py-3 pl-4 font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground/80"
                activeProps={{ className: "text-primary" }}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild block className="mt-4">
              <Link to="/book" onClick={() => setOpen(false)}>
                Book a service
              </Link>
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
}
