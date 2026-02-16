import { increaseQty, decreaseQty } from '../features/cart'
import { saveToCart, removeFromCart, getUserCart } from '../services/user'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { handlePayment } from './payment';
const UserCart = ({ cart }) => {
  // const cart = reduxCart?.items?.length ? reduxCart : cartProp;
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleIncrease = async (id) => {
    dispatch(increaseQty(id)); // instant UI

    try {
      const res = await saveToCart({ productId: id, quantity: 1 });
      console.log("savted res", res)
    } catch {
      toast.error("item not saved")
    }
  };

  const handleDecrease = async (id) => {
    dispatch(decreaseQty(id)); // instant UI

    try {
      const res = await removeFromCart({ productId: id });
      console.log("delete res", res)
    } catch {
      toast.error("Update failed");
    }
  };
  const prepareOrderItems = (cartItems) => {
    return cartItems.map(item => ({
      productId: item.productId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity
    }));
  };


  const handlePay = async () => {
    try {
      const cartRes = await getUserCart();
      const cartItems = cartRes.data.cart.items;

      if (!cartItems || cartItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const orderData = {
        amount: cartRes.data.cart.cartTotal,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress: "Patna, Bihar",
        contactNumber: "9798293519",
        paymentMethod: "Razorpay"
      };

      await handlePayment(orderData);

    } catch (err) {
      toast.error("Payment failed");
      console.error(err);
    }
  };



  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl h-60 mx-auto p-4 text-center mt-10 text-gray-500">
        <h1> Your cart is empty</h1>
        <button
          onClick={() => navigate('/')}
          className="text-white mt-4
    bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
    hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 
    focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
    font-semibold rounded-lg text-sm px-6 py-3 text-center 
    shadow-md hover:shadow-lg transition-all duration-300
  "
        >
          Shopping
        </button>

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">My Cart</h2>

      <div className="space-y-4">
        {cart.items.map(item => (
          <div
            key={item._id}
            className="flex gap-4 border rounded-lg p-4 items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-gray-500">₹{item.price}</p>
              <p className="text-sm text-gray-600">
                Quantity: {item.quantity}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded" onClick={() => handleIncrease(item.productId)}>+</button>
              <button className="hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded" onClick={() => handleDecrease(item.productId)}>-</button>
            </div>
            <div className="font-semibold">₹{item.total}</div>
          </div>
        ))}
      </div>


      <div className="flex justify-between items-center mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold">Total</h3>
        <span className="text-xl font-bold">₹{cart.cartTotal}</span>
      </div>

      <button onClick={handlePay} className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800">
        Proceed to Checkout
      </button>
    </div>
  );
};
export default UserCart