'use client';

import { useState } from 'react';
import { QuizGeneratorForm } from '@/components/quiz/quiz-generator-form';
import { QuizContainer } from '@/components/quiz/quiz-container';
import { Quiz } from '@/types/quiz';

export default function GenerateQuizPage() {
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null);

  const handleGenerate = async (result: any) => {
    if (result.success && result.quiz) {
      setGeneratedQuiz(result.quiz);
    }
  };

  const handleQuizComplete = (attempt: any) => {
    console.log('Quiz completed:', attempt);
    setGeneratedQuiz(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        

        {!generatedQuiz ? (
          <QuizGeneratorForm onGenerate={handleGenerate} />
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <button
                onClick={() => setGeneratedQuiz(null)}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Rudi kutengeneza quiz nyingine
              </button>
            </div>
            <QuizContainer 
              quiz={generatedQuiz} 
              onComplete={handleQuizComplete}
              allowRetry={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}