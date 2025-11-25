import { NextRequest, NextResponse } from 'next/server';
import { createQuizLLMService } from '@/lib/llm/quiz-llm-service';
import { QuizGenerationRequest } from '@/lib/llm/types';

export async function POST(request: NextRequest) {
  try {
    const body: QuizGenerationRequest = await request.json();
    
    // Validate input
    if (!body.topic || !body.difficulty || !body.questionCount) {
      return NextResponse.json(
        { error: 'Missing required fields: topic, difficulty, questionCount' },
        { status: 400 }
      );
    }

    // Create LLM service
    const llmService = createQuizLLMService();
    
    // Generate quiz using LLM
    const quiz = await llmService.generateQuiz(body);

    return NextResponse.json({
      success: true,
      quiz,
      message: 'Quiz generated successfully'
    });

  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}