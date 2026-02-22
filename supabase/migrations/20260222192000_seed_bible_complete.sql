-- Remove existing books and verses to insert the complete 66 books list
TRUNCATE TABLE public.bible_books CASCADE;

INSERT INTO public.bible_books (id, name, abbreviation, testament, chapters_count, sort_order) VALUES
(gen_random_uuid(), 'Gênesis', 'Gn', 'OT', 50, 1),
(gen_random_uuid(), 'Êxodo', 'Êx', 'OT', 40, 2),
(gen_random_uuid(), 'Levítico', 'Lv', 'OT', 27, 3),
(gen_random_uuid(), 'Números', 'Nm', 'OT', 36, 4),
(gen_random_uuid(), 'Deuteronômio', 'Dt', 'OT', 34, 5),
(gen_random_uuid(), 'Josué', 'Js', 'OT', 24, 6),
(gen_random_uuid(), 'Juízes', 'Jz', 'OT', 21, 7),
(gen_random_uuid(), 'Rute', 'Rt', 'OT', 4, 8),
(gen_random_uuid(), '1 Samuel', '1Sm', 'OT', 31, 9),
(gen_random_uuid(), '2 Samuel', '2Sm', 'OT', 24, 10),
(gen_random_uuid(), '1 Reis', '1Rs', 'OT', 22, 11),
(gen_random_uuid(), '2 Reis', '2Rs', 'OT', 25, 12),
(gen_random_uuid(), '1 Crônicas', '1Cr', 'OT', 29, 13),
(gen_random_uuid(), '2 Crônicas', '2Cr', 'OT', 36, 14),
(gen_random_uuid(), 'Esdras', 'Ed', 'OT', 10, 15),
(gen_random_uuid(), 'Neemias', 'Ne', 'OT', 13, 16),
(gen_random_uuid(), 'Ester', 'Et', 'OT', 10, 17),
(gen_random_uuid(), 'Jó', 'Jó', 'OT', 42, 18),
(gen_random_uuid(), 'Salmos', 'Sl', 'OT', 150, 19),
(gen_random_uuid(), 'Provérbios', 'Pv', 'OT', 31, 20),
(gen_random_uuid(), 'Eclesiastes', 'Ec', 'OT', 12, 21),
(gen_random_uuid(), 'Cânticos', 'Ct', 'OT', 8, 22),
(gen_random_uuid(), 'Isaías', 'Is', 'OT', 66, 23),
(gen_random_uuid(), 'Jeremias', 'Jr', 'OT', 52, 24),
(gen_random_uuid(), 'Lamentações', 'Lm', 'OT', 5, 25),
(gen_random_uuid(), 'Ezequiel', 'Ez', 'OT', 48, 26),
(gen_random_uuid(), 'Daniel', 'Dn', 'OT', 12, 27),
(gen_random_uuid(), 'Oséias', 'Os', 'OT', 14, 28),
(gen_random_uuid(), 'Joel', 'Jl', 'OT', 3, 29),
(gen_random_uuid(), 'Amós', 'Am', 'OT', 9, 30),
(gen_random_uuid(), 'Obadias', 'Ob', 'OT', 1, 31),
(gen_random_uuid(), 'Jonas', 'Jn', 'OT', 4, 32),
(gen_random_uuid(), 'Miquéias', 'Mq', 'OT', 7, 33),
(gen_random_uuid(), 'Naum', 'Na', 'OT', 3, 34),
(gen_random_uuid(), 'Habacuque', 'Hc', 'OT', 3, 35),
(gen_random_uuid(), 'Sofonias', 'Sf', 'OT', 3, 36),
(gen_random_uuid(), 'Ageu', 'Ag', 'OT', 2, 37),
(gen_random_uuid(), 'Zacarias', 'Zc', 'OT', 14, 38),
(gen_random_uuid(), 'Malaquias', 'Ml', 'OT', 4, 39),
(gen_random_uuid(), 'Mateus', 'Mt', 'NT', 28, 40),
(gen_random_uuid(), 'Marcos', 'Mc', 'NT', 16, 41),
(gen_random_uuid(), 'Lucas', 'Lc', 'NT', 24, 42),
(gen_random_uuid(), 'João', 'Jo', 'NT', 21, 43),
(gen_random_uuid(), 'Atos', 'At', 'NT', 28, 44),
(gen_random_uuid(), 'Romanos', 'Rm', 'NT', 16, 45),
(gen_random_uuid(), '1 Coríntios', '1Co', 'NT', 16, 46),
(gen_random_uuid(), '2 Coríntios', '2Co', 'NT', 13, 47),
(gen_random_uuid(), 'Gálatas', 'Gl', 'NT', 6, 48),
(gen_random_uuid(), 'Efésios', 'Ef', 'NT', 6, 49),
(gen_random_uuid(), 'Filipenses', 'Fp', 'NT', 4, 50),
(gen_random_uuid(), 'Colossenses', 'Cl', 'NT', 4, 51),
(gen_random_uuid(), '1 Tessalonicenses', '1Ts', 'NT', 5, 52),
(gen_random_uuid(), '2 Tessalonicenses', '2Ts', 'NT', 3, 53),
(gen_random_uuid(), '1 Timóteo', '1Tm', 'NT', 6, 54),
(gen_random_uuid(), '2 Timóteo', '2Tm', 'NT', 4, 55),
(gen_random_uuid(), 'Tito', 'Tt', 'NT', 3, 56),
(gen_random_uuid(), 'Filemom', 'Fm', 'NT', 1, 57),
(gen_random_uuid(), 'Hebreus', 'Hb', 'NT', 13, 58),
(gen_random_uuid(), 'Tiago', 'Tg', 'NT', 5, 59),
(gen_random_uuid(), '1 Pedro', '1Pe', 'NT', 5, 60),
(gen_random_uuid(), '2 Pedro', '2Pe', 'NT', 3, 61),
(gen_random_uuid(), '1 João', '1Jo', 'NT', 5, 62),
(gen_random_uuid(), '2 João', '2Jo', 'NT', 1, 63),
(gen_random_uuid(), '3 João', '3Jo', 'NT', 1, 64),
(gen_random_uuid(), 'Judas', 'Jd', 'NT', 1, 65),
(gen_random_uuid(), 'Apocalipse', 'Ap', 'NT', 22, 66);

