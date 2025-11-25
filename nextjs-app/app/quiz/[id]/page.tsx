'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Quiz, QuizAttempt } from '@/types/quiz';
import { QuizContainer } from '@/components/quiz/quiz-container';
import { sampleQuiz } from '@/lib/sample-quiz-data';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function QuizPage() {
  const params = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        // For now, use sample data
        // In production, fetch from API: /api/quiz/${params.id}
        if (params.id === 'sample') {
          setQuiz(sampleQuiz);
        } else {
          setError('Quiz not found');
        }
      } catch (err) {
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [params.id]);

  const handleQuizComplete = async (attempt: QuizAttempt) => {
    try {
      // Save quiz attempt to database
      console.log('Quiz completed:', attempt);
      
      // In production, send to API:
      // await fetch('/api/quiz/attempts', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(attempt)
      // });
    } catch (error) {
      console.error('Failed to save quiz attempt:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Inapakia quiz...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Card>
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-semibold mb-2">Hitilafu</h2>
            <p className="text-gray-600">{error || 'Quiz haikupatikana'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <QuizContainer 
          quiz={quiz} 
          onComplete={handleQuizComplete}
          allowRetry={true}
        />
      </div>
    </div>
  );
}