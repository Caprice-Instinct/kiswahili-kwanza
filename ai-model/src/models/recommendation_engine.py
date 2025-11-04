"""
AI-Powered Personalized Learning Recommendation Engine
For children with dyslexia learning Kiswahili
"""

import numpy as np
from typing import Dict, List, Tuple, Optional
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import json
from datetime import datetime, timedelta


class LearningRecommendationEngine:
    """
    Personalized learning recommendation system for dyslexic children
    learning Kiswahili. Uses machine learning to adapt content based on
    performance patterns and learning behaviors.
    """
    
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
        
        # Kiswahili learning topics for children aged 6-9
        self.topics = {
            1: {"name": "Salamu", "difficulty": 1, "category": "greetings"},
            2: {"name": "Nambari", "difficulty": 1, "category": "numbers"},
            3: {"name": "Familia", "difficulty": 2, "category": "family"},
            4: {"name": "Rangi", "difficulty": 2, "category": "colors"},
            5: {"name": "Wanyamapori", "difficulty": 3, "category": "animals"},
            6: {"name": "Chakula", "difficulty": 3, "category": "food"},
            7: {"name": "Mavazi", "difficulty": 3, "category": "clothing"},
            8: {"name": "Nyumbani", "difficulty": 4, "category": "home"},
            9: {"name": "Shuleni", "difficulty": 4, "category": "school"},
            10: {"name": "Mazungumzo", "difficulty": 5, "category": "conversation"}
        }
    
    def extract_features(self, user_data: Dict) -> np.ndarray:
        """
        Extract features from user learning data for ML model
        
        Features include:
        - Reading accuracy patterns
        - Response time patterns
        - Topic completion rates
        - Error patterns specific to dyslexia
        - Engagement metrics
        """
        features = []
        
        # Basic performance metrics
        features.append(user_data.get('overall_accuracy', 0.0))
        features.append(user_data.get('avg_response_time', 0.0))
        features.append(user_data.get('completion_rate', 0.0))
        
        # Dyslexia-specific patterns
        features.append(user_data.get('phonetic_errors', 0))
        features.append(user_data.get('visual_confusion_errors', 0))
        features.append(user_data.get('sequence_errors', 0))
        
        # Learning behavior patterns
        features.append(user_data.get('session_duration', 0.0))
        features.append(user_data.get('retry_attempts', 0))
        features.append(user_data.get('help_requests', 0))
        
        # Topic-specific performance
        for topic_id in range(1, 11):
            topic_score = user_data.get('topic_scores', {}).get(str(topic_id), 0.0)
            features.append(topic_score)
        
        return np.array(features).reshape(1, -1)
    
    def predict_next_topic(self, user_data: Dict) -> Dict:
        """
        Predict the most suitable next topic for the learner
        """
        if not self.is_trained:
            return self._fallback_recommendation(user_data)
        
        features = self.extract_features(user_data)
        features_scaled = self.scaler.transform(features)
        
        # Get probabilities for each topic
        topic_probs = self.model.predict_proba(features_scaled)[0]
        
        # Find best topic considering prerequisites
        completed_topics = set(user_data.get('completed_topics', []))
        
        best_topic_id = None
        best_score = 0
        
        for i, prob in enumerate(topic_probs):
            topic_id = i + 1
            if topic_id in completed_topics:
                continue
                
            # Check prerequisites
            if self._check_prerequisites(topic_id, completed_topics):
                if prob > best_score:
                    best_score = prob
                    best_topic_id = topic_id
        
        if best_topic_id is None:
            return self._fallback_recommendation(user_data)
        
        return {
            "topic_id": best_topic_id,
            "topic_name": self.topics[best_topic_id]["name"],
            "difficulty": self.topics[best_topic_id]["difficulty"],
            "confidence": float(best_score),
            "reasoning": self._generate_reasoning(user_data, best_topic_id)
        }
    
    def _check_prerequisites(self, topic_id: int, completed_topics: set) -> bool:
        """Check if prerequisites for a topic are met"""
        topic_difficulty = self.topics[topic_id]["difficulty"]
        
        # Must complete easier topics first
        for completed_id in completed_topics:
            if self.topics[completed_id]["difficulty"] >= topic_difficulty - 1:
                return True
        
        # Always allow difficulty 1 topics
        return topic_difficulty == 1
    
    def _fallback_recommendation(self, user_data: Dict) -> Dict:
        """Fallback recommendation when ML model isn't trained"""
        completed_topics = set(user_data.get('completed_topics', []))
        
        # Find next logical topic
        for topic_id, topic_info in self.topics.items():
            if topic_id not in completed_topics:
                if self._check_prerequisites(topic_id, completed_topics):
                    return {
                        "topic_id": topic_id,
                        "topic_name": topic_info["name"],
                        "difficulty": topic_info["difficulty"],
                        "confidence": 0.8,
                        "reasoning": "Recommended based on learning progression"
                    }
        
        # Default to first topic
        return {
            "topic_id": 1,
            "topic_name": self.topics[1]["name"],
            "difficulty": 1,
            "confidence": 0.9,
            "reasoning": "Starting with basic greetings"
        }
    
    def _generate_reasoning(self, user_data: Dict, topic_id: int) -> str:
        """Generate explanation for recommendation"""
        topic_name = self.topics[topic_id]["name"]
        accuracy = user_data.get('overall_accuracy', 0.0)
        
        if accuracy > 0.8:
            return f"You're doing great! Ready for {topic_name} based on your strong performance."
        elif accuracy > 0.6:
            return f"{topic_name} is a good next step to build on your progress."
        else:
            return f"Let's practice {topic_name} to strengthen your foundation."
    
    def adapt_difficulty(self, user_data: Dict, base_difficulty: int) -> int:
        """
        Adapt content difficulty based on user performance and dyslexia patterns
        """
        accuracy = user_data.get('overall_accuracy', 0.0)
        phonetic_errors = user_data.get('phonetic_errors', 0)
        visual_errors = user_data.get('visual_confusion_errors', 0)
        
        # Start with base difficulty
        adapted_difficulty = base_difficulty
        
        # Adjust based on performance
        if accuracy > 0.85:
            adapted_difficulty = min(5, adapted_difficulty + 1)
        elif accuracy < 0.6:
            adapted_difficulty = max(1, adapted_difficulty - 1)
        
        # Adjust for dyslexia-specific challenges
        if phonetic_errors > 5 or visual_errors > 3:
            adapted_difficulty = max(1, adapted_difficulty - 1)
        
        return adapted_difficulty
    
    def get_learning_insights(self, user_data: Dict) -> Dict:
        """
        Generate insights about learner's progress and patterns
        """
        insights = {
            "strengths": [],
            "challenges": [],
            "recommendations": []
        }
        
        accuracy = user_data.get('overall_accuracy', 0.0)
        phonetic_errors = user_data.get('phonetic_errors', 0)
        visual_errors = user_data.get('visual_confusion_errors', 0)
        completion_rate = user_data.get('completion_rate', 0.0)
        
        # Identify strengths
        if accuracy > 0.8:
            insights["strengths"].append("Strong overall performance")
        if completion_rate > 0.9:
            insights["strengths"].append("Excellent lesson completion")
        if phonetic_errors < 2:
            insights["strengths"].append("Good phonetic awareness")
        
        # Identify challenges
        if phonetic_errors > 5:
            insights["challenges"].append("Phonetic processing needs support")
        if visual_errors > 3:
            insights["challenges"].append("Visual letter recognition needs practice")
        if completion_rate < 0.6:
            insights["challenges"].append("Engagement could be improved")
        
        # Generate recommendations
        if phonetic_errors > 3:
            insights["recommendations"].append("Focus on audio-based exercises")
        if visual_errors > 2:
            insights["recommendations"].append("Use high-contrast visual aids")
        if accuracy < 0.7:
            insights["recommendations"].append("Reduce lesson complexity temporarily")
        
        return insights
    
    def save_model(self, filepath: str):
        """Save trained model to file"""
        if self.is_trained:
            model_data = {
                'model': self.model,
                'scaler': self.scaler,
                'topics': self.topics
            }
            joblib.dump(model_data, filepath)
    
    def load_model(self, filepath: str):
        """Load trained model from file"""
        try:
            model_data = joblib.load(filepath)
            self.model = model_data['model']
            self.scaler = model_data['scaler']
            self.topics = model_data['topics']
            self.is_trained = True
            return True
        except Exception as e:
            print(f"Error loading model: {e}")
            return False