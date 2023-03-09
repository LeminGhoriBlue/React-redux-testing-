import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Home from "./Componet/HomePage/Home";
import './App.css'
import AddData from "./Componet/AddData/AddData";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="add" element={<AddData />} />
        </Routes>
    )
}

export default App;
