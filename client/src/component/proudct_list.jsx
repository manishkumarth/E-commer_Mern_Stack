import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";   // ← Added

import { getAllProduct } from "../services/product";
import Product from "./product";
import { useFilteredProducts } from "../hook/use_filter_product";
import { searcContext } from "../context/searchcontext";

const ProductList = () => {
  const { 
    search, 
    setSearch, 
    searchMode, 
    aiSearchResults, 
    resetToNormalMode 
  } = useContext(searcContext);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const allProducts = data?.data || data || [];

  const baseProducts = searchMode && aiSearchResults.length > 0 
    ? aiSearchResults 
    : allProducts;

  const filteredProducts = useFilteredProducts(baseProducts, search, category, sort);

  const handleBack = () => {
    resetToNormalMode();
    setCategory("all");
    setSort("");
  };

  const handleReset = () => {
    setCategory("all");
    setSort("");
    if (!searchMode) {
      setSearch("");
    }
  };

  const isAIResults = searchMode && aiSearchResults.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-12 mt-5">
      {/* Top Navbar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
          >
            <IoArrowBack size={22} />
            <span className="hidden sm:inline font-medium">
              Back to All Products
            </span>
          </button>

          <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">
            {isAIResults 
              ? "🔍 AI Visual Search Results" 
              : search 
                ? `Results for "${search}"` 
                : "🛍️ All Products"}
          </h1>

          <div className="w-10" />
        </div>
      </div>

      {/* ==================== MOBILE SEARCH BAR ==================== */}
      <div className="md:hidden px-4 pt-4 pb-2 bg-white border-b sticky top-16 z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 pl-12 bg-gray-100 border border-gray-300 rounded-2xl text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white"
          />
          <FaSearch 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
            size={20} 
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* ==================== FILTER BAR ==================== */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8 border">
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="min-w-[180px]">
                <label className="text-sm text-gray-600">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Categories</option>
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="mens">Men's</option>
                  <option value="women">Women's</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div className="min-w-[180px]">
                <label className="text-sm text-gray-600">Sort</label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Recommended</option>
                  <option value="low-high">Price: Low → High</option>
                  <option value="high-low">Price: High → Low</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
            {(category !== "all" || sort !== "" || search || isAIResults) && (
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Result Count */}
          {!isLoading && (
            <p className="mt-4 text-sm text-gray-500">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {isAIResults && " • AI Visual Search"}
            </p>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">Failed to load products</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                >
                  <Product product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-600">
                  {isAIResults 
                    ? "No similar products found for this image" 
                    : "No products found"}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;