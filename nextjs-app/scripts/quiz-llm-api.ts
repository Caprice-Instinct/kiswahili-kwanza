console.log("LLM_API_KEY:", process.env.LLM_API_KEY);
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
import "dotenv/config";
import express from "express";
import { createQuizLLMService } from "../lib/llm/quiz-llm-service.ts";

const app = express();
app.use(express.json());

// POST /api/generate-quiz
app.post("/api/generate-quiz", async (req, res) => {
  try {
    const quizService = createQuizLLMService();
    const quiz = await quizService.generateQuiz(req.body);
    res.json(quiz);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Quiz generation failed";
    res.status(500).json({ error: message });
  }
});

const PORT = process.env.QUIZ_API_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Quiz LLM API server running on port ${PORT}`);
});
