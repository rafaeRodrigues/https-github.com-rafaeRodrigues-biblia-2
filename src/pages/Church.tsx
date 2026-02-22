import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { BookOpen, Send, Quote } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

export default function Church() {
  const { toast } = useToast()
  const [request, setRequest] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  const handlePrayerRequest = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Pedido enviado!',
      description: 'Seu pedido de oração foi recebido.',
    })
    setRequest('')
    setAnonymous(false)
  }

  return (
    <div className="space-y-6 animate-fade-in-up py-4">
      <div className="flex flex-col gap-1 px-1">
        <h1 className="text-2xl font-bold tracking-tight">Igreja</h1>
        <p className="text-muted-foreground text-sm">
          Espiritualidade e comunhão.
        </p>
      </div>

      {/* Versículo do Dia */}
      <Card className="bg-primary border-transparent text-primary-foreground shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Quote className="w-24 h-24" />
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-4 opacity-90">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold text-sm tracking-widest uppercase">
              Palavra do Dia
            </span>
          </div>
          <blockquote className="text-xl font-medium mb-4 leading-relaxed">
            "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a
            dá. Não se turbe o vosso coração, nem se atemorize."
          </blockquote>
          <p className="text-sm font-bold opacity-90 mb-4">João 14:27</p>
          <div className="pt-4 border-t border-primary-foreground/20">
            <p className="text-sm opacity-80 leading-relaxed font-medium">
              Reflexão: A verdadeira paz não é a ausência de problemas, mas a
              presença de Cristo em nosso coração. Descanse nEle hoje.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pedidos de Oração */}
      <Card className="shadow-none border-muted/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            Pedidos de Oração
          </CardTitle>
          <CardDescription>Como podemos orar por você hoje?</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePrayerRequest} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Descreva seu pedido aqui..."
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className="resize-none min-h-[120px] bg-muted/20"
                required
              />
            </div>
            <div className="flex items-center space-x-2 py-1">
              <Checkbox
                id="anonymous"
                checked={anonymous}
                onCheckedChange={(c) => setAnonymous(c as boolean)}
              />
              <Label
                htmlFor="anonymous"
                className="font-medium text-sm cursor-pointer select-none"
              >
                Enviar anonimamente
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full font-semibold h-12 rounded-xl"
            >
              Enviar Pedido
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
