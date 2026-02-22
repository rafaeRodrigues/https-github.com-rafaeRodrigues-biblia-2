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

export default function Management() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

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

        {/* CONTRIBUIÇÃO */}
        <TabsContent value="contribuicao" className="space-y-4 mt-6">
          <Card className="shadow-none border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-[17px] flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Dízimos e Ofertas via PIX
              </CardTitle>
              <CardDescription>Dízimos e ofertas instantâneos.</CardDescription>
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
                <CreditCard className="w-5 h-5 text-primary" />
                Cartão de Crédito
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSave}>
                <div className="space-y-2">
                  <Label>Número do Cartão</Label>
                  <Input
                    placeholder="0000 0000 0000 0000"
                    className="bg-muted/20 h-12"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Validade</Label>
                    <Input
                      placeholder="MM/AA"
                      className="bg-muted/20 h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <Input
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      className="bg-muted/20 h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input
                    placeholder="0,00"
                    type="number"
                    className="bg-muted/20 h-12 font-semibold text-lg"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-semibold mt-2"
                >
                  Contribuir
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PERFIL */}
        <TabsContent value="perfil" className="space-y-4 mt-6">
          <Card className="shadow-none border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-[17px] flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Cadastro de Membros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome Completo</Label>
                  <Input
                    defaultValue="João da Silva"
                    className="bg-muted/20 h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input
                    type="email"
                    defaultValue="joao@email.com"
                    className="bg-muted/20 h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input
                    defaultValue="(11) 99999-9999"
                    className="bg-muted/20 h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data de Batismo</Label>
                  <Input type="date" className="bg-muted/20 h-12" />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-semibold mt-2"
                >
                  Salvar Perfil
                </Button>
              </form>
            </CardContent>
          </Card>

          <Button
            variant="ghost"
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive h-12"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair da Conta
          </Button>
        </TabsContent>

        {/* SECRETARIA */}
        <TabsContent value="secretaria" className="space-y-4 mt-6">
          <Card className="shadow-none border-muted/60">
            <CardHeader className="pb-4">
              <CardTitle className="text-[17px] flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Secretaria Virtual
              </CardTitle>
              <CardDescription>
                Solicitar documentos e agendamentos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Documento</Label>
                  <Select required>
                    <SelectTrigger className="h-12 bg-muted/20">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="membro">
                        Certificado de Membro
                      </SelectItem>
                      <SelectItem value="batismo">
                        Certificado de Batismo
                      </SelectItem>
                      <SelectItem value="recomendacao">
                        Carta de Recomendação
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <CalendarIcon className="w-5 h-5 text-primary" />
                Atendimento Pastoral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label>Data Preferencial</Label>
                  <Input type="date" className="bg-muted/20 h-12" required />
                </div>
                <div className="space-y-2">
                  <Label>Período</Label>
                  <Select required>
                    <SelectTrigger className="h-12 bg-muted/20">
                      <SelectValue placeholder="Selecione o turno..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manha">Manhã</SelectItem>
                      <SelectItem value="tarde">Tarde</SelectItem>
                      <SelectItem value="noite">Noite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
