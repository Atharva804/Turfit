import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * @param {ReactNode} children - the component to render
 * @param {string[]} allowedRoles - which user roles can access this page
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // Prevent premature redirect
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
