'use client'

import { useState, useEffect } from 'react'
import { UpdateSocialSettingsData } from '@/types/social-settings'

interface SocialSettingsFormProps {
  onSave: (data: UpdateSocialSettingsData) => Promise<void>
}

export default function SocialSettingsForm({ onSave }: SocialSettingsFormProps) {
  const [formData, setFormData] = useState<UpdateSocialSettingsData>({
    instagram_url: '',
    whatsapp_number: '',
    phone_number: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchCurrentSettings()
  }, [])

  const fetchCurrentSettings = async () => {
    try {
      const response = await fetch('/api/social-settings')
      if (response.ok) {
        const data = await response.json()
        setFormData({
          instagram_url: data.instagram_url || '',
          whatsapp_number: data.whatsapp_number || '',
          phone_number: data.phone_number || ''
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      await onSave(formData)
      setMessage({ type: 'success', text: 'Настройки успешно сохранены!' })
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'Ошибка при сохранении настроек' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (field: keyof UpdateSocialSettingsData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Настройки социальных сетей
      </h2>

      {message && (
        <div className={`mb-4 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="instagram_url" className="block text-sm font-medium text-gray-700 mb-2">
            Instagram URL
          </label>
          <input
            type="url"
            id="instagram_url"
            value={formData.instagram_url}
            onChange={(e) => handleChange('instagram_url', e.target.value)}
            placeholder="https://instagram.com/yourusername"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-mountain-blue focus:border-mountain-blue"
          />
          <p className="text-xs text-gray-500 mt-1">
            Полная ссылка на ваш Instagram профиль
          </p>
        </div>

        <div>
          <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp номер
          </label>
          <input
            type="tel"
            id="whatsapp_number"
            value={formData.whatsapp_number}
            onChange={(e) => handleChange('whatsapp_number', e.target.value)}
            placeholder="+7 700 123 45 67"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-mountain-blue focus:border-mountain-blue"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Номер телефона для WhatsApp с международным кодом
          </p>
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-2">
            Основной номер телефона
          </label>
          <input
            type="tel"
            id="phone_number"
            value={formData.phone_number}
            onChange={(e) => handleChange('phone_number', e.target.value)}
            placeholder="+7 700 123 45 67"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-mountain-blue focus:border-mountain-blue"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Основной номер телефона для отображения на сайте
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить настройки'}
          </button>
        </div>
      </form>
    </div>
  )
}