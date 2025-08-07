'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface SocialSettings {
  instagram_url: string
  whatsapp_number: string
  phone_number: string
}

interface SocialContextType {
  settings: SocialSettings
  refreshSettings: () => Promise<void>
  isLoading: boolean
}

const SocialContext = createContext<SocialContextType | undefined>(undefined)

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SocialSettings>({
    instagram_url: '',
    whatsapp_number: '+7 700 123 45 67',
    phone_number: '+7 700 123 45 67'
  })
  const [isLoading, setIsLoading] = useState(true)

  const refreshSettings = async () => {
    try {
      // Add timeout to prevent infinite loading
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
      
      const response = await fetch('/api/social-settings', {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const data = await response.json()
        setSettings({
          instagram_url: data.instagram_url || '',
          whatsapp_number: data.whatsapp_number || '+7 700 123 45 67',
          phone_number: data.phone_number || '+7 700 123 45 67'
        })
      }
    } catch (error) {
      console.error('Error fetching social settings:', error)
      // Keep default settings if fetch fails
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Set a maximum timeout to prevent infinite loading
    const maxLoadTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Social settings loading timeout - using defaults')
        setIsLoading(false)
      }
    }, 10000)

    refreshSettings()

    return () => clearTimeout(maxLoadTimeout)
  }, [])

  return (
    <SocialContext.Provider value={{ settings, refreshSettings, isLoading }}>
      {children}
    </SocialContext.Provider>
  )
}

export function useSocial() {
  const context = useContext(SocialContext)
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider')
  }
  return context
}