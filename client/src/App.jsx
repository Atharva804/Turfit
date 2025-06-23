import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Turfs from "./pages/Turfs";
import TurfBooking from "./pages/TurfBooking";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import TurfDetails from "./pages/TurfDetails";
import Dashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "./redux/authSlice";
import { fetchCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterOwner from "./pages/RegisterOwner";
import AddTurf from "./pages/AddTurf";
import EditTurf from "./pages/EditTurf";
import BookingDetials from "./pages/BookingDetials";

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
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
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
          <Route
            path="/turf/new"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <AddTurf />
              </ProtectedRoute>
            }
          />
          <Route
            path="/turf/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["owner"]}>
                <EditTurf />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <TurfBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:bookingId/details/:turfId"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <BookingDetials />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
