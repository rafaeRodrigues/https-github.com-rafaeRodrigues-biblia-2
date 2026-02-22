import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock, PlayCircle } from 'lucide-react'

const AGENDA = [
  {
    id: 1,
    title: 'Culto de Celebração',
    date: '25 Fev',
    time: '19:00',
    location: 'Templo Principal',
    type: 'Culto',
  },
  {
    id: 2,
    title: 'Escola Bíblica Dominical',
    date: '26 Fev',
    time: '09:00',
    location: 'Salas de Aula',
    type: 'Ensino',
  },
  {
    id: 3,
    title: 'Reunião de Liderança',
    date: '28 Fev',
    time: '20:00',
    location: 'Salão Social',
    type: 'Administrativo',
  },
  {
    id: 4,
    title: 'Culto de Oração',
    date: '01 Mar',
    time: '19:30',
    location: 'Capela',
    type: 'Culto',
  },
]

export default function Events() {
  return (
    <div className="space-y-6 animate-fade-in-up h-full flex flex-col">
      <div className="flex flex-col gap-1 shrink-0">
        <h1 className="text-2xl font-bold tracking-tight">Eventos e Mídia</h1>
        <p className="text-muted-foreground text-sm">
          Acompanhe a programação da igreja e nossos cultos ao vivo.
        </p>
      </div>

      <Tabs defaultValue="agenda" className="w-full flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
          <TabsTrigger value="agenda">Agenda Geral</TabsTrigger>
          <TabsTrigger value="media">Transmissão e Mídia</TabsTrigger>
        </TabsList>

        <TabsContent value="agenda" className="space-y-3 mt-4 flex-1">
          {AGENDA.map((event) => (
            <Card
              key={event.id}
              className="shadow-sm hover:shadow transition-shadow"
            >
              <CardContent className="p-4 flex gap-4 items-start">
                <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-lg min-w-[4rem] h-16 shrink-0 border border-primary/10">
                  <span className="font-bold text-lg leading-none tracking-tight">
                    {event.date.split(' ')[0]}
                  </span>
                  <span className="text-xs uppercase font-medium mt-1">
                    {event.date.split(' ')[1]}
                  </span>
                </div>
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-semibold text-base leading-tight truncate">
                      {event.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="text-[10px] shrink-0 font-medium bg-secondary/50"
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground gap-x-4 gap-y-1.5">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="media" className="space-y-6 mt-4 flex-1">
          {/* Live Stream Card */}
          <Card className="bg-zinc-950 text-white overflow-hidden border-0 relative shadow-md">
            <div className="aspect-video bg-zinc-900 flex flex-col items-center justify-center group cursor-pointer relative overflow-hidden">
              <img
                src="https://img.usecurling.com/p/800/450?q=church%20worship"
                alt="Live Stream"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-black/40 to-transparent" />
              <PlayCircle className="w-16 h-16 text-white z-10 opacity-90 group-hover:scale-110 transition-all drop-shadow-lg" />
              <span className="absolute bottom-4 left-4 z-10 font-medium flex items-center gap-2 text-sm bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Ao Vivo Agora
              </span>
            </div>
            <CardContent className="p-4 sm:p-5 bg-zinc-950">
              <h3 className="font-semibold text-lg leading-tight mb-1">
                Culto de Celebração e Adoração
              </h3>
              <p className="text-zinc-400 text-sm">
                Domingo, 19:00 - Acompanhe nossa transmissão online.
              </p>
            </CardContent>
          </Card>

          {/* Photo Gallery */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Últimos Eventos</h3>
              <Button
                variant="link"
                className="text-primary p-0 h-auto text-sm"
              >
                Ver tudo
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <img
                  src="https://img.usecurling.com/p/300/300?q=baptism"
                  alt="Gallery"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium">
                    Batismos
                  </span>
                </div>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <img
                  src="https://img.usecurling.com/p/300/300?q=choir"
                  alt="Gallery"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium">Coral</span>
                </div>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden group hidden sm:block">
                <img
                  src="https://img.usecurling.com/p/300/300?q=community"
                  alt="Gallery"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium">
                    Comunhão
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
