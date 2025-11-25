import { getDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// POST /api/parent/register
export async function POST(req: Request) {
  const data = await req.json();
  const db = await getDatabase();
  // Parent: { name, email, learnerId }
  const parent = {
    name: data.name,
    email: data.email,
    learnerId: data.learnerId,
    createdAt: new Date(),
  };
  await db.collection("parents").insertOne(parent);
  return NextResponse.json({ success: true, parent });
}

// GET /api/parent/learner-profile?learnerId=xxx
export async function GET(req: Request) {
  const db = await getDatabase();
  const { searchParams } = new URL(req.url);
  const learnerId = searchParams.get("learnerId");
  if (!learnerId)
    return NextResponse.json({ error: "No learnerId" }, { status: 400 });
  const learner = await db.collection("users").findOne({ _id: learnerId });
  if (!learner)
    return NextResponse.json({ error: "Learner not found" }, { status: 404 });
  return NextResponse.json({ name: learner.name, email: learner.email });
}
