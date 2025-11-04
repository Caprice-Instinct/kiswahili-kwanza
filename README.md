# Kiswahili Kwanza

**Learn, Practice, Master the Swahili Language**

An AI-powered interactive platform for learning Kiswahili (Swahili), featuring a modern Next.js web application and intelligent language learning assistance.

## Project Overview

Kiswahili Kwanza is a comprehensive language learning platform designed to make learning Swahili accessible, engaging, and effective. The project combines:

- **Modern Web Application**: Built with Next.js, TypeScript, and Tailwind CSS
- **AI-Powered Learning**: Machine learning models for translation, pronunciation, and personalized recommendations
- **Interactive Content**: Lessons, quizzes, and practice exercises
- **Progressive Learning**: Structured path from beginner to advanced

## Project Structure

```
kiswahili-kwanza/
├── nextjs-app/          # Frontend web application
│   ├── app/            # Next.js pages and layouts
│   ├── components/     # Reusable React components
│   ├── lib/           # Utility functions
│   └── public/        # Static assets
│
├── ai-model/           # AI/ML backend
│   ├── api/           # FastAPI endpoints
│   ├── models/        # Trained models
│   ├── src/           # Model training and inference
│   └── data/          # Training datasets
│
└── README.md          # This file
```

## Features

### Current Features
- ✅ Interactive home page with platform overview
- ✅ Structured lessons page with learning paths
- ✅ Practice exercises with quizzes
- ✅ About page with platform information
- ✅ Responsive design for all devices
- ✅ Clean, modern UI with Tailwind CSS

### Planned Features
- 🔄 User authentication and profiles
- 🔄 Progress tracking and analytics
- 🔄 AI-powered translation
- 🔄 Pronunciation assessment
- 🔄 Personalized lesson recommendations
- 🔄 Conversational AI practice
- 🔄 Flashcard system
- 🔄 Audio lessons
- 🔄 Community features
- 🔄 Offline mode

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- Python 3.9+ (for AI model)
- npm or yarn

### Running the Next.js App

1. Navigate to the Next.js app directory:
   ```bash
   cd nextjs-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Running the AI Model API

1. Navigate to the AI model directory:
   ```bash
   cd ai-model
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the API server:
   ```bash
   python api/app.py
   ```

6. API will be available at [http://localhost:8000](http://localhost:8000)

## Technology Stack

### Frontend (Next.js App)
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: React 18

### Backend (AI Model)
- **Framework**: FastAPI
- **ML Libraries**: PyTorch, Transformers
- **NLP**: NLTK, spaCy
- **Audio Processing**: Librosa

## Development Roadmap

### Phase 1: Foundation (Current)
- [x] Set up project structure
- [x] Create basic Next.js application
- [x] Design UI/UX for main pages
- [x] Set up AI model structure
- [ ] Install dependencies

### Phase 2: Core Features
- [ ] Implement user authentication
- [ ] Create lesson content database
- [ ] Develop practice exercise system
- [ ] Integrate basic translation API
- [ ] Add progress tracking

### Phase 3: AI Integration
- [ ] Train translation model
- [ ] Implement pronunciation assessment
- [ ] Build recommendation system
- [ ] Create conversational AI
- [ ] Deploy AI models

### Phase 4: Enhancement
- [ ] Add audio pronunciation guides
- [ ] Implement flashcard system
- [ ] Create community features
- [ ] Optimize performance
- [ ] Mobile app (React Native)

### Phase 5: Launch
- [ ] Beta testing
- [ ] User feedback integration
- [ ] Performance optimization
- [ ] Public release
- [ ] Marketing and outreach

## Why Learn Kiswahili?

- **Widely Spoken**: Over 100 million speakers across East and Central Africa
- **Official Language**: Tanzania, Kenya, Uganda, and the African Union
- **Cultural Gateway**: Access to rich East African literature, music, and culture
- **Business Opportunities**: Growing economic ties with East Africa
- **Travel**: Essential for traveling in East African countries
- **Linguistic Interest**: Unique blend of Bantu, Arabic, and other influences

## Contributing

We welcome contributions! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

### Kiswahili Learning Resources
- [Kamusi Project](http://kamusi.org/) - Comprehensive Kiswahili dictionary
- [UKWELI Corpus](http://www.helsinki.fi/varieng/CoRD/corpora/UKWELI/) - Kiswahili text corpus
- [Global Voices Swahili](https://sw.globalvoices.org/) - News and stories in Kiswahili

### Development Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Hugging Face Transformers](https://huggingface.co/transformers/)

## Contact

For questions, suggestions, or support:
- Open an issue on GitHub
- Contact the development team

## Acknowledgments

- Kiswahili language community
- Open source contributors
- Language learning researchers
- African NLP community (Masakhane)

---

**Karibu! (Welcome!) Start your Kiswahili learning journey today.**

Made with ❤️ for language learners everywhere.
