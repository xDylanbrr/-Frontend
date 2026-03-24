import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .admin-login-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    background: #f0f4f8;
    overflow: hidden;
  }

  /* LEFT PANEL */
  .admin-left {
    width: 420px;
    flex-shrink: 0;
    background: #1B3A5C;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 40px;
    position: relative;
    overflow: hidden;
  }

  .admin-left::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .admin-left::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .admin-left-logo {
    font-size: 28px;
    font-weight: 800;
    color: white;
    letter-spacing: -1px;
  }
  .admin-left-logo span { color: #E63946; }

  .admin-left-body { position: relative; z-index: 1; }

  .admin-left-title {
    font-size: 34px;
    font-weight: 800;
    color: white;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 14px;
  }

  .admin-left-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    font-weight: 400;
  }

  .admin-left-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 10px 16px;
    border-radius: 12px;
    margin-top: 32px;
  }
  .admin-left-badge-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
    animation: adminPulse 2s ease infinite;
  }
  @keyframes adminPulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.2); }
    50% { box-shadow: 0 0 0 6px rgba(74,222,128,0.08); }
  }
  .admin-left-badge-text {
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.55);
  }

  .admin-left-footer {
    font-size: 11px;
    color: rgba(255,255,255,0.2);
    font-weight: 500;
    letter-spacing: 0.02em;
  }

  /* RIGHT PANEL */
  .admin-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #f0f4f8;
  }

  .admin-card {
    background: white;
    border-radius: 28px;
    padding: 44px 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 8px 40px rgba(27,58,92,0.10);
    border: 1px solid rgba(27,58,92,0.06);
    animation: adminFadeUp 0.5s ease both;
  }
  @keyframes adminFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .admin-card-eyebrow {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #94a3b8;
    margin-bottom: 6px;
  }

  .admin-card-title {
    font-size: 26px;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.5px;
    margin-bottom: 32px;
  }

  .admin-field-label {
    font-size: 11px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
    display: block;
  }

  .admin-input-wrap {
    position: relative;
    margin-bottom: 20px;
  }

  .admin-input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 14px;
    pointer-events: none;
    transition: color 0.2s;
  }

  .admin-input {
    width: 100%;
    padding: 13px 14px 13px 42px;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #111827;
    background: #f8fafc;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .admin-input:focus {
    border-color: #1B3A5C;
    background: white;
    box-shadow: 0 0 0 4px rgba(27,58,92,0.07);
  }
  .admin-input.error {
    border-color: #f87171;
    background: #fff5f5;
  }

  .admin-input-toggle {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #94a3b8;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    transition: color 0.2s;
  }
  .admin-input-toggle:hover { color: #1B3A5C; }

  .admin-error-msg {
    font-size: 11px;
    color: #ef4444;
    font-weight: 600;
    margin-top: -14px;
    margin-bottom: 16px;
    padding-left: 4px;
  }

  .admin-remember {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    cursor: pointer;
    user-select: none;
  }
  .admin-remember-box {
    width: 18px; height: 18px;
    border-radius: 6px;
    border: 1.5px solid #e2e8f0;
    background: #f8fafc;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .admin-remember-box.checked {
    background: #1B3A5C;
    border-color: #1B3A5C;
  }
  .admin-remember-box.checked::after {
    content: '';
    width: 5px; height: 8px;
    border: 2px solid white;
    border-top: none; border-left: none;
    transform: rotate(45deg) translateY(-1px);
    display: block;
  }
  .admin-remember-label {
    font-size: 13px;
    font-weight: 500;
    color: #475569;
  }

  .admin-btn {
    width: 100%;
    padding: 14px;
    background: #1B3A5C;
    color: white;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    letter-spacing: 0.02em;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(27,58,92,0.25);
  }
  .admin-btn:hover:not(:disabled) {
    background: #15304d;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(27,58,92,0.30);
  }
  .admin-btn:active:not(:disabled) { transform: translateY(0); }
  .admin-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .admin-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: adminSpin 0.7s linear infinite;
  }
  @keyframes adminSpin { to { transform: rotate(360deg); } }

  .admin-error-general {
    background: #fff5f5;
    border: 1px solid #fecaca;
    border-radius: 12px;
    padding: 12px 14px;
    font-size: 13px;
    font-weight: 600;
    color: #dc2626;
    text-align: center;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .admin-left { display: none; }
    .admin-right { padding: 24px; }
    .admin-card { padding: 32px 24px; }
  }
