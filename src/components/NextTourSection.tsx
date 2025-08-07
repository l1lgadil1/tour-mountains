'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Tour } from '@/types/tour'
import { useLanguage } from '@/lib/language-context'
import { useSocial } from '@/lib/social-context'
import { getTimeUntil, formatPrice, generateWhatsAppUrl } from '@/lib/utils'

interface NextTourSectionProps {
  tour: Tour
}

export default function NextTourSection({ tour }: NextTourSectionProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntil(tour.start_date))
  const { locale, t } = useLanguage()
  const { settings } = useSocial()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntil(tour.start_date))
    }, 1000)

    return () => clearInterval(timer)
  }, [tour.start_date])

  const title = locale === 'ru' ? tour.title_ru : tour.title_kz
  const description = locale === 'ru' ? tour.description_ru : tour.description_kz
  
  const bookingText = t.whatsappMessage(title)

  const handleWhatsAppClick = () => {
    const whatsappUrl = generateWhatsAppUrl(bookingText, settings.whatsapp_number)
    window.open(whatsappUrl, '_blank')
  }

  if (timeLeft.total <= 0) {
    return null
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-500 group">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 delay-200"></div>
      
      <div className="flex flex-col lg:flex-row relative z-10">
        <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
          <Image
            src={tour.image_url}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
          
          {/* Floating badge */}
          <div className="absolute top-4 left-4 pulse-soft">
            <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="text-sm font-semibold text-white">🔥 {t.nextTour}</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 p-6 lg:p-8 relative">
          <div className="mb-6 slide-in-up">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {title}
            </h3>
            <p className="text-blue-100 text-lg leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
          
          {/* Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20 slide-in-up delay-200">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{timeLeft.days}</div>
                <div className="text-sm text-blue-200 font-medium">
                  {t.days}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{timeLeft.hours}</div>
                <div className="text-sm text-blue-200 font-medium">
                  {t.hours}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{timeLeft.minutes}</div>
                <div className="text-sm text-blue-200 font-medium">
                  {t.minutes}
                </div>
              </div>
              <div className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">{timeLeft.seconds}</div>
                <div className="text-sm text-blue-200 font-medium">
                  {t.seconds}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tour Details */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 slide-in-up delay-300">
            <div className="flex items-center space-x-3 text-blue-100">
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 7v-3M6 20l12-12" />
                </svg>
              </div>
              <span className="text-lg font-medium">
                {new Date(tour.start_date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'kk-KZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-blue-200 text-lg">{t.from}</span>
              <div className="text-3xl font-bold text-white">
                {formatPrice(tour.price_kzt)}<span className="text-xl">{t.tenge}</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="slide-in-up delay-400">
            <button
              onClick={handleWhatsAppClick}
              className="btn-whatsapp w-full lg:w-auto text-lg group"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
              </svg>
              <span className="relative z-10">{t.bookNow}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}