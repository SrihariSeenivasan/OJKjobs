import type { Plan } from '../pages/admin/AdminSubscriptionPlan';
export type { Plan };
export const PLAN_STORAGE_KEY = 'ojk-admin-plans';

export function savePlans(plans: Plan[]): void {
  localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(plans));
}

export function loadPlans(): Plan[] {
  const raw = localStorage.getItem(PLAN_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Plan[];
  } catch {
    return [];
  }
}
