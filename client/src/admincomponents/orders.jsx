import { useEffect, useState } from "react";
import { getAllOrder } from "../services/user";
import { changeOrderStatus } from "../services/product"
function Orders() {
    const [orderData, setOrderData] = useState([]);
    const [statusMap, setStatusMap] =useState ([{}])
    const getOrders = async () => {
        try {
            const res = await getAllOrder();
            setOrderData(res.data.orders); // ✅ fix
        } catch (err) {
            console.log(err);
        }
    };
    const changeStatus = async (orderId, orderStatus) => {
        try {
            console.log(orderId, orderStatus)
            const res = await changeOrderStatus({ orderId, orderStatus })
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                📦 Orders Management
            </h2>

            {/* Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full text-left">

                        {/* Header */}
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3">Order ID</th>
                                <th className="p-3">User</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {orderData.length > 0 ? (
                                orderData.map((order, index) => {

                                    const totalAmount = order.items.reduce(
                                        (acc, item) => acc + item.total,
                                        0
                                    );

                                    return (
                                        <tr
                                            key={order._id}
                                            className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                }`}
                                        >
                                            <td className="p-3 text-sm">{order.orderId}</td>

                                            <td className="p-3">{order.userId}</td>


                                            <td className="p-3 font-semibold text-green-600">
                                                ₹{totalAmount}
                                            </td>


                                            <td className="p-3">

                                                <div className="relative inline-block">
                                                    <select
                                                        onChange={(e) => {
                                                            const newStatus = e.target.value;

                                                            setStatusMap(prev => ({
                                                                ...prev,
                                                                [order.orderId]: newStatus
                                                            }));

                                                            changeStatus(order.orderId, newStatus);
                                                        }}
                                                        value={statusMap[order.orderId] || order.orderStatus}
                                                        className={`appearance-none cursor-pointer px-4 py-2 pr-10 rounded-full text-sm font-medium border transition-all duration-200 focus:outline-none focus:ring-2
                                                            ${(statusMap[order.orderId] || order.orderStatus) === "pending"
                                                                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                                                : (statusMap[order.orderId] || order.orderStatus) === "delivered"
                                                                    ? "bg-green-100 text-green-700 border-green-300"
                                                                    : (statusMap[order.orderId] || order.orderStatus) === "cancelled"
                                                                        ? "bg-red-100 text-red-700 border-red-300"
                                                                        : (statusMap[order.orderId] || order.orderStatus) === "processed"
                                                                            ? "bg-blue-100 text-blue-700 border-blue-300"
                                                                            : "bg-purple-100 text-purple-700 border-purple-300"
                                                            }`}
                                                    >
                                                        <option value="pending">🕒 Pending</option>
                                                        <option value="processed">⚙️ Processed</option>
                                                        <option value="shipped">🚚 Shipped</option>
                                                        <option value="delivered">✅ Delivered</option>
                                                        <option value="cancelled">❌ Cancelled</option>
                                                    </select>
                                                    {/* Custom Arrow */}
                                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                                                        ▼
                                                    </span>
                                                </div>


                                            </td>

                                            <td className="p-3">
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 text-gray-500">
                                        No Orders Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Orders;