import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft } from 'lucide-react'
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

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Erro de validação',
        description: 'As senhas não coincidem.',
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem('auth', 'true')
      navigate('/')
      toast({
        title: 'Conta criada!',
        description: 'Seja bem-vindo à nossa comunidade.',
      })
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground relative overflow-hidden font-sans transition-colors duration-300">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle className="bg-white/10 backdrop-blur-md shadow-sm border border-white/20 text-white hover:bg-white/20 transition-colors duration-300" />
      </div>

      {/* Header */}
      <div className="relative w-full h-[28vh] min-h-[220px] bg-zinc-950 dark:bg-black flex flex-col shrink-0 transition-colors duration-300">
        <HeaderPattern />

        <div className="relative z-10 flex items-center px-6 pt-16 animate-fade-in-down">
          <Link
            to="/login"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[28px] font-semibold text-white ml-5 tracking-tight">
            Sign Up
          </h1>
        </div>

        <svg
          className="absolute bottom-0 w-full h-12 text-background translate-y-[1px] z-20 transition-colors duration-300"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M0,20 C50,20 50,80 100,80 L100,100 L0,100 Z" />
        </svg>
      </div>

      {/* Body */}
      <div className="flex-1 px-8 pt-2 pb-8 flex flex-col z-10 bg-background overflow-y-auto scrollbar-none transition-colors duration-300">
        <div className="animate-fade-in-up flex-1 flex flex-col w-full max-w-sm mx-auto">
          <form
            onSubmit={handleSignUp}
            className="space-y-4 flex-1 flex flex-col"
          >
            <div className="space-y-3">
              <div
                className="space-y-1.5 animate-slide-up"
                style={{ animationDelay: '100ms', animationFillMode: 'both' }}
              >
                <Label
                  htmlFor="firstName"
                  className="text-[12px] font-semibold ml-1 text-muted-foreground"
                >
                  First name
                </Label>
                <Input
                  id="firstName"
                  placeholder="Vijay"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-12 rounded-2xl bg-card border border-transparent dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-visible:ring-primary/30 px-5"
                  required
                />
              </div>

              <div
                className="space-y-1.5 animate-slide-up"
                style={{ animationDelay: '150ms', animationFillMode: 'both' }}
              >
                <Label
                  htmlFor="lastName"
                  className="text-[12px] font-semibold ml-1 text-muted-foreground"
                >
                  Last name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Bhuva"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-12 rounded-2xl bg-card border border-transparent dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-visible:ring-primary/30 px-5"
                  required
                />
              </div>

              <div
                className="space-y-1.5 animate-slide-up"
                style={{ animationDelay: '200ms', animationFillMode: 'both' }}
              >
                <Label
                  htmlFor="email"
                  className="text-[12px] font-semibold ml-1 text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vijaybhuva90@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 rounded-2xl bg-card border border-transparent dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-visible:ring-primary/30 px-5"
                  required
                />
              </div>

              <div
                className="space-y-1.5 animate-slide-up"
                style={{ animationDelay: '250ms', animationFillMode: 'both' }}
              >
                <Label
                  htmlFor="password"
                  className="text-[12px] font-semibold ml-1 text-muted-foreground"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 rounded-2xl bg-card border border-transparent dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-visible:ring-primary/30 px-5"
                  required
                />
              </div>

              <div
                className="space-y-1.5 animate-slide-up"
                style={{ animationDelay: '300ms', animationFillMode: 'both' }}
              >
                <Label
                  htmlFor="confirmPassword"
                  className="text-[12px] font-semibold ml-1 text-muted-foreground"
                >
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-12 rounded-2xl bg-card border border-transparent dark:border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] focus-visible:ring-primary/30 px-5"
                  required
                />
              </div>
            </div>

            <div
              className="pt-2 mt-2 animate-slide-up"
              style={{ animationDelay: '350ms', animationFillMode: 'both' }}
            >
              <Button
                type="submit"
                className="w-full h-14 rounded-2xl font-bold text-[15px] shadow-lg transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <CrossLoadingIcon className="w-5 h-5 text-primary-foreground dark:text-primary" />
                    <span>Registrando...</span>
                  </div>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </div>

            <div
              className="mt-auto pt-6 pb-2 text-center animate-fade-in"
              style={{ animationDelay: '400ms', animationFillMode: 'both' }}
            >
              <p className="text-[14px] text-muted-foreground font-medium">
                Already have any account?{' '}
                <Link
                  to="/login"
                  className="text-foreground font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
