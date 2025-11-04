"""
Pronunciation Evaluation System for Kiswahili Learning
Designed for children with dyslexia
"""

import numpy as np
import librosa
import soundfile as sf
from typing import Dict, List, Tuple, Optional
import re
from dataclasses import dataclass


@dataclass
class PhonemeScore:
    phoneme: str
    expected: str
    actual: str
    score: float
    feedback: str


class KiswahiliPronunciationEvaluator:
    """
    Evaluates pronunciation accuracy for Kiswahili words
    Provides detailed feedback suitable for children with dyslexia
    """
    
    def __init__(self):
        # Kiswahili phoneme mappings
        self.kiswahili_phonemes = {
            'a': ['a', 'ah'],
            'e': ['e', 'eh'], 
            'i': ['i', 'ee'],
            'o': ['o', 'oh'],
            'u': ['u', 'oo'],
            'b': ['b'],
            'ch': ['ch', 'tch'],
            'd': ['d'],
            'f': ['f'],
            'g': ['g'],
            'h': ['h'],
            'j': ['j', 'dj'],
            'k': ['k'],
            'l': ['l'],
            'm': ['m'],
            'n': ['n'],
            'ng': ['ng'],
            'ny': ['ny'],
            'p': ['p'],
            'r': ['r'],
            's': ['s'],
            't': ['t'],
            'th': ['th'],
            'v': ['v'],
            'w': ['w'],
            'y': ['y'],
            'z': ['z']
        }
        
        # Common pronunciation challenges for dyslexic learners
        self.dyslexia_challenges = {
            'b_d_confusion': ['b', 'd'],
            'p_q_confusion': ['p', 'q'],
            'sequence_reversal': True,
            'vowel_confusion': ['a', 'e', 'i', 'o', 'u']
        }
    
    def evaluate_pronunciation(self, 
                             target_word: str, 
                             audio_data: np.ndarray, 
                             sample_rate: int = 22050) -> Dict:
        """
        Evaluate pronunciation accuracy of a Kiswahili word
        
        Args:
            target_word: The word the user should pronounce
            audio_data: Audio recording as numpy array
            sample_rate: Audio sample rate
            
        Returns:
            Dictionary with pronunciation evaluation results
        """
        
        # Extract audio features
        features = self._extract_audio_features(audio_data, sample_rate)
        
        # Break word into phonemes
        target_phonemes = self._word_to_phonemes(target_word)
        
        # Simulate pronunciation analysis (in production, use speech recognition)
        pronunciation_result = self._analyze_pronunciation(target_phonemes, features)
        
        # Generate feedback suitable for dyslexic learners
        feedback = self._generate_dyslexia_friendly_feedback(
            target_word, pronunciation_result
        )
        
        return {
            'word': target_word,
            'overall_score': pronunciation_result['overall_score'],
            'phoneme_scores': pronunciation_result['phoneme_scores'],
            'feedback': feedback,
            'areas_for_improvement': pronunciation_result['areas_for_improvement'],
            'encouragement': self._generate_encouragement(pronunciation_result['overall_score'])
        }
    
    def _extract_audio_features(self, audio_data: np.ndarray, sample_rate: int) -> Dict:
        """Extract relevant features from audio for pronunciation analysis"""
        
        # Basic audio features
        features = {}
        
        # Spectral features
        spectral_centroids = librosa.feature.spectral_centroid(y=audio_data, sr=sample_rate)[0]
        features['spectral_centroid_mean'] = np.mean(spectral_centroids)
        features['spectral_centroid_std'] = np.std(spectral_centroids)
        
        # MFCC features (important for speech recognition)
        mfccs = librosa.feature.mfcc(y=audio_data, sr=sample_rate, n_mfcc=13)
        features['mfccs'] = mfccs
        features['mfcc_mean'] = np.mean(mfccs, axis=1)
        features['mfcc_std'] = np.std(mfccs, axis=1)
        
        # Pitch features
        pitches, magnitudes = librosa.piptrack(y=audio_data, sr=sample_rate)
        features['pitch_mean'] = np.mean(pitches[pitches > 0]) if np.any(pitches > 0) else 0
        
        # Duration
        features['duration'] = len(audio_data) / sample_rate
        
        # Energy
        features['energy'] = np.sum(audio_data ** 2)
        
        return features
    
    def _word_to_phonemes(self, word: str) -> List[str]:
        """
        Convert Kiswahili word to phonemes
        Simplified phoneme extraction for common Kiswahili patterns
        """
        word = word.lower()
        phonemes = []
        i = 0
        
        while i < len(word):
            # Check for digraphs first
            if i < len(word) - 1:
                digraph = word[i:i+2]
                if digraph in ['ch', 'ng', 'ny', 'th']:
                    phonemes.append(digraph)
                    i += 2
                    continue
            
            # Single phoneme
            if word[i] in 'aeiou':
                phonemes.append(word[i])  # vowel
            elif word[i] in 'bcdfghjklmnpqrstvwxyz':
                phonemes.append(word[i])  # consonant
            
            i += 1
        
        return phonemes
    
    def _analyze_pronunciation(self, target_phonemes: List[str], features: Dict) -> Dict:
        """
        Analyze pronunciation accuracy
        In production, this would use advanced speech recognition
        Currently provides simulated analysis
        """
        
        # Simulate pronunciation analysis
        phoneme_scores = []
        total_score = 0
        
        for i, phoneme in enumerate(target_phonemes):
            # Simulate individual phoneme scoring
            base_score = np.random.uniform(0.7, 0.95)  # Simulate good pronunciation
            
            # Adjust for common dyslexia challenges
            if phoneme in self.dyslexia_challenges['b_d_confusion']:
                base_score *= 0.9  # Slightly lower for challenging phonemes
            
            if phoneme in self.dyslexia_challenges['vowel_confusion']:
                base_score *= 0.95
            
            phoneme_scores.append(PhonemeScore(
                phoneme=phoneme,
                expected=phoneme,
                actual=phoneme,  # Simplified
                score=base_score,
                feedback=self._get_phoneme_feedback(phoneme, base_score)
            ))
            
            total_score += base_score
        
        overall_score = total_score / len(target_phonemes) if target_phonemes else 0
        
        # Identify areas for improvement
        areas_for_improvement = []
        for ps in phoneme_scores:
            if ps.score < 0.8:
                areas_for_improvement.append(ps.phoneme)
        
        return {
            'overall_score': overall_score,
            'phoneme_scores': [
                {
                    'phoneme': ps.phoneme,
                    'score': ps.score,
                    'feedback': ps.feedback
                } for ps in phoneme_scores
            ],
            'areas_for_improvement': areas_for_improvement
        }
    
    def _get_phoneme_feedback(self, phoneme: str, score: float) -> str:
        """Generate specific feedback for each phoneme"""
        
        if score >= 0.9:
            return f"Excellent pronunciation of '{phoneme}'!"
        elif score >= 0.8:
            return f"Good job with '{phoneme}', keep practicing!"
        elif score >= 0.7:
            return f"'{phoneme}' needs a bit more practice"
        else:
            return f"Let's work on the '{phoneme}' sound together"
    
    def _generate_dyslexia_friendly_feedback(self, word: str, result: Dict) -> str:
        """
        Generate encouraging, specific feedback suitable for children with dyslexia
        """
        
        score = result['overall_score']
        
        if score >= 0.9:
            feedback = f"Hongera! (Congratulations!) You pronounced '{word}' beautifully! 🌟"
        elif score >= 0.8:
            feedback = f"Vizuri sana! (Very good!) Your pronunciation of '{word}' is getting better! 👏"
        elif score >= 0.7:
            feedback = f"Good try with '{word}'! Let's practice a few sounds together. 💪"
        else:
            feedback = f"Great effort! Let's break down '{word}' into smaller parts and try again. 🎯"
        
        # Add specific guidance
        if result['areas_for_improvement']:
            problem_sounds = ', '.join(result['areas_for_improvement'][:2])  # Limit to 2
            feedback += f" Focus on the '{problem_sounds}' sound(s)."
        
        return feedback
    
    def _generate_encouragement(self, score: float) -> str:
        """Generate age-appropriate encouragement"""
        
        encouragements = {
            0.9: [
                "You're a pronunciation superstar! ⭐",
                "Amazing work! Keep it up! 🎉",
                "Your Kiswahili sounds wonderful! 🌟"
            ],
            0.8: [
                "You're doing great! Practice makes perfect! 💪",
                "Good job! You're getting better every day! 📈",
                "Nice work! Keep practicing! 👍"
            ],
            0.7: [
                "Good effort! Every practice helps you improve! 🌱",
                "You're learning! Keep trying! 🎯",
                "Great try! Let's practice more! 📚"
            ],
            0.0: [
                "Every expert was once a beginner! 🌟",
                "You're brave for trying! Let's practice together! 🤝",
                "Learning is a journey! You're on the right path! 🛤️"
            ]
        }
        
        if score >= 0.9:
            return np.random.choice(encouragements[0.9])
        elif score >= 0.8:
            return np.random.choice(encouragements[0.8])
        elif score >= 0.7:
            return np.random.choice(encouragements[0.7])
        else:
            return np.random.choice(encouragements[0.0])
    
    def get_practice_suggestions(self, problem_phonemes: List[str]) -> List[Dict]:
        """
        Suggest practice exercises for problematic phonemes
        Tailored for dyslexic learners
        """
        
        suggestions = []
        
        for phoneme in problem_phonemes:
            if phoneme in ['b', 'd']:
                suggestions.append({
                    'phoneme': phoneme,
                    'exercise': 'Visual discrimination',
                    'description': f"Practice identifying '{phoneme}' with colorful cards",
                    'tip': "Use your finger to trace the letter shape while saying the sound"
                })
            
            elif phoneme in ['a', 'e', 'i', 'o', 'u']:
                suggestions.append({
                    'phoneme': phoneme,
                    'exercise': 'Vowel stretching',
                    'description': f"Hold the '{phoneme}' sound for 3 seconds",
                    'tip': "Watch your mouth shape in a mirror"
                })
            
            else:
                suggestions.append({
                    'phoneme': phoneme,
                    'exercise': 'Repetition practice',
                    'description': f"Say '{phoneme}' 5 times slowly",
                    'tip': "Break it down into smaller parts"
                })
        
        return suggestions
    
    def create_pronunciation_report(self, session_results: List[Dict]) -> Dict:
        """
        Create a comprehensive pronunciation progress report
        """
        
        if not session_results:
            return {'error': 'No session data provided'}
        
        # Calculate overall progress
        scores = [result['overall_score'] for result in session_results]
        avg_score = np.mean(scores)
        improvement = scores[-1] - scores[0] if len(scores) > 1 else 0
        
        # Identify consistent problem areas
        all_problems = []
        for result in session_results:
            all_problems.extend(result.get('areas_for_improvement', []))
        
        problem_frequency = {}
        for problem in all_problems:
            problem_frequency[problem] = problem_frequency.get(problem, 0) + 1
        
        persistent_problems = [
            phoneme for phoneme, freq in problem_frequency.items() 
            if freq >= len(session_results) * 0.5
        ]
        
        return {
            'session_count': len(session_results),
            'average_score': avg_score,
            'improvement': improvement,
            'persistent_challenges': persistent_problems,
            'practice_suggestions': self.get_practice_suggestions(persistent_problems),
            'overall_feedback': self._generate_progress_feedback(avg_score, improvement)
        }
    
    def _generate_progress_feedback(self, avg_score: float, improvement: float) -> str:
        """Generate overall progress feedback"""
        
        if improvement > 0.1:
            return f"Fantastic progress! Your pronunciation has improved significantly! (Average: {avg_score:.1%})"
        elif improvement > 0.05:
            return f"Good improvement! Keep up the great work! (Average: {avg_score:.1%})"
        elif improvement >= 0:
            return f"Steady progress! You're maintaining good pronunciation! (Average: {avg_score:.1%})"
        else:
            return f"Don't worry! Learning has ups and downs. Let's focus on practice! (Average: {avg_score:.1%})"