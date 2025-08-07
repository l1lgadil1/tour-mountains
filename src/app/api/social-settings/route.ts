import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('social_settings')
      .select('*')
      .single()

    if (error) {
      // If no settings exist, return defaults
      if (error.code === 'PGRST116') {
        return NextResponse.json({
          instagram_url: '',
          whatsapp_number: '+7 700 123 45 67',
          phone_number: '+7 700 123 45 67'
        })
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching social settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { instagram_url, whatsapp_number, phone_number } = body

    // Check if settings already exist
    const { data: existing } = await supabase
      .from('social_settings')
      .select('id')
      .single()

    if (existing) {
      // Update existing settings
      const { data, error } = await supabase
        .from('social_settings')
        .update({
          instagram_url,
          whatsapp_number,
          phone_number,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    } else {
      // Create new settings
      const { data, error } = await supabase
        .from('social_settings')
        .insert([{
          instagram_url,
          whatsapp_number,
          phone_number
        }])
        .select()
        .single()

      if (error) throw error
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error('Error updating social settings:', error)
    return NextResponse.json(
      { error: 'Failed to update social settings' },
      { status: 500 }
    )
  }
}