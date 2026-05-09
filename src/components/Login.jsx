import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundimage.jpg';
import EmployeeService from '../services/EmployeeService';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await EmployeeService.login({ email, password });
            console.log("Login response:", response.data);
            
            // Handle different possible token field names from backend
            const token = response.data?.token || 
                         response.data?.jwtToken || 
                         response.data?.accessToken || 
                         response.data?.id ||
                         response.data;
            
            if (token) {
                localStorage.setItem("userToken", JSON.stringify(token));
                alert("Login Successful!");
                navigate("/");
            } else {
                console.error("No token found in response:", response.data);
                alert("Login failed: Invalid response from server");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + (error.response?.data?.message || "Please check your credentials"));
        } finally {
            setLoading(false);
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
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Naya account chahiye? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Register karein</span>
                </p>
            </form>
        </div>
    );
};

export default Login;