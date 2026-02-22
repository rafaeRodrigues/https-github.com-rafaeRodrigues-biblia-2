import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, x-supabase-client-platform, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Authorization header is missing')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } },
    )

    let body = {}
    if (req.method === 'POST') {
      body = await req.json()
    } else {
      const url = new URL(req.url)
      body = {
        action: url.searchParams.get('action'),
        bookId: url.searchParams.get('bookId'),
        chapter: url.searchParams.get('chapter'),
      }
    }

    const { action, bookId, chapter } = body as any

    const isUuid = (id: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    if (action === 'getBooks') {
      const { data, error } = await supabaseClient
        .from('bible_books')
        .select('*')
        .order('sort_order')

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'getBook') {
      if (!bookId) throw new Error('bookId is required')

      const query = supabaseClient.from('bible_books').select('*')
      const { data, error } = isUuid(bookId)
        ? await query.eq('id', bookId).single()
        : await query.ilike('abbreviation', bookId).single()

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'getVerses') {
      if (!bookId || !chapter)
        throw new Error('bookId and chapter are required')

      let finalBookId = bookId
      if (!isUuid(bookId)) {
        const { data: book, error: bookErr } = await supabaseClient
          .from('bible_books')
          .select('id')
          .ilike('abbreviation', bookId)
          .single()

        if (bookErr) throw bookErr
        finalBookId = book.id
      }

      const { data, error } = await supabaseClient
        .from('bible_verses')
        .select('*')
        .eq('book_id', finalBookId)
        .eq('chapter', chapter)
        .order('verse')

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
