import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDatabase } from '@/lib/mongodb'
import { generateOTP, sendOTP } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    console.log('Verify login request:', { email, passwordLength: password?.length })

    if (!email || !password) {
      console.log('Missing email or password')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const users = db.collection('users')
    
    // Find user by email
    const user = await users.findOne({ email })
    console.log('User found:', !!user)
    
    if (!user) {
      console.log('User not found for email:', email)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Verify password
    if (!user.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isPasswordValid)
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate and send OTP
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
    console.log('Sending OTP to email:', email)
    await sendOTP(email, otp)
    console.log('OTP sent successfully')

    return NextResponse.json({
      success: true,
      message: 'OTP sent to your email'
    })

  } catch (error) {
    console.error('Login verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}