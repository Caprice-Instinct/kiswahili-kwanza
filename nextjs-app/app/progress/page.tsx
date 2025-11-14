'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ProgressRoadmap } from "@/components/progress-roadmap"
import { 
  Trophy, 
  Star, 
  Target, 
  Calendar, 
  BookOpen, 
  GamepadIcon,
  TrendingUp,
  Award,
  Clock,
  Zap,
  Heart,
  Volume2
} from "lucide-react"

export default function ProgressPage() {
  const { data: session } = useSession()
  const [progress, setProgress] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    if (session) {
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => setProgress(data))
    }
  }, [session])

  const completedLessons = progress?.progress?.filter((p: any) => p.completed).length || 0
  const totalStars = progress?.progress?.reduce((sum: number, p: any) => sum + (p.stars || 0), 0) || 0
  const totalWords = completedLessons * 5 // Estimate 5 words per lesson
  const streakDays = session?.user?.streak || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 dyslexic-text">Maendeleo Yangu</h1>
            <p className="text-lg text-gray-600 dyslexic-text max-w-2xl mx-auto">
              Ona jinsi unavyoendelea kujifunza Kiswahili
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="text-center bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-sky-200 dark:bg-sky-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-sky-700 dark:text-sky-300" />
              </div>
              <div className="text-3xl font-bold text-sky-700 dark:text-sky-300 dyslexic-text">{completedLessons}</div>
              <p className="text-sm text-sky-600 dark:text-sky-400 dyslexic-text">Masomo yamekamilika</p>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-violet-200 dark:bg-violet-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <GamepadIcon className="w-6 h-6 text-violet-700 dark:text-violet-300" />
              </div>
              <div className="text-3xl font-bold text-violet-700 dark:text-violet-300 dyslexic-text">{totalStars}</div>
              <p className="text-sm text-violet-600 dark:text-violet-400 dyslexic-text">Nyota zilizopata</p>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-pink-200 dark:bg-pink-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-pink-700 dark:text-pink-300" />
              </div>
              <div className="text-3xl font-bold text-pink-700 dark:text-pink-300 dyslexic-text">{totalWords}</div>
              <p className="text-sm text-pink-600 dark:text-pink-400 dyslexic-text">Maneno yamejifunza</p>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200/50 dark:border-indigo-700/30">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-indigo-200 dark:bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />
              </div>
              <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 dyslexic-text">{streakDays}</div>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 dyslexic-text">Siku za mfululizo</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Roadmap */}
            <Card className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
              <CardContent className="pt-6">
                <ProgressRoadmap />
              </CardContent>
            </Card>
            {/* Weekly Progress */}
            <Card className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 dyslexic-text">
                  <Calendar className="w-5 h-5" />
                  <span>Maendeleo ya Wiki</span>
                </CardTitle>
                <CardDescription className="dyslexic-text">
                  Shughuli zako za kila siku
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 dyslexic-text">
                    Hakuna data ya maendeleo ya wiki kwa sasa.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 dyslexic-text">
                  <TrendingUp className="w-5 h-5" />
                  <span>Ujuzi Wangu</span>
                </CardTitle>
                <CardDescription className="dyslexic-text">
                  Maendeleo ya ujuzi mbalimbali
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 dyslexic-text">
                    Hakuna data ya ujuzi kwa sasa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Current Level */}
            <Card className="text-center bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 dyslexic-text">Kiwango {session?.user?.level || 1}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 dyslexic-text">Kiwango chako</p>
                <div className="mb-4">
                  <Progress value={completedLessons * 10} className="mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 dyslexic-text">{completedLessons * 10}% hadi Kiwango {(session?.user?.level || 1) + 1}</p>
                </div>
                <Badge variant="secondary" className="dyslexic-text">
                  {session?.user?.points || 0} alama
                </Badge>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 dyslexic-text">
                  <Award className="w-5 h-5" />
                  <span>Mafanikio</span>
                </CardTitle>
                <CardDescription className="dyslexic-text">
                  0 kati ya 0 yamepata
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 dyslexic-text">
                    Hakuna mafanikio kwa sasa.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Daily Goal */}
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 dyslexic-text">
                  <Target className="w-5 h-5" />
                  <span>Lengo la Leo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 dyslexic-text">
                    Hakuna lengo la leo kwa sasa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}