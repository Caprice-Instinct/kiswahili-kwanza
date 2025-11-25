"use client";

import { useState } from "react";
import { Question, QuizOption } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Volume2, HelpCircle, Clock } from "lucide-react";

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string | string[];
  onAnswerSelect: (answer: string | string[]) => void;
  onNext: () => void;
  onPrevious?: () => void;
  showHints?: boolean;
  timeRemaining?: number;
}

export function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  showHints = false,
  timeRemaining,
}: QuizQuestionProps) {
  const [showHint, setShowHint] = useState(false);

  const playAudio = (audioUrl?: string) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <Button
                key={option.id}
                variant={selectedAnswer === option.id ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => onAnswerSelect(option.id)}
              >
                <div className="flex items-center gap-3">
                  <span>{option.text}</span>
                  {option.audioUrl && (
                    <Volume2
                      className="w-4 h-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(option.audioUrl);
                      }}
                    />
                  )}
                </div>
              </Button>
            ))}
          </div>
        );

      case "fill-blank":
        return (
          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Andika jibu lako hapa..."
              value={(selectedAnswer as string) || ""}
              onChange={(e) => onAnswerSelect(e.target.value)}
            />
          </div>
        );

      case "true-false":
        return (
          <div className="flex gap-4">
            <Button
              variant={selectedAnswer === "true" ? "default" : "outline"}
              className="flex-1"
              onClick={() => onAnswerSelect("true")}
            >
              Kweli (True)
            </Button>
            <Button
              variant={selectedAnswer === "false" ? "default" : "outline"}
              className="flex-1"
              onClick={() => onAnswerSelect("false")}
            >
              Si kweli (False)
            </Button>
          </div>
        );

      default:
        return <div>Question type not implemented</div>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <Badge variant="outline">
            Swali {questionNumber} ya {totalQuestions}
          </Badge>
          {timeRemaining && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {Math.floor(timeRemaining / 60)}:
              {(timeRemaining % 60).toString().padStart(2, "0")}
            </div>
          )}
        </div>
        <CardTitle className="text-lg">
          <div className="flex items-center gap-3">
            <span>{question.question}</span>
            {question.questionAudio && (
              <Volume2
                className="w-5 h-5 cursor-pointer text-blue-600"
                onClick={() => playAudio(question.questionAudio)}
              />
            )}
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{question.points} alama</Badge>
          <Badge variant="outline">{question.type}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderQuestionContent()}

        {showHints && question.hints && question.hints.length > 0 && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              {showHint ? "Ficha kidokezo" : "Onyesha kidokezo"}
            </Button>
            {showHint && (
              <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
                {question.hints[0]}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4">
          {onPrevious && (
            <Button variant="outline" onClick={onPrevious}>
              Nyuma
            </Button>
          )}
          <Button
            onClick={onNext}
            disabled={!selectedAnswer}
            className="ml-auto"
          >
            {questionNumber === totalQuestions ? "Maliza" : "Ifuatayo"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
