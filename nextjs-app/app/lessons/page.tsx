'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MASOMO_CATEGORIES } from "@/types/masomo";

import { 
  BookOpen, 
  Clock, 
  Star, 
  Play, 
  Lock, 
  CheckCircle,
  Volume2,
  Users,
  Trophy,
  Target
} from "lucide-react";

const lessons = MASOMO_CATEGORIES.map((category, index) => ({
  id: index + 1,
  title: category.title,
  titleEn: category.titleEnglish,
  description: category.description,
  level: category.difficulty <= 2 ? "Mwanzo" : category.difficulty <= 4 ? "Kati" : "Juu",
  levelColor: category.difficulty <= 2 ? "success" : category.difficulty <= 4 ? "warning" : "destructive",
  duration: `${10 + category.difficulty * 2} dakika`,
  topics: category.content.slice(0, 3).map(item => item.kiswahili),
  completed: false,
  progress: 0,
  stars: 0,
  words: category.content.length,
  exercises: Math.ceil(category.content.length * 1.2),
  unlocked: !category.locked
}));

export default function LessonsPage() {
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const totalStars = lessons.reduce((sum, lesson) => sum + lesson.stars, 0);
  const totalWords = lessons.filter(lesson => lesson.completed).reduce((sum, lesson) => sum + lesson.words, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 dyslexic-text">Masomo ya Kiswahili</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 dyslexic-text max-w-2xl mx-auto">
              Chagua somo ili kuanza safari yako ya kujifunza Kiswahili
            </p>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lessons.map((lesson) => (
              <Card 
                key={lesson.id} 
                className={`card-hover relative overflow-hidden ${
                  !lesson.unlocked ? 'opacity-60' : ''
                } ${
                  lesson.completed ? 'ring-2 ring-success-200' : ''
                }`}
              >
                {/* Progress Bar */}
                {lesson.progress > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className="h-full bg-primary-500 transition-all duration-300"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant={lesson.levelColor as any}
                      className="dyslexic-text text-xs"
                    >
                      {lesson.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500 dyslexic-text">{lesson.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg dyslexic-text leading-tight">
                      {lesson.title}
                    </CardTitle>
                    {lesson.completed && (
                      <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
                    )}
                    {!lesson.unlocked && (
                      <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                  
                  <CardDescription className="text-sm dyslexic-text leading-relaxed">
                    {lesson.description}
                  </CardDescription>
                  
                  {/* Stars */}
                  {lesson.stars > 0 && (
                    <div className="flex items-center space-x-1 mt-2">
                      {[...Array(3)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < lesson.stars 
                              ? 'text-secondary-500 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Topics */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {lesson.topics.slice(0, 3).map((topic, index) => (
                        <span
                          key={index}
                          className="bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-xs dyslexic-text"
                        >
                          {topic}
                        </span>
                      ))}
                      {lesson.topics.length > 3 && (
                        <span className="text-xs text-gray-500 dyslexic-text">+{lesson.topics.length - 3}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4 dyslexic-text">
                    <div className="flex items-center space-x-1">
                      <Volume2 className="w-3 h-3" />
                      <span>{lesson.words} maneno</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{lesson.exercises} mazoezi</span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    className="w-full dyslexic-text"
                    variant={lesson.unlocked ? (lesson.completed ? "secondary" : "default") : "outline"}
                    disabled={!lesson.unlocked}
                    asChild={lesson.unlocked}
                  >
                    {lesson.unlocked ? (
                      <Link href={`/lessons/${lesson.id}`}>
                        <div className="flex items-center justify-center space-x-2">
                          {lesson.completed ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Rudia</span>
                            </>
                          ) : lesson.progress > 0 ? (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Endelea</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              <span>Anza</span>
                            </>
                          )}
                        </div>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Imefungwa</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Summary */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50 dark:border-sky-700/30">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-sky-200 dark:bg-sky-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-sky-700 dark:text-sky-300" />
                </div>
                <div className="text-3xl font-bold text-sky-700 dark:text-sky-300 dyslexic-text mb-2">
                  {completedLessons}
                </div>
                <p className="text-sm text-sky-600 dark:text-sky-400 dyslexic-text">
                  Masomo yamekamilika
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 dark:border-violet-700/30">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-violet-200 dark:bg-violet-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-violet-700 dark:text-violet-300" />
                </div>
                <div className="text-3xl font-bold text-violet-700 dark:text-violet-300 dyslexic-text mb-2">
                  {totalStars}
                </div>
                <p className="text-sm text-violet-600 dark:text-violet-400 dyslexic-text">
                  Nyota zilizopata
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 dark:border-pink-700/30">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-pink-200 dark:bg-pink-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="w-8 h-8 text-pink-700 dark:text-pink-300" />
                </div>
                <div className="text-3xl font-bold text-pink-700 dark:text-pink-300 dyslexic-text mb-2">
                  {totalWords}
                </div>
                <p className="text-sm text-pink-600 dark:text-pink-400 dyslexic-text">
                  Maneno yamejifunza
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
