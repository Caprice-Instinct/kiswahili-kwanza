# Quick Start Guide - Kiswahili Kwanza

Get up and running with Kiswahili Kwanza in just a few minutes!

## 🚀 Quick Setup

### Option 1: Next.js App Only (Fastest)

If you just want to see the web application:

```bash
# 1. Navigate to the Next.js app
cd nextjs-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You're ready to go!

### Option 2: Full Stack (App + AI)

For the complete experience with AI features:

**Terminal 1 - Frontend:**
```bash
cd nextjs-app
npm install
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd ai-model
python -m venv venv

# Windows
venv\Scripts\activate

# Unix/MacOS
source venv/bin/activate

pip install -r requirements.txt
python api/app.py
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📱 What You'll See

### Home Page
- Welcome message and platform overview
- Feature highlights
- Statistics about Kiswahili language
- Call-to-action buttons

### Lessons Page
- 6 pre-configured lessons
- Beginner to Intermediate levels
- Topics include greetings, numbers, family, verbs, market, and directions
- Each lesson shows duration and topics covered

### Practice Page
- Interactive quiz system
- Multiple choice questions
- Instant feedback
- Score tracking
- Explanations for correct answers

### About Page
- Mission statement
- Why learn Kiswahili
- Platform approach
- Resources and links

## 🎯 Next Steps

1. **Explore the UI**
   - Navigate through all pages
   - Try the practice quiz
   - Check out the lesson structure

2. **Customize Content**
   - Add more lessons in `nextjs-app/app/lessons/page.tsx`
   - Add more quiz questions in `nextjs-app/app/practice/page.tsx`
   - Modify styles in `nextjs-app/app/globals.css`

3. **Set Up Database**
   - Choose a database (PostgreSQL, MongoDB, etc.)
   - Create user and lesson schemas
   - Implement data persistence

4. **Implement Authentication**
   - Use NextAuth.js or similar
   - Add user registration/login
   - Protect routes as needed

5. **Connect AI Backend**
   - Implement actual API calls from frontend
   - Train or integrate translation models
   - Add pronunciation assessment

## 🛠️ Common Tasks

### Add a New Page
```bash
# Create a new page file
touch nextjs-app/app/your-page/page.tsx
```

### Install a New Package
```bash
# Frontend
cd nextjs-app
npm install package-name

# Backend
cd ai-model
pip install package-name
pip freeze > requirements.txt
```

### Build for Production
```bash
# Frontend
cd nextjs-app
npm run build
npm start

# Backend
cd ai-model
uvicorn api.app:app --host 0.0.0.0 --port 8000
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 8000
npx kill-port 8000
```

### Module Not Found
```bash
# Clear cache and reinstall
cd nextjs-app
rm -rf node_modules package-lock.json
npm install
```

### Python Virtual Environment Issues
```bash
# Deactivate and recreate
deactivate
rm -rf venv
python -m venv venv
```

## 📚 Project Structure Quick Reference

```
kiswahili-kwanza/
├── nextjs-app/              # Frontend application
│   ├── app/
│   │   ├── page.tsx        # Home page
│   │   ├── lessons/        # Lessons page
│   │   ├── practice/       # Practice quiz
│   │   ├── about/          # About page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── package.json         # Dependencies
│   ├── tailwind.config.ts   # Tailwind config
│   └── tsconfig.json        # TypeScript config
│
├── ai-model/                # AI backend
│   ├── api/
│   │   ├── app.py          # FastAPI application
│   │   └── __init__.py
│   ├── requirements.txt     # Python dependencies
│   └── README.md
│
└── README.md                # Main documentation
```

## 💡 Development Tips

1. **Use TypeScript**: The Next.js app is set up with TypeScript for better type safety

2. **Tailwind CSS**: Use Tailwind utility classes for styling
   - `bg-green-600` for background colors
   - `text-xl` for text sizes
   - `p-4` for padding
   - `rounded-lg` for rounded corners

3. **API Development**: FastAPI provides automatic documentation
   - Visit `/docs` for interactive API documentation
   - Visit `/redoc` for alternative documentation

4. **Hot Reload**: Both Next.js and FastAPI support hot reload
   - Changes to code will automatically refresh
   - No need to restart servers during development

## 🔗 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

## 🤝 Getting Help

- Check the main [README.md](./README.md) for detailed information
- Review the [Next.js README](./nextjs-app/README.md)
- Review the [AI Model README](./ai-model/README.md)
- Open an issue on GitHub

## ✨ Quick Wins

Want to see immediate results? Try these:

1. **Change the theme colors**
   - Edit `nextjs-app/tailwind.config.ts`
   - Replace `green` with `blue`, `purple`, etc.

2. **Add a new lesson**
   - Edit `nextjs-app/app/lessons/page.tsx`
   - Add to the `lessons` array

3. **Add more quiz questions**
   - Edit `nextjs-app/app/practice/page.tsx`
   - Add to the `exercises` array

4. **Test the API**
   - Visit `http://localhost:8000/docs`
   - Try the `/api/translate` endpoint

---

**Happy coding! Karibu (Welcome) to Kiswahili Kwanza development!** 🎉
