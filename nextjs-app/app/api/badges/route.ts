import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDatabase, collections } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET: Get all badges for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = await getDatabase();
    const userId = new ObjectId(session.user.id);
    const userBadges = await db
      .collection(collections.userBadges)
      .find({ userId })
      .toArray();
    // Optionally populate badge details
    const badgeIds = userBadges.map((ub: any) => ub.badgeId);
    const badges = await db
      .collection(collections.badges)
      .find({ _id: { $in: badgeIds } })
      .toArray();
    return NextResponse.json({ badges, userBadges });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch badges" },
      { status: 500 }
    );
  }
}

// POST: Issue a badge to the current user
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const db = await getDatabase();
    const userId = new ObjectId(session.user.id);
    const { badgeId } = await req.json();
    // Prevent duplicate badge
    const already = await db
      .collection(collections.userBadges)
      .findOne({ userId, badgeId: new ObjectId(badgeId) });
    if (already) {
      return NextResponse.json({ message: "Badge already issued" });
    }
    const result = await db.collection(collections.userBadges).insertOne({
      userId,
      badgeId: new ObjectId(badgeId),
      earnedAt: new Date(),
      level: 1,
    });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to issue badge" },
      { status: 500 }
    );
  }
}
