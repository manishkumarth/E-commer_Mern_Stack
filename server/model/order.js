
const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentMethod: {
        type: String,
    },
    items: [
        {
            sellerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            title: String,
            price: Number,
            quantity: Number,
            total: Number
        }
    ],
    orderStatus: {
        type: String,
        enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    shippingAddress: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model("Order", orderSchema);