'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Home, 
  BookOpen, 
  GamepadIcon, 
  Trophy, 
  User, 
  Settings,
  Volume2,
  Heart,
  LogOut,
  LogIn,
  HelpCircle,
  Shield,
  Bell
} from 'lucide-react'

const publicNavigationItems = [
  { href: '/', label: 'Nyumbani', icon: Home },
]

const authenticatedNavigationItems = [
  { href: '/dashboard', label: 'Dashibodi', icon: User },
  { href: '/lessons', label: 'Masomo', icon: BookOpen },
  { href: '/practice', label: 'Mazoezi', icon: GamepadIcon },
  { href: '/progress', label: 'Maendeleo', icon: Trophy },
]

export function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b-2 border-sky-100 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-violet-500 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-sky-700 dark:text-sky-400 dyslexic-text">
                Kiswahili Kwanza
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 dyslexic-text">Jifunze kwa furaha</p>
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {(session ? authenticatedNavigationItems : publicNavigationItems).map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-sky-500 text-white shadow-md dark:bg-sky-600' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-900/20 dark:hover:text-sky-300'
                      }
                      dyslexic-text font-medium
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* User Profile & Settings */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {session && (
              <>
                {/* Sound Toggle */}
                <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-900/20">
                  <Volume2 className="w-5 h-5" />
                </Button>
                
                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 p-2 hover:bg-sky-50 dark:hover:bg-sky-900/20">
                      <Avatar className="w-8 h-8 border-2 border-sky-200">
                        <AvatarImage src={session.user?.image || "/placeholder-avatar.jpg"} alt="Mwanafunzi" />
                        <AvatarFallback className="bg-sky-100 text-sky-700 font-semibold">
                          {session.user?.name?.charAt(0) || 'M'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 dyslexic-text">{session.user?.name || 'Mwanafunzi'}</p>
                        <div className="flex items-center space-x-1">
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            Kiwango {session.user?.level || 1}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{session.user?.points || 0} alama</span>
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="dyslexic-text">
                      {session.user?.name || 'Mwanafunzi'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="dyslexic-text">
                      <User className="mr-2 h-4 w-4" />
                      <span>Wasifu Wangu</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dyslexic-text">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Mipangilio</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dyslexic-text">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Arifa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dyslexic-text">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Usalama</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dyslexic-text">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Msaada</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="dyslexic-text text-red-600 dark:text-red-400" 
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Toka</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </>
            )}
            
            {!session && status !== 'loading' && (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="dyslexic-text">
                    <LogIn className="w-4 h-4 mr-2" />
                    Ingia
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="dyslexic-text">
                    Jisajili
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex justify-around py-2">
          {(session ? authenticatedNavigationItems : publicNavigationItems).map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <Button
                  variant="ghost"
                  className={`
                    w-full flex flex-col items-center space-y-1 py-2 px-1 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-900/20 dark:hover:text-sky-300
                    ${isActive 
                      ? 'text-sky-600 bg-sky-50 dark:text-sky-400 dark:bg-sky-900/20' 
                      : 'text-gray-600 dark:text-gray-400'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs dyslexic-text font-medium">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}