'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizContainer } from '@/components/quiz/quiz-container';
import { Play, Trophy, Target, Loader2 } from 'lucide-react';
import { Quiz } from '@/types/quiz';

export default function PracticePage() {
  const { data: session } = useSession();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [userLevel, setUserLevel] = useState<any>(null);

  const generateQuiz = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/quiz/auto-generate');
      const data = await response.json();
      
      if (data.success) {
        setCurrentQuiz(data.quiz);
        setUserLevel(data.userLevel);
      }
    } catch (error) {
      console.error('Failed to generate quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (attempt: any) => {
    console.log('Quiz completed:', attempt);
    setCurrentQuiz(null);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card>
          <CardContent className="text-center p-8">
            <h2 className="text-xl font-semibold mb-4">Ingia kwanza</h2>
            <p>Unahitaji kuingia ili kupata mazoezi yaliyotayarishwa maalum kwa kiwango chako.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <button
              onClick={() => setCurrentQuiz(null)}
              className="text-blue-600 hover:text-blue-800 underline"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 dyslexic-text">
              Mazoezi ya Kiswahili
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto dyslexic-text">
              Quiz zilizotayarishwa maalum kwa kiwango chako cha sasa
            </p>
            {userLevel && (
              <div className="mt-4 flex justify-center gap-4">
                <Badge variant="outline">Kiwango: {userLevel.level}</Badge>
                <Badge variant="outline">Mada: {userLevel.currentTopic}</Badge>
                <Badge variant="outline">Maendeleo: {userLevel.progress}</Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl dyslexic-text">Quiz ya Leo</CardTitle>
            <CardDescription className="dyslexic-text">
              Quiz iliyotayarishwa kwa kiwango chako cha sasa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={generateQuiz} 
              disabled={loading}
              size="lg"
              className="w-full max-w-md dyslexic-text"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Inatayarisha quiz...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Anza Quiz ya Leo
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}