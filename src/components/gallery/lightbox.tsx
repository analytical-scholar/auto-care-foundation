import { ChevronLeft, ChevronRight, X } from "lucide-react";
import * as React from "react";

import type { GalleryImage } from "@/data/gallery";

export interface LightboxProps {
  images: readonly GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Accessible modal image viewer: focus trapped, Esc/arrow keys, mobile friendly. */
export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const open = index !== null;

  React.useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open || index === null) return null;
  const current = images[index];
  if (!current) return null;

  const go = (delta: number) => {
    onIndexChange((index + delta + images.length) % images.length);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
    } else if (event.key === "ArrowRight") {
      go(1);
    } else if (event.key === "ArrowLeft") {
      go(-1);
    } else if (event.key === "Tab") {
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${current.caption}`}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-100 flex flex-col bg-background/95 p-4 backdrop-blur-sm animate-fade-in sm:p-8"
    >
      <button
        aria-label="Close image viewer"
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
        onClick={onClose}
      />

      <div className="relative flex items-center justify-end">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous image"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>

        <figure className="flex min-w-0 flex-col items-center gap-3">
          <img
            src={current.src}
            alt={current.alt}
            width={1280}
            height={854}
            className="max-h-[70vh] w-auto max-w-full rounded-lg border border-border object-contain shadow-elevated"
          />
          <figcaption className="text-center text-sm text-muted-foreground">
            {current.caption}
            <span className="ml-2 opacity-70">
              ({index + 1}/{images.length})
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next image"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary"
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
}
