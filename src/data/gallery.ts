/**
 * Temporary illustrative automotive visuals.
 * These are stock-style placeholder images, NOT photographs of customer work.
 * Replace with real workshop photography when available.
 */
import brakes from "@/assets/gallery-brakes.jpg";
import diagnostics from "@/assets/gallery-diagnostics.jpg";
import tyres from "@/assets/gallery-tyres.jpg";
import workshop from "@/assets/gallery-workshop.jpg";

export interface GalleryImage {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

export const GALLERY_IMAGES: readonly GalleryImage[] = [
  {
    id: "workshop",
    src: workshop,
    alt: "Illustrative photo of a car raised on a two-post lift inside a tidy repair workshop",
    caption: "Workshop bay — illustrative image",
  },
  {
    id: "diagnostics",
    src: diagnostics,
    alt: "Illustrative close-up of a handheld diagnostic scanner being used over an engine bay",
    caption: "Diagnostics — illustrative image",
  },
  {
    id: "brakes",
    src: brakes,
    alt: "Illustrative photo of a brake disc and hub with the wheel removed during service",
    caption: "Brake service — illustrative image",
  },
  {
    id: "tyres",
    src: tyres,
    alt: "Illustrative photo of stacked tyres beside wheel service equipment in a service bay",
    caption: "Tyres & wheels — illustrative image",
  },
];
