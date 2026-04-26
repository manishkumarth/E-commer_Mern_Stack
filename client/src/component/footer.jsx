import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <img 
                                src={logo} 
                                alt="ShopShe Logo" 
                                className="h-10 w-auto" 
                            />
                            <h2 className="text-3xl font-bold text-white tracking-tight">ShopShe</h2>
                        </div>
                        
                        <p className="text-gray-400 leading-relaxed max-w-md">
                            Your trusted destination for quality products. Shop with confidence 
                            and enjoy fast delivery, secure payments, and excellent customer service.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-4 mt-8">
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 transition rounded-full flex items-center justify-center text-xl">
                                📘
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 transition rounded-full flex items-center justify-center text-xl">
                                📸
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 transition rounded-full flex items-center justify-center text-xl">
                                𝕏
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 transition rounded-full flex items-center justify-center text-xl">
                                ▶️
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">Shop</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
                            <li><Link to="/category/electronics" className="hover:text-white transition">Electronics</Link></li>
                            <li><Link to="/category/fashion" className="hover:text-white transition">Fashion</Link></li>
                            <li><Link to="/category/home" className="hover:text-white transition">Home & Kitchen</Link></li>
                            <li><Link to="/category/beauty" className="hover:text-white transition">Beauty</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition">Track Your Order</a></li>
                            <li><a href="#" className="hover:text-white transition">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-white transition">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-5">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition">Press</a></li>
                            <li><a href="#" className="hover:text-white transition">Our Stores</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    
                    <div className="text-gray-400">
                        © {new Date().getFullYear()} ShopShe. All Rights Reserved.
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-400">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                        <a href="#" className="hover:text-white transition">Cookies</a>
                        <a href="#" className="hover:text-white transition">Accessibility</a>
                    </div>

                    {/* Payment Methods */}
                    <div className="flex gap-4 text-2xl opacity-75">
                        <span>💳</span>
                        <span>🪙</span>
                        <span>📱</span>
                        <span>🏦</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;