
const Order = require("../model/order");

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
        res.status(500).json({ message: "Server error" });
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
        if (userRole !== 'admin' || userRole !== 'seller') {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const orders = await Order.find({ userId: sellerId });
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
const getAllOrdersByUser=async (req,res)=>{
    try{

    }catch(error){

    }
}
const changeOrderStatus = async (req, res) => {
    // Implementation for changing order status 
    try {
        const { orderId, orderStatus } = req.body;
        const userId = req.user.id;
        const userRole = req.user.role;
        if (userRole !== 'admin' || userRole !== 'seller') {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const order = await Order.findOne
            ({ orderId: orderId, sellerId: userId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.orderStatus = orderStatus;
        await order.save();
        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { checkoutOrder, getTrackOrder, changeOrderStatus, getAllOrdersBySeller,getAllOrdersByUser };