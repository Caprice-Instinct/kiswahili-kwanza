import { NextRequest, NextResponse } from "next/server";

import { createQuizLLMService } from "@/lib/llm/quiz-llm-service";
import { QuizGenerationRequest } from "@/lib/llm/types";
import { FLASHCARD_SETS } from "@/data/flashcards";
import { enforceDyslexiaDistractors } from "@/lib/llm/dyslexia-distractors";

export async function POST(request: NextRequest) {
  try {
    const body: QuizGenerationRequest = await request.json();

    // Validate input
    if (!body.topic || !body.difficulty || !body.questionCount) {
      return NextResponse.json(
        { error: "Missing required fields: topic, difficulty, questionCount" },
        { status: 400 }
      );
    }
    // Optionally validate category
    if (!body.category) {
      body.category = body.topic;
    }

    // Special handling for categories with images (except extended family)
    const imageCategories = [
      "nambari",
      "rangi",
      "familia_ndogo",
      "siku_za_wiki",
      "matunda",
      "miezi_ya_mwaka",
    ];
    const requestedCategory = (body.category || body.topic || "").toLowerCase();
    if (imageCategories.includes(requestedCategory)) {
      const set = FLASHCARD_SETS.find(
        (s) => s.categoryId === requestedCategory
      );
      if (!set) {
        return NextResponse.json(
          { error: `No flashcards found for category ${requestedCategory}` },
          { status: 500 }
        );
      }
      const cards = [...set.cards];
      const questions = [];
      for (let i = 0; i < Math.min(body.questionCount, cards.length); i++) {
        const card = cards.splice(
          Math.floor(Math.random() * cards.length),
          1
        )[0];
        // Build options: correct + 3 placeholders (will be replaced)
        const options = [
          {
            id: "a",
            text: card.kiswahili,
            isCorrect: true,
            errorType: "correct",
          },
          { id: "b", text: "", isCorrect: false },
          { id: "c", text: "", isCorrect: false },
          { id: "d", text: "", isCorrect: false },
        ];
        // Shuffle options
        for (let j = options.length - 1; j > 0; j--) {
          const k = Math.floor(Math.random() * (j + 1));
          [options[j], options[k]] = [options[k], options[j]];
        }
        questions.push({
          id: `q${i + 1}`,
          type: "multiple-choice",
          question: `Ni ${set.title.split(" (")[0].toLowerCase()} gani hii?`,
          questionImage: card.imageUrl || null,
          options,
          correctAnswer: options.find((o) => o.isCorrect)?.id,
          explanation: `Jibu sahihi ni \"${card.kiswahili}\".`,
          hints: ["Angalia picha kwa makini."],
          points: 10,
          metadata: {
            topic: set.title,
            vocabulary: [card.kiswahili],
          },
        });
      }
      // Enforce authentic dyslexia-style distractors
      const quiz = {
        id: `quiz_${Date.now()}`,
        title: `Jaribio la ${set.title}`,
        description: `Chagua jibu sahihi kulingana na picha.`,
        difficulty: body.difficulty,
        category: set.title,
        estimatedTime: questions.length * 2,
        totalPoints: questions.length * 10,
        passingScore: 70,
        questions,
        tags: [set.title, body.difficulty],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const quizWithDistractors = enforceDyslexiaDistractors(quiz);
      return NextResponse.json({
        success: true,
        quiz: quizWithDistractors,
        message: `Quiz generated successfully (${set.title})`,
      });
    }

    // Default: use LLM for other topics
    const llmService = createQuizLLMService();
    const quiz = await llmService.generateQuiz(body);

    return NextResponse.json({
      success: true,
      quiz,
      message: "Quiz generated successfully",
    });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
