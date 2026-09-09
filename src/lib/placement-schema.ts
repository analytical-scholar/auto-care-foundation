import { z } from "zod";

import type { TrainingType } from "@/types/placement";

export const TRAINING_TYPES: readonly TrainingType[] = [
  "IT",
  "SIWES",
  "Industrial Training",
];

export const TRAINING_TYPE_LABELS: Record<TrainingType, string> = {
  IT: "IT (Industrial Training attachment)",
  SIWES: "SIWES",
  "Industrial Training": "Industrial Training",
};

export const REFERRAL_SOURCES = [
  "School / ITF coordinator",
  "Friend or family",
  "Search engine",
  "Social media",
  "Walked past the workshop",
  "Other",
] as const;

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const fileField = (label: string) =>
  z
    .instanceof(File)
    .refine((f) => f.size > 0, { message: `${label} appears to be empty.` })
    .refine((f) => f.size <= MAX_UPLOAD_BYTES, {
      message: `${label} must be 5 MB or smaller.`,
    })
    .refine((f) => ACCEPTED_TYPES.includes(f.type) || f.name.endsWith(".pdf"), {
      message: `${label} must be a PDF, Word document or image.`,
    });

export const placementApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Enter your full name." })
    .max(120, { message: "Full name must be under 120 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address." })
    .max(255),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Enter a phone number we can reach you on." })
    .max(30)
    .regex(/^[\d+()\-\s]+$/, { message: "Use digits, spaces, +, - or brackets only." }),
  institution: z
    .string()
    .trim()
    .min(2, { message: "Enter your school or institution." })
    .max(160),
  courseOrDepartment: z
    .string()
    .trim()
    .min(2, { message: "Enter your course or department." })
    .max(160),
  currentLevel: z
    .string()
    .trim()
    .min(1, { message: "Enter your current level or year." })
    .max(60),
  studentIdNumber: z
    .string()
    .trim()
    .min(2, { message: "Enter your student ID or matric number." })
    .max(60),
  trainingType: z.enum(["IT", "SIWES", "Industrial Training"], {
    errorMap: () => ({ message: "Select the type of training." }),
  }),
  preferredStartDate: z
    .string()
    .min(1, { message: "Choose a preferred start date." })
    .refine((v) => !Number.isNaN(Date.parse(v)), { message: "Choose a valid date." }),
  expectedDuration: z
    .string()
    .trim()
    .min(1, { message: "Tell us how long your placement should run." })
    .max(80),
  areaOfInterest: z
    .string()
    .trim()
    .min(2, { message: "Tell us the area you would like to learn." })
    .max(160),
  relevantSkills: z.string().trim().max(600).optional().or(z.literal("")),
  motivation: z
    .string()
    .trim()
    .min(20, { message: "Please write at least 20 characters." })
    .max(1500, { message: "Keep your message under 1500 characters." }),
  referralSource: z.string().trim().max(120).optional().or(z.literal("")),
  cv: fileField("Your CV"),
  additionalDocument: fileField("The additional document").optional(),
});

export type PlacementFormValues = z.input<typeof placementApplicationSchema>;
