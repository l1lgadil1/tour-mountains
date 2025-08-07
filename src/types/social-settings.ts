export interface SocialSettings {
  id: string
  instagram_url: string
  whatsapp_number: string
  phone_number: string
  created_at: string
  updated_at: string
}

export interface UpdateSocialSettingsData {
  instagram_url: string
  whatsapp_number: string
  phone_number: string
}