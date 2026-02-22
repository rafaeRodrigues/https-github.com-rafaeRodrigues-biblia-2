import { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  getBibleBook,
  getBibleBooks,
  getChapterVerses,
  BibleBook as BibleBookType,
  BibleVerse,
} from '@/services/bible'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import {
  getUserHighlights,
  setHighlight,
  removeHighlight,
  updateReadingProgress,
} from '@/services/bible-progress'

const COLOR_MAP: Record<string, string> = {
  yellow: 'bg-yellow-200/60 dark:bg-yellow-500/30',
  green: 'bg-green-200/60 dark:bg-green-500/30',
  blue: 'bg-blue-200/60 dark:bg-blue-500/30',
  pink: 'bg-pink-200/60 dark:bg-pink-500/30',
}

const ChapterSkeletons = () => (
  <div className="space-y-4 py-4">
    {Array.from({ length: 15 }).map((_, i) => (
      <div key={i} className="space-y-2" style={{ opacity: 1 - i * 0.05 }}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </div>
    ))}
  </div>
)

export default function BibleChapter() {
  const { bookId, chapter } = useParams()
  const chapterNum = parseInt(chapter || '1', 10)
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user, isVisitor } = useAuth()

  const [book, setBook] = useState<BibleBookType | null>(null)
  const [allBooks, setAllBooks] = useState<BibleBookType[]>([])
  const [verses, setVerses] = useState<BibleVerse[]>([])
  const [highlights, setHighlights] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          setError(null)
          window.scrollTo(0, 0)

          if (user && !isVisitor) {
            updateReadingProgress(bookData.id, chapterNum).catch(console.error)

            const verseIds = versesData.map((v) => v.id)
            getUserHighlights(verseIds)
              .then((data) => {
                const hm: Record<string, string> = {}
                data.forEach((h: any) => {
                  hm[h.verse_id] = h.color
                })
                setHighlights(hm)
              })
              .catch(console.error)
          }
        })
        .catch((err) => {
          const errMsg = err.message || 'Erro ao carregar capítulo'
          setError(errMsg)
          toast({ variant: 'destructive', title: 'Erro', description: errMsg })
        })
        .finally(() => setLoading(false))
    }
  }, [bookId, chapterNum, toast, user, isVisitor])

  const { prevLink, nextLink } = useMemo(() => {
    if (!book || allBooks.length === 0)
      return { prevLink: null, nextLink: null }

    let prev = null
    let next = null

    if (chapterNum > 1) {
      prev = `/bible/${book.id}/${chapterNum - 1}`
    } else {
      const currentBookIndex = allBooks.findIndex((b) => b.id === book.id)
      if (currentBookIndex > 0) {
        const prevBook = allBooks[currentBookIndex - 1]
        prev = `/bible/${prevBook.id}/${prevBook.chapters_count}`
      }
    }

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

  const handleHighlight = async (verseId: string, color: string | null) => {
    try {
      if (color) {
        setHighlights((prev) => ({ ...prev, [verseId]: color }))
        await setHighlight(verseId, color)
      } else {
        const newH = { ...highlights }
        delete newH[verseId]
        setHighlights(newH)
        await removeHighlight(verseId)
      }
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    } catch (err) {
      console.error(err)
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível salvar o destaque.',
      })
    }
  }

  if (!book && loading) {
    return (
      <div className="space-y-6 animate-fade-in pb-12 px-2 pt-2">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-6 w-32 mx-auto" />
          <div className="w-10" />
        </div>
        <ChapterSkeletons />
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

      <div className="space-y-3 px-1 min-h-[50vh] pt-2 pb-6">
        {loading ? (
          <ChapterSkeletons />
        ) : verses.length > 0 ? (
          verses.map((v) => {
            const hColor = highlights[v.id]
            const bgClass = hColor ? COLOR_MAP[hColor] : 'hover:bg-muted/30'

            if (!user || isVisitor) {
              return (
                <p
                  key={v.id}
                  className={cn(
                    'text-[17px] leading-[1.7] text-foreground/90 font-serif p-2 rounded-lg',
                    bgClass,
                  )}
                >
                  <sup className="text-[11px] text-primary font-bold mr-1.5 select-none">
                    {v.verse}
                  </sup>
                  {v.text}
                </p>
              )
            }

            return (
              <Popover key={v.id}>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      'w-full text-left text-[17px] leading-[1.7] text-foreground/90 font-serif p-2 rounded-lg transition-colors cursor-pointer',
                      bgClass,
                    )}
                  >
                    <sup className="text-[11px] text-primary font-bold mr-1.5 select-none">
                      {v.verse}
                    </sup>
                    {v.text}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-2 flex items-center gap-2 rounded-full"
                  side="top"
                >
                  {Object.entries(COLOR_MAP).map(([colorName, colorClass]) => (
                    <button
                      key={colorName}
                      className={cn(
                        'w-7 h-7 rounded-full border border-border/50 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
                        colorClass,
                      )}
                      onClick={() => handleHighlight(v.id, colorName)}
                    />
                  ))}
                  <div className="w-px h-5 bg-border mx-1" />
                  <button
                    className="w-7 h-7 rounded-full border border-border/50 bg-background flex items-center justify-center transition-transform hover:scale-110 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-1"
                    onClick={() => handleHighlight(v.id, null)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </PopoverContent>
              </Popover>
            )
          })
        ) : (
          <div className="text-center text-muted-foreground py-12 px-4 bg-muted/20 rounded-2xl">
            <p className="font-semibold text-foreground/80 mb-2">
              Versículos não encontrados
            </p>
            <p className="text-sm opacity-80 max-w-[250px] mx-auto">
              Nenhum versículo disponível para este capítulo no momento.
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
