import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {getAllProduct} from "../../services/product" ; 

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function ProductChart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllProduct();
        // Adjust based on your API response structure (res.data / res / etc.)
        setProducts(res?.data || res || []);
      } catch (err) {
        console.error("Failed to load products for chart", err);
        setError("Could not load product data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading product statistics...
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        {error || "No products available to display charts."}
      </div>
    );
  }

  // ────────────────────────────────────────────────
  //  1. Products by Category (Pie Chart)
  // ────────────────────────────────────────────────
  const categoryMap = products.reduce((acc, product) => {
    const cat = product.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        label: "Number of Products",
        data: Object.values(categoryMap),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
        ],
        hoverOffset: 20,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Products Distribution by Category",
        font: { size: 18 },
      },
    },
  };

  // ────────────────────────────────────────────────
  //  2. Stock Levels – Top 10 Products by Stock (Bar Chart)
  // ────────────────────────────────────────────────
  const sortedByStock = [...products]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 10);

  const stockData = {
    labels: sortedByStock.map((p) => p.title?.substring(0, 25) + (p.title?.length > 25 ? "..." : "")),
    datasets: [
      {
        label: "Current Stock",
        data: sortedByStock.map((p) => p.stock || 0),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    indexAxis: "y", // horizontal bars – better for long product names
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Top 10 Products by Stock Level",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Stock Quantity",
        },
      },
    },
  };

  // ────────────────────────────────────────────────
  //  3. Optional: Price Distribution (simple histogram-like bar)
  // ────────────────────────────────────────────────
  // You can bin prices if you want – here just showing average price per category
  const avgPriceByCategory = Object.keys(categoryMap).map((cat) => {
    const catProducts = products.filter((p) => (p.category || "Uncategorized") === cat);
    const avg = catProducts.reduce((sum, p) => sum + (Number(p.price) || 0), 0) / catProducts.length;
    return { category: cat, avgPrice: avg || 0 };
  });

  const priceData = {
    labels: avgPriceByCategory.map((item) => item.category),
    datasets: [
      {
        label: "Average Price (₹)",
        data: avgPriceByCategory.map((item) => item.avgPrice.toFixed(0)),
        backgroundColor: "rgba(255, 159, 64, 0.7)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Statistics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart – Category Distribution */}
        <div className="bg-gray-50 p-5 rounded-lg">
          <Pie data={categoryData} options={pieOptions} />
        </div>

        {/* Bar Chart – Stock Levels */}
        <div className="bg-gray-50 p-5 rounded-lg">
          <Bar data={stockData} options={barOptions} />
        </div>

        {/* Optional Bar – Average Price per Category */}
        <div className="bg-gray-50 p-5 rounded-lg lg:col-span-2">
          <Bar
            data={priceData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: {
                  display: true,
                  text: "Average Price per Category (₹)",
                  font: { size: 18 },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Average Price" },
                },
              },
            }}
          />
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-8">
        Data based on {products.length} products • Last updated{" "}
        {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}

export default ProductChart;