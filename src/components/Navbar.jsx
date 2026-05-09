import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("userToken"); 

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        navigate("/login");
    };

    return (
        <div className="w-full bg-slate-500 h-16 px-4 sm:px-14 flex items-center justify-between">
            <h1 className="text-white text-xl sm:text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                Em Service
            </h1>
            
            <div className="space-x-2 sm:space-x-4 ml-auto flex items-center">
                {isAuthenticated ? (
                    <>
                        <Link to="/" className="text-white hover:text-blue-400 text-sm sm:text-base">Home</Link>
                        <Link to="/profile" className="text-white hover:text-blue-400 text-sm sm:text-base">Profile</Link>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm sm:text-base transition">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-white hover:text-blue-400 text-sm sm:text-base">Login</Link>
                        <Link to="/register" className="text-white hover:text-blue-400 text-sm sm:text-base">Register</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar