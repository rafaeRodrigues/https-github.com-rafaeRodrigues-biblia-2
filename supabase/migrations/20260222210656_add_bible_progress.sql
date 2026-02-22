CREATE TABLE IF NOT EXISTS public.user_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  verse_id UUID NOT NULL REFERENCES public.bible_verses(id) ON DELETE CASCADE,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, verse_id)
);

ALTER TABLE public.user_highlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own highlights"
  ON public.user_highlights
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.user_reading_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  book_id UUID NOT NULL REFERENCES public.bible_books(id) ON DELETE CASCADE,
  chapter INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_reading_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own reading progress"
  ON public.user_reading_progress
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Seed progress for test user
DO $$
DECLARE
  gn_id UUID;
  verse_id UUID;
BEGIN
  SELECT id INTO gn_id FROM public.bible_books WHERE name = 'Gênesis' LIMIT 1;
  SELECT id INTO verse_id FROM public.bible_verses WHERE book_id = gn_id AND chapter = 1 AND verse = 1 LIMIT 1;

  IF gn_id IS NOT NULL THEN
    INSERT INTO public.user_reading_progress (user_id, book_id, chapter)
    VALUES ('00000000-0000-0000-0000-000000000001', gn_id, 1)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  IF verse_id IS NOT NULL THEN
    INSERT INTO public.user_highlights (user_id, verse_id, color)
    VALUES ('00000000-0000-0000-0000-000000000001', verse_id, 'yellow')
    ON CONFLICT (user_id, verse_id) DO NOTHING;
  END IF;
END $$;
