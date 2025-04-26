import { User, Menu, X, Home, Package, PhoneCall, HelpCircle, LogOut, Settings, Info, FileText, Heart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if current route matches the nav item
    const isActive = (path) => location.pathname === path;

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Home", path: "/", icon: <Home size={16} /> },
        { label: "Services", path: "/services", icon: <Package size={16} /> },
        { label: "Contact", path: "/contact-support", icon: <PhoneCall size={16} /> },
        { label: "Help", path: "/faq", icon: <HelpCircle size={16} /> }
    ];
    
    // Additional menu items for mobile menu
    const mobileMenuItems = [
        { label: "Saved Services", path: "/saved-services", icon: <Heart size={16} /> },
        { label: "About Us", path: "/about", icon: <Info size={16} /> },
        { label: "Privacy Policy", path: "/privacy", icon: <FileText size={16} /> },
        { label: "Terms & Conditions", path: "/terms", icon: <FileText size={16} /> },
        { label: "Settings", path: "/preferences", icon: <Settings size={16} /> }
    ];
    
    // Handle logout
    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('authToken');
            window.location.reload();
        }
    };

    return (
        <header className="relative z-50">
            <div 
                className="w-full fixed top-0 transition-all duration-300 bg-primary py-3 rounded-b-xl md:rounded-none shadow-md"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div 
                            onClick={() => navigate("/")} 
                            className="flex items-center cursor-pointer"
                        >
                            <img 
                                src="/img/logo/logo-white.png" 
                                className="w-[110px] max-h-8 transition-opacity duration-300" 
                                alt="NEZTO"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/img/logo/logo-header.png";
                                }}
                            />
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center text-sm font-medium transition-colors ${
                                        isActive(item.path)
                                            ? "text-white border-b-2 border-white"
                                            : "text-white/80 hover:text-white"
                                    }`}
                                >
                                    <span className="mr-1">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                            

                            
                            {/* Profile button */}
                            <button
                                onClick={() => navigate("/profile")}
                                className="flex items-center justify-center w-9 h-9 rounded-full transition-all bg-white/20 hover:bg-white/30 text-white"
                            >
                                <User size={18} />
                            </button>
                        </nav>

                        {/* Mobile menu button */}
                        <div className="flex items-center space-x-3 md:hidden">
                            <button
                                onClick={() => navigate("/profile")}
                                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                                    isScrolled 
                                        ? "bg-primary/10 hover:bg-primary/20 text-primary" 
                                        : "bg-white/20 hover:bg-white/30 text-white"
                                }`}
                            >
                                <User size={18} />
                            </button>
                            
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                                className="p-2 rounded-md text-white"
                            >
                                <motion.div
                                    animate={mobileMenuOpen ? "open" : "closed"}
                                    variants={{
                                        open: { rotate: 180 },
                                        closed: { rotate: 0 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                                </motion.div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu with animation */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div 
                            className="md:hidden bg-white shadow-lg overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="px-2 pt-2 pb-3 sm:px-3">
                                <div className="border-b border-gray-200 pb-2 mb-2">
                                    <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navigation</p>
                                    {navItems.map((item) => (
                                        <motion.button
                                            key={item.path}
                                            onClick={() => {
                                                navigate(item.path);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                                                isActive(item.path)
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span className="mr-2">{item.icon}</span>
                                            {item.label}
                                        </motion.button>
                                    ))}
                                </div>
                                
                                <div className="border-b border-gray-200 pb-2 mb-2">
                                    <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">More</p>
                                    {mobileMenuItems.map((item) => (
                                        <motion.button
                                            key={item.path}
                                            onClick={() => {
                                                navigate(item.path);
                                                setMobileMenuOpen(false);
                                            }}
                                            className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span className="mr-2">{item.icon}</span>
                                            {item.label}
                                        </motion.button>
                                    ))}
                                </div>
                                
                                <div className="pt-2">
                                    <motion.button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span className="mr-2"><LogOut size={16} /></span>
                                        Logout
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className={`h-16 ${mobileMenuOpen ? "md:h-16" : ""}`}></div>
        </header>
    );
}

export default NavBar;