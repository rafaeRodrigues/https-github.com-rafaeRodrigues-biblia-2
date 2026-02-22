-- Seed banners if table is empty
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.banners LIMIT 1) THEN
        INSERT INTO public.banners (id, active, image_url, sort_order, tag, title)
        VALUES
        (gen_random_uuid(), true, 'https://img.usecurling.com/p/800/400?q=church&color=blue', 1, 'Ao vivo', 'Culto de Celebração'),
        (gen_random_uuid(), true, 'https://img.usecurling.com/p/800/400?q=worship&color=purple', 2, 'Música', 'Louvor e Adoração'),
        (gen_random_uuid(), true, 'https://img.usecurling.com/p/800/400?q=bible&color=orange', 3, 'Mensagem', 'A Palavra de Deus');
    END IF;
END $$;
