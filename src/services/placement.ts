/**
 * Service abstraction placeholder for IT / SIWES placement applications.
 *
 * There is no database, endpoint, email, SMS or file storage behind this yet.
 * `submit` simulates a round-trip so the UI can exercise loading, error and
 * success states; swapping in a real server function later requires no
 * component changes.
 */
import type {
  PlacementApplicationInput,
  PlacementSubmissionResult,
} from "@/types/placement";

export const placementQueryKeys = {
  applications: () => ["placement", "applications"] as const,
  application: (reference: string) => ["placement", "application", reference] as const,
} as const;

export function toDocumentMeta(file: File | undefined) {
  if (!file) return undefined;
  return { fileName: file.name, sizeBytes: file.size, mimeType: file.type };
}

function makeReference() {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `S4A-${new Date().getFullYear()}-${random}`;
}

export const placementApi = {
  /** Mock submit: validates nothing further, stores nothing, sends nothing. */
  async submit(input: PlacementApplicationInput): Promise<PlacementSubmissionResult> {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (!input.email) {
      throw new Error("Missing email address.");
    }
    return {
      reference: makeReference(),
      status: "submitted",
      submittedAt: new Date().toISOString(),
    };
  },
  /** Reserved for a future status lookup; intentionally unimplemented. */
  async getStatus(_reference: string): Promise<PlacementSubmissionResult | null> {
    throw new Error("placementApi.getStatus is not implemented yet.");
  },
};
