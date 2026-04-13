-- Add DELETE policy for message-media bucket
CREATE POLICY "Users can delete own media files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'message-media'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- Add UPDATE policy for message-media bucket
CREATE POLICY "Users can update own media files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'message-media'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);