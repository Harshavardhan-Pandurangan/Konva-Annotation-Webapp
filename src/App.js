import { BrowserRouter, Routes, Route } from "react-router-dom";
import Konva from "./Konva/konva";
import Home from "./Home/home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/konva" element={<Konva />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
