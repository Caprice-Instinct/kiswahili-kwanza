# Kiswahili Kwanza - AI Model

**AI-powered personalized learning system for children with dyslexia learning Kiswahili**

## Overview

This AI model system provides intelligent, adaptive learning support specifically designed for children aged 6-9 with dyslexia learning Kiswahili. The system combines multiple AI components to deliver personalized, engaging, and effective language learning experiences.

## 🎯 Key Features

### 1. **Personalized Learning Recommendations**
- ML-powered topic recommendations based on individual learning patterns
- Adaptive difficulty adjustment for dyslexic learners
- Performance-based content sequencing
- Learning style accommodation

### 2. **Pronunciation Evaluation**
- Real-time pronunciation assessment
- Phoneme-level feedback
- Dyslexia-friendly error analysis
- Practice suggestions and encouragement

### 3. **Progress Tracking & Analytics**
- Comprehensive learning progress monitoring
- Dyslexia-specific pattern recognition
- Performance insights and trends
- Milestone tracking and achievement recognition

### 4. **Dyslexia-Friendly Adaptations**
- Visual processing support (high contrast, large fonts)
- Phonetic processing aids (audio emphasis, syllable breakdown)
- Working memory accommodations (chunked content, repetition)
- Attention support (gamification, frequent breaks)

## 🏗️ Architecture

```
ai-model/
├── src/
│   ├── models/
│   │   ├── recommendation_engine.py    # ML-based learning recommendations
│   │   ├── pronunciation_evaluator.py  # Speech assessment system
│   │   └── progress_tracker.py         # Learning analytics
│   ├── preprocessing/
│   │   └── data_processor.py           # Data cleaning and preparation
│   ├── training/
│   │   └── model_trainer.py            # ML model training pipeline
│   └── inference/
│       └── inference_engine.py         # Production inference system
├── api/
│   └── app.py                          # FastAPI REST API
├── data/
│   ├── sample_vocabulary.csv           # Sample Kiswahili vocabulary
│   ├── corpus/                         # Text corpus (to be added)
│   ├── parallel/                       # Translation pairs (to be added)
│   └── audio/                          # Pronunciation samples (to be added)
└── models/                             # Trained model storage
```

## 🚀 Quick Start

### Prerequisites
```bash
Python 3.9+
pip or conda
```

### Installation
```bash
# Navigate to ai-model directory
cd ai-model

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Unix/MacOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Running the API Server
```bash
# Start the FastAPI server
python api/app.py

# Or using uvicorn directly
uvicorn api.app:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at `http://localhost:8000`

## 📊 AI Components

### 1. Learning Recommendation Engine

**Purpose**: Provides personalized topic recommendations based on user performance and learning patterns.

**Key Features**:
- Random Forest classifier for topic prediction
- Dyslexia-specific feature engineering
- Adaptive difficulty adjustment
- Learning insights generation

**Usage**:
```python
from src.models.recommendation_engine import LearningRecommendationEngine

engine = LearningRecommendationEngine()
recommendation = engine.predict_next_topic(user_data)
```

### 2. Pronunciation Evaluator

**Purpose**: Evaluates pronunciation accuracy and provides detailed feedback.

**Key Features**:
- Audio feature extraction using librosa
- Phoneme-level analysis
- Dyslexia-friendly feedback generation
- Practice suggestions

**Usage**:
```python
from src.models.pronunciation_evaluator import KiswahiliPronunciationEvaluator

evaluator = KiswahiliPronunciationEvaluator()
result = evaluator.evaluate_pronunciation(word, audio_data, sample_rate)
```

### 3. Progress Tracker

**Purpose**: Monitors learning progress and generates comprehensive analytics.

**Key Features**:
- Session-based progress tracking
- Performance metrics calculation
- Learning pattern identification
- Progress report generation

**Usage**:
```python
from src.models.progress_tracker import ProgressTracker, LearningSession

tracker = ProgressTracker()
tracker.record_session(session)
metrics = tracker.calculate_progress_metrics(user_id)
```

## 🔌 API Endpoints

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/recommend` | POST | Get personalized learning recommendation |
| `/api/pronunciation/evaluate` | POST | Evaluate pronunciation accuracy |
| `/api/session/record` | POST | Record completed learning session |
| `/api/progress/report` | POST | Generate progress report |
| `/api/progress/metrics/{user_id}` | GET | Get progress metrics |

### Example API Usage

**Get Recommendation**:
```bash
curl -X POST "http://localhost:8000/api/recommend" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "overall_accuracy": 0.75,
    "completed_topics": [1, 2],
    "phonetic_errors": 3
  }'
```

**Evaluate Pronunciation**:
```bash
curl -X POST "http://localhost:8000/api/pronunciation/evaluate" \
  -H "Content-Type: application/json" \
  -d '{
    "word": "jambo",
    "user_id": "user123"
  }'
