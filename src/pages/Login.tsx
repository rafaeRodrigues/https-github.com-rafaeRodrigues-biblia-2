import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ThemeToggle } from '@/components/theme-toggle'
import logoUrl from '@/assets/1000486575-fd3e2.png'
import { cn } from '@/lib/utils'

const CrossLoadingIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-pulse-cross', className)}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
  </svg>
)

const HeaderPattern = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
    <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border-[24px] border-white/20" />
    <div className="absolute top-1/4 -right-12 w-40 h-40 rounded-full bg-white/10" />
    <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-white/10 rotate-45 rounded-3xl" />
    <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full border-[12px] border-white/20" />
    <div className="absolute top-10 left-1/2 w-16 h-16 bg-white/5 rotate-12" />
  </div>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (
        (email.trim().toLowerCase() === 'rafa' ||
          email === 'vijaybhuva90@gmail.com') &&
        password === '123'
      ) {
        localStorage.setItem('auth', 'true')
        navigate('/')
        toast({
          title: 'Bem-vindo de volta!',
          description: 'Login realizado com sucesso.',
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Acesso negado',
          description: 'Credenciais inválidas. Tente rafa / 123.',
        })
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleGuest = () => {
    localStorage.setItem('auth', 'true')
    navigate('/')
    toast({
      title: 'Modo Visitante',
      description:
        'Você entrou como visitante. Alguns recursos podem estar limitados.',
    })
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground relative overflow-hidden font-sans transition-colors duration-300">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle className="bg-white/10 backdrop-blur-md shadow-sm border border-white/20 text-white hover:bg-white/20 transition-colors duration-300" />
      </div>

      {/* Header */}
      <div className="relative w-full h-[38vh] min-h-[300px] bg-zinc-950 dark:bg-black flex flex-col items-center justify-center shrink-0 transition-colors duration-300">
        <HeaderPattern />

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-8 pb-10 animate-fade-in-down">
          <img
            src={logoUrl}
            alt="Logo Igreja"
            className="w-56 h-auto max-h-32 object-contain mix-blend-screen opacity-90 transition-all duration-300"
          />
        </div>

        <svg
          className="absolute bottom-0 w-full h-16 text-background translate-y-[1px] z-20 transition-colors duration-300"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M0,20 C50,20 50,80 100,80 L100,100 L0,100 Z" />
        </svg>
      </div>

      {/* Body */}
      <div className="flex-1 px-8 pt-4 pb-8 flex flex-col z-10 bg-background overflow-y-auto scrollbar-none transition-colors duration-300">
        <div className="animate-fade-in-up flex-1 flex flex-col w-full max-w-sm mx-auto">
          <h2 className="text-[28px] font-semibold text-center mb-8 tracking-tight text-foreground">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-6 flex-1 flex flex-col"
          >
            <div className="space-y-4">
              <div
                className="space-y-2 animate-slide-up"
                style={{ animationDelay: '100ms', animationFillMode: 'both' }}
              >
                <Label
                  htmlFor="email"
                  className="text-[13px] font-semibold ml-1 text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="vijaybhuva90@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-2xl bg-card border border-transparent dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-visible:ring-primary/30 px-5 text-[15px]"
                  required
                />
              </div>

              <div
                className="space-y-2 animate-slide-up"
                style={{ animationDelay: '200ms', animationFillMode: 'both' }}
              >
                <Label
                  htmlFor="password"
                  className="text-[13px] font-semibold ml-1 text-muted-foreground"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 rounded-2xl bg-card border border-transparent dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-visible:ring-primary/30 px-5 text-[15px]"
                  required
                />
              </div>
            </div>

            <div
              className="pt-2 space-y-3 animate-slide-up"
              style={{ animationDelay: '300ms', animationFillMode: 'both' }}
            >
              <Button
                type="submit"
                className="w-full h-14 rounded-2xl font-bold text-[15px] shadow-lg transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <CrossLoadingIcon className="w-5 h-5 text-primary-foreground dark:text-primary" />
                    <span>Validando...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleGuest}
                className="w-full h-14 rounded-2xl font-bold text-[15px] border-2 bg-transparent hover:bg-muted/50 transition-all active:scale-[0.98]"
              >
                Entrar como Visitante
              </Button>
            </div>

            <div
              className="mt-auto pt-6 pb-2 text-center animate-fade-in"
              style={{ animationDelay: '400ms', animationFillMode: 'both' }}
            >
              <p className="text-[14px] text-muted-foreground font-medium">
                Don't have any account?{' '}
                <Link
                  to="/signup"
                  className="text-foreground font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
