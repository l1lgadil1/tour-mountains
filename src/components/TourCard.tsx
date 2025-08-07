'use client'

import Image from 'next/image'
import { Tour } from '@/types/tour'
import { useLanguage } from '@/lib/language-context'
import { useSocial } from '@/lib/social-context'
import { formatPrice, formatDuration, generateWhatsAppUrl } from '@/lib/utils'

interface TourCardProps {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  const { locale, t } = useLanguage()
  const { settings } = useSocial()
  const title = locale === 'ru' ? tour.title_ru : tour.title_kz
  const description = locale === 'ru' ? tour.description_ru : tour.description_kz
  
  const bookingText = t.whatsappMessage(title)

  const handleWhatsAppClick = () => {
    const whatsappUrl = generateWhatsAppUrl(bookingText, settings.whatsapp_number)
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="tour-card">
      <div className="relative h-48 w-full">
        <Image
          src={tour.image_url}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {tour.is_featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium">
            {t.recommended}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            {formatDuration(tour.duration_days, locale)}
          </div>
          <div className="text-lg font-bold text-mountain-blue">
            {t.from} {formatPrice(tour.price_kzt)}{t.tenge}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mb-4">
          {new Date(tour.start_date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'kk-KZ', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        
        <button
          onClick={handleWhatsAppClick}
          className="btn-whatsapp w-full justify-center"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
          </svg>
          {t.bookWhatsApp}
        </button>
      </div>
    </div>
  )
}