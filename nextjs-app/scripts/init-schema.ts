import { MongoClient } from 'mongodb'
import { collections } from '../lib/models'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kiswahili-kwanza'

async function initializeSchema() {
  console.log('🔧 Initializing Kiswahili Kwanza Database Schema...\n')

  const client = new MongoClient(MONGODB_URI)
  
  try {
    await client.connect()
    const db = client.db('kiswahili-kwanza')

    // Create indexes for better performance
    console.log('📊 Creating database indexes...')

    // Users collection indexes
    await db.collection(collections.users).createIndex({ email: 1 }, { unique: true })
    await db.collection(collections.users).createIndex({ level: 1 })
    await db.collection(collections.users).createIndex({ points: -1 })
    await db.collection(collections.users).createIndex({ streak: -1 })

    // Lessons collection indexes
    await db.collection(collections.lessons).createIndex({ level: 1, order: 1 })
    await db.collection(collections.lessons).createIndex({ category: 1 })
    await db.collection(collections.lessons).createIndex({ isActive: 1 })

    // Words collection indexes
    await db.collection(collections.words).createIndex({ category: 1 })
    await db.collection(collections.words).createIndex({ difficulty: 1 })
    await db.collection(collections.words).createIndex({ frequency: -1 })

    // Progress tracking indexes
    await db.collection(collections.userProgress).createIndex({ userId: 1, lessonId: 1 }, { unique: true })
    await db.collection(collections.userProgress).createIndex({ userId: 1, completed: 1 })
    await db.collection(collections.dailyProgress).createIndex({ userId: 1, date: 1 }, { unique: true })
    await db.collection(collections.weeklyProgress).createIndex({ userId: 1, weekStart: 1 })

    // Analytics indexes
    await db.collection(collections.learningSessions).createIndex({ userId: 1, startTime: -1 })
    await db.collection(collections.userAnalytics).createIndex({ userId: 1, date: -1 })

    // Achievements indexes
    await db.collection(collections.userAchievements).createIndex({ userId: 1 })
    await db.collection(collections.userBadges).createIndex({ userId: 1 })

    // NextAuth indexes
    await db.collection(collections.accounts).createIndex({ userId: 1 })
    await db.collection(collections.sessions).createIndex({ sessionToken: 1 }, { unique: true })
    await db.collection(collections.sessions).createIndex({ expires: 1 }, { expireAfterSeconds: 0 })

    console.log('✅ Database indexes created successfully')

    // Insert sample data
    console.log('\n📝 Inserting sample data...')

    // Sample categories
    const categories = [
      {
        name: 'Vocabulary',
        nameSw: 'Msamiati',
        description: 'Learn new words and their meanings',
        descriptionSw: 'Jifunze maneno mapya na maana zake',
        icon: '📚',
        color: '#3B82F6',
        order: 1,
        isActive: true
      },
      {
        name: 'Grammar',
        nameSw: 'Sarufi',
        description: 'Master Kiswahili grammar rules',
        descriptionSw: 'Shinda kanuni za sarufi ya Kiswahili',
        icon: '📝',
        color: '#10B981',
        order: 2,
        isActive: true
      },
      {
        name: 'Pronunciation',
        nameSw: 'Matamshi',
        description: 'Perfect your pronunciation',
        descriptionSw: 'Boresha matamshi yako',
        icon: '🗣️',
        color: '#F59E0B',
        order: 3,
        isActive: true
      }
    ]

    await db.collection(collections.categories).insertMany(categories)

    // Sample achievements
    const achievements = [
      {
        title: 'First Steps',
        titleSw: 'Hatua za Kwanza',
        description: 'Complete your first lesson',
        descriptionSw: 'Maliza somo lako la kwanza',
        icon: '🎯',
        type: 'lesson',
        category: 'bronze',
        requirement: {
          type: 'lessons_completed',
          value: 1,
          timeframe: 'all_time'
        },
        points: 10,
        isActive: true,
        order: 1,
        createdAt: new Date()
      },
      {
        title: 'Streak Master',
        titleSw: 'Bingwa wa Mfululizo',
        description: 'Maintain a 7-day learning streak',
        descriptionSw: 'Dumisha mfululizo wa siku 7 za kujifunza',
        icon: '🔥',
        type: 'streak',
        category: 'silver',
        requirement: {
          type: 'streak_days',
          value: 7,
          timeframe: 'all_time'
        },
        points: 50,
        isActive: true,
        order: 2,
        createdAt: new Date()
      }
    ]

    await db.collection(collections.achievements).insertMany(achievements)

    console.log('✅ Sample data inserted successfully')
    console.log('\n🎉 Database schema initialization complete!')
    console.log('\n📋 Collections created:')
    Object.entries(collections).forEach(([key, value]) => {
      console.log(`   - ${value}`)
    })

  } catch (error) {
    console.error('❌ Error initializing schema:', error)
  } finally {
    await client.close()
  }
}

// Run if called directly
if (require.main === module) {
  initializeSchema()
}

export default initializeSchema