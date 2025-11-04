"""
Inference Engine for Real-time AI Predictions
Handles model inference for production use
"""

import numpy as np
import joblib
import json
from typing import Dict, List, Optional, Tuple, Any
from datetime import datetime
import logging
from pathlib import Path

from ..models.recommendation_engine import LearningRecommendationEngine
from ..models.pronunciation_evaluator import KiswahiliPronunciationEvaluator
from ..models.progress_tracker import ProgressTracker


class KiswahiliInferenceEngine:
    """
    Production inference engine for Kiswahili learning AI
    Handles real-time predictions and recommendations
    """
    
    def __init__(self, model_dir: str = "models"):
        self.model_dir = Path(model_dir)
        self.logger = self._setup_logging()
        
        # Initialize components
        self.recommendation_engine = LearningRecommendationEngine()
        self.pronunciation_evaluator = KiswahiliPronunciationEvaluator()
        self.progress_tracker = ProgressTracker()
        
        # Model cache for performance
        self.model_cache = {}
        self.feature_cache = {}
        
        # Load models if available
        self._load_models()
    
    def _setup_logging(self) -> logging.Logger:
        """Setup logging for the inference engine"""
        logger = logging.getLogger("KiswahiliInference")
        logger.setLevel(logging.INFO)
        
        if not logger.handlers:
            handler = logging.StreamHandler()
            formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            handler.setFormatter(formatter)
            logger.addHandler(handler)
        
        return logger
    
    def _load_models(self):
        """Load pre-trained models from disk"""
        try:
            # Load recommendation model
            rec_model_path = self.model_dir / "recommendation_model.joblib"
            if rec_model_path.exists():
                self.recommendation_engine.load_model(str(rec_model_path))
                self.logger.info("Recommendation model loaded successfully")
            
            # Load other models as they become available
            # pronunciation_model_path = self.model_dir / "pronunciation_model.joblib"
            # if pronunciation_model_path.exists():
            #     self.pronunciation_evaluator.load_model(str(pronunciation_model_path))
            
        except Exception as e:
            self.logger.warning(f"Could not load some models: {e}")
    
    def predict_next_lesson(self, 
                           user_id: str, 
                           user_data: Dict,
                           context: Optional[Dict] = None) -> Dict:
        """
        Predict the next best lesson for a user
        
        Args:
            user_id: Unique user identifier
            user_data: User performance and preference data
            context: Additional context (time of day, device, etc.)
            
        Returns:
            Dictionary with lesson recommendation and metadata
        """
        
        start_time = datetime.now()
        
        try:
            # Get base recommendation
            recommendation = self.recommendation_engine.predict_next_topic(user_data)
            
            # Apply contextual adjustments
            if context:
                recommendation = self._apply_contextual_adjustments(
                    recommendation, context
                )
            
            # Add confidence intervals and explanations
            recommendation['metadata'] = {
                'user_id': user_id,
                'prediction_time': start_time.isoformat(),
                'inference_time_ms': (datetime.now() - start_time).total_seconds() * 1000,
                'model_version': '1.0',
                'context_applied': context is not None
            }
            
            # Log prediction
            self.logger.info(
                f"Lesson prediction for user {user_id}: "
                f"Topic {recommendation['topic_id']} "
                f"(confidence: {recommendation['confidence']:.3f})"
            )
            
            return recommendation
            
        except Exception as e:
            self.logger.error(f"Lesson prediction error for user {user_id}: {e}")
            return self._fallback_recommendation(user_id, user_data)
    
    def evaluate_pronunciation_batch(self, 
                                   pronunciation_requests: List[Dict]) -> List[Dict]:
        """
        Batch pronunciation evaluation for efficiency
        
        Args:
            pronunciation_requests: List of pronunciation evaluation requests
            
        Returns:
            List of evaluation results
        """
        
        results = []
        
        for request in pronunciation_requests:
            try:
                word = request['word']
                audio_data = request.get('audio_data')
                sample_rate = request.get('sample_rate', 22050)
                
                if audio_data is None:
                    # Simulate audio data for demo
                    duration = 2.0
                    audio_data = np.random.normal(0, 0.1, int(sample_rate * duration))
                
                result = self.pronunciation_evaluator.evaluate_pronunciation(
                    word, audio_data, sample_rate
                )
                
                result['request_id'] = request.get('request_id', '')
                results.append(result)
                
            except Exception as e:
                self.logger.error(f"Pronunciation evaluation error: {e}")
                results.append({
                    'request_id': request.get('request_id', ''),
                    'error': str(e),
                    'word': request.get('word', ''),
                    'overall_score': 0.0
                })
        
        return results
    
    def get_adaptive_content(self, 
                           user_id: str,
                           topic_id: int,
                           user_performance: Dict) -> Dict:
        """
        Get adaptively adjusted content for a specific topic
        
        Args:
            user_id: User identifier
            topic_id: Topic to adapt
            user_performance: Recent performance data
            
        Returns:
            Adapted content configuration
        """
        
        try:
            # Calculate adaptive difficulty
            base_difficulty = self.recommendation_engine.topics[topic_id]["difficulty"]
            adapted_difficulty = self.recommendation_engine.adapt_difficulty(
                user_performance, base_difficulty
            )
            
            # Get learning insights
            insights = self.recommendation_engine.get_learning_insights(user_performance)
            
            # Generate content adaptations
            adaptations = self._generate_content_adaptations(
                user_performance, insights
            )
            
            return {
                'topic_id': topic_id,
                'base_difficulty': base_difficulty,
                'adapted_difficulty': adapted_difficulty,
                'adaptations': adaptations,
                'insights': insights,
                'user_id': user_id
            }
            
        except Exception as e:
            self.logger.error(f"Content adaptation error: {e}")
            return self._default_content_config(topic_id)
    
    def _apply_contextual_adjustments(self, 
                                    recommendation: Dict, 
                                    context: Dict) -> Dict:
        """Apply contextual adjustments to recommendations"""
        
        # Time-based adjustments
        current_hour = datetime.now().hour
        if current_hour < 10:  # Morning
            if context.get('energy_level') == 'high':
                recommendation['confidence'] *= 1.1
        elif current_hour > 18:  # Evening
            if recommendation['difficulty'] > 3:
                recommendation['difficulty'] = max(1, recommendation['difficulty'] - 1)
                recommendation['reasoning'] += " (Adjusted for evening session)"
        
        # Device-based adjustments
        if context.get('device_type') == 'mobile':
            # Prefer shorter activities on mobile
            recommendation['suggested_duration'] = min(
                recommendation.get('suggested_duration', 15), 10
            )
        
        # Session length adjustments
        session_count_today = context.get('session_count_today', 0)
        if session_count_today > 2:
            # Reduce difficulty for multiple sessions
            recommendation['difficulty'] = max(1, recommendation['difficulty'] - 1)
            recommendation['reasoning'] += " (Adjusted for multiple sessions today)"
        
        return recommendation
    
    def _generate_content_adaptations(self, 
                                    performance: Dict, 
                                    insights: Dict) -> Dict:
        """Generate specific content adaptations based on performance"""
        
        adaptations = {
            'visual': {},
            'audio': {},
            'interaction': {},
            'pacing': {}
        }
        
        # Visual adaptations
        if 'Visual processing' in insights.get('challenges', []):
            adaptations['visual'] = {
                'font_size': 'large',
                'contrast': 'high',
                'color_coding': True,
                'visual_cues': 'enhanced'
            }
        
        # Audio adaptations
        if 'Phonetic processing' in insights.get('challenges', []):
            adaptations['audio'] = {
                'speech_rate': 'slow',
                'repetition': 'increased',
                'phoneme_emphasis': True
            }
        
        # Interaction adaptations
        accuracy = performance.get('overall_accuracy', 0.0)
        if accuracy < 0.6:
            adaptations['interaction'] = {
                'hint_frequency': 'high',
                'error_tolerance': 'increased',
                'positive_feedback': 'frequent'
            }
        
        # Pacing adaptations
        avg_response_time = performance.get('avg_response_time', 0.0)
        if avg_response_time > 10.0:  # Slow responses
            adaptations['pacing'] = {
                'time_pressure': 'reduced',
                'break_frequency': 'increased',
                'chunk_size': 'smaller'
            }
        
        return adaptations
    
    def _fallback_recommendation(self, user_id: str, user_data: Dict) -> Dict:
        """Provide fallback recommendation when main system fails"""
        return {
            'topic_id': 1,
            'topic_name': 'Salamu',
            'difficulty': 1,
            'confidence': 0.5,
            'reasoning': 'Fallback recommendation due to system error',
            'metadata': {
                'user_id': user_id,
                'fallback': True,
                'error_recovery': True
            }
        }
    
    def _default_content_config(self, topic_id: int) -> Dict:
        """Default content configuration"""
        return {
            'topic_id': topic_id,
            'base_difficulty': 2,
            'adapted_difficulty': 2,
            'adaptations': {
                'visual': {'font_size': 'medium'},
                'audio': {'speech_rate': 'normal'},
                'interaction': {'hint_frequency': 'medium'},
                'pacing': {'time_pressure': 'normal'}
            },
            'insights': {'strengths': [], 'challenges': []},
            'fallback': True
        }
    
    def get_real_time_feedback(self, 
                             user_id: str,
                             activity_data: Dict) -> Dict:
        """
        Generate real-time feedback during learning activities
        
        Args:
            user_id: User identifier
            activity_data: Current activity performance data
            
        Returns:
            Real-time feedback and suggestions
        """
        
        try:
            feedback = {
                'immediate': [],
                'encouragement': '',
                'suggestions': [],
                'adaptations': {}
            }
            
            # Analyze current performance
            current_accuracy = activity_data.get('accuracy', 0.0)
            response_time = activity_data.get('response_time', 0.0)
            error_type = activity_data.get('error_type', 'none')
            
            # Generate immediate feedback
            if current_accuracy > 0.8:
                feedback['immediate'].append("Excellent work!")
                feedback['encouragement'] = "You're doing great! Keep it up! 🌟"
            elif current_accuracy > 0.6:
                feedback['immediate'].append("Good job!")
                feedback['encouragement'] = "Nice progress! You're learning well! 👍"
            else:
                feedback['immediate'].append("Keep trying!")
                feedback['encouragement'] = "Every mistake helps you learn! 💪"
            
            # Error-specific feedback
            if error_type == 'phoneme_errors':
                feedback['suggestions'].append("Try listening to the word again")
                feedback['adaptations']['audio'] = {'repetition': 'increased'}
            elif error_type == 'visual_confusion':
                feedback['suggestions'].append("Look carefully at the letter shapes")
                feedback['adaptations']['visual'] = {'highlight': 'enhanced'}
            
            # Response time feedback
            if response_time > 15.0:
                feedback['suggestions'].append("Take your time - there's no rush!")
                feedback['adaptations']['pacing'] = {'time_pressure': 'removed'}
            
            return feedback
            
        except Exception as e:
            self.logger.error(f"Real-time feedback error: {e}")
            return {
                'immediate': ["Keep going!"],
                'encouragement': "You're doing well! 😊",
                'suggestions': [],
                'adaptations': {}
            }
    
    def predict_learning_outcome(self, 
                               user_id: str,
                               planned_activities: List[Dict]) -> Dict:
        """
        Predict learning outcomes for planned activities
        
        Args:
            user_id: User identifier
            planned_activities: List of planned learning activities
            
        Returns:
            Predicted outcomes and recommendations
        """
        
        try:
            # Get user's current performance profile
            user_profile = self.progress_tracker.user_profiles.get(user_id, {})
            
            predictions = []
            total_predicted_time = 0
            
            for activity in planned_activities:
                topic_id = activity.get('topic_id', 1)
                difficulty = activity.get('difficulty', 2)
                
                # Predict success probability
                success_prob = self._predict_activity_success(
                    user_profile, topic_id, difficulty
                )
                
                # Predict time to completion
                estimated_time = self._predict_completion_time(
                    user_profile, activity
                )
                
                predictions.append({
                    'activity_id': activity.get('id', ''),
                    'topic_id': topic_id,
                    'success_probability': success_prob,
                    'estimated_time_minutes': estimated_time,
                    'difficulty_appropriate': success_prob > 0.6
                })
                
                total_predicted_time += estimated_time
            
            return {
                'user_id': user_id,
                'activity_predictions': predictions,
                'session_summary': {
                    'total_estimated_time': total_predicted_time,
                    'average_success_probability': np.mean([p['success_probability'] for p in predictions]),
                    'recommended_adjustments': self._generate_session_adjustments(predictions)
                }
            }
            
        except Exception as e:
            self.logger.error(f"Learning outcome prediction error: {e}")
            return {'error': str(e)}
    
    def _predict_activity_success(self, 
                                user_profile: Dict, 
                                topic_id: int, 
                                difficulty: int) -> float:
        """Predict probability of success for an activity"""
        
        # Base success rate
        base_rate = 0.7
        
        # Adjust based on user's topic history
        topic_scores = user_profile.get('topic_scores', {})
        if str(topic_id) in topic_scores:
            topic_performance = topic_scores[str(topic_id)]
            base_rate = (base_rate + topic_performance) / 2
        
        # Adjust based on difficulty
        difficulty_adjustment = max(0.1, 1.0 - (difficulty - 1) * 0.15)
        
        # Adjust based on error patterns
        error_patterns = user_profile.get('error_patterns', {})
        if error_patterns:
            error_rate = sum(error_patterns.values()) / user_profile.get('total_sessions', 1)
            error_adjustment = max(0.5, 1.0 - error_rate * 0.1)
        else:
            error_adjustment = 1.0
        
        final_probability = base_rate * difficulty_adjustment * error_adjustment
        return min(0.95, max(0.1, final_probability))
    
    def _predict_completion_time(self, 
                               user_profile: Dict, 
                               activity: Dict) -> float:
        """Predict time to complete an activity"""
        
        # Base time estimates (in minutes)
        base_times = {
            1: 5,   # Very easy
            2: 8,   # Easy
            3: 12,  # Medium
            4: 15,  # Hard
            5: 20   # Very hard
        }
        
        difficulty = activity.get('difficulty', 2)
        base_time = base_times.get(difficulty, 10)
        
        # Adjust based on user's average response time
        avg_response_time = user_profile.get('avg_response_time', 5.0)
        if avg_response_time > 8.0:
            base_time *= 1.3  # Slower user
        elif avg_response_time < 3.0:
            base_time *= 0.8  # Faster user
        
        return base_time
    
    def _generate_session_adjustments(self, predictions: List[Dict]) -> List[str]:
        """Generate recommendations for session adjustments"""
        
        adjustments = []
        
        # Check for activities with low success probability
        low_success_activities = [p for p in predictions if p['success_probability'] < 0.5]
        if low_success_activities:
            adjustments.append("Consider reducing difficulty for some activities")
        
        # Check for very long sessions
        total_time = sum(p['estimated_time_minutes'] for p in predictions)
        if total_time > 30:
            adjustments.append("Session may be too long - consider breaking into smaller parts")
        
        # Check for difficulty progression
        difficulties = [p.get('difficulty', 2) for p in predictions]
        if len(difficulties) > 1 and max(difficulties) - min(difficulties) > 2:
            adjustments.append("Large difficulty jumps detected - consider smoother progression")
        
        return adjustments
    
    def get_performance_insights(self, user_id: str, timeframe_days: int = 7) -> Dict:
        """
        Get detailed performance insights for a user
        
        Args:
            user_id: User identifier
            timeframe_days: Number of days to analyze
            
        Returns:
            Comprehensive performance insights
        """
        
        try:
            # Get progress metrics
            metrics = self.progress_tracker.calculate_progress_metrics(
                user_id, timeframe_days
            )
            
            # Generate insights
            insights = {
                'performance_trends': self._analyze_performance_trends(user_id, timeframe_days),
                'learning_patterns': self._identify_learning_patterns(user_id),
                'strength_areas': metrics.strengths,
                'challenge_areas': metrics.challenge_areas,
                'recommendations': self._generate_performance_recommendations(metrics),
                'next_milestones': self._identify_next_milestones(user_id, metrics)
            }
            
            return insights
            
        except Exception as e:
            self.logger.error(f"Performance insights error: {e}")
            return {'error': str(e)}
    
    def _analyze_performance_trends(self, user_id: str, days: int) -> Dict:
        """Analyze performance trends over time"""
        
        # This would analyze session data over time
        # For now, return placeholder trends
        return {
            'accuracy_trend': 'improving',
            'engagement_trend': 'stable',
            'consistency_trend': 'improving',
            'speed_trend': 'stable'
        }
    
    def _identify_learning_patterns(self, user_id: str) -> Dict:
        """Identify user's learning patterns"""
        
        return {
            'preferred_time': 'morning',
            'optimal_session_length': '10-15 minutes',
            'learning_style': 'visual-auditory',
            'motivation_factors': ['progress_tracking', 'rewards']
        }
    
    def _generate_performance_recommendations(self, metrics) -> List[str]:
        """Generate recommendations based on performance metrics"""
        
        recommendations = []
        
        if metrics.overall_accuracy < 0.7:
            recommendations.append("Focus on accuracy over speed")
        
        if metrics.consistency_score < 0.5:
            recommendations.append("Try to practice more regularly")
        
        if metrics.engagement_level < 0.6:
            recommendations.append("Explore more interactive activities")
        
        return recommendations
    
    def _identify_next_milestones(self, user_id: str, metrics) -> List[Dict]:
        """Identify next learning milestones"""
        
        return [
            {
                'milestone': 'Complete 5 topics',
                'progress': 0.6,
                'estimated_time': '2 weeks'
            },
            {
                'milestone': 'Achieve 80% accuracy',
                'progress': metrics.overall_accuracy / 0.8,
                'estimated_time': '1 week'
            }
        ]