import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const location = useLocation();
  
  // Verificamos ambas sesiones
  const compradorSession = localStorage.getItem("comprador");
  const adminSession = localStorage.getItem("admin");

  const isComprador = compradorSession && compradorSession !== "undefined" && compradorSession !== "null";
  const isAdmin = adminSession && adminSession !== "undefined" && adminSession !== "null";

  // 1. Si la ruta es específicamente para ADMIN
  if (role === "admin") {
    if (!isAdmin) return <Navigate to="/admin-login" state={{ from: location }} replace />;
    return children;
  }

  // 2. Si la ruta es específicamente para COMPRADOR
  if (role === "comprador") {
    if (!isComprador) return <Navigate to="/comprador-login" state={{ from: location }} replace />;
    return children;
  }

  // 3. Si la ruta es GENERAL (como /perfil), verificamos que esté logueado con alguien
  if (!isComprador && !isAdmin) {
    return <Navigate to="/login-gtg" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;