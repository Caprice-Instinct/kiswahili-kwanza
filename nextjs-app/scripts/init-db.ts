import { getDatabase } from '../lib/mongodb'
import { seedWords, seedLessons, seedAchievements } from '../lib/seed-data'

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing Kiswahili Kwanza database...')
    
    const db = await getDatabase()
    
    // Create indexes for better performance
    console.log('📊 Creating database indexes...')
    
    // Users collection indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true })
    await db.collection('users').createIndex({ createdAt: 1 })
    
    // Progress collection indexes
    await db.collection('progress').createIndex({ userId: 1, lessonId: 1 }, { unique: true })
    await db.collection('progress').createIndex({ userId: 1 })
    await db.collection('progress').createIndex({ lessonId: 1 })
    
    // Lessons collection indexes
    await db.collection('lessons').createIndex({ order: 1 })
    await db.collection('lessons').createIndex({ category: 1 })
    await db.collection('lessons').createIndex({ level: 1 })
    
    // Words collection indexes
    await db.collection('words').createIndex({ category: 1 })
    await db.collection('words').createIndex({ difficulty: 1 })
    await db.collection('words').createIndex({ english: 1 })
    await db.collection('words').createIndex({ swahili: 1 })
    
    // Achievements collection indexes
    await db.collection('achievements').createIndex({ type: 1 })
    await db.collection('achievements').createIndex({ isActive: 1 })
    
    // User achievements collection indexes
    await db.collection('user_achievements').createIndex({ userId: 1 })
    await db.collection('user_achievements').createIndex({ achievementId: 1 })
    await db.collection('user_achievements').createIndex({ userId: 1, achievementId: 1 }, { unique: true })
    
    console.log('✅ Database indexes created successfully')
    
    // Check if data already exists
    const wordsCount = await db.collection('words').countDocuments()
    const lessonsCount = await db.collection('lessons').countDocuments()
    const achievementsCount = await db.collection('achievements').countDocuments()
    
    if (wordsCount === 0) {
      console.log('📚 Seeding words...')
      await db.collection('words').insertMany(seedWords.map(word => ({
        ...word,
        createdAt: new Date()
      })))
      console.log(`✅ Inserted ${seedWords.length} words`)
    } else {
      console.log(`📚 Words already exist (${wordsCount} found)`)
    }
    
    if (lessonsCount === 0) {
      console.log('🎓 Seeding lessons...')
      await db.collection('lessons').insertMany(seedLessons.map(lesson => ({
        ...lesson,
        createdAt: new Date()
      })))
      console.log(`✅ Inserted ${seedLessons.length} lessons`)
    } else {
      console.log(`🎓 Lessons already exist (${lessonsCount} found)`)
    }
    
    if (achievementsCount === 0) {
      console.log('🏆 Seeding achievements...')
      await db.collection('achievements').insertMany(seedAchievements)
      console.log(`✅ Inserted ${seedAchievements.length} achievements`)
    } else {
      console.log(`🏆 Achievements already exist (${achievementsCount} found)`)
    }
    
    console.log('🎉 Database initialization completed successfully!')
    
  } catch (error) {
    console.error('❌ Error initializing database:', error)
    process.exit(1)
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { initializeDatabase }