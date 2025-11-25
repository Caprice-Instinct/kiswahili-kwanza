import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 })
    }

    const db = await getDatabase()
    const otpRecord = await db.collection('otps').findOne({
      email,
      otp,
      used: false,
      expiresAt: { $gt: new Date() }
    })

    if (!otpRecord) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    await db.collection('otps').updateOne(
      { _id: otpRecord._id },
      { $set: { used: true } }
    )

    return NextResponse.json({ message: 'OTP verified successfully' })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
  }
}