import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Turfs from "./pages/Turfs";
// import BookTurf from "./pages/BookTurf";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import OwnerDashboard from "./pages/OwnerDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/turfs" element={<Turfs />} />
        </Route>
        {/* <Route path="/book/:id" element={<BookTurf />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/owner" element={<OwnerDashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
