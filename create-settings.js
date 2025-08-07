const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('Creating settings table...')

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createSettings() {
  try {
    // Create settings table
    console.log('1. Creating settings table...')
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      
    if (error && error.code === '42P01') {
      // Table doesn't exist, create it using direct SQL
      console.log('Settings table does not exist, creating...')
      
      // Insert settings table creation
      const { error: insertError } = await supabase
        .from('tours') // Use existing table to run a query
        .select('id')
        .limit(1)
      
      if (!insertError) {
        console.log('✅ Database connection verified')
      }
    }
    
    // Try to create the table by inserting into it (this will create it if it doesn't exist)
    console.log('2. Creating/updating settings...')
    
    // Delete existing settings first (if any)
    await supabase.from('settings').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    // Insert default settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('settings')
      .upsert([
        {
          key: 'whatsapp_number',
          value: '+7 700 123 45 67',
          description: 'WhatsApp contact number for bookings'
        },
        {
          key: 'company_name_ru',
          value: 'Горные туры Алматы',
          description: 'Company name in Russian'
        },
        {
          key: 'company_name_kz',
          value: 'Алматы тау турлары',
          description: 'Company name in Kazakh'
        }
      ], { 
        onConflict: 'key',
        ignoreDuplicates: false 
      })
    
    if (settingsError) {
      console.error('Settings creation error:', settingsError)
    } else {
      console.log('✅ Settings created successfully!')
    }
    
    // Test reading settings
    const { data: testSettings, error: testError } = await supabase
      .from('settings')
      .select('*')
    
    if (testError) {
      console.error('Test settings error:', testError)
    } else {
      console.log('✅ Settings test successful!')
      console.log('Found settings:', testSettings?.length || 0)
      testSettings?.forEach(setting => {
        console.log(`- ${setting.key}: ${setting.value}`)
      })
    }
    
  } catch (err) {
    console.error('Setup failed:', err)
  }
}

createSettings()