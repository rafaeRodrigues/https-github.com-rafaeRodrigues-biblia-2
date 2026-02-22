-- Enable the http extension if it's not already enabled to fetch the JSON payload
CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;

-- Clear existing data to avoid duplicates or orphaned records
TRUNCATE TABLE public.bible_books CASCADE;

DO $$
DECLARE
    response extensions.http_response;
    bible_data jsonb;
    book_record jsonb;
    chapter_array jsonb;
    verse_text text;
    v_book_id uuid;
    v_testament text;
    v_sort_order int := 1;
    v_chapter_idx int;
    v_verse_idx int;
BEGIN
    -- Fetch the complete JSON data for Almeida Atualizada (PT-AA)
    response := extensions.http_get('https://raw.githubusercontent.com/thiagobodruk/bible/master/json/pt_aa.json');
    
    IF response.status = 200 THEN
        -- Safely trim BOM (Byte Order Mark) and whitespaces before casting to JSONB
        bible_data := trim(both e'\r\n\t ' || chr(65279) from response.content)::jsonb;
        
        -- Iterate over all books
        FOR book_record IN SELECT * FROM jsonb_array_elements(bible_data)
        LOOP
            v_book_id := gen_random_uuid();
            
            -- Determine testament based on conventional order
            IF v_sort_order <= 39 THEN
                v_testament := 'OT';
            ELSE
                v_testament := 'NT';
            END IF;

            -- Insert the book
            INSERT INTO public.bible_books (id, name, abbreviation, testament, chapters_count, sort_order)
            VALUES (
                v_book_id,
                book_record->>'name',
                book_record->>'abbrev',
                v_testament,
                jsonb_array_length(book_record->'chapters'),
                v_sort_order
            );

            v_chapter_idx := 1;
            
            -- Iterate over each chapter of the current book
            FOR chapter_array IN SELECT * FROM jsonb_array_elements(book_record->'chapters')
            LOOP
                v_verse_idx := 1;
                
                -- Iterate over each verse in the current chapter
                FOR verse_text IN SELECT * FROM jsonb_array_elements_text(chapter_array)
                LOOP
                    INSERT INTO public.bible_verses (id, book_id, chapter, verse, text)
                    VALUES (gen_random_uuid(), v_book_id, v_chapter_idx, v_verse_idx, verse_text);
                    
                    v_verse_idx := v_verse_idx + 1;
                END LOOP;
                
                v_chapter_idx := v_chapter_idx + 1;
            END LOOP;

            v_sort_order := v_sort_order + 1;
        END LOOP;
    ELSE
        RAISE EXCEPTION 'Failed to fetch Bible JSON. HTTP Status: %', response.status;
    END IF;
END $$;
