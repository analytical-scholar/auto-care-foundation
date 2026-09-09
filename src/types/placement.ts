/**
 * Backend-ready types for IT / SIWES student placement applications.
 * Frontend-only for now: nothing is persisted, sent or stored.
 */
import type { ID, ISODateString } from "@/types/domain";

export type TrainingType = "IT" | "SIWES" | "Industrial Training";

export type PlacementApplicationStatus =
  | "submitted"
  | "under-review"
  | "shortlisted"
  | "closed";

export interface PlacementDocumentMeta {
  /** Original file name as chosen by the student. */
  fileName: string;
  /** Size in bytes, used for client-side validation only. */
  sizeBytes: number;
  mimeType: string;
}

export interface PlacementApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  courseOrDepartment: string;
  currentLevel: string;
  studentIdNumber: string;
  trainingType: TrainingType;
  preferredStartDate: ISODateString;
  expectedDuration: string;
  areaOfInterest: string;
  relevantSkills?: string | undefined;
  motivation: string;
  referralSource?: string | undefined;
  cv?: PlacementDocumentMeta | undefined;
  additionalDocument?: PlacementDocumentMeta | undefined;
}

export interface PlacementApplication extends PlacementApplicationInput {
  id: ID;
  /** Human-readable reference shown to the student once storage exists. */
  reference: string;
  status: PlacementApplicationStatus;
  submittedAt: ISODateString;
}

export interface PlacementSubmissionResult {
  reference: string;
  status: PlacementApplicationStatus;
  submittedAt: ISODateString;
}
