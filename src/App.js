import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatroom from "./pages/Chatroom";
import Login from "./pages/Login";

function App() {
    const token = window.localStorage.getItem("access_token");

    if (!token || token === undefined) {
        console.log(token);
        return <Login />;
    }

    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/chatroom" element={<Chatroom />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
