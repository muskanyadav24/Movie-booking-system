import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Role check (optional)
  if (role && user.role !== role) {
    return <Navigate to="/movies" />;
  }

  return children;
}

export default ProtectedRoute;