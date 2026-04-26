import { requestOrder, verifyOrder } from "../services/payment";

export const handlePayment = async (data) => {

  // 1️⃣ create razorpay order
  const res = await requestOrder({amount:data.amount});
  const order = res.data.data; // you need the actual order object
  console.log(order.amount)

  // 2️⃣ razorpay popup
  const options = {
    key: "rzp_test_RuNHvf68XX1oeW",
    amount: order.amount,
    currency: "INR",
    order_id: order.id,
    name: "My Store",
    handler: async function (response) {
      // 3️⃣ verify & save order
      const payload = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        items: data.items, // from frontend
        shippingAddress: data.shippingAddress,
        contactNumber: data.contactNumber,
        paymentMethod: data.paymentMethod
      };

      const verifyRes = await verifyOrder(payload);
      console.log("Order saved:", verifyRes.data);
      alert("Order placed successfully 🧾");
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
