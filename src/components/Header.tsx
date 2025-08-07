'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useSocial } from '@/lib/social-context'

export default function Header() {
  const { locale, setLocale, t } = useLanguage()
  const { settings } = useSocial()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20' 
        : 'bg-white/60 backdrop-blur-sm shadow-sm border-b border-white/10'
    }`}>
      <div className="container-main">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4 slide-in-up">
            <div className="relative group">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🏔️ {locale === 'ru' ? 'Горные туры' : 'Тау турлары'}
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
            </div>
            <div className="hidden sm:block">
              <div className="px-3 py-1 bg-gradient-to-r from-slate-100 to-blue-50 rounded-full">
                <span className="text-sm font-medium text-slate-700">Алматы</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 slide-in-up delay-200">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-sm border border-white/20">
              <button
                onClick={() => setLocale('ru')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  locale === 'ru' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLocale('kz')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  locale === 'kz' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transform scale-105' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                ҚЗ
              </button>
            </div>
            
            {/* Phone Number */}
            <a
              href={`tel:${settings.phone_number}`}
              className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
            >
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">
                {settings.phone_number}
              </span>
            </a>

 
          </div>
        </div>
      </div>
      
      {/* Floating Action Button for WhatsApp */}
      {/* <div className="fixed bottom-6 right-6 z-50 slide-in-up delay-500">
        <a
          href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 float-animation group"
        >
          <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
          </svg>
        </a>
      </div> */}
    </header>
  )
}