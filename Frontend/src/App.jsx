import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bookings from "./pages/Bookings";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;