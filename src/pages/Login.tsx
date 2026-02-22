import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ThemeToggle } from '@/components/theme-toggle'
import logoUrl from '@/assets/1000486575-8a4e3.png'
import { useAuth } from '@/hooks/use-auth'

const ChristianCross = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2v20" />
    <path d="M7 8h10" />
  </svg>
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showTransition, setShowTransition] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const { signIn, signInAsVisitor } = useAuth()

  const triggerTransition = () => {
    setShowTransition(true)
    setTimeout(() => {
      navigate('/')
    }, 2500)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await signIn(email, password)

    if (!error) {
      triggerTransition()
    } else {
      toast({
        variant: 'destructive',
        title: 'Acesso negado',
        description: error.message || 'Credenciais inválidas.',
      })
      setIsLoading(false)
    }
  }

  const handleVisitor = () => {
    signInAsVisitor()
    triggerTransition()
  }

  if (showTransition) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground animate-fade-in">
        <div className="flex flex-col items-center animate-fade-in-up">
          <ChristianCross className="w-24 h-24 text-primary animate-pulse-cross mb-8" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Jesus te ama!
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground relative overflow-hidden font-sans transition-colors duration-300">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle className="bg-white/10 backdrop-blur-md shadow-sm border border-white/20 text-white hover:bg-white/20 transition-colors duration-300" />
      </div>

      <div className="relative w-full h-[35vh] min-h-[250px] bg-zinc-950 dark:bg-black flex flex-col items-center justify-center shrink-0 transition-colors duration-300">
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
              <div className="space-y-2">
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
                  className="h-14 rounded-2xl bg-card border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.04)] px-5 text-[15px]"
                  required
                />
              </div>

              <div className="space-y-2">
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
                  className="h-14 rounded-2xl bg-card border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.04)] px-5 text-[15px]"
                  required
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                className="w-full h-14 rounded-2xl font-bold text-[15px] shadow-lg transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? 'Validando...' : 'Login'}
              </Button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-muted" />
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-medium uppercase">
                  ou
                </span>
                <div className="flex-grow border-t border-muted" />
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleVisitor}
                className="w-full h-14 rounded-2xl font-bold text-[15px] border-muted-foreground/20 hover:bg-muted/50 transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                Entrar como Visitante
              </Button>
            </div>

            <div className="mt-auto pt-6 pb-2 text-center">
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
