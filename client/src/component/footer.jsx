import logo from '../assets/logo.png'

function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100 border-t">

            <div className="max-w-7xl mx-auto px-4 py-14">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Logo + About */}
                    <div>
                        <img src={logo} className="h-10 mb-4" alt="logo" />
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Build your dream store with us. Simple, fast and reliable platform
                            for modern eCommerce solutions.
                        </p>

                        {/* Social Icons */}
                        <div className="flex mt-5 gap-4">
                            <div className="p-2 rounded-full bg-white shadow hover:scale-110 transition cursor-pointer">📘</div>
                            <div className="p-2 rounded-full bg-white shadow hover:scale-110 transition cursor-pointer">📸</div>
                            <div className="p-2 rounded-full bg-white shadow hover:scale-110 transition cursor-pointer">🐦</div>
                            <div className="p-2 rounded-full bg-white shadow hover:scale-110 transition cursor-pointer">💻</div>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="hover:text-black cursor-pointer">About</li>
                            <li className="hover:text-black cursor-pointer">Team</li>
                            <li className="hover:text-black cursor-pointer">Careers</li>
                            <li className="hover:text-black cursor-pointer">Blog</li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Services</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="hover:text-black cursor-pointer">Web Development</li>
                            <li className="hover:text-black cursor-pointer">App Development</li>
                            <li className="hover:text-black cursor-pointer">SEO</li>
                            <li className="hover:text-black cursor-pointer">Marketing</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mb-3">
                            Subscribe for latest updates & offers.
                        </p>

                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full px-3 py-2 text-sm border rounded-l-lg outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
                                Join
                            </button>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">

                    <p>© {new Date().getFullYear()} YourStore. All rights reserved.</p>

                    <div className="flex gap-4 mt-3 md:mt-0">
                        <span className="hover:text-black cursor-pointer">Privacy</span>
                        <span className="hover:text-black cursor-pointer">Terms</span>
                        <span className="hover:text-black cursor-pointer">Support</span>
                    </div>

                </div>

            </div>
        </footer>
    )
}

export default Footer;