import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BookMarked, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PLANS = [
  { id: 1, title: 'Jornada da Fé', duration: '30 dias', progress: 40 },
  { id: 2, title: 'Provérbios Diários', duration: '31 dias', progress: 100 },
  { id: 3, title: 'Novo Testamento', duration: '90 dias', progress: 5 },
]

export default function Plans() {
  return (
    <div className="space-y-6 animate-fade-in-up py-4">
      <div className="flex items-center gap-2 px-1">
        <BookMarked className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Planos de Leitura</h1>
      </div>

      <div className="space-y-4">
        {PLANS.map((plan) => (
          <Card key={plan.id} className="shadow-none border-muted/60">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-base mb-0.5">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    {plan.duration}
                  </p>
                </div>
                {plan.progress === 100 ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <span className="text-sm font-bold text-primary">
                    {plan.progress}%
                  </span>
                )}
              </div>
              <Progress value={plan.progress} className="h-2 mb-4" />
              <Button
                variant={plan.progress === 100 ? 'outline' : 'default'}
                className="w-full h-10 rounded-xl font-semibold"
              >
                {plan.progress === 100
                  ? 'Concluído'
                  : plan.progress === 0
                    ? 'Iniciar Plano'
                    : 'Continuar Leitura'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
