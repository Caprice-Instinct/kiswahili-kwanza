"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GamepadIcon, 
  Volume2, 
  Star, 
  Trophy, 
  CheckCircle, 
  XCircle,
  RotateCcw,
  BookOpen,
  Target,
  Zap,
  Heart
} from "lucide-react";

type Exercise = {
  id: number;
  question: string;
  questionSw: string;
  options: string[];
  correct: number;
  explanation: string;
  explanationSw: string;
  type: 'multiple-choice' | 'audio' | 'image';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
};

const exercises: Exercise[] = [
  {
    id: 1,
    question: "Ni neno gani la kusema 'Habari' kwa Kiingereza?",
    questionSw: "What does 'Habari' mean in English?",
    options: ["Hello", "News/How are you", "Goodbye", "Thank you"],
    correct: 1,
    explanation: "'Habari' inamaanisha 'News' au 'How are you' kwa Kiingereza. Ni salamu ya kawaida.",
    explanationSw: "'Habari' means 'News' or 'How are you' in English. It's a common greeting.",
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'Salamu'
  },
  {
    id: 2,
    question: "Nambari gani ni 'tatu' kwa Kiswahili?",
    questionSw: "What number is 'tatu' in Swahili?",
    options: ["2", "3", "4", "5"],
    correct: 1,
    explanation: "'Tatu' ni nambari 3 kwa Kiswahili. Ni mojawapo ya nambari za msingi.",
    explanationSw: "'Tatu' is the number 3 in Swahili. It's one of the basic numbers.",
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'Nambari'
  },
  {
    id: 3,
    question: "Nani ni 'mama' kwa familia?",
    questionSw: "Who is 'mama' in the family?",
    options: ["Baba", "Mama", "Mtoto", "Bibi"],
    correct: 1,
    explanation: "'Mama' ni mzazi wa kike katika familia. Ni neno la muhimu sana.",
    explanationSw: "'Mama' is the female parent in the family. It's a very important word.",
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'Familia'
  },
  {
    id: 4,
    question: "Rangi gani ni 'nyekundu'?",
    questionSw: "What color is 'nyekundu'?",
    options: ["Bluu", "Nyekundu (Red)", "Kijani", "Njano"],
    correct: 1,
    explanation: "'Nyekundu' ni rangi nyekundu (red). Ni rangi ya damu na nyanya.",
    explanationSw: "'Nyekundu' is the color red. It's the color of blood and tomatoes.",
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'Rangi'
  },
  {
    id: 5,
    question: "Mnyama gani ni 'simba'?",
    questionSw: "What animal is 'simba'?",
    options: ["Tembo", "Simba (Lion)", "Twiga", "Kiboko"],
    correct: 1,
    explanation: "'Simba' ni mfalme wa msitu. Ni mnyama mkuu wa Afrika.",
    explanationSw: "'Simba' is the king of the jungle. It's a major African animal.",
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'Wanyamapori'
  }
];

const practiceCategories = [
  { name: 'Salamu', icon: '👋', count: 8, color: 'primary' },
  { name: 'Nambari', icon: '🔢', count: 12, color: 'secondary' },
  { name: 'Familia', icon: '👨‍👩‍👧‍👦', count: 10, color: 'success' },
  { name: 'Rangi', icon: '🎨', count: 8, color: 'warning' },
  { name: 'Wanyamapori', icon: '🦁', count: 15, color: 'primary' },
  { name: 'Chakula', icon: '🍽️', count: 12, color: 'secondary' }
];

