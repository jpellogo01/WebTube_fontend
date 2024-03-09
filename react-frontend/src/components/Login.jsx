import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const history = useHistory();

    async function login(event) {
        event.preventDefault();

        // Reset previous error messages
        setUsernameError("");
        setPasswordError("");

        // Validation for username
        if (!username) {
            setUsernameError("Username is required");
            return;
        }

        // Validation for password
        if (!password) {
            setPasswordError("Password is required");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/v1/login", {
                username: username,
                password: password,
                
            });

            if (response.status === 200) {
                const { token, user } = response.data;
                const role = user.role;
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('fullName', user.fullName); // Store the full name
                onLogin(token, role);
                if (role === "ADMIN") {
                    history.push("/users");
                } else if (role === "AUTHOR") {
                    history.push("/news");
                } else {
                    console.error("Invalid role");
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
            if (error.response && error.response.status === 401) {
                // Invalid credentials
                setUsernameError("Invalid username or password");
                setPasswordError("Invalid username or password");
            }
        }
    }

    return (
        <div className="login-container">
            <header className="custom-header">
                <h3>WEBTUBE LOGIN PAGE</h3>
            </header>
            <div className="login-content">
                <div className="card1">
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">Login</h2>
                        <form onSubmit={login}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter Username"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                                {usernameError && <div className="text-danger">{usernameError}</div>}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                {passwordError && <div className="text-danger">{passwordError}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <footer className="custom-footer">
                <p>&copy; 2024 WebTube. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Login;
