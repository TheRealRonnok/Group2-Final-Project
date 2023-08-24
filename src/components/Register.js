import { registerUser } from "./ApiCalls";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!username || !password || !confirmPassword) {
            setError("Please fill out all fields");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match");
        } else if (password.length < 6) {
            setError("Password must be at least 6 characters");
        } else if (username.length < 3) {
            setError("Username must be at least 3 characters");
        } else {
            try {
                console.log({username, password})
                const user = await registerUser(username, password);
                    setToken(user.token);
                    localStorage.setItem("token", user.token);
                    setError("");
                    navigate("./Login");
                    alert ("Registration successful! Please login.");
                    return user; 
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleUsername = (e) => { 
        setUsername(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    localStorage.setItem("token", token);

    const handleChange = (e) => {
        if (e.target.id === "username") {
            setUsername(e.target.value);
        } else if (e.target.id === "password") {
            setPassword(e.target.value);
        } else if (e.target.id === "confirmPassword") {
            setConfirmPassword(e.target.value);
        }
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-green p-8 shadow-md rounded-md w-96 border-4 border-red-200 w-96">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Username</label>
                        <input type="text" id="username" value={username} onChange={handleChange} className="w-full border-2 border-gray-200 p-2 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input type="password" id="password" value={password} onChange={handleChange} className="w-full border-2 border-gray-200 p-2 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleChange} className="w-full border-2 border-gray-200 p-2 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Register</button>
                    </div>
                    <div className="mb-4">
                        <p className="text-red-500">{error}</p>
                    </div>
                </form>
                {error && <p className="text-red-500">{setError}</p>}
                <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
            </div>
        </div>
    );


};

export default Register;