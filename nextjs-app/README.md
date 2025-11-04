# Kiswahili Kwanza - Next.js Application

A dyslexia-friendly Kiswahili learning application for children aged 6-9, built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Features

- **Dyslexia-Friendly Design**: Specially designed UI with appropriate colors, fonts, and spacing
- **Interactive Lessons**: Structured learning path with audio and visual aids
- **Practice Exercises**: Gamified quizzes and exercises with immediate feedback
- **Progress Tracking**: Comprehensive analytics and achievement system
- **AI-Powered Learning**: Personalized recommendations and adaptive content
- **Authentication**: Secure user accounts with NextAuth.js
- **MongoDB Integration**: Robust data storage and user progress tracking

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dyslexia-friendly theme
- **UI Components**: Shadcn/ui with Radix UI primitives
- **Authentication**: NextAuth.js with MongoDB adapter
- **Database**: MongoDB with connection pooling
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository and navigate to the Next.js app:
   ```bash
   cd nextjs-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/kiswahili-kwanza
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. Initialize the database:
   ```bash
   npm run init-db
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

### Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use the connection string: `mongodb://localhost:27017/kiswahili-kwanza`

### MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

### Initialize Database

Run the database initialization script to create indexes and seed initial data:

```bash
npm run init-db
```

This will:
- Create necessary database indexes
- Seed initial words, lessons, and achievements
- Set up the database structure

## Authentication

The app uses NextAuth.js with:
- **Credentials Provider**: Email/password authentication
- **Google OAuth**: Optional Google sign-in
- **MongoDB Adapter**: Session and user data stored in MongoDB

### User Registration

New users can sign up with:
- Name
- Email
- Password
- Age (5-12 years)

## API Routes

- `POST /api/auth/[...nextauth]` - NextAuth.js authentication
- `GET /api/user/progress` - Get user progress
- `POST /api/user/progress` - Update user progress

## Project Structure

```
nextjs-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── lessons/           # Lessons page
│   ├── practice/          # Practice page
│   ├── progress/          # Progress tracking page
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── navigation.tsx    # Navigation component
│   └── providers.tsx     # Context providers
├── lib/                  # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── mongodb.ts        # MongoDB connection
│   ├── models.ts         # TypeScript models
│   ├── seed-data.ts      # Database seed data
│   └── utils.ts          # Utility functions
├── scripts/              # Database scripts
│   └── init-db.ts        # Database initialization
├── types/                # TypeScript declarations
│   └── next-auth.d.ts    # NextAuth type extensions
└── middleware.ts         # Route protection middleware
```

## Dyslexia-Friendly Features

### Design Principles
- **High Contrast**: Clear distinction between text and background
- **Readable Fonts**: Comic Sans MS and Inter fonts for better readability
- **Appropriate Colors**: Blue and yellow color scheme that's easier on dyslexic eyes
- **Generous Spacing**: Increased line height and letter spacing
- **Large Text**: Minimum 18px font size for body text
- **Clear Navigation**: Simple, consistent navigation patterns

### Interactive Elements
- **Audio Support**: Text-to-speech for all content
- **Visual Cues**: Icons and images to support text
- **Progress Indicators**: Clear visual feedback on learning progress
- **Gamification**: Rewards and achievements to maintain engagement

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run init-db` - Initialize database with seed data
- `npm run seed` - Alias for init-db

## Environment Variables

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/kiswahili-kwanza

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- **Strathmore University** - Academic support and guidance
- **Dr. Joseph Orero** - Project supervisor
- **Dyslexia Research Community** - Design principles and best practices
- **Open Source Community** - Tools and libraries used

---

**Kiswahili Kwanza** - Empowering children with dyslexia to learn Kiswahili with confidence and joy.

Made with ❤️ by Wabuga Linet Wangui