'use client'

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

const weeklyProgress = [
  { day: 'Jumamosi', lessons: 2, exercises: 5, minutes: 25, completed: true },
  { day: 'Jumapili', lessons: 1, exercises: 3, minutes: 15, completed: true },
  { day: 'Jumatatu', lessons: 3, exercises: 8, minutes: 35, completed: true },
  { day: 'Jumanne', lessons: 2, exercises: 6, minutes: 28, completed: true },
  { day: 'Jumatano', lessons: 1, exercises: 4, minutes: 18, completed: true },
  { day: 'Alhamisi', lessons: 2, exercises: 7, minutes: 32, completed: true },
  { day: 'Ijumaa', lessons: 0, exercises: 2, minutes: 8, completed: false },
]

const achievements = [
  { 
    id: 1, 
    title: 'Mwanzo Mzuri', 
    description: 'Kamilisha somo la kwanza', 
    icon: '🌟', 
    earned: true, 
    date: '2025-01-15' 
  },
  { 
    id: 2, 
    title: 'Mhesabu Mkuu', 
    description: 'Jifunze nambari 1-20', 
    icon: '🔢', 
    earned: true, 
    date: '2025-01-16' 
  },
  { 
    id: 3, 
    title: 'Familia Yangu', 
    description: 'Jifunze maneno ya familia', 
    icon: '👨👩👧👦', 
    earned: true, 
    date: '2025-01-17' 
  },
  { 
    id: 4, 
    title: 'Mfufulizo wa Siku 7', 
    description: 'Jifunza kwa siku 7 mfululizo', 
    icon: '🔥', 
    earned: true, 
    date: '2025-01-20' 
  },
  { 
    id: 5, 
    title: 'Bingwa wa Rangi', 
    description: 'Jifunze rangi zote', 
    icon: '🎨', 
    earned: false, 
    date: null 
  },
  { 
    id: 6, 
    title: 'Mfalme wa Wanyamapori', 
    description: 'Jifunze wanyamapori 20', 
    icon: '🦁', 
    earned: false, 
    date: null 
  },
]

const skillsProgress = [
  { skill: 'Kusoma', progress: 75, level: 'Kiwango 3', color: 'primary' },
  { skill: 'Kuandika', progress: 60, level: 'Kiwango 2', color: 'secondary' },
  { skill: 'Kusikiliza', progress: 85, level: 'Kiwango 3', color: 'success' },
  { skill: 'Mazungumzo', progress: 45, level: 'Kiwango 2', color: 'warning' },
]

