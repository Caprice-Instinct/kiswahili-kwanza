"""
Model Training Module for Kiswahili Learning AI System
Trains personalized learning recommendation models
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Tuple, Optional
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import joblib
import json
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns


class KiswahiliModelTrainer:
    """
    Trains machine learning models for personalized Kiswahili learning
    Focuses on recommendation systems for children with dyslexia
    """
    
    def __init__(self):
        self.models = {
            'random_forest': RandomForestClassifier(random_state=42),
            'gradient_boosting': GradientBoostingClassifier(random_state=42),
            'logistic_regression': LogisticRegression(random_state=42, max_iter=1000),
            'svm': SVC(random_state=42, probability=True)
        }
        
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.best_model = None
        self.best_model_name = None
        self.feature_names = []
        
        # Hyperparameter grids for tuning
        self.param_grids = {
            'random_forest': {
                'n_estimators': [50, 100, 200],
                'max_depth': [5, 10, 15, None],
                'min_samples_split': [2, 5, 10],
                'min_samples_leaf': [1, 2, 4]
            },
            'gradient_boosting': {
                'n_estimators': [50, 100, 200],
                'learning_rate': [0.01, 0.1, 0.2],
                'max_depth': [3, 5, 7]
            },
            'logistic_regression': {
                'C': [0.1, 1.0, 10.0],
                'penalty': ['l1', 'l2'],
                'solver': ['liblinear', 'saga']
            },
            'svm': {
                'C': [0.1, 1.0, 10.0],
                'kernel': ['rbf', 'linear'],
                'gamma': ['scale', 'auto']
            }
        }
    
    def prepare_training_data(self, dataset_file: str) -> Tuple[np.ndarray, np.ndarray]:
        """
        Prepare training data from processed dataset
        
        Args:
            dataset_file: Path to processed training dataset
            
        Returns:
            Tuple of (features, labels)
        """
        
        # Load dataset
        df = pd.read_csv(dataset_file)
        
        # Define features for recommendation model
        feature_columns = [
            'difficulty',
            'phonetic_complexity', 
            'syllable_count',
            'word_length',
            'user_success_rate',
            'avg_response_time'
        ]
        
        # Handle missing values
        df = df.fillna({
            'user_success_rate': 0.5,
            'avg_response_time': 0.0,
            'phonetic_complexity': 0.5
        })
        
        # Extract features
        X = df[feature_columns].values
        self.feature_names = feature_columns
        
        # Create labels (next recommended difficulty level)
        # This is a simplified approach - in practice, you'd have more sophisticated labeling
        y = self._create_recommendation_labels(df)
        
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Encode labels
        y_encoded = self.label_encoder.fit_transform(y)
        
        return X_scaled, y_encoded
    
    def _create_recommendation_labels(self, df: pd.DataFrame) -> np.ndarray:
        """
        Create recommendation labels based on user performance patterns
        
        This is a simplified labeling strategy. In production, you would use
        more sophisticated methods based on learning outcomes.
        """
        
        labels = []
        
        for _, row in df.iterrows():
            success_rate = row['user_success_rate']
            current_difficulty = row['difficulty']
            
            # Recommendation logic
            if success_rate > 0.8:
                # High success rate - recommend harder content
                recommended_difficulty = min(5, current_difficulty + 1)
            elif success_rate > 0.6:
                # Moderate success - stay at current level
                recommended_difficulty = current_difficulty
            else:
                # Low success - recommend easier content
                recommended_difficulty = max(1, current_difficulty - 1)
            
            labels.append(f"difficulty_{recommended_difficulty}")
        
        return np.array(labels)
    
    def train_models(self, 
                    X: np.ndarray, 
                    y: np.ndarray,
                    test_size: float = 0.2,
                    cv_folds: int = 5) -> Dict:
        """
        Train multiple models and select the best one
        
        Args:
            X: Feature matrix
            y: Target labels
            test_size: Proportion of data for testing
            cv_folds: Number of cross-validation folds
            
        Returns:
            Dictionary with training results
        """
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        results = {}
        
        print("Training models...")
        
        for model_name, model in self.models.items():
            print(f"\nTraining {model_name}...")
            
            # Train model
            model.fit(X_train, y_train)
            
            # Make predictions
            y_pred = model.predict(X_test)
            y_pred_proba = model.predict_proba(X_test) if hasattr(model, 'predict_proba') else None
            
            # Calculate metrics
            metrics = self._calculate_metrics(y_test, y_pred)
            
            # Cross-validation
            cv_scores = cross_val_score(model, X_train, y_train, cv=cv_folds)
            
            results[model_name] = {
                'model': model,
                'test_metrics': metrics,
                'cv_mean': cv_scores.mean(),
                'cv_std': cv_scores.std(),
                'predictions': y_pred,
                'probabilities': y_pred_proba
            }
            
            print(f"Test Accuracy: {metrics['accuracy']:.3f}")
            print(f"CV Score: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")
        
        # Select best model
        best_model_name = max(results.keys(), key=lambda k: results[k]['cv_mean'])
        self.best_model = results[best_model_name]['model']
        self.best_model_name = best_model_name
        
        print(f"\nBest model: {best_model_name}")
        
        return results
    
    def hyperparameter_tuning(self, 
                            X: np.ndarray, 
                            y: np.ndarray,
                            model_name: str = None) -> Dict:
        """
        Perform hyperparameter tuning for specified model or best model
        
        Args:
            X: Feature matrix
            y: Target labels
            model_name: Name of model to tune (if None, uses best model)
            
        Returns:
            Dictionary with tuning results
        """
        
        if model_name is None:
            model_name = self.best_model_name
        
        if model_name not in self.models:
            raise ValueError(f"Model {model_name} not found")
        
        print(f"Tuning hyperparameters for {model_name}...")
        
        # Get model and parameter grid
        model = self.models[model_name]
        param_grid = self.param_grids[model_name]
        
        # Perform grid search
        grid_search = GridSearchCV(
            model, 
            param_grid, 
            cv=5, 
            scoring='accuracy',
            n_jobs=-1,
            verbose=1
        )
        
        grid_search.fit(X, y)
        
        # Update best model
        self.best_model = grid_search.best_estimator_
        
        results = {
            'best_params': grid_search.best_params_,
            'best_score': grid_search.best_score_,
            'best_model': grid_search.best_estimator_,
            'cv_results': grid_search.cv_results_
        }
        
        print(f"Best parameters: {grid_search.best_params_}")
        print(f"Best CV score: {grid_search.best_score_:.3f}")
        
        return results
    
    def _calculate_metrics(self, y_true: np.ndarray, y_pred: np.ndarray) -> Dict:
        """Calculate evaluation metrics"""
        
        return {
            'accuracy': accuracy_score(y_true, y_pred),
            'precision': precision_score(y_true, y_pred, average='weighted'),
            'recall': recall_score(y_true, y_pred, average='weighted'),
            'f1': f1_score(y_true, y_pred, average='weighted')
        }
    
    def evaluate_model(self, 
                      X_test: np.ndarray, 
                      y_test: np.ndarray,
                      save_plots: bool = True) -> Dict:
        """
        Comprehensive model evaluation
        
        Args:
            X_test: Test features
            y_test: Test labels
            save_plots: Whether to save evaluation plots
            
        Returns:
            Dictionary with evaluation results
        """
        
        if self.best_model is None:
            raise ValueError("No trained model found. Train a model first.")
        
        # Make predictions
        y_pred = self.best_model.predict(X_test)
        y_pred_proba = self.best_model.predict_proba(X_test) if hasattr(self.best_model, 'predict_proba') else None
        
        # Calculate metrics
        metrics = self._calculate_metrics(y_test, y_pred)
        
        # Confusion matrix
        cm = confusion_matrix(y_test, y_pred)
        
        # Feature importance (if available)
        feature_importance = None
        if hasattr(self.best_model, 'feature_importances_'):
            feature_importance = dict(zip(self.feature_names, self.best_model.feature_importances_))
        
        # Class-wise performance
        classes = self.label_encoder.classes_
        class_metrics = {}
        
        for i, class_name in enumerate(classes):
            class_mask = (y_test == i)
            if np.any(class_mask):
                class_pred = y_pred[class_mask]
                class_metrics[class_name] = {
                    'precision': precision_score(y_test[class_mask], class_pred, average='binary', pos_label=i),
                    'recall': recall_score(y_test[class_mask], class_pred, average='binary', pos_label=i),
                    'f1': f1_score(y_test[class_mask], class_pred, average='binary', pos_label=i)
                }
        
        results = {
            'overall_metrics': metrics,
            'confusion_matrix': cm.tolist(),
            'feature_importance': feature_importance,
            'class_metrics': class_metrics,
            'model_name': self.best_model_name
        }
        
        # Generate plots
        if save_plots:
            self._generate_evaluation_plots(y_test, y_pred, cm, feature_importance)
        
        return results
    
    def _generate_evaluation_plots(self, 
                                 y_test: np.ndarray, 
                                 y_pred: np.ndarray,
                                 cm: np.ndarray,
                                 feature_importance: Dict = None):
        """Generate evaluation plots"""
        
        # Confusion Matrix
        plt.figure(figsize=(10, 8))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
        plt.title('Confusion Matrix')
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        plt.tight_layout()
        plt.savefig('confusion_matrix.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # Feature Importance
        if feature_importance:
            plt.figure(figsize=(10, 6))
            features = list(feature_importance.keys())
            importances = list(feature_importance.values())
            
            plt.barh(features, importances)
            plt.title('Feature Importance')
            plt.xlabel('Importance')
            plt.tight_layout()
            plt.savefig('feature_importance.png', dpi=300, bbox_inches='tight')
            plt.close()
    
    def save_model(self, 
                  model_path: str,
                  metadata_path: str = None) -> bool:
        """
        Save trained model and associated metadata
        
        Args:
            model_path: Path to save the model
            metadata_path: Path to save metadata (optional)
            
        Returns:
            True if successful, False otherwise
        """
        
        if self.best_model is None:
            print("No trained model to save")
            return False
        
        try:
            # Save model components
            model_data = {
                'model': self.best_model,
                'scaler': self.scaler,
                'label_encoder': self.label_encoder,
                'feature_names': self.feature_names,
                'model_name': self.best_model_name
            }
            
            joblib.dump(model_data, model_path)
            
            # Save metadata
            if metadata_path:
                metadata = {
                    'model_name': self.best_model_name,
                    'feature_names': self.feature_names,
                    'classes': self.label_encoder.classes_.tolist(),
                    'training_date': datetime.now().isoformat(),
                    'model_version': '1.0'
                }
                
                with open(metadata_path, 'w') as f:
                    json.dump(metadata, f, indent=2)
            
            print(f"Model saved to {model_path}")
            return True
            
        except Exception as e:
            print(f"Error saving model: {e}")
            return False
    
    def load_model(self, model_path: str) -> bool:
        """
        Load a previously trained model
        
        Args:
            model_path: Path to the saved model
            
        Returns:
            True if successful, False otherwise
        """
        
        try:
            model_data = joblib.load(model_path)
            
            self.best_model = model_data['model']
            self.scaler = model_data['scaler']
            self.label_encoder = model_data['label_encoder']
            self.feature_names = model_data['feature_names']
            self.best_model_name = model_data['model_name']
            
            print(f"Model loaded from {model_path}")
            return True
            
        except Exception as e:
            print(f"Error loading model: {e}")
            return False
    
    def predict_recommendation(self, user_features: Dict) -> Dict:
        """
        Make a recommendation prediction for a user
        
        Args:
            user_features: Dictionary with user feature values
            
        Returns:
            Dictionary with prediction and confidence
        """
        
        if self.best_model is None:
            raise ValueError("No trained model available")
        
        # Prepare features
        feature_vector = []
        for feature_name in self.feature_names:
            feature_vector.append(user_features.get(feature_name, 0.0))
        
        # Scale features
        X = self.scaler.transform([feature_vector])
        
        # Make prediction
        prediction = self.best_model.predict(X)[0]
        
        # Get prediction probabilities if available
        confidence = 0.5
        if hasattr(self.best_model, 'predict_proba'):
            probabilities = self.best_model.predict_proba(X)[0]
            confidence = np.max(probabilities)
        
        # Decode prediction
        recommendation = self.label_encoder.inverse_transform([prediction])[0]
        
        return {
            'recommendation': recommendation,
            'confidence': float(confidence),
            'model_used': self.best_model_name
        }
    
    def generate_training_report(self, results: Dict, output_file: str = None) -> str:
        """
        Generate a comprehensive training report
        
        Args:
            results: Training results from train_models()
            output_file: Optional file to save the report
            
        Returns:
            Report as string
        """
        
        report_lines = [
            "Kiswahili Learning AI - Model Training Report",
            "=" * 50,
            f"Training Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            f"Best Model: {self.best_model_name}",
            "",
            "Model Performance Summary:",
            "-" * 30
        ]
        
        for model_name, result in results.items():
            metrics = result['test_metrics']
            report_lines.extend([
                f"\n{model_name.upper()}:",
                f"  Test Accuracy: {metrics['accuracy']:.3f}",
                f"  Test Precision: {metrics['precision']:.3f}",
                f"  Test Recall: {metrics['recall']:.3f}",
                f"  Test F1-Score: {metrics['f1']:.3f}",
                f"  CV Mean: {result['cv_mean']:.3f}",
                f"  CV Std: {result['cv_std']:.3f}"
            ])
        
        report_lines.extend([
            "",
            "Feature Information:",
            "-" * 20,
            f"Features used: {', '.join(self.feature_names)}",
            f"Number of classes: {len(self.label_encoder.classes_)}",
            f"Classes: {', '.join(self.label_encoder.classes_)}"
        ])
        
        report = "\n".join(report_lines)
        
        if output_file:
            with open(output_file, 'w') as f:
                f.write(report)
            print(f"Report saved to {output_file}")
        
        return report