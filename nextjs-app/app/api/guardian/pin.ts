import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { collections, Guardian } from "@/lib/models";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";

// POST: Verify PIN
export async function POST(req: NextRequest) {
  const { learnerUserId, pin } = await req.json();
  if (!learnerUserId || !pin) {
    return NextResponse.json(
      { error: "Missing learnerUserId or pin" },
      { status: 400 }
    );
  }
  const db = await getDatabase();
  const guardian = await db
    .collection<Guardian>(collections.guardians)
    .findOne({ learnerUserId: new ObjectId(learnerUserId) });
  if (!guardian) {
    return NextResponse.json({ error: "Guardian not found" }, { status: 404 });
  }
  const valid = await bcrypt.compare(pin, guardian.hashedPin);
  if (!valid) {
    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  }
  return NextResponse.json({ success: true, guardianId: guardian._id });
}

// PATCH: Change PIN
export async function PATCH(req: NextRequest) {
  const { learnerUserId, oldPin, newPin } = await req.json();
  if (!learnerUserId || !oldPin || !newPin) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const db = await getDatabase();
  const guardian = await db
    .collection<Guardian>(collections.guardians)
    .findOne({ learnerUserId: new ObjectId(learnerUserId) });
  if (!guardian) {
    return NextResponse.json({ error: "Guardian not found" }, { status: 404 });
  }
  const valid = await bcrypt.compare(oldPin, guardian.hashedPin);
  if (!valid) {
    return NextResponse.json({ error: "Old PIN incorrect" }, { status: 401 });
  }
  const hashedPin = await bcrypt.hash(newPin, 10);
  await db
    .collection(collections.guardians)
    .updateOne(
      { _id: guardian._id },
      { $set: { hashedPin, updatedAt: new Date() } }
    );
  return NextResponse.json({ success: true });
}
