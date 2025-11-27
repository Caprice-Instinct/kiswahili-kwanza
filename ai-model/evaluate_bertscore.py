import json
from pathlib import Path
import requests
from bert_score import score

# Load test set
TEST_SET_PATH = Path(__file__).parent / "data" / "quiz_test_set.json"
with open(TEST_SET_PATH, encoding="utf-8") as f:
    test_cases = json.load(f)

API_URL = "http://localhost:4000/api/generate-quiz"

references = []
candidates = []

for case in test_cases:
    request = {
        "category": case["category"],
        "topic": case["topic"],
        "difficulty": case["difficulty"],
        "questionCount": case["questionCount"],
        "questionTypes": case["questionTypes"],
        "vocabulary": case.get("vocabulary", []),
    }
    # Generate prediction via API
    response = requests.post(API_URL, json=request)
    prediction = response.json()
    if "questions" not in prediction:
        print("No questions in response, skipping BERTScore for this case.\n")
        continue
    reference_questions = [q["question"] for q in case["referenceQuiz"]["questions"]]
    candidate_questions = [q["question"] for q in prediction["questions"]]
    # For simplicity, compare first reference and first candidate
    if reference_questions and candidate_questions:
        references.append(reference_questions[0])
        candidates.append(candidate_questions[0])

if references and candidates:
    P, R, F1 = score(candidates, references, lang="en", verbose=True)
    for ref, cand, f1 in zip(references, candidates, F1):
        print(f"Reference: {ref}\nCandidate: {cand}\nBERTScore F1: {f1:.3f}\n")
    print(f"\nAverage BERTScore F1: {F1.mean():.3f}")
else:
    print("No valid question pairs for BERTScore evaluation.")
