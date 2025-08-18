import "./App.css";
import { Route, Routes, NavLink } from "react-router-dom";
import TextArea from "./editor/TextArea";
import Counter from "./pages/Counter";
import FetchAPI from "./pages/FetchAPI";
import Home from "./pages/Home";
import TodoApp from "./pages/TodoApp";
import Form from "./pages/Form";

function App() {
    return (
        <div className="App">
            <nav>
                <div className="navigation">
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
                        <li>
                            <NavLink to="/todo-app">TodoApp</NavLink>
                        </li>
                        <li>
                            <NavLink to="/form">Form</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/counter" element={<Counter />}></Route>
                <Route path="/fetch-api" element={<FetchAPI />}></Route>
                <Route path="/todo-app" element={<TodoApp />}></Route>
                <Route path="/form" element={<Form />}></Route>
            </Routes>

            <TextArea />
        </div>
    );
}

export default App;
