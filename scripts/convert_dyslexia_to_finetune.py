import json

# Load your dyslexia dataset
with open("nextjs-app/data/dyslexia_dataset_1000.json", encoding="utf-8") as f:
    data = json.load(f)

# Prepare prompt/completion pairs for OpenAI fine-tuning
# Example: prompt = "Word: moja\nGenerate common dyslexic misspellings:"
#           completion = "moje, ja"

fine_tune_data = []
for entry in data:
    word = entry["word"]
    errors = entry.get("errors", [])
    if not errors:
        continue
    misspellings = [e["misspelling"] for e in errors if e.get("misspelling")]
    if not misspellings:
        continue
    prompt = f"Word: {word}\nGenerate common dyslexic misspellings:"
    completion = ", ".join(misspellings)
    fine_tune_data.append({"prompt": prompt, "completion": " " + completion})

# Save as JSONL for OpenAI fine-tuning
with open("nextjs-app/data/dyslexia_finetune.jsonl", "w", encoding="utf-8") as f:
    for item in fine_tune_data:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")

print(f"Wrote {len(fine_tune_data)} prompt/completion pairs to dyslexia_finetune.jsonl")
