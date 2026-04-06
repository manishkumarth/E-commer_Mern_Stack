import { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCartPlus, FaHistory, FaUserCircle, FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';
import { logout } from '../features/auth_slice';
import { resetCart } from '../features/cart';
import { searcContext } from '../context/searchcontext';
import SearchByAi from './searchByAi';

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

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setSearchMode(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <NavLink 
              to="/" 
              onClick={closeMenu}
              className="text-2xl font-bold text-pink-400 hover:text-pink-300"
            >
              ShopShe
            </NavLink>

          <SearchByAi />
            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onFocus={() => setSearchMode(true)}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-2.5 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {isAuth && role === "user" && (
                <>
                  <NavLink to="/cart" onClick={() => setSearchMode(false)} className="relative text-gray-300 hover:text-white">
                    <FaCartPlus size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                  <NavLink to="/order" onClick={() => setSearchMode(false)} className="text-gray-300 hover:text-white">
                    <FaHistory size={24} />
                  </NavLink>
                </>
              )}

              {isAuth && role === "seller" && (
                <NavLink to="/admin_dashboard" className="text-gray-200 hover:text-pink-400 font-medium">Dashboard</NavLink>
              )}

              {isAuth ? (
                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-red-400">
                  <FaSignOutAlt size={22} /> <span className="hidden lg:inline">Logout</span>
                </button>
              ) : (
                <div className="flex items-center gap-6">
                  <NavLink to="/login" className="text-gray-300 hover:text-white">Login</NavLink>
                  <NavLink to="/register" className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-medium">Register</NavLink>
                </div>
              )}
            </nav>

            {/* Hamburger Button - Hide when menu is open */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-3 text-white hover:bg-gray-800 rounded-lg transition-colors ${
                mobileMenuOpen ? 'hidden' : ''
              }`}
            >
              <FaBars size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* ====================== MOBILE MENU ====================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-950/95 z-[999] md:hidden overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={handleOverlayClick}
          >
            <div 
              className="pt-24 px-6 pb-12 min-h-screen flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button - Now clearly visible at top right */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={closeMenu}
                  className="text-white p-3 hover:bg-gray-800 rounded-xl transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes size={32} />
                </button>
              </div>

              {/* Search */}
              <div className="mb-12">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onFocus={() => setSearchMode(true)}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-10 text-xl flex-1">
                {isAuth && role === "user" && (
                  <>
                    <NavLink 
                      to="/cart" 
                      onClick={closeMenu} 
                      className="flex items-center gap-5 text-gray-100 hover:text-pink-400"
                    >
                      <FaCartPlus size={32} /> Cart {cartCount > 0 && `(${cartCount})`}
                    </NavLink>

                    <NavLink 
                      to="/order" 
                      onClick={closeMenu} 
                      className="flex items-center gap-5 text-gray-100 hover:text-pink-400"
                    >
                      <FaHistory size={32} /> My Orders
                    </NavLink>
                  </>
                )}

                {isAuth && role === "seller" && (
                  <NavLink 
                    to="/admin_dashboard" 
                    onClick={closeMenu} 
                    className="flex items-center gap-5 text-gray-100 hover:text-pink-400"
                  >
                    <FaUserCircle size={32} /> Dashboard
                  </NavLink>
                )}
              </div>

              {/* Auth Section */}
              <div className="mt-auto pt-12 border-t border-gray-700">
                {isAuth ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-5 w-full py-5 text-left text-red-400 hover:text-red-500 text-xl"
                  >
                    <FaSignOutAlt size={32} /> Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-4">
                    <NavLink 
                      to="/login" 
                      onClick={closeMenu}
                      className="py-5 text-center bg-gray-800 hover:bg-gray-700 rounded-2xl text-lg font-medium"
                    >
                      Login
                    </NavLink>
                    <NavLink 
                      to="/register" 
                      onClick={closeMenu}
                      className="py-5 text-center bg-pink-600 hover:bg-pink-700 text-white rounded-2xl text-lg font-medium"
                    >
                      Create Account
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;