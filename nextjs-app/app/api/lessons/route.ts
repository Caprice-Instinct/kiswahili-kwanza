import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDatabase, collections } from '@/lib/mongodb'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDatabase()
    const lessons = await db.collection(collections.lessons)
      .find({ isActive: true })
      .sort({ level: 1, order: 1 })
      .toArray()

    return NextResponse.json(lessons)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 })
  }
}