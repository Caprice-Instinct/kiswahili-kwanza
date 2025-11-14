'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        isSignUp: 'false',
        redirect: false,
      })

      if (result?.error) {
        setError('Barua pepe au nenosiri si sahihi')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      setError('Kuna tatizo. Jaribu tena.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dyslexic-text">Kiswahili Kwanza</h1>
          <p className="text-gray-600 dyslexic-text">Karibu tena!</p>
        </div>

        <Card className="shadow-lg bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl dyslexic-text">Ingia</CardTitle>
            <CardDescription className="dyslexic-text">
              Ingia akaunti yako ili kuendelea kujifunza
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Google Sign In */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full py-3 text-lg dyslexic-text bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2"
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#d946ef" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Ingia kwa Google
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-sky-200 dark:border-sky-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 dyslexic-text bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300">Au</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                  <p className="text-primary-700 text-sm dyslexic-text">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dyslexic-text">
                  Barua Pepe
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dyslexic-text"
                    placeholder="mwanafunzi@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 dyslexic-text">
                  Nenosiri
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dyslexic-text"
                    placeholder="Andika nenosiri lako"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-3 text-lg dyslexic-text"
                disabled={isLoading}
              >
                {isLoading ? 'Inapakia...' : 'Ingia'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dyslexic-text">
                Huna akaunti?{' '}
                <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                  Jisajili hapa
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 dyslexic-text">
                Kwa kuingia, unakubali{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-700 underline">
                  Masharti na Hali
                </Link>
                {' '}na{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-700 underline">
                  Sera ya Faragha
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Badge variant="secondary" className="dyslexic-text">
                  Kwa watoto wenye dyslexia
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}