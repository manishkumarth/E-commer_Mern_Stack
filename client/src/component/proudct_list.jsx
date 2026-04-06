// import { useContext, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { IoArrowBack } from "react-icons/io5";

// import { getAllProduct } from "../services/product";
// import Product from "./product";
// import { useFilteredProducts } from "../hook/use_filter_product";
// import { searcContext } from "../context/searchcontext";

// const ProductList = () => {
//   const { search,setSearch, setSearchMode } = useContext(searcContext);

//   const [category, setCategory] = useState("all");
//   const [sort, setSort] = useState("");

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["products"],
//     queryFn: getAllProduct,
//     staleTime: 1 * 60 * 1000,
//     retry: 1,
//   });

//   const products = data?.data || data || [];

//   const filteredProducts = useFilteredProducts(
//     products,
//     search,
//     category,
//     sort
//   );

//   const resetFilters = () => {
//     setCategory("all");
//     setSort("");
//     setSearch("")
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12 mt-5">

//       {/* 🔹 Top Navbar */}
//       <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
//           <button
//             onClick={() => setSearchMode(false)}
//             className="flex items-center gap-2 text-gray-700 hover:text-black"
//           >
//             <IoArrowBack size={22} />
//             <span className="hidden sm:inline font-medium">Back</span>
//           </button>

//           <h1 className="text-xl sm:text-2xl font-bold">
//             🛍️ All Products
//           </h1>

//           <div className="w-10" />
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 pt-6">

//         {/* 🔹 Filter Bar */}
//         <div className="bg-white rounded-xl shadow-sm p-5 mb-8 border">

//           <div className="flex flex-wrap justify-between items-end gap-4">

//             {/* Left Filters */}
//             <div className="flex flex-wrap gap-4">

//               {/* Category */}
//               <div className="min-w-[180px]">
//                 <label className="text-sm text-gray-600">Category</label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="all">All Categories</option>
//                   <option value="boys">Boys</option>
//                   <option value="girls">Girls</option>
//                   <option value="mens">Men's</option>
//                   <option value="women">Women's</option>
//                 </select>
//               </div>

//               {/* Sort */}
//               <div className="min-w-[180px]">
//                 <label className="text-sm text-gray-600">Sort</label>
//                 <select
//                   value={sort}
//                   onChange={(e) => setSort(e.target.value)}
//                   className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Recommended</option>
//                   <option value="low-high">Price: Low → High</option>
//                   <option value="high-low">Price: High → Low</option>
//                 </select>
//               </div>

//             </div>

//             {/* Clear Filters */}
//             {(category !== "all" || sort) && (
//               <button
//                 onClick={resetFilters}
//                 className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
//               >
//                 Clear Filters
//               </button>
//             )}

//           </div>

//           {/* Result Count */}
//           {!isLoading && (
//             <p className="mt-3 text-sm text-gray-500">
//               Showing {filteredProducts.length} of {products.length} products
//             </p>
//           )}
//         </div>

//         {/* 🔹 Loading */}
//         {isLoading && (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="h-80 bg-white rounded-xl animate-pulse" />
//             ))}
//           </div>
//         )}

//         {/* 🔹 Error */}
//         {isError && (
//           <div className="text-center py-20">
//             <p className="text-red-500 text-lg">Failed to load products</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* 🔹 Product Grid */}
//         {!isLoading && !isError && (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product, index) => (
//                 <motion.div
//                   key={product._id}
//                   initial={{ opacity: 0, y: 25 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     duration: 0.4,
//                     delay: Math.min(index * 0.05, 0.5),
//                   }}
//                 >
//                   <Product product={product} />
//                 </motion.div>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-20">
//                 <p className="text-xl text-gray-600">No products found</p>
//                 <button
//                   onClick={resetFilters}
//                   className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg"
//                 >
//                   Reset Filters
//                 </button>
//               </div>
//             )}

//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ProductList; 



import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

import { getAllProduct } from "../services/product";
import Product from "./product";
import { useFilteredProducts } from "../hook/use_filter_product";
import { searcContext } from "../context/searchcontext";
import { useState } from "react";
const ProductList = () => {
  const { 
    search, 
    setSearch, 
    searchMode, 
    setSearchMode, 
    aiSearchResults,
    resetToNormalMode 
  } = useContext(searcContext);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
    staleTime: 5 * 60 * 1000,
  });

  const allProducts = data?.data || data || [];

  // 🔥 Decide which products to show
  const productsToShow = searchMode ? aiSearchResults : allProducts;

  // Only apply filters when NOT in AI search mode
  const filteredProducts = searchMode 
    ? productsToShow 
    : useFilteredProducts(allProducts, search, category, sort);

  const handleBack = () => {
    resetToNormalMode();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 mt-5">

      {/* 🔹 Top Navbar - Different for AI Search */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-700 hover:text-black"
          >
            <IoArrowBack size={22} />
            <span className="hidden sm:inline font-medium">
              {searchMode ? "Back to All Products" : "Back"}
            </span>
          </button>

          <h1 className="text-xl sm:text-2xl font-bold">
            {searchMode ? "🔍 AI Visual Search Results" : "🛍️ All Products"}
          </h1>

          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6">

        {/* Show filters ONLY in normal mode */}
        {!searchMode && (
          <div className="bg-white rounded-xl shadow-sm p-5 mb-8 border">
            {/* Your existing filter bar code */}
            <div className="flex flex-wrap justify-between items-end gap-4">
              {/* Category & Sort filters here... */}
              {/* (Keep your existing filter code) */}
            </div>
          </div>
        )}

        {/* Result Count */}
        {!isLoading && (
          <p className="mt-3 text-sm text-gray-500 mb-6">
            {searchMode 
              ? `Found ${productsToShow.length} similar products` 
              : `Showing ${filteredProducts.length} of ${allProducts.length} products`
            }
          </p>
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
                  {searchMode ? "No similar products found" : "No products found"}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductList;