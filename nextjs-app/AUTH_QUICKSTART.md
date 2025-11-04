# Authentication Quick Start - Kiswahili Kwanza

## 🚀 Quick Setup (5 minutes)

1. **Test current setup**:
   ```bash
   npm run test-auth
   ```

2. **Setup authentication**:
   ```bash
   npm run setup-auth
   ```

3. **Start the app**:
   ```bash
   npm run dev
   ```

4. **Test authentication**:
   - Visit: http://localhost:3000/auth/signin
   - Try both email/password and Google sign-in

## 🔧 What's Already Configured

✅ **NextAuth.js** with MongoDB adapter  
✅ **Email/Password** authentication with bcryptjs  
✅ **Google OAuth** integration (needs client ID/secret)  
✅ **User profiles** with age, level, points tracking  
✅ **Route protection** for learning pages  
✅ **Dyslexia-friendly** UI with Swahili interface  

## 📝 Environment Variables Needed

```env
# Required
MONGODB_URI=mongodb://localhost:27017/kiswahili-kwanza
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Optional (for Google OAuth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🎯 User Experience

### For Children (Age 5-12)
- **Simple forms** with large buttons
- **Swahili interface** (Ingia = Sign In, Jisajili = Sign Up)
- **Dyslexia-friendly** fonts and colors
- **Age validation** (5-12 years only)
- **Gamification** with levels and points

### Authentication Flow
1. **Sign Up**: Name, Age, Email, Password → Auto sign-in
2. **Sign In**: Email/Password or Google → Redirect to home
3. **Protected Routes**: Auto-redirect to sign-in if not authenticated
4. **Profile**: Automatic creation with learning preferences

## 🔒 Security Features

- **Password hashing** with bcryptjs
- **JWT sessions** with secure settings
- **Route protection** via middleware
- **Input validation** for age and email
- **CSRF protection** built-in

## 🎮 Learning Integration

- **Level system**: Starts at level 1
- **Points system**: Earn points for activities
- **Streak tracking**: Daily learning streaks
- **Progress persistence**: Saves across sessions
- **Preferences**: Sound, dyslexic font, difficulty

## 🐛 Troubleshooting

**MongoDB not connecting?**
```bash
# Start local MongoDB
mongod

# Or use MongoDB Atlas cloud
# Update MONGODB_URI in .env.local
```

**Google OAuth not working?**
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create OAuth 2.0 credentials
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

**Session issues?**
- Clear browser cookies
- Restart dev server
- Check NEXTAUTH_SECRET is set

## 📚 Next Steps

1. **Test the authentication** with different scenarios
2. **Set up MongoDB** (local or Atlas)
3. **Configure Google OAuth** for social login
4. **Customize user profiles** as needed
5. **Add more learning features**

---

**Karibu! Ready to learn Kiswahili!** 🎉

For detailed documentation, see [AUTHENTICATION.md](./AUTHENTICATION.md)