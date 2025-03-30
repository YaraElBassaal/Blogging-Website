import { useState } from "react";
import axios from "axios";
import "./Login.css"; // ✅ Import the CSS file

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        localStorage.setItem("name", JSON.stringify(name));

        try {
            const response = await axios.post("http://localhost:5000/users/login", {
                name,
                password,
            });

            console.log("Login successful:", response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);

            window.location.href = "/"; // Redirect to home page
        } catch (err) {
            console.error("Login failed:", err.response?.data?.message);
            setError(err.response?.data?.message || "Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
