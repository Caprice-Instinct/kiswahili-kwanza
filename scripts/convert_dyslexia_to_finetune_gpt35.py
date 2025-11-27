import json

# Load your dyslexia dataset
with open("nextjs-app/data/dyslexia_dataset_1000.json", encoding="utf-8") as f:
    data = json.load(f)

# Prepare messages format for OpenAI GPT-3.5 Turbo fine-tuning
# Each example must have a 'messages' key with a list of dicts (role/content)
fine_tune_data = []
for entry in data:
    word = entry["word"]
    errors = entry.get("errors", [])
    if not errors:
        continue
    misspellings = [e["misspelling"] for e in errors if e.get("misspelling")]
    if not misspellings:
        continue
    messages = [
        {"role": "system", "content": "You are a Kiswahili spelling assistant."},
        {"role": "user", "content": f"Word: {word}\nGenerate common dyslexic misspellings:"},
        {"role": "assistant", "content": ", ".join(misspellings)}
    ]
    fine_tune_data.append({"messages": messages})

# Save as JSONL for OpenAI fine-tuning
with open("nextjs-app/data/dyslexia_finetune_gpt35.jsonl", "w", encoding="utf-8") as f:
    for item in fine_tune_data:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")

print(f"Wrote {len(fine_tune_data)} prompt/completion pairs to dyslexia_finetune_gpt35.jsonl")
