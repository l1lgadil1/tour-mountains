'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { uploadTourImage, compressImage, UploadResult } from '@/lib/image-upload'

interface ImageUploadProps {
  currentImageUrl?: string
  onImageChange: (url: string) => void
  tourId?: string
  className?: string
}

export default function ImageUpload({ 
  currentImageUrl, 
  onImageChange, 
  tourId,
  className = '' 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    try {
      // Create preview
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)

      // Compress image
      const compressedFile = await compressImage(file)
      
      // Upload to Supabase
      const result: UploadResult = await uploadTourImage(compressedFile, tourId)
      
      if (result.success && result.url) {
        onImageChange(result.url)
        setPreviewUrl(null)
      } else {
        setUploadError(result.error || 'Ошибка загрузки')
        setPreviewUrl(null)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Произошла ошибка при загрузке изображения')
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = () => {
    onImageChange('')
    setPreviewUrl(null)
    setUploadError(null)
  }

  const displayUrl = previewUrl || currentImageUrl
  const showImage = displayUrl && !isUploading

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        Изображение тура
      </label>
      
      {/* Image Preview */}
      {showImage && (
        <div className="relative rounded-lg overflow-hidden border border-gray-300 bg-gray-50">
          <div className="relative h-48 w-full">
            <Image
              src={displayUrl}
              alt="Tour preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
              title="Изменить изображение"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
              title="Удалить изображение"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      {!showImage && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-600">Загрузка изображения...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-3 3m3-3l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Выберите изображение
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WebP до 5MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{uploadError}</p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}