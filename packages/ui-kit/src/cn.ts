import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Joins class names and resolves Tailwind conflicts, so the last conflicting class wins.
export const cn = (...inputs: readonly ClassValue[]): string =>
  twMerge(clsx(inputs));
