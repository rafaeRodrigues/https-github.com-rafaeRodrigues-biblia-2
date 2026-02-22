INSERT INTO public.bible_books (id, name, abbreviation, testament, chapters_count, sort_order)
VALUES
  (gen_random_uuid(), 'Gênesis', 'Gn', 'OT', 50, 1),
  (gen_random_uuid(), 'João', 'Jo', 'NT', 21, 43),
  (gen_random_uuid(), 'Filipenses', 'Fp', 'NT', 4, 50),
  (gen_random_uuid(), 'Salmos', 'Sl', 'OT', 150, 19),
  (gen_random_uuid(), 'Romanos', 'Rm', 'NT', 16, 45)
ON CONFLICT DO NOTHING;

DO $$
DECLARE
  gn_id UUID;
  jo_id UUID;
  fp_id UUID;
  sl_id UUID;
  rm_id UUID;
BEGIN
  SELECT id INTO gn_id FROM public.bible_books WHERE name = 'Gênesis' LIMIT 1;
  SELECT id INTO jo_id FROM public.bible_books WHERE name = 'João' LIMIT 1;
  SELECT id INTO fp_id FROM public.bible_books WHERE name = 'Filipenses' LIMIT 1;
  SELECT id INTO sl_id FROM public.bible_books WHERE name = 'Salmos' LIMIT 1;
  SELECT id INTO rm_id FROM public.bible_books WHERE name = 'Romanos' LIMIT 1;

  IF gn_id IS NOT NULL THEN
    INSERT INTO public.bible_verses (id, book_id, chapter, verse, text) VALUES
      (gen_random_uuid(), gn_id, 1, 1, 'No princípio criou Deus os céus e a terra.'),
      (gen_random_uuid(), jo_id, 3, 16, 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.'),
      (gen_random_uuid(), fp_id, 4, 13, 'Posso todas as coisas em Cristo que me fortalece.'),
      (gen_random_uuid(), sl_id, 23, 1, 'O Senhor é o meu pastor; de nada me faltará.'),
      (gen_random_uuid(), rm_id, 8, 28, 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

INSERT INTO public.banners (id, image_url, title, tag, sort_order, active) VALUES
  (gen_random_uuid(), 'https://img.usecurling.com/p/800/450?q=church', 'Culto de Celebração', 'Ao vivo', 1, true),
  (gen_random_uuid(), 'https://img.usecurling.com/p/800/450?q=worship', 'O Teu Amor é Melhor', 'Devocional', 2, true)
ON CONFLICT DO NOTHING;
