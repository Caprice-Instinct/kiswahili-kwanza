'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { 
  BookOpen, 
  GamepadIcon, 
  Trophy, 
  Star, 
  Users, 
  Globe, 
  Heart,
  Volume2,
  Play,
  Award,
  Target,
  Zap
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-md">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dyslexic-text">Kwa watoto wenye dyslexia</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 dyslexic-text spacing-comfortable">
              Karibu 
              <span className="text-primary-600 dark:text-primary-400">Kiswahili</span>
              <br />
              <span className="text-secondary-600 dark:text-secondary-400">Kwanza!</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto dyslexic-text leading-relaxed">
              Jifunze Kiswahili kwa njia rahisi na ya kufurahisha. 
              Programu hii imetengenezwa maalum kwa watoto wenye dyslexia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/lessons">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 dyslexic-text">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Anza Kujifunza
                </Button>
              </Link>
              <Link href="/practice">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 dyslexic-text">
                  <GamepadIcon className="w-5 h-5 mr-2" />
                  Fanya Mazoezi
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600 dyslexic-text">6-9</div>
                <p className="text-sm text-gray-600 dyslexic-text">Miaka ya umri</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 dyslexic-text">AI</div>
                <p className="text-sm text-gray-600 dyslexic-text">Msaidizi wa akili</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600 dyslexic-text">24/7</div>
                <p className="text-sm text-gray-600 dyslexic-text">Muda wote</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Progress Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dyslexic-text">Maendeleo Yako</h2>
            <p className="text-lg text-gray-600 dyslexic-text">Ona jinsi unavyoendelea kujifunza</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-sky-200 dark:bg-sky-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-sky-700 dark:text-sky-300" />
                </div>
                <CardTitle className="dyslexic-text text-sky-800 dark:text-sky-200">Masomo</CardTitle>
                <CardDescription className="dyslexic-text text-sky-600 dark:text-sky-400">Umekamilisha masomo 3 kati ya 12</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={25} className="mb-4" />
                <div className="flex justify-between text-sm text-sky-600 dark:text-sky-400 dyslexic-text">
                  <span>Kiwango 1</span>
                  <span>25%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-violet-200 dark:bg-violet-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-violet-700 dark:text-violet-300" />
                </div>
                <CardTitle className="dyslexic-text text-violet-800 dark:text-violet-200">Alama</CardTitle>
                <CardDescription className="dyslexic-text text-violet-600 dark:text-violet-400">Umepata alama 450 wiki hii</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-violet-700 dark:text-violet-300 mb-2 dyslexic-text">450</div>
                  <Badge variant="secondary" className="dyslexic-text bg-violet-200 text-violet-800 dark:bg-violet-800 dark:text-violet-200">Kiwango 2</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-pink-200 dark:bg-pink-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-pink-700 dark:text-pink-300" />
                </div>
                <CardTitle className="dyslexic-text text-pink-800 dark:text-pink-200">Lengo la Leo</CardTitle>
                <CardDescription className="dyslexic-text text-pink-600 dark:text-pink-400">Jifunze maneno 5 mapya</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={60} className="mb-4" />
                <div className="flex justify-between text-sm text-pink-600 dark:text-pink-400 dyslexic-text">
                  <span>3 kati ya 5</span>
                  <span>60%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dyslexic-text">Kwa Nini Kiswahili Kwanza?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dyslexic-text">
              Programu yetu imetengenezwa maalum kwa watoto wenye dyslexia, 
              ikitumia teknolojia ya AI na mbinu za kisayansi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-200 dark:bg-sky-800 rounded-lg flex items-center justify-center mb-4">
                  <Volume2 className="w-6 h-6 text-sky-700 dark:text-sky-300" />
                </div>
                <CardTitle className="dyslexic-text text-sky-800 dark:text-sky-200">Sauti na Picha</CardTitle>
                <CardDescription className="dyslexic-text text-sky-600 dark:text-sky-400">
                  Kila neno lina sauti na picha ili kurahisisha kujifunza
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
              <CardHeader>
                <div className="w-12 h-12 bg-violet-200 dark:bg-violet-800 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-violet-700 dark:text-violet-300" />
                </div>
                <CardTitle className="dyslexic-text text-violet-800 dark:text-violet-200">Haraka na Rahisi</CardTitle>
                <CardDescription className="dyslexic-text text-violet-600 dark:text-violet-400">
                  Masomo mafupi ya dakika 5-10 tu kwa siku
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-200 dark:bg-pink-800 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-pink-700 dark:text-pink-300" />
                </div>
                <CardTitle className="dyslexic-text text-pink-800 dark:text-pink-200">Tuzo na Zawadi</CardTitle>
                <CardDescription className="dyslexic-text text-pink-600 dark:text-pink-400">
                  Pata tuzo na alama kwa kila somo unalokamilisha
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-200 dark:bg-sky-800 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-sky-700 dark:text-sky-300" />
                </div>
                <CardTitle className="dyslexic-text text-sky-800 dark:text-sky-200">Kwa Dyslexia</CardTitle>
                <CardDescription className="dyslexic-text text-sky-600 dark:text-sky-400">
                  Imetengenezwa maalum kwa watoto wenye dyslexia
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-indigo-200/50 dark:border-indigo-700/30">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-200 dark:bg-indigo-800 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />
                </div>
                <CardTitle className="dyslexic-text text-indigo-800 dark:text-indigo-200">Utamaduni wa Afrika</CardTitle>
                <CardDescription className="dyslexic-text text-indigo-600 dark:text-indigo-400">
                  Jifunze lugha na utamaduni wa Afrika Mashariki
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-200 dark:bg-pink-800 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-pink-700 dark:text-pink-300" />
                </div>
                <CardTitle className="dyslexic-text text-pink-800 dark:text-pink-200">AI Msaidizi</CardTitle>
                <CardDescription className="dyslexic-text text-pink-600 dark:text-pink-400">
                  Msaidizi wa akili bandia anakusaidia kila wakati
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 dyslexic-text">
            Uko Tayari Kuanza?
          </h2>
          <p className="text-lg text-gray-600 mb-8 dyslexic-text">
            Jiunge na watoto wengi wanaojifunza Kiswahili kwa furaha na mafanikio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lessons">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 dyslexic-text">
                <Play className="w-5 h-5 mr-2" />
                Anza Sasa
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 dyslexic-text">
                Jifunze Zaidi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
