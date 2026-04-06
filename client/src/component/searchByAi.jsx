import { useState } from "react";
import { searchByAi } from "../services/product";
import { useQueryClient } from '@tanstack/react-query';

function SearchByAi() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [aiSeachData,setAiSearchData]=useState([])

  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData(['product']);

  console.log(cachedData);

  // handle file select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // handle search
  const handleSearch = async () => {
    if (!image) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await searchByAi(formData)

      console.log("AI Result:", res);


      const queryEmbedding = res.data.embedding[0];
      const matchedProducts = cachedData
        .map(product => ({
          ...product,
          similarity: cosineSimilarity(queryEmbedding, product.embedding)
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 20); // limit results

      console.log("images finded", matchedProducts)
        setAiSearchData(matchedProducts)
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // clear image
  const handleClear = () => {
    setImage(null);
    setPreview(null);
  };

  function cosineSimilarity(vecA, vecB) {
    let dot = 0, normA = 0, normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }


  return (
    <>
    <div className="flex flex-col items-center gap-4 p-4">

      {/* Upload */}
      {!preview && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />
      )}

      {/* Preview Box */}
      {preview && (
        <div className="w-48 h-48 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
          {loading ? (
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Buttons */}
      {preview && (
        <div className="flex gap-3">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            onClick={handleClear}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
          >
            Clear
          </button>
        </div>
      )}
    </div>
    {/* testing */}
    <div>
        {
          aiSeachData?.map((item)=>{
            (
              <div></div>
            )
          })
        }
    </div>
    </>
  );
}

export default SearchByAi;