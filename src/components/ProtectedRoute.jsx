import { Navigate, useLocation } from "react-router-dom";
import { isTokenExpired, clearSession } from "../utils/auth";

function parseSession(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw || raw === "undefined" || raw === "null") return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function ProtectedRoute({ children, role }) {
  const location = useLocation();

  // Si hay token y ya expiró, limpia la sesión antes de evaluar acceso
  const token = localStorage.getItem("token");
  if (token && isTokenExpired(token)) {
    clearSession();
    return <Navigate to="/login-gtg" state={{ from: location }} replace />;
  }

  const compradorData = parseSession("comprador");
  const adminData = parseSession("admin");

  const isComprador = compradorData !== null;
  const isAdmin = adminData !== null;

  if (role === "admin") {
    if (!isAdmin) return <Navigate to="/admin-login" state={{ from: location }} replace />;
    return children;
  }

  if (role === "comprador") {
    if (!isComprador) return <Navigate to="/comprador-login" state={{ from: location }} replace />;
    return children;
  }

  // Ruta general (ej: /perfil): cualquier sesión válida sirve
  if (!isComprador && !isAdmin) {
    return <Navigate to="/login-gtg" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
