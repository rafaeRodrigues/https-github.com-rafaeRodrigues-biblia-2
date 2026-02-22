import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, Calendar as CalendarIcon, User, Bell } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { path: '/', label: 'Início', icon: Home },
  { path: '/events', label: 'Eventos', icon: CalendarIcon },
  { path: '/management', label: 'Gestão', icon: User },
]

const NOTIFICATIONS = [
  { id: 1, title: 'Culto de Celebração', time: 'Hoje, 19:00', read: false },
  { id: 2, title: 'Reunião de Liderança', time: 'Amanhã, 20:00', read: true },
]

export default function Layout() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-muted/30 dark:bg-zinc-950">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="p-6 flex items-center gap-3">
          <img
            src="https://img.usecurling.com/i?q=cross&color=solid-black&shape=outline"
            alt="Logo Igreja Batista"
            className="w-8 h-8 dark:invert"
          />
          <span className="font-semibold text-lg tracking-tight">
            Igreja Batista
          </span>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                location.pathname === item.path ||
                  (item.path === '/' && location.pathname === '/bible')
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted',
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b bg-background md:justify-end shrink-0">
          <div className="flex items-center gap-2 md:hidden">
            <img
              src="https://img.usecurling.com/i?q=cross&color=solid-black&shape=outline"
              alt="Logo"
              className="w-7 h-7 dark:invert"
            />
            <span className="font-semibold tracking-tight">Igreja Batista</span>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-muted"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-4 border-b font-medium bg-muted/30">
                Notificações
              </div>
              <ScrollArea className="h-[280px]">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      'p-4 border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors',
                      !n.read && 'bg-primary/5',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">
                        {n.title}
                      </p>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {n.time}
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 relative">
          <div className="max-w-4xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 flex items-center justify-around h-16 z-50">
        {NAV_ITEMS.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === '/' && location.pathname === '/bible')
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 transition-transform',
                  isActive && 'scale-110',
                )}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
