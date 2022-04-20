import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import chatlogo from "../assets/chatlogo.png";

const loginUser = async (credentials) => {
    return fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
        .then((data) => data.json())
        .catch((err) => {
            console.log(err, "error");
        });
};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!username) {
            alert("Enter the username");
            setLoading(false);
            return;
        }

        if (!password) {
            alert("Enter the password");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            alert("Password must contain at least 6 characters");
            setLoading(false);
            return;
        }

        const res = await loginUser({ username: username, password: password });
        if (res.code === "200") {
            alert("go")
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem("user_id", res.user_id);
            setLoading(false);
            window.location.replace("/chatroom");
        }
    };

    return (
        <div className="auth-container">
            <div className="form-container">
                <div
                    style={{
                        display: "flex",
                        alignItems: "revert",
                        justifyContent: "space-evenly",
                    }}
                >
                    <h1 className="auth-header">Sign in</h1>
                    <div className="auth-logo">
                        <img
                            style={{ height: "100%" }}
                            src={chatlogo}
                            alt="logo"
                        />
                    </div>
                </div>
                <form>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div style={{ display: "block" }}>
                        <button
                            type="submit"
                            className="submit-btn"
                            onClick={onSubmit}
                            disabled={loading}
                        >
                            {loading ? <FaSpinner></FaSpinner> : "Login"}
                        </button>
                        <a className="sign-link" href="/register">
                            Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
