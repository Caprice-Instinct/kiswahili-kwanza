import json

# Input and output file paths
INPUT_FILE = "nextjs-app/data/dyslexia_dataset_1000.json"
OUTPUT_FILE = "nextjs-app/data/dyslexia_finetune_prompt_completion.jsonl"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
    for item in data:
        word = item["word"]
        errors = item.get("errors", [])
        misspellings = ", ".join([err["misspelling"] for err in errors])
        if not misspellings:
            continue
        prompt = f"Andika makosa ya kawaida ya kisarufi au tahajia kwa neno: {word}"
        completion = misspellings
        out.write(json.dumps({"prompt": prompt, "completion": completion}) + "\n")

print(f"Done! Wrote prompt/completion pairs to {OUTPUT_FILE}")
