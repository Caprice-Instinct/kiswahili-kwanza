import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default async function QuizResultsServerPage({
  searchParams,
}: {
  searchParams: { quizId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return notFound();
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
      quizId: searchParams.quizId,
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
  // Fetch quiz definition (assuming you have a quizzes collection or static data)
  // For now, just show score and answers
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <Card className="border-4 border-blue-600 shadow-lg bg-gradient-to-br from-blue-50 to-green-50">
        <CardHeader className="text-center pb-0">
          <CardTitle className="text-3xl font-extrabold text-blue-800 mb-2 tracking-wide">
            🏆 Matokeo ya Jaribio 🏆
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-2 mt-2">
            <div className="text-center flex flex-col items-center">
              <div className="rounded-full bg-blue-200 border-4 border-blue-400 w-28 h-28 flex items-center justify-center mb-2">
                <span className="text-5xl font-extrabold text-blue-900 drop-shadow-lg">
                  {attempt.score}
                </span>
              </div>
              <div className="text-blue-700 text-lg font-semibold">Alama</div>
              <div className="text-blue-500 text-sm">
                (juu ya {attempt.totalPoints})
              </div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="rounded-full bg-green-200 border-4 border-green-400 w-28 h-28 flex items-center justify-center mb-2">
                <span className="text-5xl font-extrabold text-green-900 drop-shadow-lg">
                  {attempt.percentage}%
                </span>
              </div>
              <div className="text-green-700 text-lg font-semibold">
                Asilimia
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* TODO: Show questions, answers, and highlight correct/incorrect answers if quiz definition is available */}
      <div className="flex justify-center mt-8">
        <Button className="text-lg px-8 py-3 font-semibold" href="/practice">
          Rudi kwenye Majaribio
        </Button>
      </div>
    </div>
  );
}
