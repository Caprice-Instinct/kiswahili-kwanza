import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// GET /api/parent/learner-profile?learnerId=xxx
export async function GET(req: Request) {
  const db = await getDatabase();
  const { searchParams } = new URL(req.url);
  const learnerId = searchParams.get("learnerId");
  if (!learnerId)
    return NextResponse.json({ error: "No learnerId" }, { status: 400 });
  let query: any = {};
  // Try both string and ObjectId for _id
  try {
    query = { _id: new ObjectId(learnerId) };
  } catch (e) {
    query = { _id: learnerId };
  }
  const learner = await db.collection("users").findOne(query);
  if (!learner)
    return NextResponse.json({ error: "Learner not found" }, { status: 404 });
  return NextResponse.json({
    name: learner.name,
    email: learner.email,
    id: learner._id,
    ...learner,
  });
}
