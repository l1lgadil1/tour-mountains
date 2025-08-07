'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Tour } from '@/types/tour'
import { useLanguage } from '@/lib/language-context'
import { useSocial } from '@/lib/social-context'
import Header from '@/components/Header'
import TourGrid from '@/components/TourGrid'
import NextTourSection from '@/components/NextTourSection'

export default function HomePage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [nextTour, setNextTour] = useState<Tour | null>(null)
  const [isToursLoading, setIsToursLoading] = useState(true)
  const { locale, t } = useLanguage()
  const { settings, isLoading: isSocialLoading } = useSocial()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [toursResult, nextTourResult] = await Promise.all([
        supabase.from('tours').select('*').order('start_date', { ascending: true }),
        supabase.from('tours').select('*').gte('start_date', new Date().toISOString()).order('start_date', { ascending: true }).limit(1).single()
      ])

      if (toursResult.data && toursResult.data.length > 0) {
        setTours(toursResult.data)
        if (nextTourResult.data) setNextTour(nextTourResult.data)
      } else {

        
        setTours([])
        setNextTour(null)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setTours([])
      setNextTour(null)
    } finally {
      setIsToursLoading(false)
    }
  }

  if (isToursLoading || isSocialLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-pattern flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            {/* Modern Loading Animation */}
            <div className="relative mb-8">
              <div className="w-20 h-20 mx-auto relative">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin"></div>
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full border-4 border-purple-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                {/* Center dot */}
                <div className="absolute inset-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute -top-4 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-2 -right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-4 -right-2 w-3 h-3 bg-indigo-400 rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-2 -left-6 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1.5s' }}></div>
            </div>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Загружаем горные приключения...
            </h2>
            <p className="text-slate-600 text-lg">Готовим для вас лучшие маршруты</p>
            
            {/* Loading progress indicators */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      
      {/* Hero Section with Enhanced Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Mountain Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          ></div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-slate-900/80"></div>
        </div>
        
        {/* Simplified Background Elements for Mobile */}
        <div className="absolute top-20 left-4 w-32 h-32 md:w-72 md:h-72 md:left-10 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 w-40 h-40 md:w-96 md:h-96 md:right-10 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container-main relative z-10 px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Mobile-Optimized Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 slide-in-up leading-tight">
              <span className="text-white drop-shadow-2xl block">
                {t.title}
              </span>
            </h1>
            
            {/* Mobile-Optimized Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 sm:mb-10 md:mb-12 slide-in-up delay-200 drop-shadow-lg font-medium px-2 leading-relaxed">
              {t.subtitle}
            </p>
            
            {/* Mobile-Optimized CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center slide-in-up delay-300 px-2">
              <a
                href="#tours"
                className="w-full sm:w-auto btn-primary text-sm sm:text-base px-6 py-3 group min-h-[44px] flex items-center justify-center"
              >
                <span className="relative z-10">Смотреть туры</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-whatsapp text-sm sm:text-base px-6 py-3 min-h-[44px] flex items-center justify-center"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                </svg>
                <span className="truncate">Связаться в WhatsApp</span>
              </a>
            </div>
            
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
      
      <main className="flex-1 pt-0">
        {nextTour && (
          <section className="container-main py-8">
            <NextTourSection tour={nextTour} />
          </section>
        )}
        
        <section id="tours" className="container-main py-16">
          <div className="text-center mb-16 slide-in-up">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold">
                Наши туры
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Откройте красоту гор
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Профессионально организованные походы с опытными гидами в самые живописные места Казахстана
            </p>
          </div>
          
          <div className="slide-in-up delay-200">
            <TourGrid tours={tours} />
          </div>
        </section>
        
        <section className="relative py-16 overflow-hidden bg-white">
          <div className="container-main relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold">
                  О нас
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t.aboutUs}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.aboutText}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        <div className="container-main relative z-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 slide-in-up">
              <div className="mb-6">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  🏔️ {t.title}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {t.professionalTours}
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="text-sm">Алматы, Казахстан</span>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-1 slide-in-up delay-200">
              <h3 className="text-lg font-semibold mb-6 text-white">Связь с нами</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${settings.phone_number}`}
                  className="group flex items-center space-x-4 p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-300">Позвонить</div>
                    <div className="font-semibold text-white">{settings.phone_number}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-slate-300">WhatsApp</div>
                    <div className="font-semibold text-white">Написать сообщение</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social & Quick Links */}
            <div className="lg:col-span-1 slide-in-up delay-400">
              <h3 className="text-lg font-semibold mb-6 text-white">Следите за нами</h3>
              
              <div className="flex space-x-4 mb-8">
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transform hover:scale-110 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                
                <a
                  href="#tours"
                  className="group p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </a>
              </div>

              <div className="space-y-2 text-sm">
                <div className="text-slate-400">© 2024 Горные туры Алматы</div>
                <div className="text-slate-500">Все права защищены</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}