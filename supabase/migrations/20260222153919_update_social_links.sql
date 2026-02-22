INSERT INTO public.app_config (id, key, value) VALUES
  (gen_random_uuid(), 'spotify_url', '{"url": "https://open.spotify.com/show/1L8GDMrH3ZEw3ECrjC0QZQ"}'::jsonb),
  (gen_random_uuid(), 'instagram_url', '{"url": "https://www.instagram.com/_ibpalavra?igsh=cXZxaDNwajlhdWk4"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