```

## 🧠 Machine Learning Pipeline

### 1. Data Processing
```python
from src.preprocessing.data_processor import KiswahiliDataProcessor

processor = KiswahiliDataProcessor()
result = processor.process_vocabulary_dataset(
    "raw_vocab.csv", 
    "processed_vocab.csv",
    target_age_group=1
)
```

### 2. Model Training
```python
from src.training.model_trainer import KiswahiliModelTrainer

trainer = KiswahiliModelTrainer()
X, y = trainer.prepare_training_data("training_data.csv")
results = trainer.train_models(X, y)
trainer.save_model("recommendation_model.joblib")
```

### 3. Inference
```python
from src.inference.inference_engine import KiswahiliInferenceEngine

engine = KiswahiliInferenceEngine()
recommendation = engine.predict_next_lesson(user_id, user_data)
```

## 📈 Performance Metrics

The system tracks multiple performance dimensions:

- **Accuracy**: Overall correctness of responses
- **Pronunciation**: Speech quality assessment
- **Engagement**: User interaction patterns
- **Consistency**: Regular learning behavior
- **Learning Velocity**: Rate of improvement
- **Completion Rate**: Task finishing patterns

## 🎨 Dyslexia-Specific Features

### Visual Processing Support
- High contrast color schemes
- Large, clear fonts
- Visual cues and icons
- Color-coded categories

### Phonetic Processing Aids
- Audio pronunciation guides
- Syllable breakdown
- Phoneme emphasis
- Sound-symbol associations

### Working Memory Accommodations
- Shorter lesson segments
- Frequent repetition
- Visual memory aids
- Step-by-step instructions

### Attention Support
- Gamified activities
- Regular breaks
- Clear progress indicators
- Immediate positive feedback

## 🔧 Configuration

### Model Parameters
```python
# Recommendation Engine
RECOMMENDATION_CONFIG = {
    'model_type': 'random_forest',
    'n_estimators': 100,
    'max_depth': 10,
    'min_samples_split': 5
}

# Pronunciation Evaluator
PRONUNCIATION_CONFIG = {
    'sample_rate': 22050,
    'n_mfcc': 13,
    'confidence_threshold': 0.7
}
```

### API Configuration
```python
# FastAPI Settings
API_CONFIG = {
    'host': '0.0.0.0',
    'port': 8000,
    'reload': True,
    'cors_origins': ['http://localhost:3000']
}
```

## 📊 Data Requirements

### Vocabulary Dataset
- Kiswahili words with English translations
- Difficulty levels (1-5)
- Categories (greetings, numbers, family, etc.)
- Phonetic complexity scores

### Audio Dataset
- Native speaker pronunciations
- Multiple speakers per word
- High-quality recordings (22kHz+)
- Phonetic transcriptions

### User Interaction Data
- Session logs
- Response times
- Error patterns
- Engagement metrics

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
python -m pytest tests/

# Run with coverage
python -m pytest tests/ --cov=src/
```

### API Tests
```bash
# Test API endpoints
python -m pytest tests/test_api.py

# Load testing
python tests/load_test.py
```

## 📦 Deployment

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Cloud Deployment
- **AWS**: SageMaker, Lambda, ECS
- **Google Cloud**: AI Platform, Cloud Run
- **Azure**: ML Studio, Container Instances

## 🔍 Monitoring & Logging

### Performance Monitoring
- Response time tracking
- Model accuracy monitoring
- User engagement metrics
- Error rate analysis

### Logging
```python
import logging

logger = logging.getLogger("KiswahiliAI")
logger.info("Model prediction completed")
logger.error("Pronunciation evaluation failed")
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 style guidelines
- Add unit tests for new features
- Update documentation
- Ensure backward compatibility

## 📚 Research & References

### Academic Papers
- "Dyslexia and Technology-Enhanced Learning" (2023)
- "Multilingual NLP for African Languages" (2022)
- "Adaptive Learning Systems for Special Needs" (2023)

### Datasets
- [Kamusi Project](http://kamusi.org/) - Kiswahili dictionary
- [UKWELI Corpus](http://www.helsinki.fi/varieng/CoRD/corpora/UKWELI/) - Kiswahili text corpus
- [Masakhane](https://www.masakhane.io/) - African NLP resources

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For questions, issues, or support:
- Open an issue on GitHub
- Contact the development team
- Check the documentation wiki

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Core AI components
- [x] Basic API endpoints
- [x] Sample data processing
- [x] Documentation

### Phase 2: Enhancement (In Progress)
- [ ] Advanced ML models
- [ ] Real audio processing
- [ ] Extended vocabulary
- [ ] Performance optimization

### Phase 3: Production
- [ ] Scalable deployment
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile optimization

### Phase 4: Research
- [ ] Advanced dyslexia research
- [ ] Conversational AI
- [ ] Emotional intelligence
- [ ] Adaptive UI/UX

---

**Building intelligent, inclusive language learning with AI** 🌟

Made with ❤️ for children with dyslexia learning Kiswahili.