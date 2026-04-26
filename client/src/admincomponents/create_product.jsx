import { useState } from 'react';
import { createProduct } from '../services/product';
import toast from 'react-hot-toast';

function CreateProduct() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.price || 
            !formData.category || !formData.stock || !formData.image) {
            toast.error("All fields are required!");
            return;
        }

        if (parseFloat(formData.price) <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        if (parseInt(formData.stock) < 0) {
            toast.error("Stock cannot be negative");
            return;
        }

        setLoading(true);

        try {
            await createProduct(formData);
            toast.success("✅ Product added successfully!");

            // Reset form
            setFormData({
                title: '',
                description: '',
                price: '',
                category: '',
                stock: '',
                image: ''
            });
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Failed to create product";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Add New Product
                    </h1>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                        Fill in the product details to add it to your store
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-8 lg:p-10">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-base"
                                    placeholder="Wireless Noise Cancelling Headphones"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-y min-h-[140px] text-base"
                                    placeholder="High-quality wireless headphones with active noise cancellation..."
                                    required
                                />
                            </div>

                            {/* Price & Stock - Responsive Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Price (₹) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
                                        placeholder="1299"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Stock Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
                                        placeholder="150"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-base"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home">Home & Kitchen</option>
                                    <option value="beauty">Beauty & Personal Care</option>
                                    <option value="sports">Sports & Fitness</option>
                                    <option value="books">Books & Stationery</option>
                                    <option value="toys">Toys & Games</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Image URL <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-base"
                                    placeholder="https://example.com/images/product.jpg"
                                    required
                                />
                                <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                    📸 Paste a direct image link (Cloudinary, ImgBB, Imgur, etc.)
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
                                           text-white font-semibold py-5 rounded-2xl text-lg 
                                           transition-all duration-300 flex items-center justify-center gap-3 
                                           shadow-lg shadow-blue-100 disabled:shadow-none mt-4"
                            >
                                {loading ? (
                                    <>
                                        <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></span>
                                        <span>Adding Product...</span>
                                    </>
                                ) : (
                                    <>
                                        Add Product to Store
                                        <span className="text-xl">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Helpful Note */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    All fields marked with <span className="text-red-500">*</span> are required
                </p>
            </div>
        </div>
    );
}

export default CreateProduct;