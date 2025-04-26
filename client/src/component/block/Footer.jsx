import React from "react";
import {LayoutGrid, Home, User } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom";

const Footer = React.memo(function Footer(){
    const navigate = useNavigate();
    const location = useLocation();

    // Check if current route matches the path
    const isActive = (path) => location.pathname === path;

    return(
        <footer className="bg-primary py-3 px-8 rounded-t-3xl fixed bottom-0 w-full md:max-w-[680px] left-0 md:left-1/2 md:-translate-x-1/2 z-40">
            <div className="flex justify-between items-center">
                <button 
                    onClick={()=>navigate("/services")} 
                    className={`p-2 rounded-full ${isActive('/services') ? 'bg-white text-primary' : 'bg-white/20 text-white'} transition-colors`}
                >
                    <LayoutGrid /> 
                </button>

                <button 
                    onClick={()=>navigate("/")} 
                    className={`p-2 rounded-full ${isActive('/') ? 'bg-white text-primary' : 'bg-white/20 text-white'} transition-colors`}
                >
                    <Home/>
                </button>

                <button 
                    onClick={()=>navigate("/profile")} 
                    className={`p-2 rounded-full ${isActive('/profile') ? 'bg-white text-primary' : 'bg-white/20 text-white'} transition-colors`}
                >
                    <User/>
                </button>
            </div>
        </footer>
    )
});

export default Footer;