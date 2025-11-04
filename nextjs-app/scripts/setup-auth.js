#!/usr/bin/env node

/**
 * Setup script for Kiswahili Kwanza authentication
 * This script helps configure the necessary environment variables
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '..', '.env.local');

function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}

function setupEnvironment() {
  console.log('🔧 Setting up Kiswahili Kwanza Authentication...\n');

  // Check if .env.local exists
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found!');
    console.log('Please create a .env.local file first.\n');
    return;
  }

  // Read current .env.local
  let envContent = fs.readFileSync(envPath, 'utf8');

  // Generate a new secret if needed
  if (envContent.includes('your-secret-key-here-change-in-production')) {
    const newSecret = generateSecretKey();
    envContent = envContent.replace(
      'your-secret-key-here-change-in-production',
      newSecret
    );
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Generated new NEXTAUTH_SECRET');
  }

  console.log('📋 Authentication Setup Complete!\n');
  console.log('📝 Next steps:');
  console.log('1. Set up MongoDB:');
  console.log('   - Local: Make sure MongoDB is running on localhost:27017');
  console.log('   - Cloud: Update MONGODB_URI with your MongoDB Atlas connection string\n');
  
  console.log('2. Configure Google OAuth (optional):');
  console.log('   - Go to https://console.developers.google.com/');
  console.log('   - Create a new project or select existing one');
  console.log('   - Enable Google+ API');
  console.log('   - Create OAuth 2.0 credentials');
  console.log('   - Add http://localhost:3000/api/auth/callback/google to authorized redirect URIs');
  console.log('   - Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local\n');
  
  console.log('3. Test the authentication:');
  console.log('   - Run: npm run dev');
  console.log('   - Visit: http://localhost:3000/auth/signin');
  console.log('   - Try both email/password and Google sign-in\n');
  
  console.log('🎉 Ready to start learning Kiswahili!');
}

setupEnvironment();