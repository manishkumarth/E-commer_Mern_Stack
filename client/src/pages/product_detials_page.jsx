import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemOptimistic } from '../features/cart';        // Changed to correct action
import { getSingleProduct } from '../services/product';
import { saveToCart,removeFromCart } from '../services/user';
import toast from 'react-hot-toast';
import { increaseQty, decreaseQty } from '../features/cart';
import { FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const isAuth = useSelector((state) => state.user.isAuth);
 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
  const handleIncrease = async (id) => {
    dispatch(increaseQty(id));
    toast.success("added to cart")
    try {
      await saveToCart({ productId: id, quantity: 1 });
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const handleDecrease = async (id) => {
    dispatch(decreaseQty(id));
    toast.success("removed from cart")
    try {
      await removeFromCart({ productId: id });
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getSingleProduct(id);
        console.log(res)
        // Handle different possible response structures
        const productData = res || {};

        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // const handleAddToCart = async () => {
  //   if (!product) return;

  //   if (product.stock < quantity) {
  //     toast.error("Not enough stock available");
  //     return;
  //   }

  //   // Use the correct action from your cart slice
  //   // dispatch(addItemOptimistic({
  //   //   productId: product._id,
  //   //   title: product.title,
  //   //   price: product.price,
  //   //   image: product.image,
  //   //   sellerId: product.sellerInfo?.sellerId,
  //   // }));
  //   await handleIncrease(id)
  //   toast.success(`${product.title} added to cart!`);
  // };

  const handleBuyNow = () => {
    handleAddToCart();
    // Small delay before navigating to cart
    setTimeout(() => {
      navigate('/cart');
    }, 600);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-red-500">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left: Image */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto max-h-[520px] object-contain rounded-xl"
          />
        </div>

        {/* Right: Details */}
        <div className="space-y-8">
          <div>
            <p className="uppercase text-sm tracking-widest text-gray-500">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mt-3 leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Seller */}
          {product.sellerInfo && (
            <p className="text-gray-600">
              Sold by: <span className="font-medium text-pink-600">{product.sellerInfo.sellername}</span>
            </p>
          )}

          {/* Price & Stock */}
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold">₹{product.price}</span>
            {product.stock > 0 ? (
              <span className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                In Stock • {product.stock} left
              </span>
            ) : (
              <span className="px-4 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-5">
            <span className="font-medium text-lg">Quantity:</span>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  handleDecrease(id)
                  setQuantity(q => Math.max(1, q - 1))
                }}
                className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100"
                disabled={quantity === 1}
              >
                −
              </button>
              <span className="w-14 flex items-center justify-center font-semibold text-xl border-x">
                {quantity}
              </span>
              <button
                onClick={() => {
                  handleIncrease(id)
                  setQuantity(q => Math.min(product.stock || 10, q + 1))
                }}
                className="w-12 h-12 flex items-center justify-center text-2xl hover:bg-gray-100"
                disabled={quantity >= (product.stock || 10)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-black hover:bg-gray-900 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg transition"
            >
              <FaShoppingCart className="text-xl" />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-semibold text-lg transition"
            >
              Buy Now
            </button>
          </div>

          {/* Wishlist & Share */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsWishlisted(!isWishlisted);
                toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist ❤️");
              }}
              className={`flex-1 py-4 border rounded-2xl flex items-center justify-center gap-2 font-medium transition-all ${isWishlisted
                ? 'border-red-500 text-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <FaHeart /> {isWishlisted ? "Wishlisted" : "Wishlist"}
            </button>

            <button className="flex-1 py-4 border border-gray-300 hover:border-gray-400 rounded-2xl flex items-center justify-center gap-2 font-medium transition">
              <FaShare /> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;