-- Deactivate current active banners
UPDATE public.banners
SET active = false
WHERE active = true;

-- Insert the new customized banners
INSERT INTO public.banners (id, active, image_url, sort_order, tag, title)
VALUES
(gen_random_uuid(), true, '/src/assets/1000486751-02f03.png', 1, 'Destaque', 'Louvor e Adoração'),
(gen_random_uuid(), true, '/src/assets/1000486747-2516a.png', 2, 'Evento', 'Conferência IFT'),
(gen_random_uuid(), true, '/src/assets/1000486749-2ccfd.png', 3, 'Salmos 63:4', 'O Teu amor é melhor do que a vida');
