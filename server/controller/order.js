
const Order = require("../model/order");
const mongoose = require("mongoose");

const checkoutOrder = async (req, res) => {
    // Implementation for checkout order
    try {
        const userId = req.user.id;
        const orderId = date.now().toString();
        const { sellerInfo, items, totalAmount, shippingAddress, contactNumber, paymentMethod, orderDate } = req.body;
        if (!sellerInfo || !items || items.length === 0 || !totalAmount || !shippingAddress || !contactNumber) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const newOrder = new Order({
            userId: userId,
            sellerId: sellerInfo.sellerId,
            orderId: orderId,
            paymentMethod: paymentMethod,
            items: items,
            shippingAddress: shippingAddress,
            contactNumber: contactNumber,
            orderDate: orderDate,
            totalAmount: totalAmount
        });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error check" });
    }
};

const getTrackOrder = async (req, res) => {
    // Implementation for tracking order
    try {
        const userId = req.user.id;
        const orders = await Order.find
            ({ userId: userId });
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllOrdersBySeller = async (req, res) => {
    try {
        const userRole = req.user.role;
        const userId = req.user.id;

        if (userRole !== 'admin' && userRole !== 'seller') {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        let orders;

        if (userRole === "admin") {
            // Admin sees all orders
            orders = await Order.find();
        } else {
            // Seller sees only their orders
            orders = await Order.find({
                "items.sellerId": userId
            });
        }

        res.status(200).json({ orders });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
const getAllOrdersByUser = async (req, res) => {
    console.log(req)
    try {
        const userId = req.user.id;
        const data = await Order.find({ userId })
        console.log("data logs", data)
        res.status(200).json({ message: "order details success", data })
    } catch (error) {
        console.log("error logs", error)
        res.status(200).json({ message: "server error" })
    }
}

const changeOrderStatus = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;
        const userId = req.user.id;

        const order = await Order.findOne({ orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // check seller exists in items
        const isSeller = order.items.some(item =>
            item.sellerId.toString() === userId
        );

        if (!isSeller) {
            return res.status(403).json({ message: "Not your order" });
        }

        order.orderStatus = orderStatus;
        await order.save();

        res.status(200).json({ message: "Updated", order });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { checkoutOrder, getTrackOrder, changeOrderStatus, getAllOrdersBySeller, getAllOrdersByUser };