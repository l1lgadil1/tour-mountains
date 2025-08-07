'use client'

import { useState } from 'react'
import { Tour, CreateTourData } from '@/types/tour'
import ImageUpload from './ImageUpload'

interface TourFormProps {
  tour?: Tour | null
  onSubmit: (data: CreateTourData) => void
  onCancel: () => void
}

export default function TourForm({ tour, onSubmit, onCancel }: TourFormProps) {
  const [formData, setFormData] = useState<CreateTourData>({
    title_ru: tour?.title_ru || '',
    title_kz: tour?.title_kz || '',
    description_ru: tour?.description_ru || '',
    description_kz: tour?.description_kz || '',
    image_url: tour?.image_url || '',
    start_date: tour?.start_date ? new Date(tour.start_date).toISOString().slice(0, 16) : '',
    end_date: tour?.end_date ? new Date(tour.end_date).toISOString().slice(0, 16) : '',
    duration_days: tour?.duration_days || 1,
    price_kzt: tour?.price_kzt || 0,
    is_featured: tour?.is_featured || false,
  })
  const [showUrlInput, setShowUrlInput] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Convert datetime-local format to ISO string
    const submitData = {
      ...formData,
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
    }
    
    onSubmit(submitData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : 
               type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               value
    }))
  }

  const handleImageChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      image_url: url
    }))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {tour ? 'Редактировать тур' : 'Создать новый тур'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title_ru" className="block text-sm font-medium text-gray-700 mb-1">
              Название (RU) *
            </label>
            <input
              type="text"
              id="title_ru"
              name="title_ru"
              value={formData.title_ru}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
            />
          </div>
          
          <div>
            <label htmlFor="title_kz" className="block text-sm font-medium text-gray-700 mb-1">
              Название (KZ) *
            </label>
            <input
              type="text"
              id="title_kz"
              name="title_kz"
              value={formData.title_kz}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="description_ru" className="block text-sm font-medium text-gray-700 mb-1">
            Описание (RU) *
          </label>
          <textarea
            id="description_ru"
            name="description_ru"
            value={formData.description_ru}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
          />
        </div>
        
        <div>
          <label htmlFor="description_kz" className="block text-sm font-medium text-gray-700 mb-1">
            Описание (KZ) *
          </label>
          <textarea
            id="description_kz"
            name="description_kz"
            value={formData.description_kz}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
          />
        </div>
        
        <ImageUpload
          currentImageUrl={formData.image_url}
          onImageChange={handleImageChange}
          tourId={tour?.id}
        />
        
        {/* Alternative URL input */}
        <div className="border-t pt-4">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.1m0 0l4-4a4 4 0 105.656-5.656l-4 4-1.1 1.1m-2.828 2.828L12 12m0 0l-2.828-2.828" />
            </svg>
            {showUrlInput ? 'Скрыть ввод URL' : 'Или введите URL изображения'}
          </button>
          
          {showUrlInput && (
            <div className="mt-3">
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-1">
                URL изображения
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
              />
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
              Дата начала *
            </label>
            <input
              type="datetime-local"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
            />
          </div>
          
          <div>
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
              Дата окончания *
            </label>
            <input
              type="datetime-local"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
            />
          </div>
          
          <div>
            <label htmlFor="duration_days" className="block text-sm font-medium text-gray-700 mb-1">
              Длительность (дни) *
            </label>
            <input
              type="number"
              id="duration_days"
              name="duration_days"
              value={formData.duration_days}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price_kzt" className="block text-sm font-medium text-gray-700 mb-1">
              Цена (₸) *
            </label>
            <input
              type="number"
              id="price_kzt"
              name="price_kzt"
              value={formData.price_kzt}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mountain-blue"
            />
          </div>
          
          <div className="flex items-center pt-6">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleChange}
              className="h-4 w-4 text-mountain-blue focus:ring-mountain-blue border-gray-300 rounded"
            />
            <label htmlFor="is_featured" className="ml-2 text-sm font-medium text-gray-700">
              Рекомендуемый тур
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="btn-primary px-6"
          >
            {tour ? 'Обновить' : 'Создать'}
          </button>
        </div>
      </form>
    </div>
  )
}