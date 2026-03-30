import { useState } from "react";
import Orders from "../admincomponents/orders";
import ProductList from "../admincomponents/product_list";
import UserList from "../admincomponents/user_list";
import ProductChart from "../admincomponents/charts/product_chart";
import OrderChart from "../admincomponents/charts/orders"; // corrected path

function AdminDashboard() {
  const [mainView, setMainView] = useState(null);           // null = overview
  const [subView, setSubView] = useState("list");           // "list" | "chart"   (for products & orders)

  // Reset sub-view when changing main section
  const handleSetMainView = (view) => {
    setMainView(view);
    setSubView("list"); // default to list when entering a new section
  };

  if (mainView) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h1 className="text-3xl font-bold text-gray-900 capitalize">
              {mainView} Management
            </h1>
            <button
              onClick={() => setMainView(null)}
              className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg font-medium transition shadow-sm whitespace-nowrap"
            >
              ← Back to Dashboard
            </button>
          </div>

          {/* Tabs / Switch buttons – only for products & orders */}
          {(mainView === "products" || mainView === "orders") && (
            <div className="mb-6 border-b border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => setSubView("list")}
                  className={`
                    pb-3 px-4 font-medium text-sm transition-colors
                    ${subView === "list"
                      ? "border-b-2 border-blue-600 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"}
                  `}
                >
                  List View
                </button>

                <button
                  onClick={() => setSubView("chart")}
                  className={`
                    pb-3 px-4 font-medium text-sm transition-colors
                    ${subView === "chart"
                      ? "border-b-2 border-blue-600 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"}
                  `}
                >
                  Analytics / Charts
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          <div>
            {mainView === "users" && <UserList />}

            {mainView === "products" && (
              <>
                {subView === "list" && <ProductList />}
                {subView === "chart" && <ProductChart />}
              </>
            )}

            {mainView === "orders" && (
              <>
                {subView === "list" && <Orders />}
                {subView === "chart" && <OrderChart />}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────
  //              Overview Cards
  // ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center sm:text-left mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-3 text-lg text-gray-600">
            Manage users, products, orders and view analytics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <button
            onClick={() => handleSetMainView("users")}
            className="group bg-white p-8 rounded-xl shadow hover:shadow-xl border border-gray-200 transition-all duration-300 text-left hover:-translate-y-1"
          >
            <div className="text-4xl mb-5">👥</div>
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
              Users
            </h2>
            <p className="mt-3 text-gray-600">
              Manage user accounts, roles, permissions
            </p>
          </button>

          <button
            onClick={() => handleSetMainView("products")}
            className="group bg-white p-8 rounded-xl shadow hover:shadow-xl border border-gray-200 transition-all duration-300 text-left hover:-translate-y-1"
          >
            <div className="text-4xl mb-5">📦</div>
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
              Products
            </h2>
            <p className="mt-3 text-gray-600">
              Catalog, stock, prices • category & stock charts
            </p>
          </button>

          <button
            onClick={() => handleSetMainView("orders")}
            className="group bg-white p-8 rounded-xl shadow hover:shadow-xl border border-gray-200 transition-all duration-300 text-left hover:-translate-y-1"
          >
            <div className="text-4xl mb-5">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
              Orders
            </h2>
            <p className="mt-3 text-gray-600">
              Track & update orders • revenue & status analytics
            </p>
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          Last updated • {new Date().toLocaleDateString("en-IN")}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;