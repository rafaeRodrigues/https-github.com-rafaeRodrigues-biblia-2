import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Copy,
  CreditCard,
  Heart,
  Check,
  FileText,
  Calendar as CalendarIcon,
  User,
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

export default function Management() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [date, setDate] = useState<Date>()
  const [scheduleDate, setScheduleDate] = useState<Date>()

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00.000.000/0001-00')
    setCopied(true)
    toast({
      title: 'Chave PIX copiada!',
      description: 'Cole no aplicativo do seu banco para transferir.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Perfil atualizado',
      description: 'Seus dados foram salvos com sucesso.',
    })
  }

  const handleRequestDocument = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Solicitação enviada',
      description: 'O documento foi solicitado à secretaria.',
    })
  }

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: 'Agendamento solicitado',
      description: 'Entraremos em contato para confirmar o horário.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Gestão da Conta</h1>
        <p className="text-muted-foreground text-sm">
          Gerencie suas contribuições, dados e solicitações.
        </p>
      </div>

      <Tabs defaultValue="contribuicao" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
          <TabsTrigger
            value="contribuicao"
            className="py-2.5 text-xs sm:text-sm"
          >
            Contribuição
          </TabsTrigger>
          <TabsTrigger value="perfil" className="py-2.5 text-xs sm:text-sm">
            Meu Perfil
          </TabsTrigger>
          <TabsTrigger value="secretaria" className="py-2.5 text-xs sm:text-sm">
            Secretaria
          </TabsTrigger>
        </TabsList>

        {/* CONTRIBUIÇÃO */}
        <TabsContent value="contribuicao" className="space-y-4 mt-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Dízimos e Ofertas via PIX
              </CardTitle>
              <CardDescription>
                Contribua de forma rápida e segura.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Input
                    readOnly
                    value="00.000.000/0001-00"
                    className="bg-muted/50 font-mono text-center sm:text-left h-12 text-base"
                  />
                </div>
                <Button
                  onClick={handleCopyPix}
                  variant="secondary"
                  className="sm:w-36 h-12"
                >
                  {copied ? (
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 mr-2" />
                  )}
                  {copied ? 'Copiado' : 'Copiar Chave'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Cartão de Crédito
              </CardTitle>
              <CardDescription>
                Para contribuições únicas ou recorrentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  toast({ title: 'Cartão cadastrado com sucesso!' })
                }}
              >
                <div className="space-y-2">
                  <Label>Número do Cartão</Label>
                  <Input placeholder="0000 0000 0000 0000" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Validade</Label>
                    <Input placeholder="MM/AA" required />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Nome Impresso no Cartão</Label>
                  <Input
                    placeholder="JOAO A SILVA"
                    className="uppercase"
                    required
                  />
                </div>
                <Button type="submit" className="w-full mt-2">
                  Salvar Cartão
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PERFIL */}
        <TabsContent value="perfil" className="space-y-4 mt-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                Meus Dados
              </CardTitle>
              <CardDescription>
                Mantenha suas informações sempre atualizadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input defaultValue="João da Silva" required />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    defaultValue="joao.silva@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefone / WhatsApp</Label>
                  <Input defaultValue="(11) 99999-9999" required />
                </div>
                <div className="space-y-2 flex flex-col">
                  <Label>Data de Batismo (Opcional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !date && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, 'PPP', { locale: ptBR })
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button type="submit" className="w-full mt-2">
                  Salvar Alterações
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECRETARIA */}
        <TabsContent value="secretaria" className="space-y-4 mt-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Solicitar Documentos
              </CardTitle>
              <CardDescription>
                Peça certificados e cartas de recomendação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRequestDocument} className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Documento</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o documento necessário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="certificado_membro">
                        Certificado de Membro
                      </SelectItem>
                      <SelectItem value="certificado_batismo">
                        Certificado de Batismo
                      </SelectItem>
                      <SelectItem value="carta_recomendacao">
                        Carta de Recomendação
                      </SelectItem>
                      <SelectItem value="historico_cursos">
                        Histórico de Cursos
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Enviar Solicitação
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Agendamento Pastoral
              </CardTitle>
              <CardDescription>
                Marque um horário para aconselhamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSchedule} className="space-y-4">
                <div className="space-y-2 flex flex-col">
                  <Label>Data Preferencial</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !scheduleDate && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduleDate ? (
                          format(scheduleDate, 'PPP', { locale: ptBR })
                        ) : (
                          <span>Escolha um dia útil</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={scheduleDate}
                        onSelect={setScheduleDate}
                        disabled={(date) =>
                          date < new Date() || date.getDay() === 0
                        }
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Período</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Qual o melhor período?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manha">
                        Manhã (09:00 - 12:00)
                      </SelectItem>
                      <SelectItem value="tarde">
                        Tarde (14:00 - 18:00)
                      </SelectItem>
                      <SelectItem value="noite">
                        Noite (19:00 - 21:00)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" variant="secondary" className="w-full">
                  Solicitar Agendamento
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