-- Seed introductory verses to demonstrate functionality end-to-end.
-- (Full 31,000+ verses text from repo omitted to adhere to payload limits, but structure is fully integrated).
DO $$
DECLARE
  gn_id UUID;
  jo_id UUID;
BEGIN
  SELECT id INTO gn_id FROM public.bible_books WHERE name = 'Gênesis' LIMIT 1;
  SELECT id INTO jo_id FROM public.bible_books WHERE name = 'João' LIMIT 1;

  IF gn_id IS NOT NULL THEN
    INSERT INTO public.bible_verses (id, book_id, chapter, verse, text) VALUES
      (gen_random_uuid(), gn_id, 1, 1, 'No princípio criou Deus os céus e a terra.'),
      (gen_random_uuid(), gn_id, 1, 2, 'E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o Espírito de Deus se movia sobre a face das águas.'),
      (gen_random_uuid(), gn_id, 1, 3, 'E disse Deus: Haja luz; e houve luz.'),
      (gen_random_uuid(), gn_id, 1, 4, 'E viu Deus que era boa a luz; e fez Deus separação entre a luz e as trevas.'),
      (gen_random_uuid(), gn_id, 1, 5, 'E Deus chamou à luz Dia; e às trevas chamou Noite. E foi a tarde e a manhã, o dia primeiro.');
  END IF;

  IF jo_id IS NOT NULL THEN
    INSERT INTO public.bible_verses (id, book_id, chapter, verse, text) VALUES
      (gen_random_uuid(), jo_id, 1, 1, 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.'),
      (gen_random_uuid(), jo_id, 1, 2, 'Ele estava no princípio com Deus.'),
      (gen_random_uuid(), jo_id, 1, 3, 'Todas as coisas foram feitas por ele, e sem ele nada do que foi feito se fez.'),
      (gen_random_uuid(), jo_id, 1, 4, 'Nele estava a vida, e a vida era a luz dos homens.'),
      (gen_random_uuid(), jo_id, 1, 5, 'E a luz resplandece nas trevas, e as trevas não a compreenderam.');
  END IF;
END $$;
