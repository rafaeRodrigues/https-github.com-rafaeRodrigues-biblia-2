import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import Index from './pages/Index'
import Church from './pages/Church'
import Events from './pages/Events'
import Management from './pages/Management'
import Bible from './pages/Bible'
import Plans from './pages/Plans'
import Notes from './pages/Notes'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isVisitor, loading } = useAuth()

  if (loading) {
    return <div className="h-screen w-screen bg-background" />
  }

  if (!user && !isVisitor) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

const App = () => (
  <AuthProvider>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter
        future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Index />} />
              <Route path="/igreja" element={<Church />} />
              <Route path="/campus" element={<Events />} />
              <Route path="/management" element={<Management />} />
              <Route path="/bible" element={<Bible />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/notes" element={<Notes />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
)

export default App
