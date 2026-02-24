import { useNavigate } from "react-router-dom"
import { saveToCart } from "../services/user"
import { addItemOptimistic } from "../features/cart"
import { useDispatch, useSelector } from 'react-redux'
import toast from "react-hot-toast"
function Product({ product }) {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleProductCart = async () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    dispatch(addItemOptimistic({
      productId: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
    }));

    try {
      await saveToCart({ productId: product._id, quantity: 1 });
      console.log(product.sellerInfo.sellerId)
    } catch (err) {
      toast.error("Failed to add to cart");
      // optional: refetch cart to rollback
    }
  };

  return (


    <div className="bg-white rounded-lg overflow-hidden flex flex-col justify-between h-[450px] md:w-auto w-[150px] md:p-4 p-0">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-2 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
          <p className="text-gray-600 mb-2 line-clamp-3">{product.description}</p>
          <p className="text-green-600 font-bold mb-2">₹{product.price}</p>
          <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
          <p className="text-gray-400 text-xs mt-2">Category: {product.category}</p>
        </div>
        <button
          onClick={handleProductCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>

  )
}
export default Product