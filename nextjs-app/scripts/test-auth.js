#!/usr/bin/env node

/**
 * Test script for Kiswahili Kwanza authentication
 * This script verifies the authentication setup
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const authConfigPath = path.join(__dirname, '..', 'lib', 'auth.ts');
const mongoConfigPath = path.join(__dirname, '..', 'lib', 'mongodb.ts');

function testAuthSetup() {
  console.log('🧪 Testing Kiswahili Kwanza Authentication Setup...\n');

  let hasErrors = false;

  // Test 1: Check .env.local file
  console.log('1. Checking environment configuration...');
  if (!fs.existsSync(envPath)) {
    console.log('   ❌ .env.local file not found');
    hasErrors = true;
  } else {
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check required variables
    const requiredVars = [
      'MONGODB_URI',
      'NEXTAUTH_URL',
      'NEXTAUTH_SECRET'
    ];
    
    const missingVars = requiredVars.filter(varName => 
      !envContent.includes(varName) || envContent.includes(`${varName}=your-`)
    );
    
    if (missingVars.length > 0) {
      console.log(`   ❌ Missing or incomplete variables: ${missingVars.join(', ')}`);
      hasErrors = true;
    } else {
      console.log('   ✅ Required environment variables found');
    }
    
    // Check optional Google OAuth
    if (envContent.includes('GOOGLE_CLIENT_ID') && !envContent.includes('your-google-client-id')) {
      console.log('   ✅ Google OAuth configured');
    } else {
      console.log('   ⚠️  Google OAuth not configured (optional)');
    }
  }

  // Test 2: Check auth configuration
  console.log('\n2. Checking authentication configuration...');
  if (!fs.existsSync(authConfigPath)) {
    console.log('   ❌ auth.ts configuration file not found');
    hasErrors = true;
  } else {
    const authContent = fs.readFileSync(authConfigPath, 'utf8');
    
    if (authContent.includes('MongoDBAdapter') && authContent.includes('CredentialsProvider')) {
      console.log('   ✅ Authentication providers configured');
    } else {
      console.log('   ❌ Authentication providers not properly configured');
      hasErrors = true;
    }
  }

  // Test 3: Check MongoDB configuration
  console.log('\n3. Checking MongoDB configuration...');
  if (!fs.existsSync(mongoConfigPath)) {
    console.log('   ❌ mongodb.ts configuration file not found');
    hasErrors = true;
  } else {
    console.log('   ✅ MongoDB configuration file found');
  }

  // Test 4: Check package.json dependencies
  console.log('\n4. Checking dependencies...');
  const packagePath = path.join(__dirname, '..', 'package.json');
  if (fs.existsSync(packagePath)) {
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const requiredDeps = [
      'next-auth',
      '@auth/mongodb-adapter',
      'mongodb',
      'bcryptjs'
    ];
    
    const missingDeps = requiredDeps.filter(dep => 
      !packageContent.dependencies[dep]
    );
    
    if (missingDeps.length > 0) {
      console.log(`   ❌ Missing dependencies: ${missingDeps.join(', ')}`);
      hasErrors = true;
    } else {
      console.log('   ✅ All required dependencies found');
    }
  }

  // Test 5: Check auth pages
  console.log('\n5. Checking authentication pages...');
  const signinPath = path.join(__dirname, '..', 'app', 'auth', 'signin', 'page.tsx');
  const signupPath = path.join(__dirname, '..', 'app', 'auth', 'signup', 'page.tsx');
  
  if (fs.existsSync(signinPath) && fs.existsSync(signupPath)) {
    console.log('   ✅ Sign-in and sign-up pages found');
  } else {
    console.log('   ❌ Authentication pages missing');
    hasErrors = true;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    console.log('❌ Authentication setup has issues that need to be fixed.');
    console.log('\n📝 Next steps:');
    console.log('1. Run: npm run setup-auth');
    console.log('2. Configure missing environment variables');
    console.log('3. Install missing dependencies: npm install');
    console.log('4. Set up MongoDB connection');
  } else {
    console.log('✅ Authentication setup looks good!');
    console.log('\n🚀 Ready to test:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Visit: http://localhost:3000/auth/signin');
    console.log('3. Try creating an account and signing in');
  }
  
  console.log('\n🎉 Karibu Kiswahili Kwanza!');
}

testAuthSetup();