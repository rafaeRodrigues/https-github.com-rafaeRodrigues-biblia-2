INSERT INTO public.app_config (id, key, value) VALUES
  (gen_random_uuid(), 'social_links', '{"instagram": "https://www.instagram.com/_ibpalavra?igsh=cXZxaDNwajlhdWk4", "spotify": "https://open.spotify.com/search/Igreja%20Batista%20da%20Palavra", "maps": "https://maps.app.goo.gl/4tQWGHvNJ1a626KW8"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
