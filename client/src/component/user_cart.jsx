import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQty, decreaseQty } from '../features/cart';
import { saveToCart, removeFromCart, getUserCart } from '../services/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { handlePayment } from './payment';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const UserCart = ({ cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Address States
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullAddress: "Patna, Bihar",
      pincode: "800001",
      type: "Home",
      isDefault: true
    }
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [contactNumber, setContactNumber] = useState("9798293519");

  // Modal State for Add/Edit Address
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [newAddress, setNewAddress] = useState({
    fullAddress: "",
    pincode: "",
    type: "Home"
  });

  // Get selected address
  const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

  const handleIncrease = async (id) => {
    dispatch(increaseQty(id));
    try {
      await saveToCart({ productId: id, quantity: 1 });
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const handleDecrease = async (id) => {
    dispatch(decreaseQty(id));
    try {
      await removeFromCart({ productId: id });
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // Add or Update Address
  const handleSaveAddress = () => {
    if (!newAddress.fullAddress || !newAddress.pincode) {
      toast.error("Please fill address and pincode");
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr =>
        addr.id === editingAddress.id
          ? { ...addr, ...newAddress }
          : addr
      ));
      toast.success("Address updated successfully");
    } else {
      // Add new address
      const newAddr = {
        id: Date.now(),
        ...newAddress,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddr]);
      toast.success("New address added");
    }

    // Reset form
    setNewAddress({ fullAddress: "", pincode: "", type: "Home" });
    setEditingAddress(null);
    setShowAddressModal(false);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setNewAddress({
      fullAddress: address.fullAddress,
      pincode: address.pincode,
      type: address.type
    });
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (id) => {
    if (addresses.length === 1) {
      toast.error("You must have at least one address");
      return;
    }

    if (window.confirm("Delete this address?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));

      // If deleted address was selected, select another one
      if (selectedAddressId === id) {
        const remaining = addresses.filter(addr => addr.id !== id);
        setSelectedAddressId(remaining[0].id);
      }
      toast.success("Address deleted");
    }
  };

  const handlePay = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (!contactNumber || contactNumber.length < 10) {
      toast.error("Please enter a valid 10-digit contact number");
      return;
    }

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
        shippingAddress: selectedAddress.fullAddress,
        contactNumber: contactNumber,
        paymentMethod: "Razorpay"
      };

      await handlePayment(orderData);
    } catch (err) {
      toast.error("Payment initialization failed");
      console.error(err);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl h-60 mx-auto p-4 text-center mt-10 text-gray-500">
        <h1>Your cart is empty</h1>
        <button
          onClick={() => navigate('/')}
          className="text-white mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                     hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 
                     font-semibold rounded-lg text-sm px-6 py-3 shadow-md hover:shadow-lg transition-all"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">My Cart</h2>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {cart.items.map(item => (
          <div key={item._id} className="flex gap-4 border rounded-lg p-4 items-center bg-white">
            <img src={item.image || '/placeholder.jpg'} alt={item.title} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{item.title}</h3>
              <p className="text-gray-500">₹{item.price}</p>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => handleIncrease(item.productId)} className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded font-semibold">+</button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button onClick={() => handleDecrease(item.productId)} className="w-9 h-9 flex items-center justify-center border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded font-semibold">-</button>
            </div>

            <div className="font-semibold text-lg min-w-[90px] text-right">₹{item.total}</div>
          </div>
        ))}
      </div>

      {/* Delivery Addresses Section */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Delivery Address</h3>
          <button
            onClick={() => {
              setEditingAddress(null);
              setNewAddress({ fullAddress: "", pincode: "", type: "Home" });
              setShowAddressModal(true);
            }}
            className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
          >
            <FaPlus /> Add New Address
          </button>
        </div>

        <div className="space-y-3">
          {addresses.map(addr => (
            <div
              key={addr.id}
              className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all hover:border-pink-400
                ${selectedAddressId === addr.id ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}`}
              onClick={() => setSelectedAddressId(addr.id)}
            >
              <input
                type="radio"
                checked={selectedAddressId === addr.id}
                onChange={() => setSelectedAddressId(addr.id)}
                className="mt-1 accent-pink-600"
              />

              <div className="flex-1">
                <p className="font-medium">{addr.fullAddress}</p>
                <p className="text-sm text-gray-500">Pincode: {addr.pincode}</p>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{addr.type}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleEditAddress(addr); }}
                  className="p-2 text-gray-500 hover:text-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); }}
                  className="p-2 text-gray-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Number */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter 10-digit mobile number"
            maxLength={10}
          />
        </div>
      </div>

      {/* Order Summary & Checkout */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">Total Amount</h3>
          <span className="text-3xl font-bold text-pink-600">₹{cart.cartTotal}</span>
        </div>

        <button
          onClick={handlePay}
          disabled={!selectedAddress}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all
            ${selectedAddress ? 'bg-black hover:bg-gray-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Address</label>
                <textarea
                  value={newAddress.fullAddress}
                  onChange={(e) => setNewAddress({ ...newAddress, fullAddress: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 h-24"
                  placeholder="Enter complete address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <input
                  type="text"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address Type</label>
                <select
                  value={newAddress.type}
                  onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddressModal(false);
                  setEditingAddress(null);
                  setNewAddress({ fullAddress: "", pincode: "", type: "Home" });
                }}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAddress}
                className="flex-1 py-3 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700"
              >
                {editingAddress ? "Update Address" : "Add Address"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;