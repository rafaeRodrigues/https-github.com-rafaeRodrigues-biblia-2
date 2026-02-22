import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, ChevronLeft, Book } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
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
    text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.',
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
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="shrink-0 -ml-2">
          <Link to="/">
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Book className="w-6 h-6 text-primary hidden sm:block" />
          Bíblia Digital
        </h1>
      </div>

      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          className="pl-9 h-12 text-base rounded-xl bg-background border-muted shadow-sm focus-visible:ring-primary/20"
          placeholder="Buscar versículo, palavra-chave ou livro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map((v, i) => (
          <Card
            key={i}
            className="hover:border-primary/50 transition-colors shadow-sm"
          >
            <CardContent className="p-4 sm:p-5">
              <p className="font-semibold text-sm text-primary mb-2 tracking-tight">
                {v.book} {v.chapter}:{v.verse}
              </p>
              <p className="text-foreground leading-relaxed">{v.text}</p>
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
              Não encontramos nenhum versículo correspondente à sua busca.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
