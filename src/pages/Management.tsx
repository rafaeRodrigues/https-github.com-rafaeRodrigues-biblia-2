import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  FileText,
  Calendar as CalendarIcon,
  User,
  LogOut,
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export default function Management() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [, setCopied] = useState(false)

  const handleCopyPix = () => {
    navigator.clipboard.writeText('00.000.000/0001-00')
    setCopied(true)
    toast({ title: 'Chave PIX copiada!' })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast({ title: 'Sucesso', description: 'Operação realizada com sucesso.' })
  }

  const handleLogout = async () => {
    await signOut()
    toast({
      title: 'Sessão encerrada',
      description: 'Você saiu da sua conta com sucesso.',
    })
    navigate('/login')
  }

  return (
    <div className="space-y-6 animate-fade-in-up py-4">
      <div className="flex flex-col gap-1 px-1">
        <h1 className="text-2xl font-bold tracking-tight">Gestão</h1>
        <p className="text-muted-foreground text-sm">
          Módulo de Contribuição e Gestão.
        </p>
      </div>

      <Tabs defaultValue="contribuicao" className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/40 h-12 rounded-xl">
          <TabsTrigger
            value="contribuicao"
            className="rounded-lg text-[13px] font-semibold"
          >
            Doar
          </TabsTrigger>
          <TabsTrigger
            value="perfil"
            className="rounded-lg text-[13px] font-semibold"
          >
            Perfil
          </TabsTrigger>
          <TabsTrigger
            value="secretaria"
            className="rounded-lg text-[13px] font-semibold"
          >
            Secretaria
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contribuicao" className="space-y-4 mt-6">
          <Card className="shadow-none border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-[17px] flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" /> PIX
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value="00.000.000/0001-00"
                  className="bg-muted/20 font-mono h-12 text-base"
                />
                <Button
                  onClick={handleCopyPix}
                  variant="secondary"
                  className="w-14 h-12 shrink-0"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-[17px] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Cartão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSave}>
                <div className="space-y-2">
                  <Label>Cartão</Label>
                  <Input className="bg-muted/20 h-12" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Validade</Label>
                    <Input className="bg-muted/20 h-12" required />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input
                      type="password"
                      maxLength={4}
                      className="bg-muted/20 h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Input
                    type="number"
                    className="bg-muted/20 h-12 text-lg"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-semibold"
                >
                  Contribuir
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perfil" className="space-y-4 mt-6">
          <Card className="shadow-none border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-[17px] flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input className="bg-muted/20 h-12" required />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input className="bg-muted/20 h-12" required />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-semibold"
                >
                  Salvar
                </Button>
              </form>
            </CardContent>
          </Card>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full text-destructive hover:bg-destructive/10 h-12"
          >
            <LogOut className="w-5 h-5 mr-2" /> Sair da Conta
          </Button>
        </TabsContent>

        <TabsContent value="secretaria" className="space-y-4 mt-6">
          <Card className="shadow-none border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-[17px] flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Documentos
              </CardTitle>
              <CardDescription>Solicitar documentos.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <Select required>
                  <SelectTrigger className="h-12 bg-muted/20">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="membro">Membro</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-semibold"
                >
                  Solicitar
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-none border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-[17px] flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" /> Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <Input type="date" className="bg-muted/20 h-12" required />
                <Select required>
                  <SelectTrigger className="h-12 bg-muted/20">
                    <SelectValue placeholder="Turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manha">Manhã</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full h-12 rounded-xl font-semibold"
                >
                  Agendar
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
