const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      sellerId: {
        type: String
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      image: String,
      title: String,
      price: Number,
      quantity: Number,
      total: Number,
    }
  ],
  cartTotal: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("UserCart", cartSchema);