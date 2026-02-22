import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Calendar,
  Book,
  PenTool,
  BookOpen,
  LayoutGrid,
  Users,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BannerCarousel } from '@/components/BannerCarousel'
import {
  getBibleBooks,
  getChapterVerses,
  BibleBook,
  BibleVerse,
} from '@/services/bible'

const DiaryBtn = ({ icon: Icon, label, to }: any) => (
  <Link to={to} className="flex flex-col items-center gap-2 group">
    <div className="w-14 h-14 bg-muted/60 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
      <Icon className="w-6 h-6 text-foreground/70 group-hover:text-primary transition-colors duration-300" />
    </div>
    <span className="text-[11px] font-semibold text-center leading-tight text-muted-foreground group-hover:text-foreground transition-colors duration-300">
      {label}
    </span>
  </Link>
)

export default function Index() {
  const [dailyVerse, setDailyVerse] = useState<{
    book: BibleBook
    verse: BibleVerse
  } | null>(null)

  useEffect(() => {
    let mounted = true
    getBibleBooks()
      .then((books) => {
        if (!mounted) return
        const joao = books.find((b) => b.name === 'João')
        if (joao) {
          getChapterVerses(joao.id, 1)
            .then((verses) => {
              if (!mounted) return
              if (verses && verses.length > 0) {
                setDailyVerse({ book: joao, verse: verses[0] })
              }
            })
            .catch(console.error)
        }
      })
      .catch(console.error)
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="space-y-8 animate-fade-in-up py-4">
      <BannerCarousel />

      {dailyVerse && (
        <div className="space-y-3">
          <h2 className="text-[17px] font-bold tracking-tight text-foreground px-1">
            Versículo do Dia
          </h2>
          <Card className="shadow-none border-muted/60 bg-primary/5">
            <CardContent className="p-4 relative overflow-hidden">
              <Book className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-primary/5 rotate-12" />
              <p className="text-[15px] font-serif leading-relaxed text-foreground/90 italic mb-3 relative z-10">
                "{dailyVerse.verse.text}"
              </p>
              <div className="flex justify-between items-center relative z-10">
                <span className="text-sm font-bold text-primary">
                  {dailyVerse.book.name} {dailyVerse.verse.chapter}:
                  {dailyVerse.verse.verse}
                </span>
                <Link
                  to={`/bible/${dailyVerse.book.id}/${dailyVerse.verse.chapter}`}
                  className="text-xs font-semibold bg-background px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors"
                >
                  Ler capítulo
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[17px] font-bold tracking-tight text-foreground">
            Programação
          </h2>
          <Link to="/midia" className="text-sm font-semibold text-primary">
            Ver mais
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <Card className="min-w-[260px] shrink-0 snap-center shadow-none border-muted/60 bg-muted/20">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[15px] mb-2">
                Culto de Celebração
              </h3>
              <div className="flex items-center text-sm text-muted-foreground gap-2 font-medium">
                <Calendar className="w-4 h-4" />
                28/08/2024 às 19:30
              </div>
            </CardContent>
          </Card>
          <Card className="min-w-[260px] shrink-0 snap-center shadow-none border-muted/60 bg-muted/20">
            <CardContent className="p-4">
              <h3 className="font-semibold text-[15px] mb-2">Escola Bíblica</h3>
              <div className="flex items-center text-sm text-muted-foreground gap-2 font-medium">
                <Calendar className="w-4 h-4" />
                01/09/2024 às 09:00
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-[17px] font-bold tracking-tight text-foreground px-1">
          Diário
        </h2>
        <div className="flex justify-between items-start px-2">
          <DiaryBtn icon={Book} label="Bíblia" to="/bible" />
          <DiaryBtn icon={BookOpen} label="Estudos" to="/plans" />
          <DiaryBtn icon={PenTool} label="Anotações" to="/notes" />
          <DiaryBtn icon={LayoutGrid} label="Leitura" to="/plans" />
        </div>
      </div>

      <div className="space-y-3 pb-8">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[17px] font-bold tracking-tight text-foreground">
            Células
          </h2>
          <Link to="/midia" className="text-sm font-semibold text-primary">
            Ver mais
          </Link>
        </div>
        <Card className="shadow-none border-muted/60 bg-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-colors duration-300">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-[15px]">Encontre uma Célula</h3>
              <p className="text-sm text-muted-foreground">
                Conecte-se com pessoas perto de você.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
