'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Shield } from 'lucide-react'

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  useEffect(() => {
    if (!email) {
      router.push('/auth/signin')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/auth/signin')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [email, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const verifyResponse = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      if (!verifyResponse.ok) {
        const data = await verifyResponse.json()
        setError(data.error || 'Msimbo si sahihi au umeisha muda')
        return
      }

      // Complete login with NextAuth
      const result = await signIn('credentials', {
        email,
        password: 'verified',
        otp,
        redirect: false,
      })

      if (result?.error) {
        setError('Kuingia kumeshindikana. Jaribu tena.')
      } else {
        setSuccess('Umefanikiwa kuingia!')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1000)
      }
    } catch (error) {
      console.error('OTP verification error:', error)
      setError('Kuthibitisha kumeshindikana. Jaribu tena.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setSuccess('Msimbo mpya umetumwa!')
        setTimeLeft(600) // Reset timer
      } else {
        setError('Kutuma msimbo kumeshindikana')
      }
    } catch (error) {
      setError('Kutuma msimbo kumeshindikana')
    } finally {
      setIsResending(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!email) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dyslexic-text">Thibitisha OTP</h1>
          <p className="text-gray-600 dyslexic-text">Tumekutumia msimbo wa usalama</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl dyslexic-text">Ingiza Msimbo</CardTitle>
            <CardDescription className="dyslexic-text">
              Msimbo umetumwa kwa {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm dyslexic-text">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-700 text-sm dyslexic-text">{success}</p>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium text-gray-700 dyslexic-text">
                  Msimbo wa OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dyslexic-text"
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </div>

              <div className="text-center text-sm text-gray-500 dyslexic-text">
                Msimbo utaisha baada ya: {formatTime(timeLeft)}
              </div>

              <Button
                type="submit"
                className="w-full py-3 text-lg dyslexic-text"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? 'Inathibitisha...' : 'Thibitisha'}
              </Button>
            </form>

            <div className="mt-4 text-center space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOTP}
                disabled={isResending || timeLeft > 540} // Allow resend after 1 minute
                className="w-full text-sm dyslexic-text"
              >
                {isResending ? 'Inatuma...' : 'Tuma msimbo tena'}
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => router.push('/auth/signin')}
                className="text-sm dyslexic-text"
              >
                Rudi nyuma
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}