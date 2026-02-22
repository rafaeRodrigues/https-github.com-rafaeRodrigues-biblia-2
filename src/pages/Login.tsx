import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cross } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ThemeToggle } from '@/components/theme-toggle'
import logoUrl from '@/assets/1000486575-fd3e2.png'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (username.trim().toLowerCase() === 'rafa' && password === '123') {
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Creative Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
        <div className="absolute w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-[80px] opacity-70 animate-blob animation-delay-2000 translate-x-32 -translate-y-32"></div>
        <div className="absolute w-[600px] h-[600px] bg-pink-500/10 rounded-full mix-blend-multiply dark:mix-blend-color-dodge filter blur-[80px] opacity-70 animate-blob animation-delay-4000 -translate-x-32 translate-y-32"></div>
      </div>

      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle className="bg-card/50 backdrop-blur-md shadow-sm border border-border/50" />
      </div>

      <div className="z-10 w-full max-w-md px-6 animate-fade-in-up">
        <div className="flex flex-col items-center mb-10">
          <div className="w-28 h-28 bg-card/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl mb-6 border border-white/10 dark:border-white/5 p-5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={logoUrl}
              alt="Logo Igreja"
              className="w-full h-full object-contain invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen opacity-90 relative z-10"
            />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Acesso
          </h1>
          <p className="text-muted-foreground text-sm text-center mt-2 font-medium">
            Entre para se conectar à nossa comunidade.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5 bg-card/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 dark:border-white/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/0 dark:from-white/5 dark:to-transparent pointer-events-none" />

          <div className="space-y-2.5 relative z-10">
            <Label
              htmlFor="username"
              className="text-foreground/80 ml-1 font-semibold"
            >
              Nome ou E-mail
            </Label>
            <Input
              id="username"
              placeholder="rafa"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background/50 border-white/20 dark:border-white/10 h-14 rounded-2xl px-4 text-base focus-visible:ring-primary/30 transition-all shadow-sm"
              required
            />
          </div>

          <div className="space-y-2.5 relative z-10">
            <div className="flex items-center justify-between ml-1">
              <Label
                htmlFor="password"
                className="text-foreground/80 font-semibold"
              >
                Senha
              </Label>
              <a
                href="#"
                className="text-[13px] text-primary font-bold hover:underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Recuperar senha
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="***"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 border-white/20 dark:border-white/10 h-14 rounded-2xl px-4 text-base focus-visible:ring-primary/30 transition-all shadow-sm"
              required
            />
          </div>

          <div className="pt-2 relative z-10">
            <Button
              type="submit"
              className="w-full h-14 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <Cross className="w-5 h-5 animate-pulse-cross text-primary-foreground" />
                  <span>Validando...</span>
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
