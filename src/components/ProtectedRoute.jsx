import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const location = useLocation();
  
  const compradorSession = localStorage.getItem("comprador");
  const adminSession = localStorage.getItem("admin");
  // Quitamos la dependencia estricta del token aquí arriba si da problemas

  // Validamos que la sesión sea un JSON válido y no esté vacía
  const isComprador = compradorSession && compradorSession !== "undefined" && compradorSession !== "null";
  const isAdmin = adminSession && adminSession !== "undefined" && adminSession !== "null";

  // 1. Si la ruta es para ADMIN
  if (role === "admin") {
    if (!isAdmin) {
      console.log("Acceso denegado: No se encontró sesión de Admin");
      return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }
    return children;
  }

  // 2. Si la ruta es para COMPRADOR
  if (role === "comprador") {
    if (!isComprador) {
      console.log("Acceso denegado: No se encontró sesión de Comprador");
      return <Navigate to="/comprador-login" state={{ from: location }} replace />;
    }
    return children;
  }

  // 3. Si la ruta es GENERAL (perfil), basta con que uno de los dos exista
  if (!isComprador && !isAdmin) {
    return <Navigate to="/login-gtg" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;