// src/utils/helpers.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combines multiple class names and ensures Tailwind classes merge properly
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Additional helper functions can be added here