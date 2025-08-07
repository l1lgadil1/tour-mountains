'use client'

import Image from 'next/image'
import { Tour } from '@/types/tour'
import { formatPrice, formatDuration } from '@/lib/utils'

interface AdminTourCardProps {
  tour: Tour
  onEdit: (tour: Tour) => void
  onDelete: (id: string) => void
}

export default function AdminTourCard({ tour, onEdit, onDelete }: AdminTourCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={tour.image_url}
          alt={tour.title_ru}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {tour.is_featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium">
            Рекомендуемый
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {tour.title_ru}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {tour.title_kz}
          </p>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {tour.description_ru}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Длительность:</span>
            <span className="font-medium">{formatDuration(tour.duration_days, 'ru')}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Цена:</span>
            <span className="font-medium text-mountain-blue">{formatPrice(tour.price_kzt)}₸</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Дата начала:</span>
            <span className="font-medium">
              {new Date(tour.start_date).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(tour)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Редактировать
          </button>
          <button
            onClick={() => onDelete(tour.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}