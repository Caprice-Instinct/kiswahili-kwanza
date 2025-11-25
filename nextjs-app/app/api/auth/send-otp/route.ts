import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { generateOTP, sendOTP } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    
    // Check if user exists
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate new OTP
    const otp = generateOTP()
    const otps = db.collection('otps')
    
    // Remove any existing OTPs for this email
    await otps.deleteMany({ email })
    
    // Insert new OTP
    await otps.insertOne({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      used: false,
      createdAt: new Date()
    })

    // Send OTP via email
    await sendOTP(email, otp)

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully'
    })

  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    )
  }
}