import { getAllProduct } from "../services/product";
import { useContext, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

import Product from "./product";
import { useFilteredProducts } from "../hook/use_filter_product";
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { searcContext } from "../context/searchcontext";
const ProductList = () => {
  // const [search, setSearch] = useState("");
  const {search,setSearchMode}=useContext(searcContext)
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");


  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
    staleTime: 60 * 1000 * 1,
  })

  const products = data || [];

  const filteredData = useFilteredProducts(
    products,
    search,
    category,
    sort
  );

  if (isPending)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500 mt-10">Error loading products</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={()=>setSearchMode(false)}><IoArrowBack />
</button>
      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {/* <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        /> */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Categories</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="mens">Mens</option>
          <option value="women">Women</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.length ? (
          filteredData.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.05
              }}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Product product={item} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full mt-10">
            No products found
          </p>
        )}
      </div>

    </div>
  );
};

export default ProductList;
