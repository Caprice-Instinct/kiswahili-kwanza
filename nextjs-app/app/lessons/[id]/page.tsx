'use client'

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MASOMO_CATEGORIES } from "@/types/masomo";
import { FLASHCARD_SETS } from "@/data/flashcards";
import { CATEGORY_STORIES } from "@/data/stories";
import { BookOpen, Play, Lock, CheckCircle, RotateCcw } from "lucide-react";

export default function LessonPage() {
  const params = useParams();
  const lessonId = parseInt(params.id as string);
  const category = MASOMO_CATEGORIES[lessonId - 1];
  const flashcards = FLASHCARD_SETS.find(set => set.categoryId === category?.id);
  const story = CATEGORY_STORIES.find(s => s.categoryId === category?.id);
  
  const [flashcardsCompleted, setFlashcardsCompleted] = useState(false);
  const [currentView, setCurrentView] = useState<'overview' | 'flashcards' | 'story'>('overview');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!category || !flashcards || !story) {
    return <div>Somo halijapatikana</div>;
  }

  const handleFlashcardComplete = () => {
    setFlashcardsCompleted(true);
    setCurrentView('overview');
  };

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

  if (currentView === 'flashcards') {
    const currentCard = flashcards.cards[currentCardIndex];
    const progress = ((currentCardIndex + 1) / flashcards.cards.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-primary-700">{flashcards.title}</h1>
              <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <Card className="mb-6 relative">
            {/* Back Arrow */}
            <button 
              onClick={() => setCurrentView('overview')}
              className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
                    {currentCardIndex < flashcards.cards.length - 1 ? 'Kadi Ijayo' : 'Maliza'}
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

  if (currentView === 'story') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2 text-primary-700">{story.title}</h1>
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
          
          <div className="text-center mt-6">
            <Button variant="outline" onClick={() => setCurrentView('overview')}>
              Rudi Nyuma
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary-700">{category.title}</h1>
          <p className="text-lg text-secondary-600">{category.titleEnglish}</p>
          <Badge className="mt-2">
            Kiwango {category.difficulty}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Flashcards Section */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Kadi za Kujifunza</span>
                {flashcardsCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
              </CardTitle>
              <CardDescription>
                Jifunze maneno {flashcards.cards.length} kwa kutumia kadi za picha
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
                      setCurrentView('flashcards');
                      resetFlashcards();
                    }}
                    className="flex-1"
                  >
                    {flashcardsCompleted ? 'Rudia Kadi' : 'Anza Kadi'}
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
          <Card className={`relative ${!flashcardsCompleted ? 'opacity-60' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Hadithi</span>
                {!flashcardsCompleted && <Lock className="w-5 h-5 text-gray-400" />}
              </CardTitle>
              <CardDescription>
                Soma hadithi ya Juma kuhusu {category.titleEnglish.toLowerCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Hadithi inayohusu mazingira ya Afrika Mashariki
                </p>
                <Button 
                  onClick={() => setCurrentView('story')}
                  disabled={!flashcardsCompleted}
                  className="w-full"
                >
                  {flashcardsCompleted ? 'Soma Hadithi' : 'Imefungwa'}
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
                <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-primary-600">{item.kiswahili}</div>
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