import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDatabase } from '@/lib/mongodb'
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
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const userProgress = await db.collection('user_progress')
      .find({ userId })
      .toArray()

    const userAchievements = await db.collection('user_achievements')
      .find({ userId })
      .toArray()

    const dailyProgress = await db.collection('daily_progress')
      .find({ userId })
      .sort({ date: -1 })
      .limit(7)
      .toArray()

    return NextResponse.json({
      stats: user.stats,
      level: user.level,
      points: user.points,
      streak: user.streak,
      progress: userProgress,
      achievements: userAchievements,
      dailyProgress: dailyProgress,
      wordsLearned: userProgress.length * 3 // Estimate based on lessons
    })
  } catch (error) {
    console.error('User progress error:', error)
    return NextResponse.json({ error: 'Failed to fetch user progress' }, { status: 500 })
  }
}