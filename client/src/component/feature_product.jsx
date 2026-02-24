import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../services/product";
import Loader from "./loader";
import Product from "./product";
import { motion } from "framer-motion";
import { useContext } from "react";
import { searcContext } from "../context/searchcontext";

const FeatureProduct = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
    staleTime: 60 * 1000 * 5,
  });

  const { setSearchMode } = useContext(searcContext);

  const products = data || [];

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4 gap-2">
        {products.slice(20, 28).map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="rounded-xl shadow-md p-3 hover:shadow-xl hover:-translate-y-1 transition"
          >
            <Product product={item} />
          </motion.div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() => setSearchMode(true)}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default FeatureProduct;