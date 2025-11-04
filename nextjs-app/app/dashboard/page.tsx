'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Trophy, Target, Star, Play } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white dyslexic-text">
            Karibu, {session.user?.name}! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-300 dyslexic-text mt-2">
            Endelea na safari yako ya kujifunza Kiswahili
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card style={{background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)', borderColor: '#bae6fd'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dyslexic-text text-sky-800">Kiwango</CardTitle>
              <Trophy className="h-4 w-4 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dyslexic-text text-sky-800">{session.user?.level || 1}</div>
              <p className="text-xs dyslexic-text text-sky-600">
                Kiwango chako cha sasa
              </p>
            </CardContent>
          </Card>

          <Card style={{background: 'linear-gradient(to bottom right, #fef7ff, #fceaff)', borderColor: '#f8d4fe'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dyslexic-text text-violet-800">Alama</CardTitle>
              <Star className="h-4 w-4 text-violet-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dyslexic-text text-violet-800">{session.user?.points || 0}</div>
              <p className="text-xs dyslexic-text text-violet-600">
                Jumla ya alama
              </p>
            </CardContent>
          </Card>

          <Card style={{background: 'linear-gradient(to bottom right, #fdf2f8, #fce7f3)', borderColor: '#fbcfe8'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dyslexic-text text-pink-800">Maendeleo</CardTitle>
              <Target className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dyslexic-text text-pink-800">75%</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs dyslexic-text text-pink-600 mt-1">
                Kiwango cha 1
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card style={{background: 'linear-gradient(to bottom right, #f0f9ff, #e0f2fe)', borderColor: '#bae6fd'}}>
            <CardHeader>
              <CardTitle className="dyslexic-text flex items-center gap-2 text-sky-800">
                <BookOpen className="h-5 w-5 text-sky-600" />
                Endelea na Masomo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dyslexic-text mb-4 text-sky-600">
                Endelea na somo lako la hivi karibuni
              </p>
              <Link href="/lessons">
                <Button className="w-full dyslexic-text">
                  <Play className="h-4 w-4 mr-2" />
                  Anza Somo
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card style={{background: 'linear-gradient(to bottom right, #fef7ff, #fceaff)', borderColor: '#f8d4fe'}}>
            <CardHeader>
              <CardTitle className="dyslexic-text flex items-center gap-2 text-violet-800">
                <Trophy className="h-5 w-5 text-violet-600" />
                Mazoezi ya Haraka
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dyslexic-text mb-4 text-violet-600">
                Fanya mazoezi ya haraka kupata alama zaidi
              </p>
              <Link href="/practice">
                <Button variant="outline" className="w-full dyslexic-text" style={{backgroundColor: '#ffffff', borderColor: '#d1d5db'}}>
                  <Target className="h-4 w-4 mr-2" />
                  Anza Mazoezi
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}