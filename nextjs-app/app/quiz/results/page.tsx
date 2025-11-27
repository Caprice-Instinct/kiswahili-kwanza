import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function QuizResultsPage(props: {
  params?: any;
  searchParams?: { quizId?: string };
}) {
  const searchParams = props.searchParams ?? {};
  const quizId = searchParams.quizId;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }
  const db = await getDatabase();
  const userIdStr = session.user.id;
  let userIdObj = null;
  try {
    userIdObj = new ObjectId(userIdStr);
  } catch (e) {
    userIdObj = null;
  }
  // Find the most recent attempt for this user and quiz
  const attempt = await db.collection("quiz_attempts").findOne(
    {
      quizId,
      $or: [
        { userId: userIdStr },
        ...(userIdObj ? [{ userId: userIdObj }] : []),
      ],
    },
    { sort: { completedAt: -1, createdAt: -1 } }
  );
  if (!attempt) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-red-600">
        Hakuna matokeo yaliyopatikana kwa jaribio hili.
      </div>
    );
  }
  // Determine pass/fail (default passingScore 70 if not present)
  const passingScore =
    typeof attempt.passingScore === "number" ? attempt.passingScore : 70;
  const passed = attempt.percentage >= passingScore;
  // Rule-based recommendation system
  function getRecommendation(percentage: number, category?: string) {
    const cat = category ? ` kwenye mada ya "${category}"` : "";
    if (percentage <= 20)
      return `Jaribu tena! Inashauriwa usome zaidi${cat} na ujaribu maswali mengine.`;
    if (percentage <= 50)
      return `Endelea kujifunza${cat}. Soma tena na jaribu kufanya mazoezi zaidi.`;
    if (percentage <= 70)
      return `Umefanya vizuri${cat}, lakini bado kuna nafasi ya kuboresha. Rudia masomo na ujaribu tena.`;
    if (percentage <= 80)
      return `Karibu! Uko karibu kufaulu kikamilifu${cat}. Endelea kufanya mazoezi.`;
    if (percentage <= 90)
      return `Hongera! Umefanya vizuri sana${cat}. Jaribu maswali magumu zaidi ili uendelee kuboresha ujuzi wako.`;
    return `Bingwa! Umefaulu kikamilifu${cat}. Endelea na changamoto mpya!`;
  }

  if (!attempt) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-red-600">
        Hakuna matokeo yaliyopatikana kwa jaribio hili.
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8 dyslexic-text">
      <div className="bg-primary-50 border border-primary-300 rounded-2xl shadow p-8 animate-bounce-gentle">
        <h2 className="text-3xl font-bold text-primary-800 mb-4 text-center dyslexic-text">
          🏆 Matokeo ya Jaribio 🏆
        </h2>
        <div className="flex flex-col items-center gap-2 mb-4">
          <span className="text-success-700 text-4xl font-extrabold drop-shadow-sm">
            {attempt.score}{" "}
            <span className="text-base font-semibold text-gray-700">
              / {attempt.totalPoints} Alama
            </span>
          </span>
          <span className="text-success-800 text-2xl font-bold">
            {attempt.percentage}%{" "}
            <span className="text-base font-medium text-gray-700">
              Asilimia
            </span>
          </span>
        </div>
        <div className="text-center mt-2 mb-4">
          {passed ? (
            <span className="text-success-600 text-xl font-bold">Umepita</span>
          ) : (
            <span className="text-warning-700 text-xl font-bold">Hukupita</span>
          )}
          <span className="ml-2 text-gray-600 text-base">
            (Alama ya kupita: {passingScore}%)
          </span>
        </div>
        <div className="mt-4 p-4 bg-secondary-50 border-l-4 border-secondary-400 rounded-xl text-secondary-900 text-lg">
          {getRecommendation(attempt.percentage, attempt.category)}
        </div>
      </div>
      {/* TODO: Show questions, answers, and highlight correct/incorrect answers if quiz definition is available */}
      <div className="flex justify-center mt-8">
        <a
          href="/practice"
          className="text-lg px-8 py-3 font-semibold bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors shadow"
        >
          Rudi kwenye Majaribio
        </a>
      </div>
    </div>
  );
}
