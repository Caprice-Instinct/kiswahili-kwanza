export interface UserProgress {
  userId: string;
  categoryProgress: CategoryProgress[];
  lastUpdated: Date;
}

export interface CategoryProgress {
  categoryId: string;
  flashcardsCompleted: boolean;
  flashcardScore: number;
  storyUnlocked: boolean;
  storyCompleted: boolean;
  completedAt?: Date;
  attempts: number;
}

export interface FlashcardSession {
  categoryId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  correctAnswers: number;
  totalQuestions: number;
  score: number;
  completed: boolean;
}

export const FLASHCARD_COMPLETION_THRESHOLD = 80; // 80% to unlock stories
export const STORY_COMPLETION_THRESHOLD = 100; // Must read entire story

export const getInitialCategoryProgress = (categoryId: string): CategoryProgress => ({
  categoryId,
  flashcardsCompleted: false,
  flashcardScore: 0,
  storyUnlocked: false,
  storyCompleted: false,
  attempts: 0
});

export const updateFlashcardProgress = (
  progress: CategoryProgress,
  score: number
): CategoryProgress => {
  const completed = score >= FLASHCARD_COMPLETION_THRESHOLD;
  return {
    ...progress,
    flashcardScore: Math.max(progress.flashcardScore, score),
    flashcardsCompleted: completed,
    storyUnlocked: completed,
    attempts: progress.attempts + 1,
    completedAt: completed ? new Date() : progress.completedAt
  };
};

export const updateStoryProgress = (
  progress: CategoryProgress,
  completed: boolean
): CategoryProgress => ({
  ...progress,
  storyCompleted: completed,
  completedAt: completed ? new Date() : progress.completedAt
});