export default function ProgressPage() {
  const totalLessons = weeklyProgress.reduce((sum, day) => sum + day.lessons, 0)
  const totalExercises = weeklyProgress.reduce((sum, day) => sum + day.exercises, 0)
  const totalMinutes = weeklyProgress.reduce((sum, day) => sum + day.minutes, 0)
  const earnedAchievements = achievements.filter(a => a.earned).length
  const streakDays = 7

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
              <div className="text-3xl font-bold text-sky-700 dark:text-sky-300 dyslexic-text">{totalLessons}</div>
              <p className="text-sm text-sky-600 dark:text-sky-400 dyslexic-text">Masomo wiki hii</p>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-violet-200 dark:bg-violet-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <GamepadIcon className="w-6 h-6 text-violet-700 dark:text-violet-300" />
              </div>
              <div className="text-3xl font-bold text-violet-700 dark:text-violet-300 dyslexic-text">{totalExercises}</div>
              <p className="text-sm text-violet-600 dark:text-violet-400 dyslexic-text">Mazoezi yamefanywa</p>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-pink-200 dark:bg-pink-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-pink-700 dark:text-pink-300" />
              </div>
              <div className="text-3xl font-bold text-pink-700 dark:text-pink-300 dyslexic-text">{totalMinutes}</div>
              <p className="text-sm text-pink-600 dark:text-pink-400 dyslexic-text">Dakika za kujifunza</p>
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
            <Card>
              <CardContent className="pt-6">
                <ProgressRoadmap />
              </CardContent>
            </Card>
            {/* Weekly Progress */}
            <Card>
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
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => {
                    const colors = [
                      'bg-gradient-to-r from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50',
                      'bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50',
                      'bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50',
                      'bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200/50',
                      'bg-gradient-to-r from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50',
                      'bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50',
                      'bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50'
                    ];
                    return (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${colors[index]}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          day.completed ? 'bg-emerald-500' : 'bg-gray-300'
                        }`} />
                        <div>
                          <p className="font-medium dyslexic-text">{day.day}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 dyslexic-text">
                            {day.lessons} masomo, {day.exercises} mazoezi
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-600 dyslexic-text">{day.minutes} dak</p>
                        {day.completed && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-emerald-500 fill-current" />
                            <span className="text-xs text-gray-500 dark:text-gray-400 dyslexic-text">Kamili</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )})
                  }
                </div>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card>
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
                <div className="space-y-6">
                  {skillsProgress.map((skill, index) => {
                    const skillColors = [
                      { bg: 'bg-gradient-to-r from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20', icon: 'bg-sky-200 dark:bg-sky-800', iconColor: 'text-sky-700 dark:text-sky-300', badge: 'bg-sky-200 text-sky-800 dark:bg-sky-800 dark:text-sky-200' },
                      { bg: 'bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20', icon: 'bg-violet-200 dark:bg-violet-800', iconColor: 'text-violet-700 dark:text-violet-300', badge: 'bg-violet-200 text-violet-800 dark:bg-violet-800 dark:text-violet-200' },
                      { bg: 'bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20', icon: 'bg-pink-200 dark:bg-pink-800', iconColor: 'text-pink-700 dark:text-pink-300', badge: 'bg-pink-200 text-pink-800 dark:bg-pink-800 dark:text-pink-200' },
                      { bg: 'bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20', icon: 'bg-indigo-200 dark:bg-indigo-800', iconColor: 'text-indigo-700 dark:text-indigo-300', badge: 'bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200' }
                    ];
                    const colors = skillColors[index];
                    return (
                    <div key={index} className={`p-4 rounded-lg border ${colors.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full ${colors.icon} flex items-center justify-center`}>
                            {skill.skill === 'Kusoma' && <BookOpen className={`w-4 h-4 ${colors.iconColor}`} />}
                            {skill.skill === 'Kuandika' && <Target className={`w-4 h-4 ${colors.iconColor}`} />}
                            {skill.skill === 'Kusikiliza' && <Volume2 className={`w-4 h-4 ${colors.iconColor}`} />}
                            {skill.skill === 'Mazungumzo' && <Heart className={`w-4 h-4 ${colors.iconColor}`} />}
                          </div>
                          <div>
                            <p className="font-medium dyslexic-text">{skill.skill}</p>
                            <Badge className={`text-xs dyslexic-text ${colors.badge}`}>
                              {skill.level}
                            </Badge>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 dyslexic-text">{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-3" />
                    </div>
                  )})
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Current Level */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 dyslexic-text">Kiwango 2</h3>
                <p className="text-gray-600 mb-4 dyslexic-text">Mwanafunzi Mzuri</p>
                <div className="mb-4">
                  <Progress value={65} className="mb-2" />
                  <p className="text-sm text-gray-600 dyslexic-text">65% hadi Kiwango 3</p>
                </div>
                <Badge variant="secondary" className="dyslexic-text">
                  450 alama
                </Badge>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 dyslexic-text">
                  <Award className="w-5 h-5" />
                  <span>Mafanikio</span>
                </CardTitle>
                <CardDescription className="dyslexic-text">
                  {earnedAchievements} kati ya {achievements.length} yamepata
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        achievement.earned 
                          ? 'bg-success-50 border border-success-200' 
                          : 'bg-gray-50 border border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className={`font-medium dyslexic-text ${
                          achievement.earned ? 'text-success-700' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className={`text-sm dyslexic-text ${
                          achievement.earned ? 'text-success-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-success-500 dyslexic-text">
                            {new Date(achievement.date).toLocaleDateString('sw-KE')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 dyslexic-text">
                  <Target className="w-5 h-5" />
                  <span>Lengo la Leo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary-600" />
                  </div>
                  <p className="font-medium mb-2 dyslexic-text">Jifunze maneno 5 mapya</p>
                  <Progress value={60} className="mb-2" />
                  <p className="text-sm text-gray-600 dyslexic-text">3 kati ya 5 yamejifunza</p>
                  <Button className="w-full mt-4 dyslexic-text">
                    Endelea Kujifunza
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}