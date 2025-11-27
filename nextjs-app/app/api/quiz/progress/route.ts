// GET: Fetch all quiz attempts and progress for the current user
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = await getDatabase();
    const userIdStr = session.user.id;
    let userIdObj = null;
    try {
      userIdObj = new ObjectId(userIdStr);
    } catch (e) {
      userIdObj = null;
    }
    // Accept both string and ObjectId userId
    const attempts = await db
      .collection("quiz_attempts")
      .find({
        $or: [
          { userId: userIdStr },
          ...(userIdObj ? [{ userId: userIdObj }] : []),
        ],
      })
      .sort({ completedAt: -1, createdAt: -1 })
      .toArray();
    return NextResponse.json({ attempts });
  } catch (error) {
    console.error("Quiz progress fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quiz progress" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// POST: Save a quiz attempt and update user quiz progress
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = await getDatabase();
    const userId = new ObjectId(session.user.id);
    const data = await req.json();
    // Expecting: { quizId, score, totalPoints, percentage, answers, completedAt }
    if (!data.quizId || typeof data.score !== "number") {
      return NextResponse.json(
        { error: "Missing quizId or score" },
        { status: 400 }
      );
    }
    // Save attempt
    const attempt = {
      userId,
      quizId: data.quizId,
      score: data.score,
      totalPoints: data.totalPoints,
      percentage: data.percentage,
      answers: data.answers,
      completedAt: data.completedAt ? new Date(data.completedAt) : new Date(),
      createdAt: new Date(),
      category: data.category || null,
      difficulty: data.difficulty || null,
    };
    await db.collection("quiz_attempts").insertOne(attempt);
    // Update or create user quiz progress summary
    await db.collection("quiz_progress").updateOne(
      { userId, quizId: data.quizId },
      {
        $set: {
          lastScore: data.score,
          lastPercentage: data.percentage,
          lastCompletedAt: attempt.completedAt,
          updatedAt: new Date(),
        },
        $inc: { attempts: 1 },
        $max: { bestScore: data.score, bestPercentage: data.percentage },
      },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quiz progress save error:", error);
    return NextResponse.json(
      { error: "Failed to save quiz progress" },
      { status: 500 }
    );
  }
}
