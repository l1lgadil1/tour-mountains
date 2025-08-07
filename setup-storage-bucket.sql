-- Create storage bucket for tour images
INSERT INTO storage.buckets (id, name, public) VALUES ('tour-images', 'tour-images', true);

-- Set up RLS policies for the tour-images bucket
CREATE POLICY "Allow public read access on tour images" ON storage.objects 
FOR SELECT USING (bucket_id = 'tour-images');

CREATE POLICY "Allow authenticated upload of tour images" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'tour-images');

CREATE POLICY "Allow authenticated update of tour images" ON storage.objects 
FOR UPDATE USING (bucket_id = 'tour-images');

CREATE POLICY "Allow authenticated delete of tour images" ON storage.objects 
FOR DELETE USING (bucket_id = 'tour-images');