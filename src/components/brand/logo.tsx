import { Link } from "@tanstack/react-router";

import logoAsset from "@/assets/s4a-logo.png.asset.json";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  /** Visual height of the mark in px. */
  height?: number;
  withWordmark?: boolean;
}

export function Logo({ className, height = 44, withWordmark = true }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Solution For All Auto Care — home"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <img
        src={logoAsset.url}
        alt="Solution For All Auto Care logo"
        style={{ height }}
        className="w-auto rounded-sm"
        width={280}
        height={height}
      />
      {withWordmark ? (
        <span className="hidden font-display text-base leading-none font-bold uppercase sm:block">
          <span className="block tracking-widest">Solution For All</span>
          <span className="block text-primary tracking-[0.3em]">Auto Care</span>
        </span>
      ) : null}
    </Link>
  );
}
