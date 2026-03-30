import { useNavigate } from "react-router-dom";
import { saveToCart } from "../services/user";
import { addItemOptimistic } from "../features/cart";
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";

function Product({ product }) {
  const isAuth = useSelector((state) => state.user.isAuth);
  const role = useSelector((state) => state.user.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Navigate to Product Details Page
  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = async (e) => {
    // Prevent card click when clicking "Add to Cart" button
    e.stopPropagation();

    if (!isAuth) {
      navigate('/login');
      return;
    }

    // Optimistic update in Redux
    dispatch(addItemOptimistic({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      sellerId: product.sellerInfo?.sellerId,   // Important for order
    }));

    try {
      await saveToCart({ productId: product._id, quantity: 1 });
      toast.success("Added to cart!");
    } catch (err) {
      toast.error("Failed to add to cart");
      // You can add rollback logic here if needed
    }
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden flex flex-col justify-between h-[450px] md:w-auto w-[150px] md:p-4 p-2 cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-lg font-semibold mb-2 line-clamp-2 leading-tight">
            {product.title}
          </h2>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
            <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
          </div>

          <p className="text-gray-400 text-xs mt-2">
            Category: <span className="capitalize">{product.category}</span>
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={role !== "user" || product.stock === 0}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                     text-white py-2.5 rounded-lg font-medium transition-all duration-200
                     active:scale-95"
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default Product; 