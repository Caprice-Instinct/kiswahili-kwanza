import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase, collections } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDatabase();
    const userId = new ObjectId(session.user.id);

    const user = await db.collection("users").findOne({ _id: userId });

    // Support ?lessonId=... query param
    const url = new URL(req.url);
    const lessonIdParam = url.searchParams.get("lessonId");
    let progress;
    if (lessonIdParam) {
      progress = await db.collection(collections.readingProgress).findOne({
        userId,
        lessonId: lessonIdParam.toString(),
      });
    } else {
      progress = await db
        .collection(collections.readingProgress)
        .find({ userId })
        .toArray();
    }

    return NextResponse.json({
      progress,
      user: {
        level: user?.level || 1,
        points: user?.points || 0,
        streak: user?.streak || 0,
        stats: user?.stats || {},
      },
    });
  } catch (error) {
    console.error("Progress API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
