import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

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
  const { signUp } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
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
    const { error } = await signUp(formData.email, formData.password)

    if (!error) {
      toast({
        title: 'Conta criada!',
        description: 'Seja bem-vindo à nossa comunidade.',
      })
      navigate('/')
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro ao criar conta',
        description: error.message,
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background text-foreground relative overflow-hidden font-sans transition-colors duration-300">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle className="bg-white/10 backdrop-blur-md shadow-sm border border-white/20 text-white hover:bg-white/20 transition-colors duration-300" />
      </div>

      <div className="relative w-full h-[28vh] min-h-[220px] bg-zinc-950 dark:bg-black flex flex-col shrink-0 transition-colors duration-300">
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

      <div className="flex-1 px-8 pt-2 pb-8 flex flex-col z-10 bg-background overflow-y-auto scrollbar-none transition-colors duration-300">
        <div className="animate-fade-in-up flex-1 flex flex-col w-full max-w-sm mx-auto">
          <form
            onSubmit={handleSignUp}
            className="space-y-4 flex-1 flex flex-col"
          >
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="firstName"
                  className="text-[12px] font-semibold ml-1"
                >
                  First name
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-12 rounded-2xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="lastName"
                  className="text-[12px] font-semibold ml-1"
                >
                  Last name
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-12 rounded-2xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-[12px] font-semibold ml-1"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 rounded-2xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-[12px] font-semibold ml-1"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-12 rounded-2xl"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-[12px] font-semibold ml-1"
                >
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="h-12 rounded-2xl"
                  required
                />
              </div>
            </div>

            <div className="pt-2 mt-2">
              <Button
                type="submit"
                className="w-full h-14 rounded-2xl font-bold shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Registrando...' : 'Sign Up'}
              </Button>
            </div>

            <div className="mt-auto pt-6 pb-2 text-center">
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
