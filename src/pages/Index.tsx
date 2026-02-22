import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { BookOpen, Send, BookMarked } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

export default function Index() {
  const { toast } = useToast()
  const [request, setRequest] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  const handlePrayerRequest = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Pedido enviado!',
      description:
        'Seu pedido de oração foi recebido e estaremos orando por você.',
    })
    setRequest('')
    setAnonymous(false)
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Espiritualidade</h1>
        <p className="text-muted-foreground text-sm">
          Alimente sua fé e compartilhe seus pedidos de oração.
        </p>
      </div>

      {/* Verse of the Day */}
      <Card className="bg-primary/5 border-primary/20 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <BookOpen className="w-24 h-24" />
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Palavra do Dia
          </CardTitle>
          <CardDescription className="text-primary/70 font-medium">
            Salmos 23:1
          </CardDescription>
        </CardHeader>
        <CardContent>
          <blockquote className="border-l-4 border-primary pl-4 italic text-lg sm:text-xl font-medium mb-4 text-foreground/90 leading-relaxed">
            "O Senhor é o meu pastor; de nada me faltará."
          </blockquote>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Reflexão: Deus cuida de nós em todos os momentos. Confie na
            providência divina e descanse no amor do Pai, sabendo que Ele supre
            todas as nossas necessidades diárias.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Link to="/bible">Acessar Bíblia Digital</Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prayer Requests */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Pedidos de Oração
            </CardTitle>
            <CardDescription>
              Compartilhe suas lutas e vitórias com a igreja.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePrayerRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prayer">Seu pedido</Label>
                <Textarea
                  id="prayer"
                  placeholder="Descreva seu pedido de oração aqui..."
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="resize-none min-h-[100px]"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={anonymous}
                  onCheckedChange={(c) => setAnonymous(c as boolean)}
                />
                <Label
                  htmlFor="anonymous"
                  className="font-normal text-sm cursor-pointer"
                >
                  Enviar anonimamente
                </Label>
              </div>
              <Button type="submit" className="w-full transition-all">
                Enviar Pedido
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reading Plans */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary" />
              Planos de Leitura
            </CardTitle>
            <CardDescription>
              Acompanhe seu progresso diário de leitura bíblica.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Jornada da Fé (30 dias)</span>
                <span className="text-primary font-semibold">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  Restauração Familiar (15 dias)
                </span>
                <span className="text-primary font-semibold">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              className="w-full text-primary hover:text-primary hover:bg-primary/5"
            >
              Explorar mais planos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
