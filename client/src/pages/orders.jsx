import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../services/user";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const Orders = () => {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("copy")
    };
    const { data, isLoading } = useQuery({
        queryKey: ["order"],
        queryFn: getOrderDetails,
    });

    const orders = data?.data || [];

    if (isLoading) {
        return (
            <div className="h-40 flex justify-center items-center">
                <p className="text-gray-500">Loading orders...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="h-40 flex justify-center items-center">
                <p className="text-gray-500">No orders yet</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="overflow-x-auto rounded-2xl shadow">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 text-sm text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left">Order ID</th>
                            <th className="px-4 py-3 text-left">Product</th>
                            <th className="px-4 py-3 text-left">Price</th>
                            <th className="px-4 py-3 text-left">Qty</th>
                            <th className="px-4 py-3 text-left">Total</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-left">Date</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm text-gray-600">
                        {orders.map(order =>
                            order.items.map(product => (
                                <tr
                                    key={product._id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <FaCopy
                                            className="cursor-pointer text-gray-500 hover:text-black"
                                            onClick={() => handleCopy(order.orderId)}
                                        />
                                        <span>{order.orderId}</span>
                                    </td>
                                    <td className="px-4 py-3">{product.title}</td>
                                    <td className="px-4 py-3">₹{product.price}</td>
                                    <td className="px-4 py-3">{product.quantity}</td>
                                    <td className="px-4 py-3 font-medium">
                                        ₹{product.total}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                                            {order.orderStatus}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;