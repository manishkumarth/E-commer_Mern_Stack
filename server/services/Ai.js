const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function getEmbedding(input) {

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

  // 🔵 FILE case
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

module.exports = getEmbedding;