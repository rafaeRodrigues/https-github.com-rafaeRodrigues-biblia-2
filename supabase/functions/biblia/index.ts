// Edge Function created from https://github.com/rafaeRodrigues/biblia-2.git
// Fixed regex escaping
Deno.serve(async (req: Request) => {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(new RegExp('^/biblia/?'), '');

    // Simple router
    if (req.method === 'GET' && (path === '' || path === '/')) {
      return new Response(JSON.stringify({ message: 'Biblia Edge Function alive', routes: ['/verse?book=...&chapter=...&verse=...','/search?q=...'] }), { headers: { 'Content-Type': 'application/json' } });
    }

    if (req.method === 'GET' && path.startsWith('/verse')) {
      const params = url.searchParams;
      const book = params.get('book') || '';
      const chapter = params.get('chapter') || '';
      const verse = params.get('verse') || '';
      const sample = {
        'john': { '3': { '16': 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito...' } }
      };
      const text = (sample[book.toLowerCase()] && sample[book.toLowerCase()][chapter] && sample[book.toLowerCase()][chapter][verse]) || null;
      if (!text) return new Response(JSON.stringify({ error: 'Verse not found in sample. Connect real data source.' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      return new Response(JSON.stringify({ book, chapter, verse, text }), { headers: { 'Content-Type': 'application/json' } });
    }

    if (req.method === 'GET' && path.startsWith('/search')) {
      const q = url.searchParams.get('q') || '';
      const results = [];
      if ('john'.includes(q.toLowerCase())) results.push({ book: 'John', chapter: 3, verse: 16, text: 'Porque Deus amou...' });
      return new Response(JSON.stringify({ q, results }), { headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Route not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});