import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  MdDashboard, 
  MdPeople, 
  MdInventory, 
  MdShoppingCart, 
  MdAddCircle 
} from "react-icons/md";

function AdminDashboard() {
  const location = useLocation();

  const auth = useSelector((state) => state.user) || {};
  const user = auth.user || {};

  const displayName = user.username || user.name || "Admin";

  const isDashboardHome = location.pathname === "/admin_dashboard";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center lg:hidden">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900"> Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm text-gray-500">
            {new Date().toLocaleDateString('en-IN', { 
              weekday: 'short', month: 'short', day: 'numeric' 
            })}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="font-medium text-gray-800">{displayName}</p>
              <p className="text-xs text-emerald-600">● Online</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col">
          <nav className="flex-1 p-6 space-y-2">
            <Link 
              to="/admin_dashboard" 
              className="flex items-center gap-4 px-6 py-4 rounded-3xl text-base font-medium hover:bg-gray-100 transition-all"
            >
              <MdDashboard size={24} className="text-gray-500" />
              Dashboard
            </Link>
            <Link 
              to="/admin_dashboard/users" 
              className="flex items-center gap-4 px-6 py-4 rounded-3xl text-base font-medium hover:bg-gray-100 transition-all"
            >
              <MdPeople size={24} className="text-gray-500" />
              Users
            </Link>
            <Link 
              to="/admin_dashboard/products" 
              className="flex items-center gap-4 px-6 py-4 rounded-3xl text-base font-medium hover:bg-gray-100 transition-all"
            >
              <MdInventory size={24} className="text-gray-500" />
              All Products
            </Link>
            <Link 
              to="/admin_dashboard/orders" 
              className="flex items-center gap-4 px-6 py-4 rounded-3xl text-base font-medium hover:bg-gray-100 transition-all"
            >
              <MdShoppingCart size={24} className="text-gray-500" />
              Orders
            </Link>
            <Link 
              to="/admin_dashboard/create_product" 
              className="flex items-center gap-4 px-6 py-4 rounded-3xl text-base font-medium bg-blue-600 text-white mt-4"
            >
              <MdAddCircle size={24} />
              Add New Product
            </Link>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-5 md:p-8 lg:p-10">

            {/* Dashboard Home with Cards - Starts from top */}
            {isDashboardHome ? (
              <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Welcome back, {displayName.split(" ")[0]}
                  </h2>
                  <p className="text-gray-600 mt-2 text-lg">
                    Manage your store from here
                  </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <Link to="/admin_dashboard/users" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-blue-200 h-full">
                      <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MdPeople size={36} className="text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Users</h3>
                      <p className="text-gray-500">Manage all customers & users</p>
                    </div>
                  </Link>

                  <Link to="/admin_dashboard/products" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-purple-200 h-full">
                      <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MdInventory size={36} className="text-purple-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Products</h3>
                      <p className="text-gray-500">View and manage inventory</p>
                    </div>
                  </Link>

                  <Link to="/admin_dashboard/orders" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-green-200 h-full">
                      <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MdShoppingCart size={36} className="text-green-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Orders</h3>
                      <p className="text-gray-500">Track customer orders</p>
                    </div>
                  </Link>

                  <Link to="/admin_dashboard/create_product" className="group sm:col-span-2 lg:col-span-1">
                    <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-orange-200 h-full flex flex-col">
                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <MdAddCircle size={36} className="text-orange-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Add New Product</h3>
                      <p className="text-gray-500 flex-1">Quickly add a new item to your store</p>
                      <button className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-2xl font-medium transition">
                        Create Product Now →
                      </button>
                    </div>
                  </Link>

                </div>
              </div>
            ) : (
              /* Other pages like CreateProduct, Users, Orders will render here */
              <div className="max-w-5xl mx-auto">
                <Outlet />
              </div>
            )}

          </main>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-xl">
        <div className="flex justify-around py-3 px-2">
          {[
            { to: "/admin_dashboard", icon: <MdDashboard size={26} />, label: "Home" },
            { to: "/admin_dashboard/users", icon: <MdPeople size={26} />, label: "Users" },
            { to: "/admin_dashboard/products", icon: <MdInventory size={26} />, label: "Products" },
            { to: "/admin_dashboard/orders", icon: <MdShoppingCart size={26} />, label: "Orders" },
            { to: "/admin_dashboard/create_product", icon: <MdAddCircle size={26} />, label: "Add" },
          ].map((item, index) => (
            <Link 
              key={index}
              to={item.to}
              className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
                location.pathname === item.to || location.pathname.startsWith(item.to + "/") 
                  ? 'text-blue-600 scale-110' 
                  : 'text-gray-500'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;