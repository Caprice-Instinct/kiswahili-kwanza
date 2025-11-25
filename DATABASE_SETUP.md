# Database Population Script

This script populates the MongoDB database with sample data for the Kiswahili Kwanza application.

## Prerequisites

1. **MongoDB**: Make sure MongoDB is running on your local machine at `mongodb://localhost:27017`
2. **Node.js**: Ensure Node.js is installed on your system

## Setup and Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the population script**:
   ```bash
   npm run populate
   ```

   Or directly:
   ```bash
   node populate-database.js
   ```

## What the Script Does

### 🗑️ Data Cleanup
- Clears existing data from all collections to ensure a fresh start

### 👥 Creates 3 Users
1. **Linet Wangui** (`linetw2004@gmail.com`)
   - Level: 3
   - Points: 1,250
   - Streak: 15 days
   - Lessons Completed: 12
   - Average Score: 85%
   - Difficulty: Medium

2. **Linet Wangui Pro** (`linetwangui2004@gmail.com`)
   - Level: 7
   - Points: 3,450
   - Streak: 45 days
   - Lessons Completed: 35
   - Average Score: 92%
   - Difficulty: Hard

3. **Linet Wabuga** (`linet.wabuga@strathmore.edu`)
   - Level: 5
   - Points: 2,100
   - Streak: 8 days
   - Lessons Completed: 22
   - Average Score: 78%
   - Difficulty: Medium

### 📚 Sample Content
- **5 Lessons**: Greetings, Numbers, Family, Colors, Present Tense Verbs
- **4 Words**: Basic vocabulary with pronunciations and examples
- **3 Achievements**: First Steps, Week Warrior, Point Master

### 📊 Progress Data
- **User Progress**: Individual lesson completion records with scores
- **User Achievements**: Earned achievements based on user progress
- **Daily Progress**: 7 days of learning activity for each user

### 🔍 Database Indexes
- Creates performance indexes on key fields for faster queries

## Database Collections Created

- `users` - User profiles and statistics
- `lessons` - Learning content
- `words` - Vocabulary database
- `achievements` - Available achievements
- `user_progress` - Individual lesson progress
- `user_achievements` - Earned achievements
- `daily_progress` - Daily learning statistics

## Verification

After running the script, you can verify the data in MongoDB:

```bash
# Connect to MongoDB
mongosh

# Switch to the database
use kiswahili-kwanza

# Check collections
show collections

# View users
db.users.find().pretty()

# Check user progress
db.user_progress.find().pretty()

# View achievements
db.achievements.find().pretty()
```

## Notes

- The script uses realistic data with varying progress levels
- Each user has different learning preferences and achievements
- Progress data includes realistic scores and time spent
- All timestamps are set to current dates for active appearance

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running on localhost:27017
2. **Permission Issues**: Make sure you have write permissions to the database
3. **Dependency Issues**: Run `npm install` to install required packages

## Next Steps

After populating the database:
1. Start your Next.js application
2. Test user authentication with the provided email addresses
3. Verify that progress data displays correctly
4. Check that achievements are properly assigned