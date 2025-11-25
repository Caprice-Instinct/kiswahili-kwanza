import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { createQuizLLMService } from "@/lib/llm/quiz-llm-service";
import { getUserLevel, levelTopics } from "@/lib/user-level";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user level and progress
    const userLevel = getUserLevel(session.user);
    const topics = levelTopics[userLevel.level];

    // Generate quiz for current topic
    const llmService = createQuizLLMService();
    const quiz = await llmService.generateQuiz({
      topic: userLevel.currentTopic,
      category: userLevel.currentCategory || userLevel.currentTopic,
      difficulty: userLevel.level,
      questionCount: 5,
      questionTypes: ["multiple-choice", "fill-blank"],
      culturalContext: true,
    });

    return NextResponse.json({
      success: true,
      quiz,
      userLevel: {
        level: userLevel.level,
        currentTopic: userLevel.currentTopic,
        progress: `${userLevel.completedTopics.length}/${topics.length}`,
      },
    });
  } catch (error) {
    console.error("Auto quiz generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
