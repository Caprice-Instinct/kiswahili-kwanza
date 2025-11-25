"use client";
import { SimpleToast } from "@/components/ui/simple-toast";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MASOMO_CATEGORIES } from "@/types/masomo";
import { FLASHCARD_SETS } from "@/data/flashcards";
import { CATEGORY_STORIES } from "@/data/stories";
import { BookOpen, Play, Lock, CheckCircle, RotateCcw } from "lucide-react";

import Link from "next/link";

export default function LessonPage() {
  const params = useParams();
  const [flashcardsCompleted, setFlashcardsCompleted] = useState(false);
  const [storyCompleted, setStoryCompleted] = useState(false);
  // Defensive: fallback if params or id is missing
  if (!params || !("id" in params)) {
    return <div>Somo halijapatikana</div>;
  }
  const lessonId = parseInt((params.id as string) ?? "");
  const category = MASOMO_CATEGORIES[lessonId - 1];
  const flashcards = FLASHCARD_SETS.find(
    (set) => set.categoryId === category?.id
  );
  const story = CATEGORY_STORIES.find((s) => s.categoryId === category?.id);
  // Fetch progress from backend on mount
  useEffect(() => {
    async function fetchProgress() {
      try {
        const res = await fetch(`/api/progress?lessonId=${lessonId}`);
        const data = await res.json();
        if (data && data.progress) {
          setFlashcardsCompleted(!!data.progress.flashcardsCompleted);
          setStoryCompleted(!!data.progress.storyCompleted);
        }
      } catch {}
    }
    fetchProgress();
  }, [lessonId]);
  const [currentView, setCurrentView] = useState<
    "overview" | "flashcards" | "story"
  >("overview");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  // Removed duplicate declaration of showToast and setShowToast

  if (!category || !flashcards || !story) {
    return <div>Somo halijapatikana</div>;
  }

  const handleFlashcardComplete = async () => {
    try {
      await fetch("/api/lessons/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, type: "flashcards" }),
      });
      setFlashcardsCompleted(true);
    } catch (e) {
      // Optionally handle error
    }
    setCurrentView("overview");
  };
  // Removed duplicate declaration of showToast and setShowToast
  const nextCard = () => {
    if (currentCardIndex < flashcards.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      handleFlashcardComplete();
    }
  };

  const resetFlashcards = () => {
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  if (currentView === "flashcards") {
    const currentCard = flashcards.cards[currentCardIndex];
    const progress = ((currentCardIndex + 1) / flashcards.cards.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Back to Lessons Button */}
          <div className="mb-4">
            <Link
              href="/lessons"
              className="inline-flex items-center text-primary-600 hover:underline font-medium"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Rudi kwenye Masomo
            </Link>
          </div>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-primary-700">
                {flashcards.title}
              </h1>
              <span className="text-sm font-medium text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <Card className="mb-6 relative">
            {/* Back Arrow to Overview */}
            <button
              onClick={() => setCurrentView("overview")}
              className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <img
                  src={currentCard.imageUrl}
                  alt={currentCard.kiswahili}
                  className="w-64 h-64 mx-auto object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/256x256/3B82F6/FFFFFF?text=${currentCard.kiswahili}`;
                  }}
                />
              </div>

              <div className="text-4xl font-bold mb-4 text-primary-700">
                {currentCard.kiswahili}
              </div>

              {showAnswer && (
                <div className="text-2xl text-secondary-600 mb-4">
                  {currentCard.english}
                </div>
              )}

              <div className="space-x-4 mb-6">
                {!showAnswer ? (
                  <Button onClick={() => setShowAnswer(true)}>
                    Onyesha Maana
                  </Button>
                ) : (
                  <Button onClick={nextCard}>
                    {currentCardIndex < flashcards.cards.length - 1
                      ? "Kadi Ijayo"
                      : "Maliza"}
                  </Button>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentCardIndex > 0) {
                      setCurrentCardIndex(currentCardIndex - 1);
                      setShowAnswer(false);
                    }
                  }}
                  disabled={currentCardIndex === 0}
                >
                  ←
                </Button>

                <span className="text-sm text-primary-600">
                  {currentCardIndex + 1} ya {flashcards.cards.length}
                </span>

                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentCardIndex < flashcards.cards.length - 1) {
                      setCurrentCardIndex(currentCardIndex + 1);
                      setShowAnswer(false);
                    }
                  }}
                  disabled={currentCardIndex === flashcards.cards.length - 1}
                >
                  →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Toast state removed
  if (currentView === "story") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto relative">
          {/* Top-left back button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 left-2"
            onClick={() => setCurrentView("overview")}
          >
            <span className="mr-1">←</span> Rudi
          </Button>
          {/* Back to Lessons Button (top left, always visible) */}
          <Link
            href="/lessons"
            className="absolute top-2 right-2 inline-flex items-center text-primary-600 hover:underline font-medium"
            style={{ zIndex: 10 }}
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Masomo Mengine
          </Link>
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2 text-primary-700 flex items-center gap-2">
              {story.title}
              {storyCompleted && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </h1>
            <p className="text-secondary-600">{story.titleEnglish}</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div
                className="text-lg leading-relaxed dyslexic-text"
                dangerouslySetInnerHTML={{ __html: story.content }}
              />
            </CardContent>
          </Card>

          <div className="text-center mt-6 flex flex-col items-center gap-4">
            <Button
              variant="success"
              onClick={async () => {
                try {
                  await fetch("/api/lessons/complete", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ lessonId, type: "story" }),
                  });
                  setStoryCompleted(true);
                } catch (e) {
                  // Optionally handle error
                }
                setCurrentView("overview");
              }}
            >
              Maliza
            </Button>
          </div>
          {/* Toast removed */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to Lessons Button (top left) */}
        <div className="mb-4">
          <Link
            href="/lessons"
            className="inline-flex items-center text-primary-600 hover:underline font-medium"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Rudi kwenye Masomo
          </Link>
        </div>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary-700">
            {category.title}
          </h1>
          <p className="text-lg text-secondary-600">{category.titleEnglish}</p>
          <Badge className="mt-2">Kiwango {category.difficulty}</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Flashcards Section */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Kadi za Kujifunza</span>
                {flashcardsCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </CardTitle>
              <CardDescription>
                Jifunze maneno {flashcards.cards.length} kwa kutumia kadi za
                picha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Lazima ukamilishe kadi zote ili kufungua hadithi
                </p>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setCurrentView("flashcards");
                      resetFlashcards();
                    }}
                    className="flex-1"
                  >
                    {flashcardsCompleted ? "Rudia Kadi" : "Anza Kadi"}
                  </Button>
                  {flashcardsCompleted && (
                    <Button variant="outline" onClick={resetFlashcards}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story Section */}
          <Card
            className={`relative ${!flashcardsCompleted ? "opacity-60" : ""}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Hadithi</span>
                {storyCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                {!flashcardsCompleted && !storyCompleted && (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </CardTitle>
              <CardDescription>
                Soma hadithi ya Juma kuhusu{" "}
                {category.titleEnglish.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Hadithi inayohusu mazingira ya Afrika Mashariki
                </p>
                <Button
                  onClick={() => setCurrentView("story")}
                  disabled={!flashcardsCompleted}
                  className="w-full"
                >
                  {flashcardsCompleted ? "Soma Hadithi" : "Imefungwa"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vocabulary Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Maneno Utakayojifunza</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.content.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className="text-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="font-semibold text-primary-600">
                    {item.kiswahili}
                  </div>
                  <div className="text-sm text-gray-600">{item.english}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
