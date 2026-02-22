import { Link } from 'react-router-dom'
import {
  Calendar,
  Book,
  PenTool,
  BookOpen,
  LayoutGrid,
  Users,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const DiaryBtn = ({ icon: Icon, label, to }: any) => (
  <Link to={to} className="flex flex-col items-center gap-2 group">
    <div className="w-14 h-14 bg-muted/60 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
      <Icon className="w-6 h-6 text-foreground/70 group-hover:text-primary" />
    </div>
    <span className="text-[11px] font-semibold text-center leading-tight text-muted-foreground group-hover:text-foreground">
      {label}
    </span>
  </Link>
)

export default function Index() {
  return (
    <div className="space-y-8 animate-fade-in-up py-4">
      {/* Hero / Featured */}
      <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative shadow-sm">
        <img
          src="https://img.usecurling.com/p/800/600?q=church%20worship&color=blue"
          className="w-full h-full object-cover"
          alt="Culto ao vivo"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <span className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">
            Ao vivo
          </span>
          <h2 className="text-white text-xl font-bold leading-tight">
            Culto de Celebração
          </h2>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-100" />
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
        </div>
      </div>

      {/* Programação */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[17px] font-bold tracking-tight text-foreground">
            Programação
          </h2>
          <Link to="/campus" className="text-sm font-semibold text-primary">
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

      {/* Diário */}
      <div className="space-y-4">
        <h2 className="text-[17px] font-bold tracking-tight text-foreground px-1">
          Diário
        </h2>
        <div className="flex justify-between items-start px-2">
          <DiaryBtn icon={Book} label="Bíblia" to="/bible" />
          <DiaryBtn icon={BookOpen} label="Estudos" to="/plans" />
          <DiaryBtn icon={PenTool} label="Anotações" to="/plans" />
          <DiaryBtn icon={LayoutGrid} label="Plano de Leitura" to="/plans" />
        </div>
      </div>

      {/* Células */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[17px] font-bold tracking-tight text-foreground">
            Células
          </h2>
          <Link to="/campus" className="text-sm font-semibold text-primary">
            Ver mais
          </Link>
        </div>
        <Card className="shadow-none border-muted/60 bg-primary/5">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
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
