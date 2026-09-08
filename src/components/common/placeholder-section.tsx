import type { LucideIcon } from "lucide-react";
import { Construction } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/** Neutral empty/placeholder state used until real content is wired up. */
export function EmptyState({
  icon: Icon = Construction,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-card/60 px-6 py-14 text-center",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon aria-hidden className="size-5" />
      </span>
      <h3 className="text-xl uppercase">{title}</h3>
      {description ? (
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action}
    </div>
  );
}

export interface SkeletonBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

/** Loading placeholder respecting reduced-motion preferences. */
export function SkeletonBlock({ lines = 3, className, ...props }: SkeletonBlockProps) {
  return (
    <div className={cn("space-y-3", className)} aria-hidden {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-sheen h-4 rounded-sm bg-muted"
          style={{ width: `${100 - i * 12}%` }}
        />
      ))}
    </div>
  );
}

export interface PagePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly string[];
}

/** Phase 1 page scaffold: real layout, content intentionally deferred. */
export function PagePlaceholder({
  eyebrow,
  title,
  description,
  items,
}: PagePlaceholderProps) {
  return (
    <div className="animate-fade-up">
      <span className="text-eyebrow text-primary">{eyebrow}</span>
      <h1 className="mt-3 text-4xl uppercase sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item}
            className="racing-stripe rounded-lg border border-border bg-card p-5 pl-6"
          >
            <p className="font-display text-sm font-semibold uppercase tracking-wider">
              {item}
            </p>
            <SkeletonBlock lines={2} className="mt-4" />
          </li>
        ))}
      </ul>
    </div>
  );
}
