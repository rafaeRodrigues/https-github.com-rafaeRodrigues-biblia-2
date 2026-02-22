import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getBibleBook, BibleBook as BibleBookType } from '@/services/bible'

export default function BibleBook() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState<BibleBookType | null>(null)

  useEffect(() => {
    if (bookId) {
      getBibleBook(bookId).then(setBook).catch(console.error)
    }
  }, [bookId])

  if (!book) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground animate-pulse">
        Carregando...
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
