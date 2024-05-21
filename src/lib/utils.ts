import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStoreLocal = (name: string) => {
  if (typeof localStorage !== 'undefined') {
    const ls = localStorage.getItem(name)
    return ls ? JSON.parse(ls): null
  }
  return null
}