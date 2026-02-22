import { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getBibleBook,
  getBibleBooks,
  getChapterVerses,
  BibleBook as BibleBookType,
  BibleVerse,
} from '@/services/bible'
import { useToast } from '@/hooks/use-toast'

export default function BibleChapter() {
  const { bookId, chapter } = useParams()
  const chapterNum = parseInt(chapter || '1', 10)
  const navigate = useNavigate()
  const { toast } = useToast()

  const [book, setBook] = useState<BibleBookType | null>(null)
  const [allBooks, setAllBooks] = useState<BibleBookType[]>([])
  const [verses, setVerses] = useState<BibleVerse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBibleBooks().then(setAllBooks).catch(console.error)
  }, [])

  useEffect(() => {
    if (bookId && chapterNum) {
      setLoading(true)
      Promise.all([getBibleBook(bookId), getChapterVerses(bookId, chapterNum)])
        .then(([bookData, versesData]) => {
          setBook(bookData)
          setVerses(versesData)
          window.scrollTo(0, 0)
        })
        .catch(() => {
          toast({ variant: 'destructive', title: 'Erro ao carregar capítulo' })
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [bookId, chapterNum, toast])

  const { prevLink, nextLink } = useMemo(() => {
    if (!book || allBooks.length === 0)
      return { prevLink: null, nextLink: null }

    let prev = null
    let next = null

    // Prev logic
    if (chapterNum > 1) {
      prev = `/bible/${book.id}/${chapterNum - 1}`
    } else {
      const currentBookIndex = allBooks.findIndex((b) => b.id === book.id)
      if (currentBookIndex > 0) {
        const prevBook = allBooks[currentBookIndex - 1]
        prev = `/bible/${prevBook.id}/${prevBook.chapters_count}`
      }
    }

    // Next logic
    if (chapterNum < book.chapters_count) {
      next = `/bible/${book.id}/${chapterNum + 1}`
    } else {
      const currentBookIndex = allBooks.findIndex((b) => b.id === book.id)
      if (currentBookIndex < allBooks.length - 1) {
        const nextBook = allBooks[currentBookIndex + 1]
        next = `/bible/${nextBook.id}/1`
      }
    }

    return { prevLink: prev, nextLink: next }
  }, [book, allBooks, chapterNum])

  if (!book && loading) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground animate-pulse">
        Carregando...
      </div>
    )
  }
  if (!book) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Livro não encontrado
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="sticky top-0 bg-background/95 backdrop-blur-md z-20 py-3 border-b -mx-4 px-4 flex items-center justify-between shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/bible/${book.id}`)}
          className="shrink-0 -ml-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold tracking-tight text-center truncate px-2">
          {book.name} {chapterNum}
        </h1>
        <div className="w-9" />
      </div>

      <div className="space-y-5 px-1 min-h-[50vh] pt-2 pb-6">
        {loading ? (
          <div className="text-center text-muted-foreground py-10 animate-pulse">
            Carregando versículos...
          </div>
        ) : verses.length > 0 ? (
          verses.map((v) => (
            <p
              key={v.id}
              className="text-[17px] leading-[1.7] text-foreground/90 font-serif"
            >
              <sup className="text-[11px] text-primary font-bold mr-1.5 select-none">
                {v.verse}
              </sup>
              {v.text}
            </p>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-12 px-4 bg-muted/20 rounded-2xl">
            <p className="font-semibold text-foreground/80 mb-2">
              Versículos não encontrados
            </p>
            <p className="text-sm opacity-80 max-w-[250px] mx-auto">
              Nenhum versículo disponível para este capítulo no momento. A base de dados pode estar sincronizando.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-muted/60 px-1">
        {prevLink ? (
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-xl font-semibold gap-2 border-muted/60"
          >
            <Link to={prevLink}>
              <ChevronLeft className="w-4 h-4" /> Anterior
            </Link>
          </Button>
        ) : (
          <div />
        )}

        {nextLink ? (
          <Button
            asChild
            variant="default"
            className="h-12 rounded-xl font-semibold gap-2"
          >
            <Link to={nextLink}>
              Próximo <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
