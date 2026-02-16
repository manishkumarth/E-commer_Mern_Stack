
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "../services/product";
import Loader from "./loader";
import Product from "./product";
import { motion } from 'framer-motion'
import { useContext } from "react";
import { searcContext } from "../context/searchcontext";
const FeatureProduct = () => {
    const { data, isLoading, isError, isPending } = useQuery({
        queryKey: ["product"],
        queryFn: getAllProduct,
        staleTime: 60 * 1000 * 5,
    })
       const {setSearchMode}=useContext(searcContext)
    
    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <div className="grid grid-cols-8 gap-4 mx-30">
            {data.slice(20, 28).map((item) => (
                <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="min-w-[260px] w-[220px] rounded-xl shadow-md p-4 col-span-2 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                    <Product product={item} />
                </motion.div>
            ))}
            <p className="cursor-pointer" onClick={()=>setSearchMode(true)}>View All</p>
        </div>

    );
}

export default FeatureProduct;


