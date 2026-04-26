import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCartPlus, FaHistory, FaSignOutAlt, FaBars, FaCamera, FaTimes, FaSearch } from 'react-icons/fa';

import { logout } from '../features/auth_slice';
import { resetCart } from '../features/cart';
import { searcContext } from '../context/searchcontext';
import SearchByAi from './searchByAi';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  const {
    search,
    setSearch,
    resetToNormalMode,
    enterResultsView
  } = useContext(searcContext);

  const isAuth = useSelector(state => state.user.isAuth);
  const role = useSelector(state => state.user.role);
  const cartCount = useSelector(state => state.cart.cartCount);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAiSearch, setShowAiSearch] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    resetToNormalMode();
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleSearchFocus = () => {
    enterResultsView();
    closeMobileMenu();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const openAiSearch = () => {
    resetToNormalMode();
    setShowAiSearch(true);
    closeMobileMenu();
  };

  const openSearch = () => {
    enterResultsView();
    closeMobileMenu();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <NavLink
              to="/"
              onClick={() => { resetToNormalMode(); closeMobileMenu(); }}
              className="text-2xl font-bold text-pink-400 hover:text-pink-300"
            >
              ShopShe
            </NavLink>

            {/* ==================== DESKTOP SEARCH ==================== */}
            {
              (user.role !== "seller" && user.role !== "admin") && (<>
                <div className="hidden md:block flex-1 max-w-xl mx-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={search}
                      onFocus={handleSearchFocus}
                      onChange={handleSearchChange}
                      className="w-full px-5 py-2.5 pl-12 bg-gray-800 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                {/* AI Image Search - Desktop  */}
                <button
                  onClick={openAiSearch}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-full border border-gray-700"
                >
                  <FaCamera size={18} />
                  <span className="hidden sm:inline">AI Search by Image</span>
                </button>
              </>)}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {isAuth && role === "user" && (
                <>
                  <NavLink to="/cart" onClick={resetToNormalMode} className="relative text-gray-300 hover:text-white">
                    <FaCartPlus size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                  <NavLink to="/order" onClick={resetToNormalMode} className="text-gray-300 hover:text-white">
                    <FaHistory size={24} />
                  </NavLink>
                </>
              )}

              {isAuth ? (
                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-red-400">
                  <FaSignOutAlt size={22} /> Logout
                </button>
              ) : (
                <div className="flex items-center gap-6">
                  <NavLink to="/login" className="text-gray-300 hover:text-white">Login</NavLink>
                  <NavLink to="/register" className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-medium">Register</NavLink>
                </div>
              )}
            </nav>

            {/* ==================== MOBILE BUTTONS ==================== */}
            <div className="flex items-center gap-2 md:hidden">
              {
                (user.role !== "seller" && user.role !== "admin") && (<>
                  <button
                    onClick={openSearch}
                    className="p-3 text-white hover:bg-gray-800 rounded-lg"
                  >
                    <FaSearch size={24} />
                  </button>
                  <button
                    onClick={openAiSearch}
                    className="p-3 text-white hover:bg-gray-800 rounded-lg"
                  >
                    <FaCamera size={24} />
                  </button>
                </>)}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3 text-white hover:bg-gray-800 rounded-lg"
              >
                {mobileMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-900 border-t border-gray-800"
            >
              <div className="px-4 py-6 flex flex-col gap-6 text-lg">
                {isAuth && role === "user" && (
                  <>
                    <NavLink to="/cart" onClick={closeMobileMenu} className="flex items-center gap-3 text-gray-300 hover:text-white py-3">
                      <FaCartPlus size={24} /> Cart {cartCount > 0 && `(${cartCount})`}
                    </NavLink>
                    <NavLink to="/order" onClick={closeMobileMenu} className="flex items-center gap-3 text-gray-300 hover:text-white py-3">
                      <FaHistory size={24} /> Order History
                    </NavLink>
                  </>
                )}

                {isAuth ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-400 hover:text-red-500 py-3 text-left"
                  >
                    <FaSignOutAlt size={24} /> Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
                    <NavLink to="/login" onClick={closeMobileMenu} className="text-gray-300 hover:text-white py-3">Login</NavLink>
                    <NavLink to="/register" onClick={closeMobileMenu} className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-center font-medium">Register</NavLink>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* AI Search Modal */}
      <AnimatePresence>
        {showAiSearch && (
          <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">AI Image Search</h2>
                <button onClick={() => setShowAiSearch(false)} className="text-3xl text-gray-500 hover:text-black">✕</button>
              </div>
              <div className="p-6">
                <SearchByAi onClose={() => setShowAiSearch(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;