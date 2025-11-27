import json

# Input and output file paths
INPUT_FILE = "nextjs-app/data/dyslexia_test_dataset_200.json"
OUTPUT_FILE = "nextjs-app/data/dyslexia_test_prompt_completion.jsonl"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
    for item in data:
        word = item["word"]
        errors = item.get("errors", [])
        misspellings = ", ".join([err["misspelling"] for err in errors])
        if not misspellings:
            continue
        prompt = word  # Match your training data style
        completion = misspellings
        out.write(json.dumps({"prompt": prompt, "completion": completion}) + "\n")

print(f"Done! Wrote prompt/completion pairs to {OUTPUT_FILE}")
