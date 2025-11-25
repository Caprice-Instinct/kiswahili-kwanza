const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/kiswahili-kwanza';

// User data with different progress levels
const users = [
  {
    name: 'Linet Wangui',
    email: 'linetw2004@gmail.com',
    password: 'password123', // Will be hashed
    age: 20,
    level: 3,
    points: 1250,
    streak: 15,
    lastLoginDate: new Date(),
    createdAt: new Date('2024-01-15'),
    profile: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linet1',
      preferences: {
        soundEnabled: true,
        dyslexicFont: false,
        difficulty: 'medium',
        language: 'en'
      }
    },
    stats: {
      totalLessonsCompleted: 12,
      totalTimeSpent: 180,
      averageScore: 85,
      longestStreak: 20,
      currentWeeklyGoal: 5,
      weeklyProgress: 4
    }
  },
  {
    name: 'Linet Wangui Pro',
    email: 'linetwangui2004@gmail.com',
    password: 'password123', // Will be hashed
    age: 20,
    level: 7,
    points: 3450,
    streak: 45,
    lastLoginDate: new Date(),
    createdAt: new Date('2023-11-10'),
    profile: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linet2',
      preferences: {
        soundEnabled: true,
        dyslexicFont: true,
        difficulty: 'hard',
        language: 'sw'
      }
    },
    stats: {
      totalLessonsCompleted: 35,
      totalTimeSpent: 520,
      averageScore: 92,
      longestStreak: 50,
      currentWeeklyGoal: 7,
      weeklyProgress: 6
    }
  },
  {
    name: 'Linet Wabuga',
    email: 'linet.wabuga@strathmore.edu',
    password: 'password123', // Will be hashed
    age: 21,
    level: 5,
    points: 2100,
    streak: 8,
    lastLoginDate: new Date(),
    createdAt: new Date('2024-02-20'),
    profile: {
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linet3',
      preferences: {
        soundEnabled: false,
        dyslexicFont: false,
        difficulty: 'medium',
        language: 'en'
      }
    },
    stats: {
      totalLessonsCompleted: 22,
      totalTimeSpent: 310,
      averageScore: 78,
      longestStreak: 25,
      currentWeeklyGoal: 4,
      weeklyProgress: 2
    }
  }
];

// Sample lessons data
const lessons = [
  {
    title: 'Greetings and Introductions',
    titleSw: 'Salamu na Utambulisho',
    description: 'Learn basic Swahili greetings and how to introduce yourself',
    descriptionSw: 'Jifunze salamu za kimsingi na jinsi ya kujitambulisha',
    level: 1,
    category: 'vocabulary',
    subcategory: 'greetings',
    duration: 10,
    order: 1,
    prerequisites: [],
    isActive: true,
    difficulty: 'easy',
    tags: ['greetings', 'basic', 'introduction'],
    createdAt: new Date()
  },
  {
    title: 'Numbers 1-10',
    titleSw: 'Nambari 1-10',
    description: 'Master counting from 1 to 10 in Kiswahili',
    descriptionSw: 'Jifunze kuhesabu kutoka 1 hadi 10 kwa Kiswahili',
    level: 1,
    category: 'vocabulary',
    subcategory: 'numbers',
    duration: 12,
    order: 2,
    prerequisites: [],
    isActive: true,
    difficulty: 'easy',
    tags: ['numbers', 'counting', 'basic'],
    createdAt: new Date()
  },
  {
    title: 'Family Members',
    titleSw: 'Wanafamilia',
    description: 'Learn words for family members and relationships',
    descriptionSw: 'Jifunze maneno ya wanafamilia na uhusiano',
    level: 2,
    category: 'vocabulary',
    subcategory: 'family',
    duration: 15,
    order: 3,
    prerequisites: [],
    isActive: true,
    difficulty: 'easy',
    tags: ['family', 'relationships', 'vocabulary'],
    createdAt: new Date()
  },
  {
    title: 'Colors and Shapes',
    titleSw: 'Rangi na Maumbo',
    description: 'Discover colors and basic shapes in Kiswahili',
    descriptionSw: 'Gundua rangi na maumbo ya kimsingi kwa Kiswahili',
    level: 2,
    category: 'vocabulary',
    subcategory: 'colors',
    duration: 10,
    order: 4,
    prerequisites: [],
    isActive: true,
    difficulty: 'easy',
    tags: ['colors', 'shapes', 'descriptive'],
    createdAt: new Date()
  },
  {
    title: 'Present Tense Verbs',
    titleSw: 'Vitenzi vya Wakati wa Sasa',
    description: 'Learn common verbs in present tense',
    descriptionSw: 'Jifunze vitenzi vya kawaida katika wakati wa sasa',
    level: 3,
    category: 'grammar',
    subcategory: 'verbs',
    duration: 20,
    order: 5,
    prerequisites: [],
    isActive: true,
    difficulty: 'medium',
    tags: ['grammar', 'verbs', 'present-tense'],
    createdAt: new Date()
  }
];

