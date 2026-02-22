import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, x-supabase-client-platform, apikey, content-type',
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
      { global: { headers: { Authorization: authHeader } } }
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
      const { data, error } = await supabaseClient
        .from('bible_books')
        .select('*')
        .eq('id', bookId)
        .single()

      if (error) throw error
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (action === 'getVerses') {
      if (!bookId || !chapter)
        throw new Error('bookId and chapter are required')
      const { data, error } = await supabaseClient
        .from('bible_verses')
        .select('*')
        .eq('book_id', bookId)
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
