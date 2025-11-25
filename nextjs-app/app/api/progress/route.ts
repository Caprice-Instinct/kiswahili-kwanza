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

    const user = await db.collection('users').findOne({ _id: userId })
    const progress = await db.collection('user_progress')
      .find({ userId })
      .toArray()

    const dailyProgress = await db.collection('daily_progress')
      .findOne({ userId, date: { $gte: new Date(new Date().setHours(0,0,0,0)) } })

    return NextResponse.json({ 
      progress, 
      dailyProgress,
      user: {
        level: user?.level || 1,
        points: user?.points || 0,
        streak: user?.streak || 0,
        stats: user?.stats || {}
      }
    })
  } catch (error) {
    console.error('Progress API error:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}