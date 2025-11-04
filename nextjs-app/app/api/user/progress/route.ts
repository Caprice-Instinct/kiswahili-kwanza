import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await getDatabase()
    const progress = db.collection('progress')
    
    const userProgress = await progress.find({
      userId: new ObjectId(session.user.id)
    }).toArray()

    return NextResponse.json({ progress: userProgress })
  } catch (error) {
    console.error('Error fetching user progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { lessonId, completed, score, timeSpent, stars } = body

    const db = await getDatabase()
    const progress = db.collection('progress')
    const users = db.collection('users')
    
    // Update or create progress record
    const progressData = {
      userId: new ObjectId(session.user.id),
      lessonId: new ObjectId(lessonId),
      completed: completed || false,
      score: score || 0,
      timeSpent: timeSpent || 0,
      attempts: 1,
      lastAttempt: new Date(),
      stars: stars || 0
    }

    const existingProgress = await progress.findOne({
      userId: new ObjectId(session.user.id),
      lessonId: new ObjectId(lessonId)
    })

    if (existingProgress) {
      await progress.updateOne(
        { _id: existingProgress._id },
        { 
          $set: {
            ...progressData,
            attempts: existingProgress.attempts + 1
          }
        }
      )
    } else {
      await progress.insertOne(progressData)
    }

    // Update user points and level
    if (completed && score > 0) {
      const pointsEarned = Math.floor(score * 10) + (stars * 50)
      
      await users.updateOne(
        { _id: new ObjectId(session.user.id) },
        { 
          $inc: { points: pointsEarned },
          $set: { updatedAt: new Date() }
        }
      )
    }

    return NextResponse.json({ success: true, pointsEarned: completed ? Math.floor(score * 10) + (stars * 50) : 0 })
  } catch (error) {
    console.error('Error updating user progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}