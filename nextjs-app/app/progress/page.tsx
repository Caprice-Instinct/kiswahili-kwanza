"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ProgressRoadmap } from "@/components/progress-roadmap";
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
  Volume2,
} from "lucide-react";

export default function ProgressPage() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (session) {
      // Fetch both reading and quiz progress
      Promise.all([
        fetch("/api/progress").then((res) => res.json()),
        fetch("/api/quiz/progress").then((res) => res.json()),
      ]).then(([reading, quiz]) => {
        setProgress({ ...reading, quiz });
      });
    }
  }, [session]);

  const completedLessons =
    progress?.user?.stats?.totalLessonsCompleted ||
    progress?.progress?.filter((p: any) => p.completed).length ||
    0;
  const totalStars =
    Math.floor((progress?.user?.stats?.averageScore || 0) / 20) ||
    progress?.progress?.reduce(
      (sum: number, p: any) => sum + (p.stars || 0),
      0
    ) ||
    0;
  const totalWords = completedLessons * 3 || 0;
  const streakDays = progress?.user?.streak || 0;

  // Helper for date formatting
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("sw-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 dyslexic-text">
              Maendeleo Yangu
            </h1>
            <p className="text-lg text-gray-600 dyslexic-text max-w-2xl mx-auto">
              Ona jinsi unavyoendelea kujifunza Kiswahili
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quiz Progress Table */}
          <div className="lg:col-span-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="dyslexic-text">
                  Jaribio Zote Ulizofanya
                </CardTitle>
                <CardDescription className="dyslexic-text">
                  Orodha ya majaribio yote na alama zako
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progress?.quiz?.attempts?.length ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Category</th>
                          <th className="p-2 text-left">Difficulty</th>
                          <th className="p-2 text-left">Score</th>
                          <th className="p-2 text-left">Percentage</th>
                          <th className="p-2 text-left">Date</th>
                          <th className="p-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progress.quiz.attempts.map((a: any, i: number) => {
                          // Fallbacks for old attempts
                          const category =
                            a.category ||
                            a.metadata?.category ||
                            a.quizCategory ||
                            "-";
                          const difficulty =
                            a.difficulty ||
                            a.metadata?.difficulty ||
                            a.quizDifficulty ||
                            "-";
                          const score =
                            typeof a.score === "number"
                              ? a.score
                              : a.points || 0;
                          const total =
                            a.totalPoints || a.total || a.maxScore || 0;
                          const percentage =
                            typeof a.percentage === "number"
                              ? a.percentage
                              : total
                              ? Math.round((score / total) * 100)
                              : 0;
                          const date = a.completedAt || a.date || a.createdAt;
                          const passed =
                            typeof a.passed === "boolean"
                              ? a.passed
                              : percentage >= 60;
                          return (
                            <tr key={a._id || i} className="border-b">
                              <td className="p-2">{category}</td>
                              <td className="p-2">{difficulty}</td>
                              <td className="p-2">
                                {score} / {total}
                              </td>
                              <td className="p-2">{percentage}%</td>
                              <td className="p-2">
                                {date ? formatDate(date) : "-"}
                              </td>
                              <td className="p-2">
                                {passed ? (
                                  <span className="text-green-700 font-bold">
                                    Umepita
                                  </span>
                                ) : (
                                  <span className="text-red-700 font-bold">
                                    Hujapita
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center">
                    Bado hujafanya jaribio lolote.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Reading Materials Table */}
          <div className="lg:col-span-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="dyslexic-text">
                  Masomo Uliyokamilisha
                </CardTitle>
                <CardDescription className="dyslexic-text">
                  Orodha ya masomo au nyenzo za kusoma ulizokamilisha
                </CardDescription>
              </CardHeader>
              <CardContent>
                {progress?.progress?.length ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Somo</th>
                          <th className="p-2 text-left">Tarehe</th>
                          <th className="p-2 text-left">Hali</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progress.progress
                          .filter((l: any) => l.completed)
                          .map((l: any, i: number) => (
                            <tr key={l._id || i} className="border-b">
                              <td className="p-2">
                                {l.lessonId || l.title || l._id}
                              </td>
                              <td className="p-2">
                                {l.completedAt
                                  ? formatDate(l.completedAt)
                                  : "-"}
                              </td>
                              <td className="p-2 text-green-700 font-bold">
                                Imekamilika
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center">
                    Bado hujakamilisha somo lolote.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
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
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 dyslexic-text">
                  Kiwango {progress?.user?.level || 1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 dyslexic-text">
                  Kiwango chako
                </p>
                <div className="mb-4">
                  <Progress value={completedLessons * 10} className="mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 dyslexic-text">
                    {completedLessons * 10}% hadi Kiwango{" "}
                    {(progress?.user?.level || 1) + 1}
                  </p>
                </div>
                <Badge variant="secondary" className="dyslexic-text">
                  {progress?.user?.points || 0} alama
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
  );
}
