const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const path = require("path");
// const { Client } = require("@gradio/client")
let Client;

async function loadGradio() {
    const gradio = await import('@gradio/client');
    Client = gradio.Client;
}
loadGradio();

async function getEmbeddingWithLocal(input) {

  const client = await Client.connect("manish12099/embedding_image");
  // 🟢 URL case
  if (typeof input === "string" && input.startsWith("http")) {
    const res = await axios.post(
      "http://127.0.0.1:5000/get-embedding",
      { image_url: input },   // ✅ send JSON
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return res.data.embedding;
  }

  // // 🔵 FILE case
  else {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(input));

    const res = await axios.post(
      "http://127.0.0.1:5000/get-embedding",
      formData,
      { headers: formData.getHeaders() }
    );

    return res.data.embedding;
  }


}




async function getEmbeddingWidthApi(file) {
  try {
    

    const client = await Client.connect("manish12099/embedding_image");
    //  URL case
    if (typeof file === "string" && file.startsWith("http")) {

      const result = await client.predict("/get_embedding", {
        image_file: null,
        image_url: file,
      });
      console.log("File", file)
      const embedding = result.data[0].embedding;
      console.log("embedding", embedding)
      return embedding

    }

    // // FILE case
    else {
      console.log("PATH RECEIVED:", file.path);

      const fullPath = path.resolve(file.path);   // fix windows path
      const buffer = fs.readFileSync(fullPath);
      const result = await client.predict("/get_embedding", {
        image_file: buffer,
        image_url: "",
      });
      const embedding = result.data[0].embedding;

      console.log("EMBEDDING:", embedding);

      return embedding;
    }
  } catch (error) {
    return error
  }
}


module.exports = { getEmbeddingWithLocal, getEmbeddingWidthApi };
