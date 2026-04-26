from flask import Flask, request, jsonify
from PIL import Image
import torch
import clip
import requests
from io import BytesIO

app = Flask(__name__)

model, preprocess = clip.load("ViT-B/32")
@app.route("/")
def home():
    return jsonify({"message":"success"})
    
@app.route("/get-embedding", methods=["POST"])
def get_embedding():
    try:
        print("FILES:", request.files)
        print("IS JSON:", request.is_json)

        #  FILE case
        if "image" in request.files:
            file = request.files["image"]
            image = Image.open(file).convert("RGB")

        # URL case
        elif request.is_json:
            data = request.get_json()
            if "image_url" not in data:
                return jsonify({"error": "image_url missing"}), 400

            image_url = data["image_url"]
            response = requests.get(image_url)
            image = Image.open(BytesIO(response.content)).convert("RGB")

        else:
            return jsonify({"error": "Invalid input"}), 400

        image = preprocess(image).unsqueeze(0)

        with torch.no_grad():
            embedding = model.encode_image(image)

        return jsonify({"embedding": embedding.tolist()})

    except Exception as e:
        print("PYTHON ERROR:", e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)