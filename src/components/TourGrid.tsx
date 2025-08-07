'use client'

import { Tour } from '@/types/tour'
import { useLanguage } from '@/lib/language-context'
import TourCard from './TourCard'

interface TourGridProps {
  tours: Tour[]
}

export default function TourGrid({ tours }: TourGridProps) {
  const { locale } = useLanguage()

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          {locale === 'ru' ? 'Туры не найдены' : 'Турлар табылмады'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}