"use client";

import { useState, useEffect } from "react";
import { Quiz, QuizAttempt } from "@/types/quiz";
import { QuizQuestion } from "./quiz-question";
import { QuizResults } from "./quiz-results";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

interface QuizContainerProps {
  quiz: Quiz;
  onComplete?: (attempt: QuizAttempt) => void;
  allowRetry?: boolean;
}

export function QuizContainer({
  quiz,
  onComplete,
  allowRetry = true,
}: QuizContainerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedAttempt, setCompletedAttempt] = useState<QuizAttempt | null>(
    null
  );
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  useEffect(() => {
    if (isStarted && currentQuestion?.timeLimit) {
      setTimeRemaining(currentQuestion.timeLimit);
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev && prev > 0) return prev - 1;
          handleNext(); // Auto-advance when time runs out
          return undefined;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    setStartTime(new Date());
  };

  const handleAnswerSelect = (answer: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    const endTime = new Date();
    const timeSpent = startTime
      ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000)
      : 0;
    let score = 0;
    const mistakes: Array<{
      questionId: string;
      question: string;
      userAnswer: string | string[] | undefined;
      correctAnswer: string | string[];
      explanation?: string;
    }> = [];
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      let isCorrect = false;
      if (Array.isArray(question.correctAnswer)) {
        isCorrect =
          Array.isArray(userAnswer) &&
          userAnswer.length === question.correctAnswer.length &&
          userAnswer.every((ans) => question.correctAnswer.includes(ans));
      } else {
        isCorrect = userAnswer === question.correctAnswer;
      }
      if (isCorrect) {
        score += question.points;
      } else {
        mistakes.push({
          questionId: question.id,
          question: question.question,
          userAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        });
      }
    });

    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      quizId: quiz.id,
      userId: "current_user", // Replace with actual user ID
      answers,
      score,
      totalPoints: quiz.totalPoints,
      percentage: Math.round((score / quiz.totalPoints) * 100),
      timeSpent,
      completed: true,
      startedAt: startTime!,
      completedAt: endTime,
      mistakes,
    };

    // Save progress to backend
    try {
      await fetch("/api/quiz/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: quiz.id,
          score,
          totalPoints: quiz.totalPoints,
          percentage: Math.round((score / quiz.totalPoints) * 100),
          answers,
          completedAt: endTime,
          mistakes,
          category: quiz.category || quiz.title || "",
          difficulty: quiz.difficulty || "",
        }),
      });
    } catch (err) {
      // Optionally handle error
      console.error("Failed to save quiz progress", err);
    }

    // Redirect to results page with only quizId
    window.location.href = `/quiz/results?quizId=${encodeURIComponent(
      quiz.id
    )}`;
    // If you want to keep the old state-based results, uncomment below:
    // setCompletedAttempt(attempt);
    // setIsCompleted(true);
    // onComplete?.(attempt);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsStarted(false);
    setIsCompleted(false);
    setStartTime(null);
    setTimeRemaining(undefined);
  };

  if (!isStarted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <p className="text-gray-600">{quiz.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium">Maswali</div>
              <div>{quiz.questions.length}</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium">Muda</div>
              <div>{quiz.estimatedTime} dakika</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium">Alama</div>
              <div>{quiz.totalPoints}</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="font-medium">Kupita</div>
              <div>{quiz.passingScore}%</div>
            </div>
          </div>
          <Button onClick={handleStart} className="w-full" size="lg">
            <Play className="w-5 h-5 mr-2" />
            Anza Jaribio
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isCompleted && completedAttempt) {
    // This block is now unused since we redirect to a dedicated results page
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Maendeleo</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <QuizQuestion
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        selectedAnswer={answers[currentQuestion.id]}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNext}
        onPrevious={currentQuestionIndex > 0 ? handlePrevious : undefined}
        showHints={true}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}
