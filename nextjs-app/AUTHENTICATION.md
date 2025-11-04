# Authentication Setup - Kiswahili Kwanza

This document explains how to set up and use the authentication system in Kiswahili Kwanza.

## Overview

The authentication system uses:
- **NextAuth.js** for authentication management
- **MongoDB** for user data storage
- **MongoDB Adapter** for NextAuth integration
- **bcryptjs** for password hashing
- **Google OAuth** for social login (optional)

## Features

✅ **Email/Password Authentication**
- User registration with name, age, email, and password
- Secure password hashing with bcryptjs
- Age validation (5-12 years for target audience)
- Automatic user profile creation

✅ **Google OAuth Integration**
- One-click sign-in with Google
- Automatic profile creation for new Google users
- Default settings for dyslexia-friendly experience

✅ **User Profiles**
- Age-appropriate settings (5-12 years)
- Learning progress tracking (level, points, streak)
- Dyslexia-friendly preferences
- Avatar support

✅ **Route Protection**
- Middleware protection for learning pages
- Automatic redirects to sign-in
- Session management

## Quick Setup

1. **Install dependencies** (already done):
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   npm run setup-auth
   ```

3. **Set up MongoDB**:
   - **Local MongoDB**: Ensure MongoDB is running on `localhost:27017`
   - **MongoDB Atlas**: Update `MONGODB_URI` in `.env.local`

4. **Configure Google OAuth** (optional):
   - Go to [Google Cloud Console](https://console.developers.google.com/)
   - Create/select project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to redirect URIs
   - Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`

5. **Initialize database**:
   ```bash
   npm run init-db
   ```

6. **Start development server**:
   ```bash
   npm run dev
   ```

## Environment Variables

Required variables in `.env.local`:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/kiswahili-kwanza

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-key

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## User Flow

### Registration (Email/Password)
1. User visits `/auth/signup`
2. Fills form: name, age (5-12), email, password
3. System validates input and creates account
4. User is automatically signed in
5. Redirected to home page

### Registration (Google OAuth)
1. User clicks "Jisajili kwa Google" button
2. Redirected to Google OAuth
3. System creates profile with default settings
4. User is signed in and redirected to home page

### Sign In
1. User visits `/auth/signin`
2. Can use email/password or Google OAuth
3. Successful login redirects to home page
4. Failed login shows error message

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // hashed, optional for OAuth users
  age: Number, // 5-12 for target audience
  level: Number, // learning level (1-10)
  points: Number, // gamification points
  streak: Number, // daily learning streak
  createdAt: Date,
  profile: {
    avatar: String, // URL or null
    preferences: {
      soundEnabled: Boolean,
      dyslexicFont: Boolean,
      difficulty: String // 'easy', 'medium', 'hard'
    }
  }
}
```

### NextAuth Collections
- `accounts` - OAuth account linking
- `sessions` - User sessions
- `verification_tokens` - Email verification (if implemented)

## Protected Routes

The following routes require authentication:
- `/lessons` - Learning lessons
- `/practice` - Practice exercises
- `/progress` - Progress tracking

Unauthenticated users are redirected to `/auth/signin`.

## API Endpoints

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints
- `GET /api/auth/session` - Current session
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out

### User Data
- `GET /api/user/progress` - User progress data

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **Session Management**: JWT tokens with secure settings
- **CSRF Protection**: Built into NextAuth
- **Route Protection**: Middleware-based authentication
- **Input Validation**: Age limits and email validation

## Customization

### Age-Appropriate Design
- Dyslexia-friendly fonts by default
- Large buttons and clear navigation
- Swahili language interface
- Simple, colorful design

### Learning Integration
- Automatic level assignment (starts at 1)
- Points system for gamification
- Streak tracking for engagement
- Progress persistence across sessions

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify MONGODB_URI in .env.local
   - Ensure database permissions

2. **Google OAuth Not Working**
   - Verify client ID and secret
   - Check redirect URI configuration
   - Ensure Google+ API is enabled

3. **Session Issues**
   - Clear browser cookies
   - Restart development server
   - Check NEXTAUTH_SECRET is set

4. **Age Validation Errors**
   - Ensure age is between 5-12
   - Check form validation logic

### Debug Mode

Enable NextAuth debug mode by adding to `.env.local`:
```env
NEXTAUTH_DEBUG=true
```

## Production Deployment

Before deploying to production:

1. **Generate secure secret**:
   ```bash
   openssl rand -base64 32
   ```

2. **Update environment variables**:
   - Set production NEXTAUTH_URL
   - Use production MongoDB URI
   - Update Google OAuth redirect URIs

3. **Security checklist**:
   - Enable HTTPS
   - Set secure cookie settings
   - Configure CORS properly
   - Review database permissions

## Support

For authentication issues:
1. Check this documentation
2. Review NextAuth.js documentation
3. Check MongoDB connection
4. Verify environment variables
5. Test with different browsers

---

**Karibu! Welcome to Kiswahili Kwanza!** 🎉