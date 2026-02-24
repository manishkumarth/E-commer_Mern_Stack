import { NavLink, useNavigate } from 'react-router-dom';
import { FaCartPlus, FaHistory } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth_slice';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion'
import { searcContext } from '../context/searchcontext';
import {resetCart} from '../features/cart'

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart_count = useSelector(state => state.cart.cartCount);
    const isAuth = useSelector(state => state.user.isAuth);

   const {search, setSearch,setSearchMode}=useContext(searcContext)

    const handleGetCart = async () => {
        if (!isAuth) return;
        // You can add logic to fetch cart here
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetCart())
        navigate('/');
    };

    return (

        <header className='w-full bg-gray-700 sticky top-0 z-50 p-2'>
        <div className="md:mx-6 mx-1 my-2 bg-pink-400 rounded-3xl ">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between md:mx-20 md:my-5 p-2">
                    {/* Logo */}
                    <NavLink to="/" onClick={()=>setSearchMode(false)}>
                        <h2 className='md:text-2xl md:font-bold'>Shop_She</h2>
                    </NavLink>

                    {/* Search */}
                    <div className="mt-2 sm:mt-0 flex-1 max-w-full sm:max-w-md md:max-w-lg mx-2">
                        <input
                            type="text"
                            placeholder="Search product..."
                            value={search}
                            onFocus={()=>setSearchMode(true)}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className='md:hidden block'>
                        <CiMenuFries />
                    </div>
                    {/* Right Icons / Auth Links */}
                    <div className="md:block hidden mt-2 sm:mt-0 flex items-center gap-4">
                        <ul className="flex items-center gap-5">
                            <li>
                                <NavLink onClick={()=>{
                                    handleGetCart
                                    setSearchMode(false)
                                }} to="/cart" className="relative flex items-center">
                                    <FaCartPlus className="text-xl" />
                                    {cart_count > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                                            {cart_count}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order" onClick={()=>setSearchMode(false)}>
                                    <FaHistory className="text-xl" />
                                </NavLink>
                            </li>

                            {localStorage.getItem("token") ? (
                                <li>
                                    <FaArrowRightFromBracket
                                        className="text-xl cursor-pointer"
                                        onClick={handleLogout}
                                    />
                                </li>
                            ) : (
                                <>
                                    <li >
                                        <NavLink onClick={()=>setSearchMode(false)} className="underline hover:no-underline" to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={()=>setSearchMode(false)} className="underline hover:no-underline" to="/register">Register</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </motion.div>
            </div>
        </header>

    );
}

export default Header;
