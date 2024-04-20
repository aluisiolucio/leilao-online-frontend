import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 3);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

export function formatPrice(price: number) {
  const options = { style: 'currency', currency: 'BRL' };
  return new Intl.NumberFormat('pt-BR', options).format(price);
}

export function formatIsoDate(datetime: string): string {
  const data = new Date(datetime);
  data.setHours(data.getHours() + 3);

  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();
  const horas = data.getHours().toString().padStart(2, '0');
  const minutos = data.getMinutes().toString().padStart(2, '0');

  return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}