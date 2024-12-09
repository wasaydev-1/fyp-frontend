import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check if user is authenticated (has a token in local storage)
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  if (!isAuthenticated) {
    // Redirect to login and save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;
