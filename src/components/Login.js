import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./ApiCalls";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(username, password);
            if (user) {
                setIsLoggedIn(true);
                setToken(user.token);
                localStorage.setItem("token", user.token);
                setError("");
                navigate("/");
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.id === "username") {
            setUsername(e.target.value);
        } else if (e.target.id === "password") {
            setPassword(e.target.value);
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-green p-8 shadow-md rounded-md w-96 border-4 border-red-200 w-96">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Username</label>
                        <input type="text" id="username"  value={username}  onChange={handleChange} className="w-full border-2 border-gray-200 p-2 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password</label>
                        <input type="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="w-full border-2 border-gray-200 p-2 rounded-md"/>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
                    </div>
                    <div className="mb-4">
                        <p className="text-red-500">{error}</p>
                    </div>
                </form>
                {error && <p className="text-red-500">{setError}</p>}
                <p>Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>
            </div>
        </div>
    )
}


export default Login;