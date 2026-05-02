/**
 * Decodifica el payload de un JWT sin verificar la firma.
 * La verificación real ocurre en el backend.
 */
export function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

/** Devuelve true si el token no existe, no tiene `exp`, o ya expiró. */
export function isTokenExpired(token) {
  if (!token) return true;
  const payload = parseJwt(token);
  if (!payload?.exp) return true;
  // Margen de 10 segundos para evitar race conditions con el servidor
  return Date.now() >= (payload.exp - 10) * 1000;
}

/** Milisegundos que quedan antes de que expire el token. */
export function getTokenRemainingMs(token) {
  const payload = parseJwt(token);
  if (!payload?.exp) return 0;
  return Math.max(0, payload.exp * 1000 - Date.now());
}

/** Borra toda la sesión del usuario del localStorage. */
export function clearSession() {
  localStorage.removeItem("admin");
  localStorage.removeItem("comprador");
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}
