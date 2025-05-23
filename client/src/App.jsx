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
import { useState, useEffect } from "react";
import axios from "./utils/axiosInstance";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in or session expired");
      }
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
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
