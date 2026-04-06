import { useEffect, useState } from "react";
import { getAllProduct, updateProduct, deleteProduct, generateAiSearch } from "../services/product";
import toast from "react-hot-toast";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await getAllProduct();
      setProducts(res?.data || res || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProduct({ ...product }); // deep copy to avoid mutating original
  };

  const closeModal = () => {
    setEditProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!editProduct) return;

    try {
      setLoading(true);
      await updateProduct(editProduct._id, editProduct);

      setProducts((prev) =>
        prev.map((p) => (p._id === editProduct._id ? { ...editProduct } : p))
      );

      toast.success("Product updated successfully");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id); // note: fixed typo in function name
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const enableAiSearch = async (id) => {
    try {
      const res = await generateAiSearch(id)
      console.log("response from generate ai : ", res)
    } catch (error) {
      alert("error from ai genereate", error)
    }


  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Management</h1>

        <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.image || "/placeholder.jpg"}
                          alt={product.title}
                          className="h-14 w-14 object-cover rounded-md border border-gray-200 shadow-sm"
                          onError={(e) => (e.target.src = "/placeholder.jpg")}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {product.title}
                      </td>
                      <td className="px-6 py-4 text-green-700 font-semibold">
                        ₹{Number(product.price).toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-4 font-medium ${product.stock === 0
                          ? "text-red-600"
                          : product.stock <= 5
                            ? "text-orange-600"
                            : "text-gray-900"
                          }`}
                      >
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleEdit(product)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => enableAiSearch(product._id)}
                          disabled={product?.embedding?.length > 0}
                          className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200
                            ${product?.embedding?.length > 0
                              ? "bg-green-500 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                            }
                        `}
                        >
                          {product?.embedding?.length > 0
                            ? "AI Enabled ✅"
                            : "Enable AI Search"}
                        </button>                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editProduct && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>

                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editProduct.title || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editProduct.description || ""}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editProduct.price || ""}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={editProduct.stock || ""}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={editProduct.category || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={editProduct.image || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </form>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className={`px-6 py-2.5 rounded-lg text-white font-medium transition ${loading
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                      }`}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;