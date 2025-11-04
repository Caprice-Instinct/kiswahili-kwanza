"""
Data Processing Module for Kiswahili Learning Dataset
Handles preprocessing of text, audio, and user interaction data
"""

import pandas as pd
import numpy as np
import re
import json
from typing import Dict, List, Tuple, Optional
from pathlib import Path
import librosa
import soundfile as sf
from sklearn.preprocessing import StandardScaler, LabelEncoder
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords


class KiswahiliDataProcessor:
    """
    Processes various types of data for the Kiswahili learning system:
    - Text corpus for vocabulary and lessons
    - Audio data for pronunciation training
    - User interaction data for personalization
    """
    
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        
        # Kiswahili-specific processing rules
        self.kiswahili_alphabet = 'abcdefghijklmnopqrstuvwxyz'
        self.kiswahili_vowels = 'aeiou'
        self.kiswahili_consonants = 'bcdfghjklmnpqrstvwxyz'
        
        # Common Kiswahili prefixes and suffixes for morphological analysis
        self.prefixes = ['a-', 'wa-', 'u-', 'i-', 'ki-', 'vi-', 'li-', 'ya-', 'zi-', 'ku-']
        self.suffixes = ['-a', '-e', '-i', '-o', '-u', '-ni', '-ko', '-po']
        
        # Age-appropriate vocabulary levels
        self.vocabulary_levels = {
            1: "basic",      # 6-7 years
            2: "elementary", # 7-8 years  
            3: "intermediate", # 8-9 years
        }
        
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
    
    def process_vocabulary_dataset(self, 
                                 input_file: str, 
                                 output_file: str,
                                 target_age_group: int = 1) -> Dict:
        """
        Process raw Kiswahili vocabulary data into structured learning content
        
        Args:
            input_file: Path to raw vocabulary file (CSV/JSON)
            output_file: Path to save processed data
            target_age_group: Age group (1=6-7, 2=7-8, 3=8-9 years)
        """
        
        # Load raw data
        if input_file.endswith('.csv'):
            raw_data = pd.read_csv(input_file)
        elif input_file.endswith('.json'):
            with open(input_file, 'r', encoding='utf-8') as f:
                raw_data = pd.DataFrame(json.load(f))
        else:
            raise ValueError("Unsupported file format. Use CSV or JSON.")
        
        processed_data = []
        
        for _, row in raw_data.iterrows():
            word_data = self._process_single_word(row, target_age_group)
            if word_data:
                processed_data.append(word_data)
        
        # Save processed data
        processed_df = pd.DataFrame(processed_data)
        processed_df.to_csv(output_file, index=False, encoding='utf-8')
        
        return {
            'total_words': len(processed_data),
            'categories': processed_df['category'].value_counts().to_dict(),
            'difficulty_levels': processed_df['difficulty'].value_counts().to_dict(),
            'output_file': output_file
        }
    
    def _process_single_word(self, word_row: pd.Series, target_age_group: int) -> Optional[Dict]:
        """Process a single vocabulary word"""
        
        try:
            kiswahili_word = str(word_row.get('kiswahili', '')).strip().lower()
            english_word = str(word_row.get('english', '')).strip().lower()
            category = str(word_row.get('category', 'general')).strip().lower()
            
            if not kiswahili_word or not english_word:
                return None
            
            # Clean the words
            kiswahili_clean = self._clean_kiswahili_text(kiswahili_word)
            english_clean = self._clean_english_text(english_word)
            
            # Determine difficulty based on word characteristics
            difficulty = self._calculate_word_difficulty(kiswahili_clean, target_age_group)
            
            # Extract phonetic features
            phonetic_features = self._extract_phonetic_features(kiswahili_clean)
            
            # Generate learning hints for dyslexic learners
            learning_hints = self._generate_learning_hints(kiswahili_clean, english_clean)
            
            return {
                'kiswahili': kiswahili_clean,
                'english': english_clean,
                'category': category,
                'difficulty': difficulty,
                'syllable_count': len(self._syllabify(kiswahili_clean)),
                'phonetic_complexity': phonetic_features['complexity'],
                'has_difficult_sounds': phonetic_features['difficult_sounds'],
                'learning_hints': learning_hints,
                'age_appropriate': target_age_group,
                'word_length': len(kiswahili_clean),
                'vowel_ratio': phonetic_features['vowel_ratio']
            }
            
        except Exception as e:
            print(f"Error processing word: {e}")
            return None
    
    def _clean_kiswahili_text(self, text: str) -> str:
        """Clean Kiswahili text"""
        # Remove extra whitespace and special characters
        text = re.sub(r'[^\w\s-]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Ensure only valid Kiswahili characters
        text = ''.join(c for c in text if c in self.kiswahili_alphabet + ' -')
        
        return text
    
    def _clean_english_text(self, text: str) -> str:
        """Clean English text"""
        # Remove extra whitespace and special characters
        text = re.sub(r'[^\w\s-]', '', text)
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def _calculate_word_difficulty(self, word: str, target_age_group: int) -> int:
        """Calculate difficulty level for a word"""
        
        base_difficulty = 1
        
        # Length-based difficulty
        if len(word) > 8:
            base_difficulty += 2
        elif len(word) > 5:
            base_difficulty += 1
        
        # Syllable-based difficulty
        syllables = self._syllabify(word)
        if len(syllables) > 3:
            base_difficulty += 1
        
        # Complex sound combinations
        if any(combo in word for combo in ['ng', 'ny', 'ch', 'th']):
            base_difficulty += 1
        
        # Adjust for target age group
        if target_age_group == 1:  # 6-7 years
            base_difficulty = min(base_difficulty, 2)
        elif target_age_group == 2:  # 7-8 years
            base_difficulty = min(base_difficulty, 3)
        
        return max(1, min(5, base_difficulty))
    
    def _syllabify(self, word: str) -> List[str]:
        """Simple syllabification for Kiswahili words"""
        # Kiswahili syllables typically follow CV (consonant-vowel) patterns
        syllables = []
        current_syllable = ""
        
        for i, char in enumerate(word):
            current_syllable += char
            
            # If current char is vowel and next is consonant (or end), end syllable
            if char in self.kiswahili_vowels:
                if i == len(word) - 1 or word[i + 1] in self.kiswahili_consonants:
                    syllables.append(current_syllable)
                    current_syllable = ""
        
        # Add any remaining characters
        if current_syllable:
            syllables.append(current_syllable)
        
        return syllables if syllables else [word]
    
    def _extract_phonetic_features(self, word: str) -> Dict:
        """Extract phonetic features relevant for dyslexic learners"""
        
        vowel_count = sum(1 for c in word if c in self.kiswahili_vowels)
        consonant_count = sum(1 for c in word if c in self.kiswahili_consonants)
        
        # Identify potentially difficult sounds for dyslexic learners
        difficult_sounds = []
        if 'b' in word or 'd' in word:
            difficult_sounds.append('b_d_confusion')
        if 'p' in word or 'q' in word:
            difficult_sounds.append('p_q_confusion')
        if any(combo in word for combo in ['ng', 'ny', 'ch']):
            difficult_sounds.append('complex_consonants')
        
        # Calculate complexity score
        complexity = len(word) * 0.1 + len(self._syllabify(word)) * 0.3
        if difficult_sounds:
            complexity += len(difficult_sounds) * 0.2
        
        return {
            'vowel_ratio': vowel_count / len(word) if word else 0,
            'consonant_ratio': consonant_count / len(word) if word else 0,
            'difficult_sounds': difficult_sounds,
            'complexity': min(1.0, complexity)
        }
    
    def _generate_learning_hints(self, kiswahili_word: str, english_word: str) -> List[str]:
        """Generate learning hints for dyslexic learners"""
        
        hints = []
        
        # Syllable breakdown hint
        syllables = self._syllabify(kiswahili_word)
        if len(syllables) > 1:
            hints.append(f"Break it down: {'-'.join(syllables)}")
        
        # Memory association hint
        if len(english_word) > 0:
            hints.append(f"Remember: {kiswahili_word} means {english_word}")
        
        # Visual hint for difficult letters
        if 'b' in kiswahili_word or 'd' in kiswahili_word:
            hints.append("Watch out for b and d - use finger tracing!")
        
        # Phonetic hint
        if any(combo in kiswahili_word for combo in ['ng', 'ny', 'ch']):
            hints.append("Special sound combination - listen carefully!")
        
        return hints
    
    def process_audio_data(self, 
                          audio_dir: str, 
                          output_file: str,
                          target_sample_rate: int = 22050) -> Dict:
        """
        Process audio files for pronunciation training
        
        Args:
            audio_dir: Directory containing audio files
            output_file: Path to save processed audio features
            target_sample_rate: Target sample rate for audio
        """
        
        audio_features = []
        audio_path = Path(audio_dir)
        
        for audio_file in audio_path.glob("*.wav"):
            try:
                features = self._extract_audio_features(str(audio_file), target_sample_rate)
                if features:
                    audio_features.append(features)
            except Exception as e:
                print(f"Error processing {audio_file}: {e}")
        
        # Save features
        features_df = pd.DataFrame(audio_features)
        features_df.to_csv(output_file, index=False)
        
        return {
            'total_files': len(audio_features),
            'average_duration': np.mean([f['duration'] for f in audio_features]),
            'sample_rate': target_sample_rate,
            'output_file': output_file
        }
    
    def _extract_audio_features(self, audio_file: str, target_sr: int) -> Optional[Dict]:
        """Extract features from a single audio file"""
        
        try:
            # Load audio
            audio_data, sr = librosa.load(audio_file, sr=target_sr)
            
            # Basic features
            duration = len(audio_data) / sr
            
            # Spectral features
            spectral_centroids = librosa.feature.spectral_centroid(y=audio_data, sr=sr)[0]
            spectral_rolloff = librosa.feature.spectral_rolloff(y=audio_data, sr=sr)[0]
            
            # MFCC features (important for speech)
            mfccs = librosa.feature.mfcc(y=audio_data, sr=sr, n_mfcc=13)
            
            # Zero crossing rate (useful for speech/silence detection)
            zcr = librosa.feature.zero_crossing_rate(audio_data)[0]
            
            # Pitch features
            pitches, magnitudes = librosa.piptrack(y=audio_data, sr=sr)
            pitch_values = pitches[pitches > 0]
            
            return {
                'filename': Path(audio_file).name,
                'duration': duration,
                'spectral_centroid_mean': np.mean(spectral_centroids),
                'spectral_centroid_std': np.std(spectral_centroids),
                'spectral_rolloff_mean': np.mean(spectral_rolloff),
                'mfcc_mean': np.mean(mfccs, axis=1).tolist(),
                'mfcc_std': np.std(mfccs, axis=1).tolist(),
                'zcr_mean': np.mean(zcr),
                'pitch_mean': np.mean(pitch_values) if len(pitch_values) > 0 else 0,
                'pitch_std': np.std(pitch_values) if len(pitch_values) > 0 else 0,
                'energy': np.sum(audio_data ** 2)
            }
            
        except Exception as e:
            print(f"Error extracting features from {audio_file}: {e}")
            return None
    
    def process_user_interaction_data(self, 
                                    interaction_logs: List[Dict],
                                    output_file: str) -> Dict:
        """
        Process user interaction data for personalization
        
        Args:
            interaction_logs: List of user interaction dictionaries
            output_file: Path to save processed data
        """
        
        processed_interactions = []
        
        for log in interaction_logs:
            processed_log = self._process_interaction_log(log)
            if processed_log:
                processed_interactions.append(processed_log)
        
        # Create DataFrame and save
        interactions_df = pd.DataFrame(processed_interactions)
        interactions_df.to_csv(output_file, index=False)
        
        # Generate summary statistics
        summary = {
            'total_interactions': len(processed_interactions),
            'unique_users': len(interactions_df['user_id'].unique()) if not interactions_df.empty else 0,
            'average_accuracy': interactions_df['accuracy'].mean() if not interactions_df.empty else 0,
            'common_error_types': interactions_df['error_type'].value_counts().to_dict() if not interactions_df.empty else {},
            'output_file': output_file
        }
        
        return summary
    
    def _process_interaction_log(self, log: Dict) -> Optional[Dict]:
        """Process a single user interaction log"""
        
        try:
            return {
                'user_id': log.get('user_id', ''),
                'session_id': log.get('session_id', ''),
                'timestamp': log.get('timestamp', ''),
                'activity_type': log.get('activity_type', ''),
                'topic_id': log.get('topic_id', 0),
                'accuracy': float(log.get('accuracy', 0.0)),
                'response_time': float(log.get('response_time', 0.0)),
                'error_type': log.get('error_type', 'none'),
                'help_requested': bool(log.get('help_requested', False)),
                'retry_count': int(log.get('retry_count', 0)),
                'engagement_score': float(log.get('engagement_score', 0.0))
            }
        except Exception as e:
            print(f"Error processing interaction log: {e}")
            return None
    
    def create_training_dataset(self, 
                              vocab_file: str,
                              audio_features_file: str,
                              interaction_file: str,
                              output_file: str) -> Dict:
        """
        Combine all processed data into a training dataset
        """
        
        # Load processed data
        vocab_df = pd.read_csv(vocab_file)
        audio_df = pd.read_csv(audio_features_file)
        interaction_df = pd.read_csv(interaction_file)
        
        # Create training examples
        training_data = []
        
        # For each vocabulary word, create training examples
        for _, vocab_row in vocab_df.iterrows():
            word = vocab_row['kiswahili']
            
            # Find related audio features
            audio_features = audio_df[audio_df['filename'].str.contains(word, na=False)]
            
            # Find related user interactions
            user_interactions = interaction_df[interaction_df['topic_id'] == vocab_row.get('topic_id', 0)]
            
            # Create training example
            training_example = {
                'word': word,
                'difficulty': vocab_row['difficulty'],
                'category': vocab_row['category'],
                'phonetic_complexity': vocab_row['phonetic_complexity'],
                'syllable_count': vocab_row['syllable_count'],
                'word_length': vocab_row['word_length'],
                'has_audio': len(audio_features) > 0,
                'user_success_rate': user_interactions['accuracy'].mean() if not user_interactions.empty else 0.5,
                'avg_response_time': user_interactions['response_time'].mean() if not user_interactions.empty else 0.0,
                'common_errors': user_interactions['error_type'].mode().iloc[0] if not user_interactions.empty else 'none'
            }
            
            training_data.append(training_example)
        
        # Save training dataset
        training_df = pd.DataFrame(training_data)
        training_df.to_csv(output_file, index=False)
        
        return {
            'training_examples': len(training_data),
            'features': list(training_df.columns),
            'output_file': output_file
        }
    
    def validate_dataset(self, dataset_file: str) -> Dict:
        """Validate the processed dataset for quality issues"""
        
        df = pd.read_csv(dataset_file)
        
        validation_results = {
            'total_records': len(df),
            'missing_values': df.isnull().sum().to_dict(),
            'duplicate_records': df.duplicated().sum(),
            'data_types': df.dtypes.to_dict(),
            'quality_issues': []
        }
        
        # Check for quality issues
        if df.isnull().sum().sum() > 0:
            validation_results['quality_issues'].append("Missing values detected")
        
        if df.duplicated().sum() > 0:
            validation_results['quality_issues'].append("Duplicate records found")
        
        # Check for reasonable value ranges
        if 'difficulty' in df.columns:
            if df['difficulty'].min() < 1 or df['difficulty'].max() > 5:
                validation_results['quality_issues'].append("Difficulty values out of range")
        
        if 'accuracy' in df.columns:
            if df['accuracy'].min() < 0 or df['accuracy'].max() > 1:
                validation_results['quality_issues'].append("Accuracy values out of range")
        
        return validation_results