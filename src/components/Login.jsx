import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundimage.jpg';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        if(email === "admin@test.com" && password === "123456") {
            localStorage.setItem("userToken", "abc-123");
            alert("Login Successful!");
            navigate("/");
        } else {
            alert("Galat details!");
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <form onSubmit={handleLogin} className="bg-white/90 p-8 rounded shadow-md w-96 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                
                <input 
                    type="email" 
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                <input 
                    type="password" 
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">
                    Login
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Naya account chahiye? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Register karein</span>
                </p>
            </form>
        </div>
    );
};

export default Login;