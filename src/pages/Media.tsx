import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Clock,
  PlayCircle,
  CalendarDays,
  Youtube,
  Instagram,
  Music,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { getSocialLinks } from '@/services/config'

const AGENDA = [
  {
    id: 1,
    title: 'Culto de Celebração',
    date: '28 Ago',
    time: '19:30',
    location: 'Templo Principal',
  },
  {
    id: 2,
    title: 'Escola Bíblica',
    date: '01 Set',
    time: '09:00',
    location: 'Salas de Aula',
  },
  {
    id: 3,
    title: 'Reunião de Células',
    date: '04 Set',
    time: '20:00',
    location: 'Diversos',
  },
]

export default function Media() {
  const [links, setLinks] = useState({
    instagram: 'https://www.instagram.com/_ibpalavra?igsh=cXZxaDNwajlhdWk4',
    spotify: 'https://open.spotify.com/show/1L8GDMrH3ZEw3ECrjC0QZQ',
  })

  useEffect(() => {
    getSocialLinks().then((data) => {
      if (data) {
        setLinks((prev) => ({
          ...prev,
          ...(data.instagram && { instagram: data.instagram }),
          ...(data.spotify && { spotify: data.spotify }),
        }))
      }
    })
  }, [])

  return (
    <div className="space-y-6 animate-fade-in-up py-4">
      <div className="flex flex-col gap-1 px-1">
        <h1 className="text-2xl font-bold tracking-tight">Mídia</h1>
        <p className="text-muted-foreground text-sm">
          Acompanhe nossos conteúdos, agenda e redes sociais.
        </p>
      </div>

      <Tabs defaultValue="redes" className="w-full">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/40 h-12 rounded-xl">
          <TabsTrigger
            value="redes"
            className="rounded-lg font-semibold flex items-center gap-2"
          >
            <PlayCircle className="w-4 h-4" />
            Redes
          </TabsTrigger>
          <TabsTrigger
            value="agenda"
            className="rounded-lg font-semibold flex items-center gap-2"
          >
            <CalendarDays className="w-4 h-4" />
            Agenda
          </TabsTrigger>
        </TabsList>

        <TabsContent value="redes" className="space-y-6 mt-6">
          <div className="grid gap-3">
            <Button
              asChild
              className="w-full h-14 rounded-xl font-bold bg-zinc-950 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 shadow-md border-0 text-base transition-colors"
            >
              <a
                href={links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Instagram
              </a>
            </Button>

            <Button
              asChild
              className="w-full h-14 rounded-xl font-bold bg-zinc-950 hover:bg-zinc-800 text-zinc-50 dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 shadow-md border-0 text-base transition-colors"
            >
              <a href={links.spotify} target="_blank" rel="noopener noreferrer">
                <Music className="w-5 h-5 mr-2" />
                Spotify
              </a>
            </Button>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-bold px-1">Transmissão ao Vivo</h3>
            <a
              href="https://www.youtube.com/@ibpalavra/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="border-none shadow-md overflow-hidden relative group cursor-pointer rounded-2xl">
                <img
                  src="https://img.usecurling.com/p/800/450?q=church%20worship"
                  className="w-full aspect-video object-cover"
                  alt="Live"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="w-14 h-14 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute bottom-3 left-3 bg-red-600/90 text-white text-[11px] font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Ao Vivo
                </div>
              </Card>
            </a>

            <Button
              asChild
              className="w-full h-12 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-md"
            >
              <a
                href="https://www.youtube.com/@ibpalavra/featured"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-5 h-5 mr-2" />
                Assistir no YouTube
              </a>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="agenda" className="space-y-3 mt-6">
          {AGENDA.map((event) => (
            <Card
              key={event.id}
              className="shadow-none border-muted/60 overflow-hidden"
            >
              <div className="flex items-stretch">
                <div className="w-20 bg-primary/5 border-r border-primary/10 flex flex-col items-center justify-center shrink-0 py-3 transition-colors duration-300">
                  <span className="font-bold text-xl leading-none text-primary">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="text-xs uppercase font-semibold text-primary/70 mt-1">
                    {event.date.split(' ')[1]}
                  </span>
                </div>
                <CardContent className="p-4 flex-1">
                  <h3 className="font-semibold text-base mb-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center text-[13px] text-muted-foreground gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-[13px] text-muted-foreground gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}

          <div className="space-y-3 pt-6">
            <h3 className="font-bold px-1">Galeria de Fotos</h3>
            <div className="grid grid-cols-2 gap-2">
              <img
                src="https://img.usecurling.com/p/400/400?q=worship"
                className="w-full aspect-square object-cover rounded-xl"
                alt="Galeria"
              />
              <img
                src="https://img.usecurling.com/p/400/400?q=youth"
                className="w-full aspect-square object-cover rounded-xl"
                alt="Galeria"
              />
              <img
                src="https://img.usecurling.com/p/400/400?q=church%20event"
                className="w-full aspect-square object-cover rounded-xl"
                alt="Galeria"
              />
              <img
                src="https://img.usecurling.com/p/400/400?q=baptism"
                className="w-full aspect-square object-cover rounded-xl"
                alt="Galeria"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
