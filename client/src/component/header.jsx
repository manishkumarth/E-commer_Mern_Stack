import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCartPlus, 
  FaHistory, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';
import { logout } from '../features/auth_slice';
import { resetCart } from '../features/cart';
import { searcContext } from '../context/searchcontext';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search, setSearch, setSearchMode } = useContext(searcContext);

  const isAuth = useSelector(state => state.user.isAuth);
  const role = useSelector(state => state.user.role);
  const cartCount = useSelector(state => state.cart.cartCount);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    setMobileMenuOpen(false);
    navigate('/');
  };

  const closeMenuAndResetSearch = () => {
    setMobileMenuOpen(false);
    setSearchMode(false);
  };

  // Mobile menu animation variants
  const menuVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: "-100%", transition: { duration: 0.3 } }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">

          {/* Logo */}
          <NavLink 
            to="/" 
            onClick={closeMenuAndResetSearch}
            className="text-2xl md:text-3xl font-bold text-pink-400 hover:text-pink-300 transition-colors"
          >
            ShopShe
          </NavLink>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onFocus={() => setSearchMode(true)}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-5 pr-4 py-2.5 bg-gray-800/70 border border-gray-700 rounded-full 
                           text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-pink-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {isAuth && role === "user" && (
              <>
                <NavLink 
                  to="/cart" 
                  onClick={() => setSearchMode(false)}
                  className="relative text-gray-300 hover:text-white transition-colors"
                >
                  <FaCartPlus size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                                     font-bold rounded-full min-w-[18px] h-5 flex items-center justify-center px-1">
                      {cartCount}
                    </span>
                  )}
                </NavLink>

                <NavLink 
                  to="/order" 
                  onClick={() => setSearchMode(false)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <FaHistory size={22} />
                </NavLink>
              </>
            )}

            {isAuth && role === "seller" && (
              <NavLink 
                to="/admin_dashboard" 
                className="text-gray-200 hover:text-pink-400 font-medium transition-colors"
              >
                Dashboard
              </NavLink>
            )}

            {isAuth ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
              >
                <FaSignOutAlt size={20} />
                <span className="hidden lg:inline">Logout</span>
              </button>
            ) : (
              <div className="flex items-center gap-5">
                <NavLink 
                  to="/login" 
                  onClick={() => setSearchMode(false)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  onClick={() => setSearchMode(false)}
                  className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full 
                             font-medium transition-colors shadow-sm"
                >
                  Register
                </NavLink>
              </div>
            )}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* ────────────────────────────────────────────────
          MOBILE MENU – full screen from top, no extra pt
      ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-gray-950/95 backdrop-blur-lg z-[999] overflow-y-auto"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="flex flex-col min-h-screen px-6 py-8">

              {/* Search bar at the top */}
              <div className="mb-10">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onFocus={() => setSearchMode(true)}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-5 py-3.5 bg-gray-800/70 border border-gray-700 rounded-full 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-pink-500"
                />
              </div>

              {/* Navigation links */}
              <div className="flex flex-col gap-7 text-lg flex-grow">
                {isAuth && role === "user" && (
                  <>
                    <NavLink 
                      to="/cart" 
                      onClick={closeMenuAndResetSearch}
                      className="flex items-center gap-4 text-gray-200 hover:text-pink-400 transition-colors"
                    >
                      <FaCartPlus size={26} />
                      Cart {cartCount > 0 && `(${cartCount})`}
                    </NavLink>

                    <NavLink 
                      to="/order" 
                      onClick={closeMenuAndResetSearch}
                      className="flex items-center gap-4 text-gray-200 hover:text-pink-400 transition-colors"
                    >
                      <FaHistory size={26} />
                      Orders
                    </NavLink>
                  </>
                )}

                {isAuth && role === "seller" && (
                  <NavLink 
                    to="/admin_dashboard" 
                    onClick={closeMenuAndResetSearch}
                    className="flex items-center gap-4 text-gray-200 hover:text-pink-400 transition-colors"
                  >
                    <FaUserCircle size={26} />
                    Dashboard
                  </NavLink>
                )}
              </div>

              {/* Auth section at bottom */}
              {isAuth ? (
                <div className="mt-auto pt-10 border-t border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 w-full text-left text-gray-200 hover:text-red-400 transition-colors py-3"
                  >
                    <FaSignOutAlt size={26} />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-auto pt-10 flex flex-col gap-4">
                  <NavLink 
                    to="/login" 
                    onClick={closeMenuAndResetSearch}
                    className="text-center py-3.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors text-gray-200"
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    onClick={closeMenuAndResetSearch}
                    className="text-center py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-medium transition-colors"
                  >
                    Create Account
                  </NavLink>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;