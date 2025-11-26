"use client";

import { useState } from "react";
import { QuizGenerationPrompt } from "@/lib/quiz-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wand2 } from "lucide-react";

interface QuizGeneratorFormProps {
  onGenerate?: (quiz: any) => void;
}

export function QuizGeneratorForm({ onGenerate }: QuizGeneratorFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<QuizGenerationPrompt>({
    topic: "",
    difficulty: "beginner",
    questionCount: 5,
    questionTypes: ["multiple-choice"],
    vocabulary: [],
    grammarFocus: "",
    culturalContext: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        onGenerate?.(result);
      } else {
        console.error("Quiz generation failed:", result.error);
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const questionTypeOptions = [
    { value: "multiple-choice", label: "Chaguo nyingi" },
    { value: "true-false", label: "Kweli/Si kweli" },
  ];

  const topicSuggestions = [
    "Salamu",
    "Familia",
    "Nambari",
    "Rangi",
    "Chakula",
    "Mazingira",
    "Shule",
    "Nyumbani",
    "Mazungumzo",
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5" />
          Tengeneza Quiz ya Kiswahili
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic */}
          <div>
            <label className="block text-sm font-medium mb-2">Mada</label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, topic: e.target.value }))
              }
              className="w-full p-3 border-2 border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 rounded-lg outline-none transition"
              placeholder="Mfano: Salamu za Kiswahili"
              required
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {topicSuggestions.map((topic) => (
                <Badge
                  key={topic}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary-100 text-primary-800 border-primary-300"
                  onClick={() => setFormData((prev) => ({ ...prev, topic }))}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium mb-2">Kiwango</label>
            <select
              value={formData.difficulty}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  difficulty: e.target.value as any,
                }))
              }
              className="w-full p-3 border-2 border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 rounded-lg outline-none transition"
            >
              <option value="beginner">Mwanzo</option>
              <option value="intermediate">Kati</option>
              <option value="advanced">Juu</option>
            </select>
            <div className="mb-2 flex items-center justify-between mt-6">
              <label className="block text-sm font-medium">
                Idadi ya Maswali
              </label>
              <span className="font-bold text-primary-700">
                {formData.questionCount}
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="1"
              value={formData.questionCount ?? 5}
              onChange={(e) => {
                const val = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  questionCount: Number(val),
                }));
              }}
              className="w-full accent-primary-500 focus:ring-2 focus:ring-primary-400 focus:outline-none border-0 bg-transparent"
              style={{ boxShadow: "none" }}
            />
            <div className="flex justify-between text-xs text-primary-700 mt-1">
              <span>3</span>
              <span>10</span>
            </div>
          </div>

          {/* Question Types */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Aina za Maswali
            </label>
            <div className="grid grid-cols-2 gap-2">
              {questionTypeOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.questionTypes.includes(
                      option.value as any
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          questionTypes: [
                            ...prev.questionTypes,
                            option.value as any,
                          ],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          questionTypes: prev.questionTypes.filter(
                            (t) => t !== option.value
                          ),
                        }));
                      }
                    }}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vocabulary Focus */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Maneno Muhimu (optional)
            </label>
            <input
              type="text"
              value={formData.vocabulary?.join(", ") || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  vocabulary: e.target.value
                    .split(",")
                    .map((w) => w.trim())
                    .filter(Boolean),
                }))
              }
              className="w-full p-3 border-2 border-primary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-300 rounded-lg outline-none transition"
              placeholder="jambo, asante, karibu"
            />
          </div>

          {/* Cultural Context */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.culturalContext}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    culturalContext: e.target.checked,
                  }))
                }
              />
              <span className="text-sm">Jumuisha utamaduni wa Afrika</span>
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading || !formData.topic}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Inatayarisha...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Tengeneza Quiz
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
