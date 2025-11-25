'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Trophy, Target, Star, Play } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session } = useSession()
  const [progress, setProgress] = useState<any>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [userStats, setUserStats] = useState<any>(null)

  useEffect(() => {
    if (session) {
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => setProgress(data))
      
      fetch('/api/lessons')
        .then(res => res.json())
        .then(data => setLessons(data))
        
      fetch('/api/user/progress')
        .then(res => res.json())
        .then(data => setUserStats(data))
    }
  }, [session])

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

        {/* Progress Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userStats?.stats?.totalLessonsCompleted || 0}</div>
              <p className="text-sm text-gray-600 dyslexic-text">Masomo yamekamilika</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{Math.floor((userStats?.stats?.averageScore || 0) / 20)}</div>
              <p className="text-sm text-gray-600 dyslexic-text">Nyota zilizopata</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{userStats?.wordsLearned || 25}</div>
              <p className="text-sm text-gray-600 dyslexic-text">Maneno yamejifunza</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats?.streak || 0}</div>
              <p className="text-sm text-gray-600 dyslexic-text">Siku za mfululizo</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dyslexic-text text-sky-800 dark:text-sky-200">Kiwango</CardTitle>
              <Trophy className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dyslexic-text text-sky-800 dark:text-sky-200">{session.user?.level || 1}</div>
              <p className="text-xs dyslexic-text text-sky-600 dark:text-sky-400">
                Kiwango chako cha sasa
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dyslexic-text text-violet-800 dark:text-violet-200">Alama</CardTitle>
              <Star className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dyslexic-text text-violet-800 dark:text-violet-200">{session.user?.points || 0}</div>
              <p className="text-xs dyslexic-text text-violet-600 dark:text-violet-400">
                Jumla ya alama
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium dyslexic-text text-pink-800 dark:text-pink-200">Maendeleo</CardTitle>
              <Target className="h-4 w-4 text-pink-600 dark:text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dyslexic-text text-pink-800 dark:text-pink-200">
                {progress?.progress?.length > 0 ? 
                  Math.round((progress.progress.filter((p: any) => p.completed).length / progress.progress.length) * 100) : 0}%
              </div>
              <Progress value={progress?.progress?.length > 0 ? 
                (progress.progress.filter((p: any) => p.completed).length / progress.progress.length) * 100 : 0} className="mt-2" />
              <p className="text-xs dyslexic-text text-pink-600 dark:text-pink-400 mt-1">
                Kiwango cha 1
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
            <CardHeader>
              <CardTitle className="dyslexic-text flex items-center gap-2 text-sky-800 dark:text-sky-200">
                <BookOpen className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                Endelea na Masomo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dyslexic-text mb-4 text-sky-600 dark:text-sky-400">
                {lessons.length > 0 ? `Masomo ${lessons.length} yapatikana` : 'Endelea na somo lako la hivi karibuni'}
              </p>
              <Link href="/lessons">
                <Button className="w-full dyslexic-text">
                  <Play className="h-4 w-4 mr-2" />
                  Anza Somo
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
            <CardHeader>
              <CardTitle className="dyslexic-text flex items-center gap-2 text-violet-800 dark:text-violet-200">
                <Trophy className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                Mazoezi ya Haraka
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="dyslexic-text mb-4 text-violet-600 dark:text-violet-400">
                {progress?.dailyProgress ? `Leo: ${progress.dailyProgress.exercisesCompleted} mazoezi` : 'Fanya mazoezi ya haraka kupata alama zaidi'}
              </p>
              <Link href="/practice">
                <Button variant="outline" className="w-full dyslexic-text bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
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