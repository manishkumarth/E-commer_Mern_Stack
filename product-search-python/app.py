import gradio as gr
from PIL import Image
import torch
import clip
import requests
from io import BytesIO

# load model once
model, preprocess = clip.load("ViT-B/32", device="cpu")

def get_embedding(image_file, image_url):
    try:
        # FILE case
        if image_file is not None:
            image = Image.open(image_file).convert("RGB")

        # URL case
        elif image_url:
            response = requests.get(image_url)
            image = Image.open(BytesIO(response.content)).convert("RGB")

        else:
            return {"error": "Provide image file or URL"}

        image = preprocess(image).unsqueeze(0)

        with torch.no_grad():
            embedding = model.encode_image(image)

        return {"embedding": embedding.tolist()}

    except Exception as e:
        return {"error": str(e)}

interface = gr.Interface(
    fn=get_embedding,
    inputs=[
        gr.Image(type="filepath", label="Upload Image"),
        gr.Textbox(label="OR Paste Image URL")
    ],
    outputs="json",
    title="CLIP Image Embedding API"
)

interface.launch()