import { supabase } from './supabase'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadTourImage(file: File, tourId?: string): Promise<UploadResult> {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Неподдерживаемый формат файла. Используйте JPG, PNG или WebP.'
      }
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'Размер файла не должен превышать 5MB.'
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = file.name.split('.').pop()
    const fileName = tourId 
      ? `${tourId}/${timestamp}-${randomString}.${fileExtension}`
      : `temp/${timestamp}-${randomString}.${fileExtension}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('tour-images')
      .upload(fileName, file)

    if (error) {
      console.error('Upload error:', error)
      return {
        success: false,
        error: 'Ошибка при загрузке файла.'
      }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('tour-images')
      .getPublicUrl(data.path)

    return {
      success: true,
      url: publicUrl
    }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      success: false,
      error: 'Произошла неожиданная ошибка при загрузке.'
    }
  }
}

export async function deleteTourImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract path from URL
    const urlParts = imageUrl.split('/tour-images/')
    if (urlParts.length < 2) {
      return false
    }
    
    const filePath = urlParts[1]
    
    const { error } = await supabase.storage
      .from('tour-images')
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

export function compressImage(file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Compression failed'))
          }
        },
        file.type,
        quality
      )
    }

    img.onerror = () => reject(new Error('Image loading failed'))
    img.src = URL.createObjectURL(file)
  })
}