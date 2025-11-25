"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Target,
} from "lucide-react";

function buildLessons(progressArr: any[] = []) {
  return MASOMO_CATEGORIES.map((category, index) => {
    const lessonId = (index + 1).toString();
    const progress = progressArr.find((p) => p.lessonId === lessonId);
    return {
      id: index + 1,
      title: category.title,
      titleEn: category.titleEnglish,
      description: category.description,
      level:
        category.difficulty <= 2
          ? "Mwanzo"
          : category.difficulty <= 4
          ? "Kati"
          : "Juu",
      levelColor:
        category.difficulty <= 2
          ? "success"
          : category.difficulty <= 4
          ? "warning"
          : "destructive",
      duration: `${10 + category.difficulty * 2} dakika`,
      topics: category.content.slice(0, 3).map((item) => item.kiswahili),
      completed: !!progress?.storyCompleted,
      progress: 0,
      stars: 0,
      words: category.content.length,
      exercises: Math.ceil(category.content.length * 1.2),
      unlocked:
        progress?.unlocked ||
        !category.locked ||
        !!progress?.flashcardsCompleted ||
        !!progress?.storyCompleted,
    };
  });
}

import { useState, useEffect } from "react";
export default function LessonsPage() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [completionFilter, setCompletionFilter] = useState<string>("");
  const [lessons, setLessons] = useState(buildLessons());
  const [userBadges, setUserBadges] = useState<
    Array<{ lessonId: number; badgeIcon: string }>
  >([]);

  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const totalStars = lessons.reduce((sum, lesson) => sum + lesson.stars, 0);
  const totalWords = lessons
    .filter((lesson) => lesson.completed)
    .reduce((sum, lesson) => sum + lesson.words, 0);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch("/api/progress");
        const data = await res.json();
        if (data.progress) {
          setLessons(
            buildLessons(
              Array.isArray(data.progress) ? data.progress : [data.progress]
            )
          );
        }
      } catch {}
      try {
        const res = await fetch("/api/badges");
        const data = await res.json();
        if (data.userBadges && data.badges) {
          setUserBadges(
            data.userBadges
              .map((ub: any) => {
                const badge = data.badges.find(
                  (b: any) => b._id === ub.badgeId
                );
                return badge
                  ? {
                      lessonId: badge.requirement?.lessonId,
                      badgeIcon: badge.icon,
                    }
                  : null;
              })
              .filter(Boolean)
          );
        }
      } catch {}
    }
    fetchProgress();
  }, []);

  // Filter and search logic
  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(search.toLowerCase()) ||
      lesson.titleEn.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? lesson.level === filter : true;
    const isCompleted = lesson.completed;
    const matchesCompletion =
      completionFilter === "completed"
        ? isCompleted
        : completionFilter === "not_completed"
        ? !isCompleted
        : true;
    return matchesSearch && matchesFilter && matchesCompletion;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 dyslexic-text">
              Masomo ya Kiswahili
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 dyslexic-text max-w-2xl mx-auto">
              Chagua somo ili kuanza safari yako ya kujifunza Kiswahili
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            placeholder="Tafuta somo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 dyslexic-text"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 dyslexic-text"
          >
            <option value="">Chuja kwa ngazi</option>
            <option value="Mwanzo">Mwanzo</option>
            <option value="Kati">Kati</option>
            <option value="Juu">Juu</option>
          </select>
          <select
            value={completionFilter}
            onChange={(e) => setCompletionFilter(e.target.value)}
            className="w-full md:w-56 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 dyslexic-text"
          >
            <option value="">Chuja kwa hali</option>
            <option value="completed">Zilizokamilika</option>
            <option value="not_completed">Bado</option>
          </select>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLessons.map((lesson) => (
              <Card
                key={lesson.id}
                className={`card-hover relative overflow-hidden ${
                  !lesson.unlocked ? "opacity-60" : ""
                } ${lesson.completed ? "ring-2 ring-success-200" : ""}`}
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
                      <span className="text-xs text-gray-500 dyslexic-text">
                        {lesson.duration}
                      </span>
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
                              ? "text-secondary-500 fill-current"
                              : "text-gray-300"
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
                        <span className="text-xs text-gray-500 dyslexic-text">
                          +{lesson.topics.length - 3}
                        </span>
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
                    variant={
                      lesson.unlocked
                        ? lesson.completed
                          ? "secondary"
                          : "default"
                        : "outline"
                    }
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
    </div>
  );
}
