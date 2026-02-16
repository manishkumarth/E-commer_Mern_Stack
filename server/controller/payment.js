require('dotenv').config();

// const razorpay = require("../utils/razorpay");
const Razorpay =require('razorpay')

const crypto = require("crypto");
const Order = require("../model/order");
const Product=require('../model/productschema')
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) return res.status(400).json({ message: "Amount is required" });

    const razorpay = new Razorpay({
      key_id: "rzp_test_RuNHvf68XX1oeW",
      key_secret: "wylb5NHxnppaNirCgUvZKaoX",
    });

    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create(options); // use await instead of callback

    return res.status(200).json({ data: order });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return res.status(500).json({ message: "Razorpay order failed" });
  }
};



const verifyAndSaveOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items, // [{ productId, quantity }]
      shippingAddress,
      contactNumber,
      paymentMethod
    } = req.body;

    const userId = req.user.id;

    // 1️⃣ Verify Razorpay signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 2️⃣ Prepare order items from DB
    const orderItems = [];
    let sellerId = null;

    for (let item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (!sellerId) {
        sellerId = product.sellerId; // take from DB
      }

      orderItems.push({
        sellerId:"123",
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        total: product.price * item.quantity
      });
    }

    // 3️⃣ Save order
    const newOrder = await Order.create({
      userId,
      orderId: razorpay_order_id,
      paymentMethod,
      items: orderItems,
      shippingAddress,
      contactNumber,
      orderStatus: "pending"
    });

    res.status(201).json({
      message: "Payment verified & order placed",
      order: newOrder
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createRazorpayOrder ,verifyAndSaveOrder};
