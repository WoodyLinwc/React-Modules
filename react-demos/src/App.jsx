import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import Counter from "./pages/Counter";
import FetchAPI from "./pages/FetchAPI";
import Home from "./pages/Home";

function App() {
    return (
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/counter">Counter</NavLink>
                    </li>
                    <li>
                        <NavLink to="/fetch-api">FetchAPI</NavLink>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/counter" element={<Counter />}></Route>
                <Route path="/fetch-api" element={<FetchAPI />}></Route>
            </Routes>
        </div>
    );
}

export default App;
