import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU').format(price)
}

export function formatDuration(days: number, locale: 'ru' | 'kz'): string {
  if (locale === 'ru') {
    if (days === 1) return '1 день'
    if (days >= 2 && days <= 4) return `${days} дня`
    return `${days} дней`
  } else {
    return `${days} күн`
  }
}

export function generateWhatsAppUrl(message: string, phoneNumber: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`
}

export function getTimeUntil(targetDate: string): {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
} {
  const now = new Date().getTime()
  const target = new Date(targetDate).getTime()
  const total = target - now

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((total % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, total }
}