`;

export default function AdminLogin({ setUser }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Auto-login si hay sesión guardada
  useEffect(() => {
    const sesionGuardada = localStorage.getItem("admin");
    if (sesionGuardada && sesionGuardada !== "undefined") {
      navigate("/administracion/empleados");
      return;
    }
    // Cargar credenciales recordadas
    const savedId = localStorage.getItem("admin_remember_id");
    const savedPass = localStorage.getItem("admin_remember_pass");
    if (savedId) { setId(savedId); setRememberMe(true); }
    if (savedPass) setPassword(savedPass);
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!id.trim()) newErrors.id = "El ID es requerido";
    if (!password.trim()) newErrors.password = "La contraseña es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch("https://backend-m3nj.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula: id, password })
      });
      const data = await response.json();
      if (response.ok) {
        const userData = data.user || data.usuario || data.admin || data;
        localStorage.setItem("admin", JSON.stringify(userData));
        if (data.token) localStorage.setItem("token", data.token);

        // Guardar o limpiar credenciales según "Recordarme"
        if (rememberMe) {
          localStorage.setItem("admin_remember_id", id);
          localStorage.setItem("admin_remember_pass", password);
        } else {
          localStorage.removeItem("admin_remember_id");
          localStorage.removeItem("admin_remember_pass");
        }

        if (setUser) setUser({ data: userData, role: "admin" });
        navigate("/administracion/empleados");
      } else {
        setErrors({ general: data.message || "Credenciales incorrectas" });
      }
    } catch {
      setErrors({ general: "No se pudo conectar con el servidor" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="admin-login-root">

        {/* ── PANEL IZQUIERDO ── */}
        <div className="admin-left">
          <div className="admin-left-logo">G<span>T</span>G</div>

          <div className="admin-left-body">
            <div className="admin-left-title">
              Panel de<br />Administración
            </div>
            <p className="admin-left-sub">
              Acceso exclusivo para administradores del sistema GTG. Mantén tus credenciales seguras.
            </p>
            <div className="admin-left-badge">
              <div className="admin-left-badge-dot" />
              <span className="admin-left-badge-text">Sistema operativo</span>
            </div>
          </div>

          <div className="admin-left-footer">© 2025 GTG · Todos los derechos reservados</div>
        </div>

        {/* ── PANEL DERECHO ── */}
        <div className="admin-right">
          <div className="admin-card">

            <div className="admin-card-eyebrow">Bienvenido</div>
            <div className="admin-card-title">Iniciar sesión</div>

            <form onSubmit={handleSubmit}>

              {/* ID */}
              <label className="admin-field-label">ID Administrador</label>
              <div className="admin-input-wrap">
                <FaUserShield className="admin-input-icon" />
                <input
                  type="text"
                  className={`admin-input${errors.id ? ' error' : ''}`}
                  placeholder="Ej: 001-0000000-0"
                  value={id}
                  onChange={(e) => { setId(e.target.value); if (errors.id) setErrors({ ...errors, id: "" }); }}
                />
              </div>
              {errors.id && <p className="admin-error-msg">{errors.id}</p>}

              {/* CONTRASEÑA */}
              <label className="admin-field-label">Contraseña</label>
              <div className="admin-input-wrap">
                <FaLock className="admin-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`admin-input${errors.password ? ' error' : ''}`}
                  placeholder="Tu contraseña"
                  value={password}
                  style={{ paddingRight: 42 }}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: "" }); }}
                />
                <button
                  type="button"
                  className="admin-input-toggle"
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="admin-error-msg">{errors.password}</p>}

              {/* RECORDARME */}
              <div
                className="admin-remember"
                onClick={() => setRememberMe(v => !v)}
              >
                <div className={`admin-remember-box${rememberMe ? ' checked' : ''}`} />
                <span className="admin-remember-label">Recordar mis credenciales</span>
              </div>

              {/* ERROR GENERAL */}
              {errors.general && (
                <div className="admin-error-general">{errors.general}</div>
              )}

              {/* BOTÓN */}
              <button type="submit" className="admin-btn" disabled={isLoading}>
                {isLoading
                  ? <><div className="admin-spinner" /> Ingresando...</>
                  : <><FaSignInAlt /> Ingresar al Panel</>
                }
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}