// Sample words
const words = [
  {
    english: 'Hello',
    swahili: 'Jambo',
    pronunciation: 'JAM-bo',
    category: 'greetings',
    difficulty: 'easy',
    partOfSpeech: 'noun',
    examples: [{ english: 'Hello, how are you?', swahili: 'Jambo, habari yako?' }],
    synonyms: ['Hujambo'],
    antonyms: [],
    frequency: 95,
    createdAt: new Date()
  },
  {
    english: 'Thank you',
    swahili: 'Asante',
    pronunciation: 'a-SAN-te',
    category: 'greetings',
    difficulty: 'easy',
    partOfSpeech: 'noun',
    examples: [{ english: 'Thank you very much', swahili: 'Asante sana' }],
    synonyms: ['Shukrani'],
    antonyms: [],
    frequency: 90,
    createdAt: new Date()
  },
  {
    english: 'One',
    swahili: 'Moja',
    pronunciation: 'MO-ja',
    category: 'numbers',
    difficulty: 'easy',
    partOfSpeech: 'adjective',
    examples: [{ english: 'I have one book', swahili: 'Nina kitabu kimoja' }],
    synonyms: [],
    antonyms: [],
    frequency: 85,
    createdAt: new Date()
  },
  {
    english: 'Mother',
    swahili: 'Mama',
    pronunciation: 'MA-ma',
    category: 'family',
    difficulty: 'easy',
    partOfSpeech: 'noun',
    examples: [{ english: 'My mother is kind', swahili: 'Mama yangu ni mkarimu' }],
    synonyms: [],
    antonyms: [],
    frequency: 80,
    createdAt: new Date()
  }
];

// Sample achievements
const achievements = [
  {
    title: 'First Steps',
    titleSw: 'Hatua za Kwanza',
    description: 'Complete your first lesson',
    descriptionSw: 'Kamilisha somo lako la kwanza',
    icon: '🌟',
    type: 'lesson',
    category: 'bronze',
    requirement: { type: 'lessons_completed', value: 1 },
    points: 50,
    isActive: true,
    order: 1,
    createdAt: new Date()
  },
  {
    title: 'Week Warrior',
    titleSw: 'Shujaa wa Wiki',
    description: 'Learn for 7 days in a row',
    descriptionSw: 'Jifunza kwa siku 7 mfululizo',
    icon: '🔥',
    type: 'streak',
    category: 'silver',
    requirement: { type: 'streak_days', value: 7 },
    points: 200,
    isActive: true,
    order: 2,
    createdAt: new Date()
  },
  {
    title: 'Point Master',
    titleSw: 'Bingwa wa Alama',
    description: 'Earn 1000 points',
    descriptionSw: 'Pata alama 1000',
    icon: '💎',
    type: 'points',
    category: 'gold',
    requirement: { type: 'points_earned', value: 1000 },
    points: 300,
    isActive: true,
    order: 3,
    createdAt: new Date()
  }
];

