import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  // This is a placeholder for authentication logic
  const isAuthenticated = false; // TODO: Replace with actual auth check

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}