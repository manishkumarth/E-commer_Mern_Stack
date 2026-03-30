import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

function OrderChart() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // You'll need to implement / adjust this service
  // Example: import { getAllOrders } from "../services/order";
  // For now we simulate realistic structure
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Replace with your real API call
        // const res = await getAllOrders();
        // const data = res?.data || res || [];

        // Simulated data for development – remove in production
        const simulated = Array.from({ length: 120 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i * 1.2);
          return {
            _id: `order${i}`,
            createdAt: date.toISOString(),
            totalAmount: Math.floor(Math.random() * 18000 + 800),
            status: ["pending", "processing", "shipped", "delivered", "cancelled"][
              Math.floor(Math.random() * 5)
            ],
            paymentMethod: Math.random() > 0.6 ? "online" : "cod",
          };
        }).reverse(); // oldest → newest

        setOrders(simulated);
      } catch (err) {
        console.error("Failed to load orders", err);
        setError("Could not load order statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 animate-pulse">
        Loading order analytics...
      </div>
    );
  }

  if (error || orders.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600 bg-gray-50 rounded-xl border border-gray-200">
        {error || "No orders found to generate charts."}
      </div>
    );
  }

  // ────────────────────────────────────────────────
  // Helper: Group orders by month (or day if < 60 days)
  // ────────────────────────────────────────────────
  const getMonthlyData = () => {
    const map = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const key = date.toLocaleString("default", { month: "short", year: "2-digit" });
      if (!map[key]) {
        map[key] = { revenue: 0, count: 0, online: 0, cod: 0 };
      }
      map[key].revenue += Number(order.totalAmount) || 0;
      map[key].count += 1;
      if (order.paymentMethod === "online") map[key].online += 1;
      else map[key].cod += 1;
    });

    // Sort chronologically
    return Object.entries(map)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([month, stats]) => ({ month, ...stats }));
  };

  const monthly = getMonthlyData();

  // ────────────────────────────────────────────────
  // 1. Revenue & Order Count over time (Line Chart)
  // ────────────────────────────────────────────────
  const revenueLineData = {
    labels: monthly.map((m) => m.month),
    datasets: [
      {
        label: "Revenue (₹)",
        data: monthly.map((m) => m.revenue),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.15)",
        tension: 0.3,
        fill: true,
        yAxisID: "y",
      },
      {
        label: "Orders",
        data: monthly.map((m) => m.count),
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.15)",
        tension: 0.3,
        yAxisID: "y1",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      title: { display: true, text: "Revenue & Order Volume Trend", font: { size: 18 } },
      legend: { position: "top" },
    },
    scales: {
      y: { type: "linear", display: true, position: "left", title: { display: true, text: "Revenue (₹)" } },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "Number of Orders" },
      },
    },
  };

  // ────────────────────────────────────────────────
  // 2. Orders by Status (Pie Chart)
  // ────────────────────────────────────────────────
  const statusCount = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        data: Object.values(statusCount),
        backgroundColor: ["#3b82f6", "#eab308", "#10b981", "#ef4444", "#6b7280"],
        hoverOffset: 20,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Orders by Status", font: { size: 18 } },
    },
  };

  // ────────────────────────────────────────────────
  // 3. Payment Method Breakdown (Bar)
  // ────────────────────────────────────────────────
  const paymentCount = orders.reduce(
    (acc, o) => {
      if (o.paymentMethod === "online") acc.online += 1;
      else acc.cod += 1;
      return acc;
    },
    { online: 0, cod: 0 }
  );

  const paymentData = {
    labels: ["Online Payment", "Cash on Delivery"],
    datasets: [
      {
        label: "Orders",
        data: [paymentCount.online, paymentCount.cod],
        backgroundColor: ["#6366f1", "#f97316"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Payment Methods Distribution", font: { size: 18 } },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart – Revenue & Orders over time */}
        {/* <div className="bg-gray-50 p-5 rounded-lg col-span-1 lg:col-span-2">
          <Line data={revenueLineData} options={lineOptions} />
        </div> */}

        {/* Pie – Orders by Status */}
        <div className="bg-gray-50 p-5 rounded-lg">
          <Pie data={statusData} options={pieOptions} />
        </div>

        {/* Bar – Payment Methods */}
        <div className="bg-gray-50 p-5 rounded-lg">
          <Bar data={paymentData} options={barOptions} />
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Based on {orders.length} orders • Last updated {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}

export default OrderChart;