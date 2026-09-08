import * as React from "react";

import { Container, type ContainerProps } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "default" | "surface" | "carbon";
  size?: ContainerProps["size"];
  padding?: "sm" | "md" | "lg";
}

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "bg-background",
  surface: "bg-surface text-surface-foreground",
  carbon: "bg-gradient-carbon",
};

const paddings: Record<NonNullable<SectionProps["padding"]>, string> = {
  sm: "py-10",
  md: "py-16 sm:py-20",
  lg: "py-20 sm:py-28",
};

export function Section({
  className,
  children,
  tone = "default",
  size = "lg",
  padding = "md",
  ...props
}: SectionProps) {
  return (
    <section className={cn(tones[tone], paddings[padding], className)} {...props}>
      <Container size={size}>{children}</Container>
    </section>
  );
}

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <span className="text-eyebrow text-primary">{eyebrow}</span> : null}
      <Heading className="text-3xl uppercase sm:text-4xl">{title}</Heading>
      {description ? (
        <p className="max-w-2xl text-base text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
