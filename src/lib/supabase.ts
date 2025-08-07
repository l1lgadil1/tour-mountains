import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      tours: {
        Row: {
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
        Insert: {
          id?: string
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
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title_ru?: string
          title_kz?: string
          description_ru?: string
          description_kz?: string
          image_url?: string
          start_date?: string
          end_date?: string
          duration_days?: number
          price_kzt?: number
          is_featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}