from transformers import AutoTokenizer, AutoModel
import torch

# Choose your model: SwahiliBERT or AfriBERTa
model_name = "Davlan/bert-base-multilingual-cased-swahili-ner"  # SwahiliBERT
# model_name = "castorini/afriberta_large"  # AfriBERTa

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)

text = "Ninapenda kusoma Kiswahili."

inputs = tokenizer(text, return_tensors="pt")
with torch.no_grad():
    outputs = model(**inputs)

print("Model output shape:", outputs.last_hidden_state.shape)