async function populateDatabase() {
  let client;
  
  try {
    console.log('🚀 Connecting to MongoDB...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db('kiswahili-kwanza');
    console.log('✅ Connected to database');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await db.collection('users').deleteMany({});
    await db.collection('lessons').deleteMany({});
    await db.collection('words').deleteMany({});
    await db.collection('achievements').deleteMany({});
    await db.collection('user_progress').deleteMany({});
    await db.collection('user_achievements').deleteMany({});

    // Insert lessons first to get their IDs
    console.log('📚 Inserting lessons...');
    const lessonResult = await db.collection('lessons').insertMany(lessons);
    const lessonIds = Object.values(lessonResult.insertedIds);
    console.log(`✅ Inserted ${lessonIds.length} lessons`);

    // Insert words
    console.log('📝 Inserting words...');
    await db.collection('words').insertMany(words);
    console.log(`✅ Inserted ${words.length} words`);

    // Insert achievements
    console.log('🏆 Inserting achievements...');
    const achievementResult = await db.collection('achievements').insertMany(achievements);
    const achievementIds = Object.values(achievementResult.insertedIds);
    console.log(`✅ Inserted ${achievementIds.length} achievements`);

    // Hash passwords and insert users
    console.log('👥 Inserting users...');
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 12),
        emailVerified: new Date()
      }))
    );
    const userResult = await db.collection('users').insertMany(usersWithHashedPasswords);
    const userIds = Object.values(userResult.insertedIds);
    console.log(`✅ Inserted ${userIds.length} users`);

    // Create user progress for each user
    console.log('📊 Creating user progress...');
    const userProgressData = [];
    const userAchievementData = [];

    users.forEach((user, userIndex) => {
      const userId = userIds[userIndex];
      const completedLessons = Math.min(user.stats.totalLessonsCompleted, lessonIds.length);
      
      // Create progress for completed lessons
      for (let i = 0; i < completedLessons; i++) {
        const score = Math.floor(Math.random() * 30) + 70; // 70-100%
        userProgressData.push({
          userId: userId,
          lessonId: lessonIds[i],
          completed: true,
          score: score,
          timeSpent: Math.floor(Math.random() * 600) + 300, // 5-15 minutes
          attempts: Math.floor(Math.random() * 3) + 1,
          lastAttempt: new Date(),
          stars: score >= 90 ? 3 : score >= 80 ? 2 : 1,
          exerciseResults: [],
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      // Assign achievements based on user progress
      if (user.stats.totalLessonsCompleted >= 1) {
        userAchievementData.push({
          userId: userId,
          achievementId: achievementIds[0], // First Steps
          earnedAt: new Date(),
          notified: true
        });
      }
      
      if (user.streak >= 7) {
        userAchievementData.push({
          userId: userId,
          achievementId: achievementIds[1], // Week Warrior
          earnedAt: new Date(),
          notified: true
        });
      }
      
      if (user.points >= 1000) {
        userAchievementData.push({
          userId: userId,
          achievementId: achievementIds[2], // Point Master
          earnedAt: new Date(),
          notified: true
        });
      }
    });

    if (userProgressData.length > 0) {
      await db.collection('user_progress').insertMany(userProgressData);
      console.log(`✅ Created ${userProgressData.length} progress records`);
    }

    if (userAchievementData.length > 0) {
      await db.collection('user_achievements').insertMany(userAchievementData);
      console.log(`✅ Assigned ${userAchievementData.length} achievements`);
    }

    // Create daily progress for recent days
    console.log('📅 Creating daily progress...');
    const dailyProgressData = [];
    const today = new Date();
    
    users.forEach((user, userIndex) => {
      const userId = userIds[userIndex];
      
      // Create progress for last 7 days
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const lessonsCompleted = Math.floor(Math.random() * 3);
        const timeSpent = lessonsCompleted * (Math.floor(Math.random() * 20) + 10);
        const pointsEarned = lessonsCompleted * (Math.floor(Math.random() * 50) + 25);
        
        dailyProgressData.push({
          userId: userId,
          date: date,
          lessonsCompleted: lessonsCompleted,
          exercisesCompleted: lessonsCompleted * (Math.floor(Math.random() * 5) + 3),
          timeSpent: timeSpent,
          pointsEarned: pointsEarned,
          streakMaintained: lessonsCompleted > 0,
          goals: {
            lessonsTarget: 2,
            timeTarget: 30,
            achieved: lessonsCompleted >= 2 && timeSpent >= 30
          }
        });
      }
    });

    if (dailyProgressData.length > 0) {
      await db.collection('daily_progress').insertMany(dailyProgressData);
      console.log(`✅ Created ${dailyProgressData.length} daily progress records`);
    }

    // Create indexes for better performance
    console.log('🔍 Creating database indexes...');
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('user_progress').createIndex({ userId: 1, lessonId: 1 }, { unique: true });
    await db.collection('user_achievements').createIndex({ userId: 1, achievementId: 1 }, { unique: true });
    await db.collection('lessons').createIndex({ order: 1 });
    await db.collection('words').createIndex({ category: 1 });
    console.log('✅ Database indexes created');

    console.log('\n🎉 Database population completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👥 Users: ${users.length}`);
    console.log(`📚 Lessons: ${lessons.length}`);
    console.log(`📝 Words: ${words.length}`);
    console.log(`🏆 Achievements: ${achievements.length}`);
    console.log(`📊 Progress Records: ${userProgressData.length}`);
    console.log(`🎯 User Achievements: ${userAchievementData.length}`);
    console.log(`📅 Daily Progress: ${dailyProgressData.length}`);
    
    console.log('\n👥 User Details:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   Level: ${user.level}, Points: ${user.points}, Streak: ${user.streak} days`);
      console.log(`   Lessons Completed: ${user.stats.totalLessonsCompleted}, Average Score: ${user.stats.averageScore}%`);
    });

  } catch (error) {
    console.error('❌ Error populating database:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the script
populateDatabase();