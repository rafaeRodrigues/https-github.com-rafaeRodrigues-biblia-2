import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getBibleBook, BibleBook as BibleBookType } from '@/services/bible'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function BibleBook() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState<BibleBookType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (bookId) {
      setLoading(true)
      getBibleBook(bookId)
        .then((data) => {
          setBook(data)
          setError(null)
        })
        .catch((err) => setError(err.message || 'Erro ao carregar o livro'))
        .finally(() => setLoading(false))
    }
  }, [bookId])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p>Carregando capítulos...</p>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="p-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/bible')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error || 'Livro não encontrado'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in py-4">
      <div className="flex items-center gap-3 px-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/bible')}
          className="shrink-0 -ml-2 w-10 h-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{book.name}</h1>
          <p className="text-sm text-muted-foreground">Selecione um capítulo</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 pt-4">
        {Array.from({ length: book.chapters_count }).map((_, i) => {
          const chapter = i + 1
          return (
            <Link
              key={chapter}
              to={`/bible/${book.id}/${chapter}`}
              className="flex items-center justify-center h-14 rounded-xl border border-muted/60 bg-muted/20 font-bold text-lg text-foreground/80 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 active:scale-95"
            >
              {chapter}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