export default function PracticePage() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [hearts, setHearts] = useState(3);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === exercises[currentExercise].correct) {
      setScore(score + 1);
    } else {
      setHearts(Math.max(0, hearts - 1));
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setHearts(3);
    setShowQuiz(false);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    resetQuiz();
    setShowQuiz(true);
  };

  const exercise = exercises[currentExercise];
  const isFinished = currentExercise === exercises.length - 1 && showResult;
  const progressPercentage = ((currentExercise + 1) / exercises.length) * 100;

  if (!showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 dyslexic-text">Mazoezi ya Kiswahili</h1>
              <p className="text-lg text-gray-600 dyslexic-text max-w-2xl mx-auto">
                Jaribu ujuzi wako na uimarishe uwezo wako wa Kiswahili
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-primary-600 dyslexic-text">85%</div>
                  <p className="text-sm text-gray-600 dyslexic-text">Kiwango cha mafanikio</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div className="text-2xl font-bold text-secondary-600 dyslexic-text">12</div>
                  <p className="text-sm text-gray-600 dyslexic-text">Mazoezi yamekamilika</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-success-600" />
                  </div>
                  <div className="text-2xl font-bold text-success-600 dyslexic-text">7</div>
                  <p className="text-sm text-gray-600 dyslexic-text">Siku za mfululizo</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Practice Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 dyslexic-text">Chagua Mada</h2>
              <p className="text-lg text-gray-600 dyslexic-text">
                Chagua mada unayotaka kujaribu
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceCategories.map((category, index) => (
                <Card key={index} className="card-hover cursor-pointer" onClick={startQuiz}>
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <CardTitle className="dyslexic-text">{category.name}</CardTitle>
                    <CardDescription className="dyslexic-text">
                      {category.count} maswali
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full dyslexic-text" variant={category.color as any}>
                      <GamepadIcon className="w-4 h-4 mr-2" />
                      Anza Mazoezi
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Practice */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dyslexic-text">
              Mazoezi ya Haraka
            </h2>
            <p className="text-lg text-gray-600 mb-8 dyslexic-text">
              Fanya mazoezi ya haraka ya dakika 5 tu!
            </p>
            <Button size="lg" onClick={startQuiz} className="text-lg px-8 py-4 dyslexic-text">
              <Zap className="w-5 h-5 mr-2" />
              Anza Mazoezi ya Haraka
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isFinished ? (
          <Card className="animate-slide-up">
            <CardHeader>
              {/* Progress and Hearts */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <Heart 
                      key={i} 
                      className={`w-6 h-6 ${
                        i < hearts 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-600 dyslexic-text">
                  Swali {currentExercise + 1} kati ya {exercises.length}
                </div>
              </div>
              
              <Progress value={progressPercentage} className="mb-6" />
              
              <div className="flex items-center justify-between mb-4">
                <Badge variant={exercise.difficulty === 'easy' ? 'success' : exercise.difficulty === 'medium' ? 'warning' : 'destructive'}>
                  {exercise.difficulty === 'easy' ? 'Rahisi' : exercise.difficulty === 'medium' ? 'Kati' : 'Ngumu'}
                </Badge>
                <Badge variant="outline" className="dyslexic-text">
                  {exercise.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Question */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 dyslexic-text leading-relaxed">
                  {exercise.question}
                </h2>
                <Button variant="ghost" size="sm" className="text-gray-500 dyslexic-text">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Sikiliza
                </Button>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                {exercise.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    variant="outline"
                    className={`
                      h-auto p-6 text-left justify-start text-lg dyslexic-text leading-relaxed
                      ${showResult
                        ? index === exercise.correct
                          ? "border-success-500 bg-success-50 text-success-700"
                          : index === selectedAnswer
                          ? "border-destructive bg-red-50 text-red-700"
                          : "border-gray-200 bg-gray-50 text-gray-500"
                        : "hover:border-primary-500 hover:bg-primary-50"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold
                        ${showResult && index === exercise.correct
                          ? "border-success-500 bg-success-500 text-white"
                          : showResult && index === selectedAnswer && index !== exercise.correct
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-gray-300"
                        }
                      `}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Result */}
              {showResult && (
                <Card className={`mb-6 animate-fade-in ${
                  selectedAnswer === exercise.correct 
                    ? 'border-success-200 bg-success-50' 
                    : 'border-red-200 bg-red-50'
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-3 mb-3">
                      {selectedAnswer === exercise.correct ? (
                        <CheckCircle className="w-6 h-6 text-success-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                      <h3 className={`font-bold text-lg dyslexic-text ${
                        selectedAnswer === exercise.correct ? 'text-success-700' : 'text-red-700'
                      }`}>
                        {selectedAnswer === exercise.correct ? "Sawa kabisa!" : "Jibu si sahihi"}
                      </h3>
                    </div>
                    <p className={`dyslexic-text leading-relaxed ${
                      selectedAnswer === exercise.correct ? 'text-success-700' : 'text-red-700'
                    }`}>
                      {exercise.explanation}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Next Button */}
              {showResult && (
                <div className="text-center">
                  {currentExercise < exercises.length - 1 ? (
                    <Button onClick={nextExercise} size="lg" className="dyslexic-text">
                      Swali Lijalo
                    </Button>
                  ) : (
                    <Button onClick={() => setShowResult(true)} size="lg" className="dyslexic-text">
                      Ona Matokeo
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center animate-slide-up">
            <CardContent className="pt-12 pb-12">
              <div className="mb-8">
                <Trophy className="w-16 h-16 text-secondary-500 mx-auto mb-4" />
                <h2 className="text-4xl font-bold text-gray-900 mb-4 dyslexic-text">Hongera!</h2>
                <div className="text-6xl font-bold text-primary-600 mb-4 dyslexic-text">
                  {score}/{exercises.length}
                </div>
                <p className="text-xl text-gray-600 mb-8 dyslexic-text leading-relaxed">
                  {score === exercises.length
                    ? "Umefanya vizuri sana! Alama kamili!"
                    : score >= exercises.length / 2
                    ? "Vizuri! Endelea kujifunza!"
                    : "Endelea kujaribu! Utafaulu!"}
                </p>
                
                {/* Stars */}
                <div className="flex justify-center space-x-2 mb-8">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-8 h-8 ${
                        i < Math.floor((score / exercises.length) * 3) 
                          ? 'text-secondary-500 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetQuiz} size="lg" className="dyslexic-text">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Jaribu Tena
                </Button>
                <Link href="/lessons">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto dyslexic-text">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Masomo Zaidi
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
