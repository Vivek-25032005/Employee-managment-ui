import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/backgroundimage.jpg';
import EmployeeService from '../services/EmployeeService';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await EmployeeService.register({ name, email, password });
            
            alert("Registration Successful! Ab login karein.");
            navigate("/login"); 
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed: " + (error.response?.data?.message || "Please try again"));
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
            <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
                
                <input 
                    type="text" 
                    placeholder="Full Name"
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input 
                    type="email" 
                    placeholder="Email Address"
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
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200 disabled:opacity-50"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Pehle se account hai? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Login karein</span>
                </p>
            </form>
        </div>
    );
};

export default Register;