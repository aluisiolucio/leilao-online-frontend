import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

export function formatPrice(price: number) {
  const options = { style: 'currency', currency: 'BRL' };
  return new Intl.NumberFormat('pt-BR', options).format(price);
}