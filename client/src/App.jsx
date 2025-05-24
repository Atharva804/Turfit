import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Turfs from "./pages/Turfs";
// import BookTurf from "./pages/BookTurf";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TurfDetails from "./pages/TurfDetails";
// import Dashboard from "./pages/Dashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "./redux/authSlice";
import { fetchCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await fetchCurrentUser();
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(logoutUser());
      }
    };
    checkAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/turfs" element={<Turfs />} />
          <Route path="/turf/:id" element={<TurfDetails />} />
          <Route
            path="/owner-dashboard"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* <Route path="/book/:id" element={<BookTurf />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
