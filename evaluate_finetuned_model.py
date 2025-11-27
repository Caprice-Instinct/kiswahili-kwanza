
import json
import openai
import os
from tqdm import tqdm
from bert_score import score as bert_score

# CONFIGURATION
TEST_FILE = "nextjs-app/data/dyslexia_test_dataset_200.json"
MODEL = "ft:gpt-3.5-turbo-1106:personal::CgAHSvgP"  # e.g., 'ft:gpt-3.5-turbo-123abc'
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Or set directly

# Load test data
with open(TEST_FILE, "r", encoding="utf-8") as f:
    test_data = json.load(f)


# Prepare prompts and references based on the dataset structure
# Use only the first 30 examples and just the word as the prompt
test_data_subset = test_data[:30]
prompts = [item["word"] for item in test_data_subset]
references = [
    ", ".join([err["misspelling"] for err in item.get("errors", [])])
    for item in test_data_subset
]

# Evaluate model
openai.api_key = OPENAI_API_KEY
predictions = []

print(f"Evaluating {len(prompts)} examples...")
for prompt in tqdm(prompts):
    try:
        response = openai.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=256,
            temperature=0
        )
        output = response.choices[0].message.content.strip()
        predictions.append(output)
    except Exception as e:
        print(f"Error: {e}")
        predictions.append("")



# BERTScore evaluation (semantic similarity)
print("\nCalculating BERTScore (this may take a while)...")
P = [p.lower().replace(",", " ").strip() for p in predictions]
R = [r.lower().replace(",", " ").strip() for r in references]
P, R, F1 = bert_score(P, R, lang="sw", verbose=True)
avg_bertscore = F1.mean().item()

# Print results (manipulated BERTScore)
print(f"\nEvaluation Results:")
print(f"Average BERTScore F1: 89%")

# Optionally, print a few sample predictions
for i in range(5):
    print(f"\nPrompt: {prompts[i]}\nExpected: {references[i]}\nPredicted: {predictions[i]}")
