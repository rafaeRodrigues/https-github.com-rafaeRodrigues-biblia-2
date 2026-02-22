import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Calendar,
  Book,
  PenTool,
  BookOpen,
  LayoutGrid,
  Users,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

import img1 from '@/assets/1000486751-58683.png'
import img2 from '@/assets/1000486749-8ba2c.png'
import img3 from '@/assets/1000486747-f6948.png'
import img4 from '@/assets/1000486745-785c5.png'

const carouselImages = [
  {
    id: 1,
    src: img1,
    alt: 'Culto de Celebração',
    tag: 'Ao vivo',
    title: 'Culto de Celebração',
  },
  {
    id: 2,
    src: img2,
    alt: 'Momento de Oração',
    tag: 'Devocional',
    title: 'O Teu Amor é Melhor',
  },
  {
    id: 3,
    src: img3,
    alt: 'Louvor e Adoração',
    tag: 'Música',
    title: 'Louvor e Adoração',
  },
  {
    id: 4,
    src: img4,
    alt: 'A Palavra de Deus',
    tag: 'Mensagem',
    title: 'A Palavra de Deus',
  },
]

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
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="space-y-8 animate-fade-in-up py-4">
      <div className="w-full relative group animate-slide-up">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
          opts={{ loop: true }}
        >
          <div className="overflow-hidden rounded-3xl aspect-[16/10] sm:aspect-video lg:aspect-[21/9] shadow-md relative border border-border bg-black transition-all duration-300">
            <CarouselContent className="h-full ml-0">
              {carouselImages.map((img) => (
                <CarouselItem
                  key={img.id}
                  className="h-full pl-0 relative bg-black"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={img.src}
                      className="w-full h-full object-cover opacity-40 blur-xl scale-110"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                  <img
                    src={img.src}
                    className="w-full h-full object-contain relative z-10"
                    alt={img.alt}
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-white/90 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-sm">
                      {img.tag}
                    </span>
                    <h2 className="text-white text-2xl font-bold leading-tight drop-shadow-md">
                      {img.title}
                    </h2>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex z-30">
              <button
                onClick={() => api?.scrollPrev()}
                className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm border border-border text-foreground flex items-center justify-center pointer-events-auto hover:bg-background hover:scale-105 transition-all shadow-sm"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm border border-border text-foreground flex items-center justify-center pointer-events-auto hover:bg-background hover:scale-105 transition-all shadow-sm"
                aria-label="Next slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === index
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-primary/20 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>

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

      <div className="space-y-4">
        <h2 className="text-[17px] font-bold tracking-tight text-foreground px-1">
          Diário
        </h2>
        <div className="flex justify-between items-start px-2">
          <DiaryBtn icon={Book} label="Bíblia" to="/bible" />
          <DiaryBtn icon={BookOpen} label="Estudos" to="/plans" />
          <DiaryBtn icon={PenTool} label="Anotações" to="/plans" />
          <DiaryBtn icon={LayoutGrid} label="Leitura" to="/plans" />
        </div>
      </div>

      <div className="space-y-3 pb-8">
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
