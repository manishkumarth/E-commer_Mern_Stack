import { useState, useMemo } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "../services/user";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const Orders = () => {
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("All"); // All, Today, This Week, This Month

    const { data, isLoading, error } = useQuery({
        queryKey: ["order"],
        queryFn: getOrderDetails,
    });

    const orders = data?.data || [];

    // Filter orders based on status and date
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            // Status Filter
            const statusMatch = statusFilter === "All" || 
                               order.orderStatus.toLowerCase() === statusFilter.toLowerCase();

            // Date Filter
            let dateMatch = true;
            if (dateFilter !== "All") {
                const orderDate = new Date(order.orderDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (dateFilter === "Today") {
                    dateMatch = orderDate.toDateString() === today.toDateString();
                } 
                else if (dateFilter === "This Week") {
                    const weekAgo = new Date(today);
                    weekAgo.setDate(today.getDate() - 7);
                    dateMatch = orderDate >= weekAgo;
                } 
                else if (dateFilter === "This Month") {
                    dateMatch = orderDate.getMonth() === today.getMonth() &&
                               orderDate.getFullYear() === today.getFullYear();
                }
            }

            return statusMatch && dateMatch;
        });
    }, [orders, statusFilter, dateFilter]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Order ID copied successfully!");
    };

    if (isLoading) {
        return (
            <div className="h-40 flex justify-center items-center">
                <p className="text-gray-500">Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-40 flex justify-center items-center">
                <p className="text-red-500">Failed to load orders. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
                    <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                        <option value="All">All Time</option>
                        <option value="Today">Today</option>
                        <option value="This Week">This Week</option>
                        <option value="This Month">This Month</option>
                    </select>
                </div>

                {/* Reset Button */}
                <div className="self-end">
                    <button
                        onClick={() => {
                            setStatusFilter("All");
                            setDateFilter("All");
                        }}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
                Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
            </div>

            {/* Table */}
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
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                                    No orders found matching your filters
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map(order =>
                                order.items.map(product => (
                                    <tr
                                        key={`${order._id}-${product._id}`}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 flex items-center gap-2">
                                            <FaCopy
                                                className="cursor-pointer text-gray-500 hover:text-black"
                                                onClick={() => handleCopy(order.orderId)}
                                            />
                                            <span className="font-mono">{order.orderId}</span>
                                        </td>
                                        <td className="px-4 py-3">{product.title}</td>
                                        <td className="px-4 py-3">₹{product.price}</td>
                                        <td className="px-4 py-3">{product.quantity}</td>
                                        <td className="px-4 py-3 font-medium">₹{product.total}</td>

                                        <td className="px-4 py-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium
                                                ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                  order.orderStatus === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                  'bg-yellow-100 text-yellow-700'}`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3">
                                            {new Date(order.orderDate).toLocaleDateString('en-IN')}
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;