export interface Tour {
  id: string
  title_ru: string
  title_kz: string
  description_ru: string
  description_kz: string
  image_url: string
  start_date: string
  end_date: string
  duration_days: number
  price_kzt: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface CreateTourData {
  title_ru: string
  title_kz: string
  description_ru: string
  description_kz: string
  image_url: string
  start_date: string
  end_date: string
  duration_days: number
  price_kzt: number
  is_featured?: boolean
}

export interface UpdateTourData extends Partial<CreateTourData> {
  id: string
}