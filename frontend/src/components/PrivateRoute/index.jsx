import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  if (role === null) {
    return <div>Loading...</div>; // Prevents immediate redirection
  }

  if (!role) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === "ORGANIZER" ? "/admin" : "/"} replace />;
  }

  return children;
};

export default PrivateRoute;
