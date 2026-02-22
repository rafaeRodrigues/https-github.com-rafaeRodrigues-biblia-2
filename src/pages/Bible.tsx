import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Book, Search, AlertCircle } from 'lucide-react'
import { getBibleBooks, BibleBook } from '@/services/bible'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

export default function Bible() {
  const [books, setBooks] = useState<BibleBook[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getBibleBooks()
      .then((data) => {
        setBooks(data || [])
        setError(null)
      })
      .catch((err) => setError(err.message || 'Erro ao carregar os livros'))
      .finally(() => setLoading(false))
  }, [])

  const filteredBooks = books.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.abbreviation.toLowerCase().includes(search.toLowerCase()),
  )

  const otBooks = filteredBooks.filter((b) => b.testament === 'OT')
  const ntBooks = filteredBooks.filter((b) => b.testament === 'NT')

  return (
    <div className="space-y-6 animate-fade-in-up py-4">
      <div className="flex items-center gap-2 px-1">
        <Book className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Bíblia Digital</h1>
      </div>

      <div className="relative group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-10 h-12 text-[15px] rounded-xl bg-muted/20 border-muted/60 shadow-none focus-visible:ring-primary/20 transition-colors"
          placeholder="Buscar livro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="space-y-3 mt-6">
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[74px] w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <Tabs defaultValue="OT" className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/40 h-12 rounded-xl">
            <TabsTrigger value="OT" className="rounded-lg font-semibold">
              Velho Testamento
            </TabsTrigger>
            <TabsTrigger value="NT" className="rounded-lg font-semibold">
              Novo Testamento
            </TabsTrigger>
          </TabsList>

          <TabsContent value="OT" className="mt-6 space-y-3 pb-8">
            {otBooks.map((book) => (
              <Link key={book.id} to={`/bible/${book.id}`} className="block">
                <Card className="shadow-none border-muted/60 bg-card hover:bg-muted/30 transition-colors duration-300">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base">{book.name}</h3>
                      <p className="text-[13px] text-muted-foreground mt-0.5 font-medium">
                        {book.chapters_count} capítulos
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs tracking-tight">
                      {book.abbreviation}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {otBooks.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Nenhum livro encontrado.
              </p>
            )}
          </TabsContent>

          <TabsContent value="NT" className="mt-6 space-y-3 pb-8">
            {ntBooks.map((book) => (
              <Link key={book.id} to={`/bible/${book.id}`} className="block">
                <Card className="shadow-none border-muted/60 bg-card hover:bg-muted/30 transition-colors duration-300">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-base">{book.name}</h3>
                      <p className="text-[13px] text-muted-foreground mt-0.5 font-medium">
                        {book.chapters_count} capítulos
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs tracking-tight">
                      {book.abbreviation}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {ntBooks.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Nenhum livro encontrado.
              </p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
