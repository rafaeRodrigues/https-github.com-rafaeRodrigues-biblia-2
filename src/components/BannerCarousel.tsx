import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { getBanners } from '@/services/banners'

import banner1 from '@/assets/1000486751-02f03.png'
import banner2 from '@/assets/1000486747-2516a.png'
import banner3 from '@/assets/1000486749-2ccfd.png'
import banner4 from '@/assets/1000487831-3a47c.png'
import banner5 from '@/assets/1000486745-d81f8.png'

const imageMap: Record<string, string> = {
  '/src/assets/1000486751-02f03.png': banner1,
  '/src/assets/1000486747-2516a.png': banner2,
  '/src/assets/1000486749-2ccfd.png': banner3,
  '/src/assets/1000487831-3a47c.png': banner4,
  '/src/assets/1000486745-d81f8.png': banner5,
}

const fallbackBanners = [
  {
    id: 1,
    src: banner1,
    alt: 'Louvor e Adoração',
    tag: 'Destaque',
    title: 'Louvor e Adoração',
  },
  {
    id: 2,
    src: banner2,
    alt: 'Conferência IFT',
    tag: 'Evento',
    title: 'Conferência IFT',
  },
  {
    id: 3,
    src: banner3,
    alt: 'O Teu amor é melhor do que a vida',
    tag: 'Salmos 63:4',
    title: 'O Teu amor é melhor do que a vida',
  },
  {
    id: 4,
    src: banner4,
    alt: 'Mensagem de Fé',
    tag: 'Inspiração',
    title: 'Mensagem de Fé',
  },
  {
    id: 5,
    src: banner5,
    alt: 'Palavra Pastoral',
    tag: 'Liderança',
    title: 'Palavra Pastoral',
  },
]

export function BannerCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [banners, setBanners] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    getBanners()
      .then((data) => {
        if (!mounted) return
        if (data && data.length > 0) {
          setBanners(
            data.map((b) => ({
              id: b.id,
              src: imageMap[b.image_url] || b.image_url,
              alt: b.title || 'Banner',
              tag: b.tag,
              title: b.title,
            })),
          )
        } else {
          setBanners(fallbackBanners)
        }
      })
      .catch(() => {
        if (!mounted) return
        setBanners(fallbackBanners)
      })
      .finally(() => {
        if (mounted) setIsLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  if (isLoading) {
    return (
      <Skeleton className="w-full rounded-3xl aspect-[16/10] sm:aspect-video lg:aspect-[21/9]" />
    )
  }

  return (
    <div className="w-full relative group animate-slide-up">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{ loop: true }}
      >
        <div className="overflow-hidden rounded-3xl aspect-[16/10] sm:aspect-video lg:aspect-[21/9] shadow-md relative border border-border bg-black transition-all duration-300">
          <CarouselContent className="h-full ml-0">
            {banners.map((img) => (
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
                  {img.tag && (
                    <span className="text-white/90 text-xs font-bold uppercase tracking-wider mb-1 drop-shadow-sm">
                      {img.tag}
                    </span>
                  )}
                  {img.title && (
                    <h2 className="text-white text-2xl font-bold leading-tight drop-shadow-md">
                      {img.title}
                    </h2>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute top-1/2 -translate-y-1/2 left-3 right-3 justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex z-30">
            <button
              onClick={() => api?.scrollPrev()}
              className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm border border-border text-foreground flex items-center justify-center pointer-events-auto hover:bg-background hover:scale-105 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm border border-border text-foreground flex items-center justify-center pointer-events-auto hover:bg-background hover:scale-105 transition-all shadow-sm"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {banners.map((_, index) => (
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
  )
}
