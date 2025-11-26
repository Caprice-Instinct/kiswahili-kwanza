import { createQuizLLMService } from "../lib/llm/quiz-llm-service";

async function testQuizLLM() {
  const llm = createQuizLLMService();
  const quiz = await llm.generateQuiz({
    topic: "Matunda",
    category: "Matunda",
    difficulty: "beginner",
    questionCount: 2,
    questionTypes: ["multiple-choice"],
    vocabulary: ["ndizi", "embe", "nanasi", "tikiti"],
    culturalContext: true,
  });
  console.log(JSON.stringify(quiz, null, 2));
}

testQuizLLM();

export {};
