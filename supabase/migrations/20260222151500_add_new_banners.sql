-- Insert the two new promotional banners into the carousel
INSERT INTO public.banners (id, active, image_url, sort_order, tag, title)
VALUES
(gen_random_uuid(), true, '/src/assets/1000487831-3a47c.png', 4, 'Inspiração', 'Mensagem de Fé'),
(gen_random_uuid(), true, '/src/assets/1000486745-d81f8.png', 5, 'Liderança', 'Palavra Pastoral');
