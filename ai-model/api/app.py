"""
Enhanced FastAPI application for Kiswahili Kwanza AI Model API
Integrates all AI components for personalized learning
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import numpy as np
import json
import sys
import os
from datetime import datetime

# Add src directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from models.recommendation_engine import LearningRecommendationEngine
from models.pronunciation_evaluator import KiswahiliPronunciationEvaluator
from models.progress_tracker import ProgressTracker, LearningSession
from preprocessing.data_processor import KiswahiliDataProcessor

app = FastAPI(
    title="Kiswahili Kwanza AI API",
    description="AI-powered language learning assistance for children with dyslexia",
    version="2.0.0"
)

# CORS middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI components
recommendation_engine = LearningRecommendationEngine()
pronunciation_evaluator = KiswahiliPronunciationEvaluator()
progress_tracker = ProgressTracker()
data_processor = KiswahiliDataProcessor()

# Request/Response Models
class UserData(BaseModel):
    user_id: str
    overall_accuracy: float = 0.0
    avg_response_time: float = 0.0
    completion_rate: float = 0.0
    phonetic_errors: int = 0
    visual_confusion_errors: int = 0
    sequence_errors: int = 0
    session_duration: float = 0.0
    retry_attempts: int = 0
    help_requests: int = 0
    topic_scores: Dict[str, float] = {}
    completed_topics: List[int] = []

class RecommendationResponse(BaseModel):
    topic_id: int
    topic_name: str
    difficulty: int
    confidence: float
    reasoning: str
    adapted_difficulty: int
    learning_insights: Dict[str, List[str]]

class PronunciationRequest(BaseModel):
    word: str
    user_id: str
    audio_features: Optional[Dict] = None  # In production, this would be actual audio

class PronunciationResponse(BaseModel):
    word: str
    overall_score: float
    phoneme_scores: List[Dict]
    feedback: str
    areas_for_improvement: List[str]
    encouragement: str
    practice_suggestions: List[Dict]

class ProgressRequest(BaseModel):
    user_id: str
    days_back: int = 30

class SessionData(BaseModel):
    session_id: str
    user_id: str
    topic_id: int
    start_time: str
    end_time: str
    activities_completed: int
    total_activities: int
    accuracy_score: float
    pronunciation_score: float
    engagement_score: float
    help_requests: int = 0
    retry_attempts: int = 0
    errors: List[Dict] = []

# API Endpoints

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Kiswahili Kwanza AI API v2.0",
        "status": "active",
        "features": [
            "Personalized Learning Recommendations",
            "Pronunciation Evaluation", 
            "Progress Tracking",
            "Dyslexia-Friendly Adaptations"
        ],
        "endpoints": {
            "recommendations": "/api/recommend",
            "pronunciation": "/api/pronunciation/evaluate",
            "progress": "/api/progress/report",
            "session": "/api/session/record"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "components": {
            "recommendation_engine": "active",
            "pronunciation_evaluator": "active", 
            "progress_tracker": "active"
        }
    }

@app.post("/api/recommend", response_model=RecommendationResponse)
async def get_recommendation(user_data: UserData):
    """
    Get personalized learning recommendation for a user
    """
    try:
        # Convert user data to dictionary
        user_dict = user_data.dict()
        
        # Get recommendation from engine
        recommendation = recommendation_engine.predict_next_topic(user_dict)
        
        # Adapt difficulty based on dyslexia patterns
        adapted_difficulty = recommendation_engine.adapt_difficulty(
            user_dict, recommendation["difficulty"]
        )
        
        # Get learning insights
        insights = recommendation_engine.get_learning_insights(user_dict)
        
        return RecommendationResponse(
            topic_id=recommendation["topic_id"],
            topic_name=recommendation["topic_name"],
            difficulty=recommendation["difficulty"],
            confidence=recommendation["confidence"],
            reasoning=recommendation["reasoning"],
            adapted_difficulty=adapted_difficulty,
            learning_insights=insights
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Recommendation error: {str(e)}")

@app.post("/api/pronunciation/evaluate", response_model=PronunciationResponse)
async def evaluate_pronunciation(request: PronunciationRequest):
    """
    Evaluate pronunciation of a Kiswahili word
    """
    try:
        # In production, you would process actual audio data
        # For now, simulate audio data
        sample_rate = 22050
        duration = 2.0  # 2 seconds
        audio_data = np.random.normal(0, 0.1, int(sample_rate * duration))
        
        # Evaluate pronunciation
        result = pronunciation_evaluator.evaluate_pronunciation(
            request.word, audio_data, sample_rate
        )
        
        # Get practice suggestions for problem areas
        practice_suggestions = pronunciation_evaluator.get_practice_suggestions(
            result['areas_for_improvement']
        )
        
        return PronunciationResponse(
            word=result['word'],
            overall_score=result['overall_score'],
            phoneme_scores=result['phoneme_scores'],
            feedback=result['feedback'],
            areas_for_improvement=result['areas_for_improvement'],
            encouragement=result['encouragement'],
            practice_suggestions=practice_suggestions
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pronunciation evaluation error: {str(e)}")

@app.post("/api/session/record")
async def record_session(session_data: SessionData):
    """
    Record a completed learning session
    """
    try:
        # Convert session data to LearningSession object
        session = LearningSession(
            session_id=session_data.session_id,
            user_id=session_data.user_id,
            topic_id=session_data.topic_id,
            start_time=datetime.fromisoformat(session_data.start_time),
            end_time=datetime.fromisoformat(session_data.end_time),
            activities_completed=session_data.activities_completed,
            total_activities=session_data.total_activities,
            accuracy_score=session_data.accuracy_score,
            pronunciation_score=session_data.pronunciation_score,
            engagement_score=session_data.engagement_score,
            help_requests=session_data.help_requests,
            retry_attempts=session_data.retry_attempts,
            errors=session_data.errors
        )
        
        # Record session in progress tracker
        progress_tracker.record_session(session)
        
        return {
            "status": "success",
            "message": "Session recorded successfully",
            "session_id": session_data.session_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Session recording error: {str(e)}")

@app.post("/api/progress/report")
async def get_progress_report(request: ProgressRequest):
    """
    Generate comprehensive progress report for a user
    """
    try:
        report = progress_tracker.generate_progress_report(
            request.user_id, request.days_back
        )
        
        return report
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Progress report error: {str(e)}")

@app.get("/api/progress/metrics/{user_id}")
async def get_progress_metrics(user_id: str, days_back: int = 30):
    """
    Get progress metrics for a user
    """
    try:
        metrics = progress_tracker.calculate_progress_metrics(user_id, days_back)
        
        return {
            "user_id": user_id,
            "metrics": {
                "overall_accuracy": metrics.overall_accuracy,
                "pronunciation_accuracy": metrics.pronunciation_accuracy,
                "completion_rate": metrics.completion_rate,
                "engagement_level": metrics.engagement_level,
                "learning_velocity": metrics.learning_velocity,
                "consistency_score": metrics.consistency_score,
                "challenge_areas": metrics.challenge_areas,
                "strengths": metrics.strengths
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Metrics error: {str(e)}")

@app.post("/api/pronunciation/report")
async def get_pronunciation_report(user_id: str, session_results: List[Dict]):
    """
    Generate pronunciation progress report
    """
    try:
        report = pronunciation_evaluator.create_pronunciation_report(session_results)
        
        return {
            "user_id": user_id,
            "report": report
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pronunciation report error: {str(e)}")

@app.get("/api/vocabulary/topics")
async def get_vocabulary_topics():
    """
    Get available vocabulary topics
    """
    try:
        topics = recommendation_engine.topics
        
        return {
            "topics": [
                {
                    "id": topic_id,
                    "name": topic_info["name"],
                    "difficulty": topic_info["difficulty"],
                    "category": topic_info["category"]
                }
                for topic_id, topic_info in topics.items()
            ]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Topics error: {str(e)}")

@app.post("/api/data/process")
async def process_learning_data(
    vocab_file: UploadFile = File(...),
    interaction_data: Optional[str] = None
):
    """
    Process uploaded learning data
    """
    try:
        # Save uploaded file temporarily
        temp_file = f"temp_{vocab_file.filename}"
        with open(temp_file, "wb") as f:
            content = await vocab_file.read()
            f.write(content)
        
        # Process vocabulary data
        result = data_processor.process_vocabulary_dataset(
            temp_file, 
            "processed_vocab.csv",
            target_age_group=1
        )
        
        # Clean up temp file
        os.remove(temp_file)
        
        return {
            "status": "success",
            "processing_result": result
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Data processing error: {str(e)}")

@app.get("/api/insights/dyslexia")
async def get_dyslexia_insights():
    """
    Get insights about dyslexia-friendly learning strategies
    """
    return {
        "strategies": {
            "visual_processing": [
                "Use high contrast colors",
                "Larger fonts and spacing",
                "Visual cues and icons",
                "Color-coded categories"
            ],
            "phonetic_processing": [
                "Audio pronunciation guides",
                "Syllable breakdown",
                "Rhyming exercises",
                "Sound-symbol associations"
            ],
            "working_memory": [
                "Shorter lesson segments",
                "Frequent repetition",
                "Visual memory aids",
                "Step-by-step instructions"
            ],
            "attention": [
                "Gamified activities",
                "Regular breaks",
                "Clear progress indicators",
                "Immediate feedback"
            ]
        },
        "adaptations": {
            "content_delivery": "Multimodal presentation",
            "pacing": "Self-paced learning",
            "feedback": "Positive reinforcement",
            "assessment": "Multiple attempt opportunities"
        }
    }

@app.get("/api/stats/system")
async def get_system_stats():
    """
    Get system usage statistics
    """
    try:
        total_users = len(progress_tracker.user_profiles)
        total_sessions = len(progress_tracker.sessions_data)
        
        # Calculate average metrics
        if progress_tracker.sessions_data:
            avg_accuracy = np.mean([s.accuracy_score for s in progress_tracker.sessions_data])
            avg_engagement = np.mean([s.engagement_score for s in progress_tracker.sessions_data])
        else:
            avg_accuracy = 0.0
            avg_engagement = 0.0
        
        return {
            "system_stats": {
                "total_users": total_users,
                "total_sessions": total_sessions,
                "average_accuracy": float(avg_accuracy),
                "average_engagement": float(avg_engagement),
                "available_topics": len(recommendation_engine.topics)
            },
            "model_status": {
                "recommendation_engine": "active",
                "pronunciation_evaluator": "active",
                "progress_tracker": "active"
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Stats error: {str(e)}")

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {
        "error": "Endpoint not found",
        "message": "Please check the API documentation for available endpoints",
        "available_endpoints": [
            "/api/recommend",
            "/api/pronunciation/evaluate", 
            "/api/progress/report",
            "/api/session/record"
        ]
    }

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return {
        "error": "Internal server error",
        "message": "An unexpected error occurred. Please try again later.",
        "support": "Contact support if the problem persists"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)