import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Book } from 'lucide-react'
import { useState } from 'react'

const MOCK_VERSES = [
  {
    book: 'Gênesis',
    chapter: 1,
    verse: 1,
    text: 'No princípio criou Deus os céus e a terra.',
  },
  {
    book: 'João',
    chapter: 3,
    verse: 16,
    text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
  },
  {
    book: 'Filipenses',
    chapter: 4,
    verse: 13,
    text: 'Posso todas as coisas em Cristo que me fortalece.',
  },
  {
    book: 'Salmos',
    chapter: 23,
    verse: 1,
    text: 'O Senhor é o meu pastor; de nada me faltará.',
  },
  {
    book: 'Romanos',
    chapter: 8,
    verse: 28,
    text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.',
  },
]

export default function Bible() {
  const [search, setSearch] = useState('')

  const filtered =
    search.trim() === ''
      ? MOCK_VERSES
      : MOCK_VERSES.filter(
          (v) =>
            v.text.toLowerCase().includes(search.toLowerCase()) ||
            v.book.toLowerCase().includes(search.toLowerCase()),
        )

  return (
    <div className="space-y-6 animate-fade-in-up py-4">
      <div className="flex items-center gap-2 px-1">
        <Book className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Bíblia Digital</h1>
      </div>

      <div className="relative group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-10 h-12 text-[15px] rounded-xl bg-muted/20 border-muted/60 shadow-none focus-visible:ring-primary/20"
          placeholder="Buscar versículo ou livro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((v, i) => (
          <Card
            key={i}
            className="shadow-none border-muted/60 bg-card hover:bg-muted/10 transition-colors"
          >
            <CardContent className="p-4">
              <p className="font-bold text-[13px] text-primary mb-1 tracking-tight">
                {v.book} {v.chapter}:{v.verse}
              </p>
              <p className="text-[15px] text-foreground leading-relaxed">
                {v.text}
              </p>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-medium mb-1">Nenhum resultado</h3>
            <p className="text-muted-foreground text-sm">
              Não encontramos nenhum versículo com essa busca.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
