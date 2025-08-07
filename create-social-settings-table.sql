-- Create social_settings table for managing Instagram and WhatsApp data

CREATE TABLE IF NOT EXISTS social_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    instagram_url TEXT,
    whatsapp_number VARCHAR(20) NOT NULL DEFAULT '+7 700 123 45 67',
    phone_number VARCHAR(20) NOT NULL DEFAULT '+7 700 123 45 67',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO social_settings (instagram_url, whatsapp_number, phone_number) 
VALUES ('', '+7 700 123 45 67', '+7 700 123 45 67')
ON CONFLICT (id) DO NOTHING;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_social_settings_updated_at 
    BEFORE UPDATE ON social_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();