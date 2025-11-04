"""
Progress Tracking and Analytics System
For monitoring learning progress of children with dyslexia
"""

import numpy as np
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
from dataclasses import dataclass, asdict
import json


@dataclass
class LearningSession:
    """Represents a single learning session"""
    session_id: str
    user_id: str
    topic_id: int
    start_time: datetime
    end_time: datetime
    activities_completed: int
    total_activities: int
    accuracy_score: float
    pronunciation_score: float
    engagement_score: float
    help_requests: int
    retry_attempts: int
    errors: List[Dict]


@dataclass
class ProgressMetrics:
    """Key progress metrics for a learner"""
    overall_accuracy: float
    pronunciation_accuracy: float
    completion_rate: float
    engagement_level: float
    learning_velocity: float
    consistency_score: float
    challenge_areas: List[str]
    strengths: List[str]


class ProgressTracker:
    """
    Comprehensive progress tracking system for dyslexic learners
    Monitors multiple dimensions of learning progress
    """
    
    def __init__(self):
        self.sessions_data = []
        self.user_profiles = {}
        
        # Dyslexia-specific tracking categories
        self.dyslexia_indicators = {
            'phonetic_processing': ['phoneme_errors', 'sound_confusion'],
            'visual_processing': ['letter_reversal', 'word_recognition'],
            'working_memory': ['sequence_errors', 'instruction_following'],
            'attention': ['task_switching', 'sustained_focus'],
            'processing_speed': ['response_time', 'completion_time']
        }
        
        # Learning milestones for Kiswahili
        self.milestones = {
            1: {"name": "Basic Greetings", "skills": ["recognition", "pronunciation"]},
            2: {"name": "Number Recognition", "skills": ["counting", "identification"]},
            3: {"name": "Family Vocabulary", "skills": ["word_association", "usage"]},
            4: {"name": "Color Identification", "skills": ["visual_matching", "naming"]},
            5: {"name": "Animal Names", "skills": ["categorization", "description"]},
            6: {"name": "Food Vocabulary", "skills": ["practical_usage", "preferences"]},
            7: {"name": "Clothing Terms", "skills": ["description", "selection"]},
            8: {"name": "Home Environment", "skills": ["location_description", "daily_activities"]},
            9: {"name": "School Context", "skills": ["classroom_language", "instructions"]},
            10: {"name": "Basic Conversations", "skills": ["dialogue", "response_formation"]}
        }
    
    def record_session(self, session: LearningSession):
        """Record a completed learning session"""
        self.sessions_data.append(session)
        self._update_user_profile(session)
    
    def _update_user_profile(self, session: LearningSession):
        """Update user profile with session data"""
        user_id = session.user_id
        
        if user_id not in self.user_profiles:
            self.user_profiles[user_id] = {
                'total_sessions': 0,
                'total_time': timedelta(),
                'topics_attempted': set(),
                'topics_completed': set(),
                'error_patterns': {},
                'performance_history': [],
                'last_active': None
            }
        
        profile = self.user_profiles[user_id]
        profile['total_sessions'] += 1
        profile['total_time'] += session.end_time - session.start_time
        profile['topics_attempted'].add(session.topic_id)
        profile['last_active'] = session.end_time
        
        # Track completion
        if session.activities_completed == session.total_activities:
            profile['topics_completed'].add(session.topic_id)
        
        # Record performance
        profile['performance_history'].append({
            'date': session.end_time,
            'topic_id': session.topic_id,
            'accuracy': session.accuracy_score,
            'pronunciation': session.pronunciation_score,
            'engagement': session.engagement_score
        })
        
        # Track error patterns
        for error in session.errors:
            error_type = error.get('type', 'unknown')
            if error_type not in profile['error_patterns']:
                profile['error_patterns'][error_type] = 0
            profile['error_patterns'][error_type] += 1
    
    def calculate_progress_metrics(self, user_id: str, days_back: int = 30) -> ProgressMetrics:
        """Calculate comprehensive progress metrics for a user"""
        
        if user_id not in self.user_profiles:
            return self._default_metrics()
        
        # Get recent sessions
        cutoff_date = datetime.now() - timedelta(days=days_back)
        recent_sessions = [
            session for session in self.sessions_data
            if session.user_id == user_id and session.start_time >= cutoff_date
        ]
        
        if not recent_sessions:
            return self._default_metrics()
        
        # Calculate metrics
        accuracies = [s.accuracy_score for s in recent_sessions]
        pronunciations = [s.pronunciation_score for s in recent_sessions]
        engagements = [s.engagement_score for s in recent_sessions]
        
        # Completion rates
        completed = sum(1 for s in recent_sessions if s.activities_completed == s.total_activities)
        completion_rate = completed / len(recent_sessions)
        
        # Learning velocity (improvement over time)
        velocity = self._calculate_learning_velocity(recent_sessions)
        
        # Consistency (how regular is the learning)
        consistency = self._calculate_consistency(recent_sessions)
        
        # Identify strengths and challenges
        strengths, challenges = self._analyze_performance_patterns(user_id, recent_sessions)
        
        return ProgressMetrics(
            overall_accuracy=np.mean(accuracies),
            pronunciation_accuracy=np.mean(pronunciations),
            completion_rate=completion_rate,
            engagement_level=np.mean(engagements),
            learning_velocity=velocity,
            consistency_score=consistency,
            challenge_areas=challenges,
            strengths=strengths
        )
    
    def _calculate_learning_velocity(self, sessions: List[LearningSession]) -> float:
        """Calculate how quickly the learner is improving"""
        if len(sessions) < 2:
            return 0.0
        
        # Sort by date
        sessions_sorted = sorted(sessions, key=lambda x: x.start_time)
        
        # Calculate trend in accuracy scores
        scores = [s.accuracy_score for s in sessions_sorted]
        
        # Simple linear trend
        x = np.arange(len(scores))
        if len(scores) > 1:
            slope = np.polyfit(x, scores, 1)[0]
            return max(0, slope)  # Only positive improvement
        
        return 0.0
    
    def _calculate_consistency(self, sessions: List[LearningSession]) -> float:
        """Calculate learning consistency (regularity of practice)"""
        if len(sessions) < 2:
            return 0.0
        
        # Calculate gaps between sessions
        sessions_sorted = sorted(sessions, key=lambda x: x.start_time)
        gaps = []
        
        for i in range(1, len(sessions_sorted)):
            gap = (sessions_sorted[i].start_time - sessions_sorted[i-1].start_time).days
            gaps.append(gap)
        
        # Consistency is higher when gaps are smaller and more regular
        if gaps:
            avg_gap = np.mean(gaps)
            gap_variance = np.var(gaps)
            
            # Ideal gap is 1-2 days
            ideal_gap = 1.5
            gap_score = max(0, 1 - abs(avg_gap - ideal_gap) / 7)  # Normalize to weekly
            variance_score = max(0, 1 - gap_variance / 10)  # Penalize high variance
            
            return (gap_score + variance_score) / 2
        
        return 0.0
    
    def _analyze_performance_patterns(self, user_id: str, sessions: List[LearningSession]) -> Tuple[List[str], List[str]]:
        """Analyze performance to identify strengths and challenges"""
        
        strengths = []
        challenges = []
        
        profile = self.user_profiles[user_id]
        
        # Analyze accuracy patterns
        accuracies = [s.accuracy_score for s in sessions]
        avg_accuracy = np.mean(accuracies)
        
        if avg_accuracy > 0.8:
            strengths.append("High accuracy in exercises")
        elif avg_accuracy < 0.6:
            challenges.append("Accuracy needs improvement")
        
        # Analyze pronunciation
        pronunciations = [s.pronunciation_score for s in sessions]
        avg_pronunciation = np.mean(pronunciations)
        
        if avg_pronunciation > 0.8:
            strengths.append("Good pronunciation skills")
        elif avg_pronunciation < 0.6:
            challenges.append("Pronunciation needs practice")
        
        # Analyze engagement
        engagements = [s.engagement_score for s in sessions]
        avg_engagement = np.mean(engagements)
        
        if avg_engagement > 0.8:
            strengths.append("High engagement and motivation")
        elif avg_engagement < 0.6:
            challenges.append("Engagement could be improved")
        
        # Analyze error patterns
        error_patterns = profile['error_patterns']
        total_errors = sum(error_patterns.values())
        
        if total_errors > 0:
            for error_type, count in error_patterns.items():
                if count / total_errors > 0.3:  # More than 30% of errors
                    if error_type in ['phoneme_errors', 'sound_confusion']:
                        challenges.append("Phonetic processing")
                    elif error_type in ['letter_reversal', 'word_recognition']:
                        challenges.append("Visual processing")
                    elif error_type in ['sequence_errors']:
                        challenges.append("Working memory")
        
        # Analyze completion patterns
        completion_rates = [
            s.activities_completed / s.total_activities for s in sessions
            if s.total_activities > 0
        ]
        
        if completion_rates:
            avg_completion = np.mean(completion_rates)
            if avg_completion > 0.9:
                strengths.append("Excellent task completion")
            elif avg_completion < 0.7:
                challenges.append("Task completion needs support")
        
        return strengths, challenges
    
    def _default_metrics(self) -> ProgressMetrics:
        """Return default metrics for new users"""
        return ProgressMetrics(
            overall_accuracy=0.0,
            pronunciation_accuracy=0.0,
            completion_rate=0.0,
            engagement_level=0.0,
            learning_velocity=0.0,
            consistency_score=0.0,
            challenge_areas=[],
            strengths=[]
        )
    
    def generate_progress_report(self, user_id: str, days_back: int = 30) -> Dict:
        """Generate comprehensive progress report"""
        
        metrics = self.calculate_progress_metrics(user_id, days_back)
        
        if user_id not in self.user_profiles:
            return {"error": "User not found"}
        
        profile = self.user_profiles[user_id]
        
        # Recent activity
        recent_sessions = [
            session for session in self.sessions_data
            if session.user_id == user_id and 
            session.start_time >= datetime.now() - timedelta(days=days_back)
        ]
        
        # Milestone progress
        milestone_progress = self._calculate_milestone_progress(user_id)
        
        # Learning insights
        insights = self._generate_learning_insights(metrics, profile)
        
        return {
            'user_id': user_id,
            'report_period': f"Last {days_back} days",
            'generated_at': datetime.now().isoformat(),
            'metrics': asdict(metrics),
            'activity_summary': {
                'total_sessions': len(recent_sessions),
                'total_time_minutes': sum(
                    (s.end_time - s.start_time).total_seconds() / 60 
                    for s in recent_sessions
                ),
                'topics_practiced': len(set(s.topic_id for s in recent_sessions)),
                'average_session_length': np.mean([
                    (s.end_time - s.start_time).total_seconds() / 60 
                    for s in recent_sessions
                ]) if recent_sessions else 0
            },
            'milestone_progress': milestone_progress,
            'insights': insights,
            'recommendations': self._generate_recommendations(metrics, profile)
        }
    
    def _calculate_milestone_progress(self, user_id: str) -> Dict:
        """Calculate progress towards learning milestones"""
        
        if user_id not in self.user_profiles:
            return {}
        
        profile = self.user_profiles[user_id]
        completed_topics = profile['topics_completed']
        
        milestone_status = {}
        
        for milestone_id, milestone_info in self.milestones.items():
            if milestone_id in completed_topics:
                milestone_status[milestone_id] = {
                    'name': milestone_info['name'],
                    'status': 'completed',
                    'skills_mastered': milestone_info['skills']
                }
            elif milestone_id in profile['topics_attempted']:
                milestone_status[milestone_id] = {
                    'name': milestone_info['name'],
                    'status': 'in_progress',
                    'skills_practicing': milestone_info['skills']
                }
            else:
                milestone_status[milestone_id] = {
                    'name': milestone_info['name'],
                    'status': 'not_started',
                    'skills_to_learn': milestone_info['skills']
                }
        
        return milestone_status
    
    def _generate_learning_insights(self, metrics: ProgressMetrics, profile: Dict) -> List[str]:
        """Generate actionable learning insights"""
        
        insights = []
        
        # Performance insights
        if metrics.overall_accuracy > 0.8:
            insights.append("Excellent accuracy! You're mastering the material well.")
        elif metrics.overall_accuracy < 0.6:
            insights.append("Focus on accuracy - consider slowing down and double-checking answers.")
        
        # Engagement insights
        if metrics.engagement_level > 0.8:
            insights.append("Great engagement! You're staying focused during lessons.")
        elif metrics.engagement_level < 0.6:
            insights.append("Try shorter, more frequent sessions to maintain focus.")
        
        # Consistency insights
        if metrics.consistency_score > 0.7:
            insights.append("Excellent learning routine! Regular practice is paying off.")
        elif metrics.consistency_score < 0.4:
            insights.append("Try to practice more regularly - even 10 minutes daily helps!")
        
        # Velocity insights
        if metrics.learning_velocity > 0.1:
            insights.append("You're improving quickly! Keep up the great progress.")
        elif metrics.learning_velocity < 0:
            insights.append("Don't worry about temporary setbacks - learning has ups and downs.")
        
        return insights
    
    def _generate_recommendations(self, metrics: ProgressMetrics, profile: Dict) -> List[str]:
        """Generate personalized recommendations"""
        
        recommendations = []
        
        # Based on challenge areas
        if 'Phonetic processing' in metrics.challenge_areas:
            recommendations.append("Practice with audio exercises and repeat-after-me activities")
        
        if 'Visual processing' in metrics.challenge_areas:
            recommendations.append("Use high-contrast visual aids and larger fonts")
        
        if 'Task completion needs support' in metrics.challenge_areas:
            recommendations.append("Break lessons into smaller chunks with frequent breaks")
        
        # Based on engagement
        if metrics.engagement_level < 0.6:
            recommendations.append("Try gamified activities and reward-based learning")
        
        # Based on consistency
        if metrics.consistency_score < 0.5:
            recommendations.append("Set up a daily reminder and practice at the same time each day")
        
        # General recommendations
        if metrics.overall_accuracy > 0.8 and metrics.learning_velocity > 0.05:
            recommendations.append("You're ready for more challenging content!")
        
        return recommendations
    
    def export_data(self, user_id: str, format: str = 'json') -> str:
        """Export user progress data"""
        
        if user_id not in self.user_profiles:
            return json.dumps({"error": "User not found"})
        
        user_sessions = [
            asdict(session) for session in self.sessions_data 
            if session.user_id == user_id
        ]
        
        # Convert datetime objects to strings
        for session in user_sessions:
            session['start_time'] = session['start_time'].isoformat()
            session['end_time'] = session['end_time'].isoformat()
        
        export_data = {
            'user_id': user_id,
            'profile': self.user_profiles[user_id],
            'sessions': user_sessions,
            'exported_at': datetime.now().isoformat()
        }
        
        # Convert sets to lists for JSON serialization
        if 'topics_attempted' in export_data['profile']:
            export_data['profile']['topics_attempted'] = list(export_data['profile']['topics_attempted'])
        if 'topics_completed' in export_data['profile']:
            export_data['profile']['topics_completed'] = list(export_data['profile']['topics_completed'])
        
        return json.dumps(export_data, indent=2)