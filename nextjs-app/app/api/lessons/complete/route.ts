import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase, collections } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// POST: Mark a lesson as completed and issue a badge if not already issued
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = await getDatabase();
    const userId = new ObjectId(session.user.id);
    const { lessonId, badgeId, type } = await req.json();
    // Mark lesson progress (flashcards or story) in reading_progress collection
    let update: any = { lastAttempt: new Date() };
    if (type === "flashcards") {
      update.flashcardsCompleted = true;
    } else if (type === "story") {
      update.storyCompleted = true;
    }
    try {
      const result = await db
        .collection(collections.readingProgress)
        .updateOne(
          { userId, lessonId: lessonId.toString() },
          { $set: update },
          { upsert: true }
        );
      console.log("[reading_progress] updateOne result:", result);

      // Automatically unlock the next lesson if this one is completed
      if (type === "flashcards" || type === "story") {
        // lessonId is a string or number, increment to get next lesson
        let nextLessonId;
        if (typeof lessonId === "number") {
          nextLessonId = (lessonId + 1).toString();
        } else {
          const parsed = parseInt(lessonId, 10);
          if (!isNaN(parsed)) {
            nextLessonId = (parsed + 1).toString();
          }
        }
        if (nextLessonId) {
          await db
            .collection(collections.readingProgress)
            .updateOne(
              { userId, lessonId: nextLessonId },
              { $set: { unlocked: true } },
              { upsert: true }
            );
          console.log(
            `[reading_progress] Unlocked next lesson: ${nextLessonId}`
          );
        }
      }
    } catch (err) {
      console.error("[reading_progress] updateOne error:", err);
    }
    // Issue badge if badgeId provided and not already issued
    let badgeIssued = false;
    if (badgeId) {
      const already = await db
        .collection("badges")
        .findOne({ userId, badgeId: new ObjectId(badgeId) });
      if (!already) {
        await db.collection("badges").insertOne({
          userId,
          badgeId: new ObjectId(badgeId),
          earnedAt: new Date(),
          level: 1,
        });
        badgeIssued = true;
      }
    }
    return NextResponse.json({ success: true, badgeIssued });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to complete lesson" },
      { status: 500 }
    );
  }
}
