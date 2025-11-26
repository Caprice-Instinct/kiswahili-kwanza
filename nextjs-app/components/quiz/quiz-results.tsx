"use client";

import { Quiz } from "@/types/quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Trophy, Star } from "lucide-react";

interface QuizResultsProps {
  quiz: Quiz;
  answers: Record<string, string | string[]>;
  onRetry?: () => void;
}

export function QuizResults({ quiz, answers, onRetry }: QuizResultsProps) {
  const calculateResults = () => {
    let correctAnswers = 0;
    let totalScore = 0;

    const questionResults = quiz.questions.map((question) => {
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
        correctAnswers++;
        totalScore += question.points;
      }

      return {
        question,
        userAnswer,
        isCorrect,
        pointsEarned: isCorrect ? question.points : 0,
      };
    });

    const percentage = Math.round((totalScore / quiz.totalPoints) * 100);
    const passed = percentage >= quiz.passingScore;

    return {
      questionResults,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      totalScore,
      maxScore: quiz.totalPoints,
      percentage,
      passed,
    };
  };

  const results = calculateResults();

  const getPerformanceMessage = () => {
    if (results.percentage >= 90)
      return { message: "Bora sana!", icon: Trophy, color: "text-yellow-600" };
    if (results.percentage >= 80)
      return { message: "Vizuri sana!", icon: Star, color: "text-blue-600" };
    if (results.percentage >= 70)
      return { message: "Vizuri!", icon: CheckCircle, color: "text-green-600" };
    if (results.percentage >= 60)
      return { message: "Sawa!", icon: CheckCircle, color: "text-green-600" };
    return {
      message: "Jaribu tena!",
      icon: RotateCcw,
      color: "text-orange-600",
    };
  };

  const performance = getPerformanceMessage();
  const PerformanceIcon = performance.icon;

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Overall Results */}
      <Card>
        <CardHeader className="text-center">
          <div
            className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              results.passed ? "bg-green-100" : "bg-orange-100"
            }`}
          >
            <PerformanceIcon className={`w-8 h-8 ${performance.color}`} />
          </div>
          <CardTitle className="text-2xl">
            {results.passed
              ? "Hongera! Umefaulu jaribio hili!"
              : "Jaribu tena!"}
          </CardTitle>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {results.percentage}%
          </div>
          <Badge
            variant={results.passed ? "default" : "secondary"}
            className="text-lg px-4 py-1"
          >
            {results.passed ? "Umepita!" : "Hujapita"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {results.correctAnswers}
              </div>
              <div className="text-sm text-blue-800">Sahihi</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {results.totalQuestions - results.correctAnswers}
              </div>
              <div className="text-sm text-red-800">Makosa</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {results.totalScore}
              </div>
              <div className="text-sm text-green-800">Alama</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {quiz.passingScore}%
              </div>
              <div className="text-sm text-purple-800">Kupita</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Ufanisi wako</span>
              <span className="text-sm text-gray-600">
                {results.percentage}%
              </span>
            </div>
            <Progress value={results.percentage} className="w-full h-3" />
          </div>

          {results.passed ? (
            <div className="text-green-700 font-semibold text-lg text-center my-4">
              Umefanya vizuri sana! Endelea kujifunza na jaribu maswali magumu
              zaidi!
            </div>
          ) : (
            <>
              <div className="text-orange-700 font-semibold text-lg text-center my-4">
                Usikate tamaa! Unaweza kufanya vizuri zaidi. Jaribu tena na
                utapata matokeo bora!
              </div>
              {onRetry && (
                <Button onClick={onRetry} className="w-full" size="lg">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Jaribu Tena
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Question by Question Results */}
      <Card>
        <CardHeader>
          <CardTitle>Majibu ya Maswali</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.questionResults.map((result, index) => (
              <div key={result.question.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Swali {index + 1}</Badge>
                      <Badge
                        variant={result.isCorrect ? "default" : "destructive"}
                      >
                        {result.pointsEarned}/{result.question.points} alama
                      </Badge>
                    </div>
                    <p className="font-medium mb-2">
                      {result.question.question}
                    </p>
                  </div>
                  {result.isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      Jibu lako:{" "}
                    </span>
                    <span
                      className={
                        result.isCorrect ? "text-green-600" : "text-red-600"
                      }
                    >
                      {Array.isArray(result.userAnswer)
                        ? result.userAnswer.join(", ")
                        : result.userAnswer || "Hakuna jibu"}
                    </span>
                  </div>
                  {!result.isCorrect && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Jibu sahihi:{" "}
                      </span>
                      <span className="text-green-600">
                        {Array.isArray(result.question.correctAnswer)
                          ? result.question.correctAnswer.join(", ")
                          : result.question.correctAnswer}
                      </span>
                    </div>
                  )}
                  {result.question.explanation && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">
                        Maelezo:{" "}
                      </span>
                      <span className="text-blue-700">
                        {result.question.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Recommendations Section */}
      <Card>
        <CardHeader>
          <CardTitle>Mapendekezo ya Kujifunza</CardTitle>
        </CardHeader>
        <CardContent>
          {results.percentage === 100 && (
            <div className="text-green-700 font-semibold">
              Hongera! Umejibu maswali yote kwa usahihi. Endelea na mada
              inayofuata au jaribu jaribio gumu zaidi!
            </div>
          )}
          {results.percentage < 100 && (
            <div>
              <div className="mb-2 text-blue-900">
                Pitia maswali uliyokosea na rejea sehemu husika kwenye masomo.{" "}
              </div>
              <ul className="list-disc ml-6 text-sm text-gray-800">
                {results.questionResults
                  .filter((q) => !q.isCorrect)
                  .map((q, i) => (
                    <li key={q.question.id}>
                      <span className="font-medium">Swali {i + 1}:</span> "
                      {q.question.question}"<br />
                      <span className="text-red-700">
                        Jibu lako:{" "}
                        {Array.isArray(q.userAnswer)
                          ? q.userAnswer.join(", ")
                          : q.userAnswer || "Hakuna jibu"}
                      </span>
                      <br />
                      <span className="text-green-700">
                        Jibu sahihi:{" "}
                        {Array.isArray(q.question.correctAnswer)
                          ? q.question.correctAnswer.join(", ")
                          : q.question.correctAnswer}
                      </span>
                      {q.question.metadata?.vocabulary &&
                        q.question.metadata.vocabulary.length > 0 && (
                          <span className="block text-blue-700">
                            Pitia msamiati:{" "}
                            {q.question.metadata.vocabulary.join(", ")}
                          </span>
                        )}
                    </li>
                  ))}
              </ul>
              <div className="mt-4 text-purple-800 font-medium">
                Pendekezo: Jitahidi zaidi kwenye maeneo haya na tumia flashcards
                au mazoezi ya ziada kuboresha uelewa wako.
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
