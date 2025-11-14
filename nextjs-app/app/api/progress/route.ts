import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDatabase, collections } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDatabase()
    const userId = new ObjectId(session.user.id)

    const progress = await db.collection(collections.userProgress)
      .find({ userId })
      .toArray()

    const dailyProgress = await db.collection(collections.dailyProgress)
      .findOne({ userId, date: { $gte: new Date(new Date().setHours(0,0,0,0)) } })

    return NextResponse.json({ progress, dailyProgress })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}