import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPageTitle(pathname: string) {
  const parts = pathname.split('/').filter(Boolean).slice(-1);

  const title =
    parts.length === 0
      ? 'Dashboard'
      : parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));

  return title;
}
