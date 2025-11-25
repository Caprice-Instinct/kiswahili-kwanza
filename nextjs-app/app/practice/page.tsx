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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuizContainer } from "@/components/quiz/quiz-container";
import { Play, Trophy, Target, Loader2 } from "lucide-react";
import { Quiz } from "@/types/quiz";
import { MASOMO_CATEGORIES } from "@/types/masomo";

export default function PracticePage() {
  const { data: session } = useSession();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  // Decoupled per-category loading state
  const [loadingStates, setLoadingStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [userLevel, setUserLevel] = useState<any>(null);

  const generateQuiz = async (category: any, idx: number) => {
    if (!session) return;

    setLoadingStates((prev) => ({ ...prev, [idx]: true }));
    try {
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: category.title,
          category: category.title,
          difficulty:
            category.difficulty <= 2
              ? "beginner"
              : category.difficulty <= 4
              ? "intermediate"
              : "advanced",
          questionCount: 5,
          questionTypes: ["multiple-choice"],
          vocabulary: category.content?.map((item: any) => item.kiswahili),
          culturalContext: true,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCurrentQuiz(data.quiz);
      }
    } catch (error) {
      console.error("Failed to generate quiz:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [idx]: false }));
    }
  };

  const handleQuizComplete = (attempt: any) => {
    console.log("Quiz completed:", attempt);
    setCurrentQuiz(null);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card>
          <CardContent className="text-center p-8">
            <h2 className="text-xl font-semibold mb-4">Ingia kwanza</h2>
            <p>
              Unahitaji kuingia ili kupata mazoezi yaliyotayarishwa maalum kwa
              kiwango chako.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <button
              onClick={() => setCurrentQuiz(null)}
              className="text-primary-600 hover:text-primary-800 underline"
            >
              ← Rudi kwenye mazoezi
            </button>
          </div>
          <QuizContainer
            quiz={currentQuiz}
            onComplete={handleQuizComplete}
            allowRetry={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 dyslexic-text">
              Mazoezi ya Kiswahili
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 dyslexic-text max-w-2xl mx-auto">
              Chagua moja ya makundi hapa chini ili kujaribu majaribio ya
              Kiswahili yaliyotayarishwa kwa ajili yako.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MASOMO_CATEGORIES.map((category, idx) => (
              <Card
                key={category.id || idx}
                className="card-hover relative overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant={
                        category.difficulty <= 2
                          ? "success"
                          : category.difficulty <= 4
                          ? "warning"
                          : "destructive"
                      }
                      className="dyslexic-text text-xs"
                    >
                      {category.difficulty <= 2
                        ? "Mwanzo"
                        : category.difficulty <= 4
                        ? "Kati"
                        : "Juu"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg dyslexic-text leading-tight">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-sm dyslexic-text leading-relaxed">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    className="w-full dyslexic-text"
                    onClick={() => generateQuiz(category, idx)}
                    disabled={!!loadingStates[idx]}
                  >
                    {loadingStates[idx] ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Inatayarisha jaribio...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Anza Jaribio</span>
                      </>
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
