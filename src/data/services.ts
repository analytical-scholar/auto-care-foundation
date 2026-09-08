/**
 * Service catalogue data source.
 *
 * Intentionally empty: no service list, pricing or duration has been confirmed
 * yet. Pages render from this array, so adding entries here (or swapping in a
 * backend fetch later) is the only change needed to publish the catalogue.
 */
import type { Service, ServiceCategory } from "@/types/domain";

export const SERVICES: readonly Service[] = [];

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  servicing: "Servicing",
  diagnostics: "Diagnostics",
  brakes: "Brakes & Suspension",
  tyres: "Tyres & Wheels",
  electrical: "Electrical",
  "air-conditioning": "Air Conditioning",
  bodywork: "Bodywork",
  inspection: "Inspections",
};

export function groupServicesByCategory(services: readonly Service[]) {
  const groups = new Map<ServiceCategory, Service[]>();
  for (const service of services) {
    const list = groups.get(service.category) ?? [];
    list.push(service);
    groups.set(service.category, list);
  }
  return [...groups.entries()];
}
