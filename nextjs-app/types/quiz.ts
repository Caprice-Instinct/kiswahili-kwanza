export type QuestionType = 
  | 'multiple-choice'
  | 'fill-blank'
  | 'matching'
  | 'audio-recognition'
  | 'pronunciation'
  | 'translation'
  | 'true-false';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  audioUrl?: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  questionAudio?: string;
  questionImage?: string;
  options?: QuizOption[];
  correctAnswer: string | string[];
  explanation?: string;
  hints?: string[];
  points: number;
  timeLimit?: number; // seconds
  metadata?: {
    topic?: string;
    grammar?: string;
    vocabulary?: string[];
  };
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: string;
  estimatedTime: number; // minutes
  totalPoints: number;
  passingScore: number; // percentage
  questions: Question[];
  prerequisites?: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Record<string, string | string[]>;
  score: number;
  totalPoints: number;
  percentage: number;
  timeSpent: number; // seconds
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface QuizProgress {
  userId: string;
  quizId: string;
  attempts: number;
  bestScore: number;
  averageScore: number;
  lastAttemptAt: Date;
  mastered: boolean;
}