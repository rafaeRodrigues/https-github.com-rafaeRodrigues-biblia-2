import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Home,
  LayoutGrid,
  Bell,
  UserCircle,
  PlayCircle,
  Book,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import logoUrl from '@/assets/1000486575-8a4e3.png'
import { ThemeToggle } from '@/components/theme-toggle'

const ChurchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 22V10a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v12" />
    <path d="M12 8v4" />
    <path d="M10 10h4" />
    <path d="m12 2-8 6h16z" />
    <path d="M2 22h20" />
  </svg>
)

const NavItem = ({ to, icon: Icon, label, current }: any) => {
  const isActive = current === to || (to !== '/' && current?.startsWith(to))
  return (
    <Link
      to={to}
      className="flex flex-col items-center justify-center flex-1 h-14 gap-1 relative group"
    >
      <div
        className={cn(
          'p-1.5 rounded-full transition-colors duration-300',
          isActive ? 'bg-muted' : 'bg-transparent',
        )}
      >
        <Icon
          className={cn(
            'w-5 h-5 transition-colors duration-300',
            isActive ? 'text-foreground' : 'text-muted-foreground',
          )}
        />
      </div>
      <span
        className={cn(
          'text-[10px] font-semibold transition-colors duration-300',
          isActive ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>
    </Link>
  )
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
      <div className="flex-1 flex flex-col min-w-0 h-full relative max-w-md mx-auto border-x shadow-2xl bg-card transition-colors duration-300">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 shrink-0 pt-2 z-10 bg-card transition-colors duration-300">
          <div className="flex flex-col justify-center h-full max-w-[60%]">
            <img
              src={logoUrl}
              alt="Igreja Batista da Palavra"
              className="h-8 w-auto object-contain object-left invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen opacity-90 transition-all duration-300"
            />
          </div>
          <div className="flex items-center gap-1 text-muted-foreground shrink-0">
            <ThemeToggle className="w-9 h-9" />
            <div className="w-9 h-9 flex items-center justify-center hover:bg-muted rounded-full cursor-pointer transition-colors duration-300">
              <Bell className="w-5 h-5" />
            </div>
            <div className="w-9 h-9 flex items-center justify-center hover:bg-muted rounded-full cursor-pointer transition-colors duration-300">
              <UserCircle className="w-6 h-6 text-foreground/80 transition-colors duration-300" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-28 px-4 relative scrollbar-none">
          <Outlet />
        </main>

        {/* Bottom Nav */}
        <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] bg-background/95 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border flex items-center justify-between px-1 py-1 z-50 transition-colors duration-300">
          <NavItem
            icon={Home}
            label="Home"
            to="/"
            current={location.pathname}
          />
          <NavItem
            icon={ChurchIcon}
            label="Igreja"
            to="/igreja"
            current={location.pathname}
          />
          <NavItem
            icon={Book}
            label="Bíblia"
            to="/bible"
            current={location.pathname}
          />
          <NavItem
            icon={PlayCircle}
            label="Mídia"
            to="/midia"
            current={location.pathname}
          />
          <NavItem
            icon={LayoutGrid}
            label="Gestão"
            to="/management"
            current={location.pathname}
          />
        </nav>
      </div>
    </div>
  )
}
