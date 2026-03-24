import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .cl-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    background: #f0f4f8;
    overflow: hidden;
  }

  /* LEFT PANEL */
  .cl-left {
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
  .cl-left::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .cl-left::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .cl-logo {
    font-size: 28px; font-weight: 800;
    color: white; letter-spacing: -1px;
  }
  .cl-logo span { color: #E63946; }

  .cl-left-body { position: relative; z-index: 1; }

  .cl-left-title {
    font-size: 34px; font-weight: 800;
    color: white; line-height: 1.15;
    letter-spacing: -0.5px; margin-bottom: 14px;
  }
  .cl-left-sub {
    font-size: 14px; color: rgba(255,255,255,0.45);
    line-height: 1.6; font-weight: 400;
  }

  .cl-left-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 10px 16px; border-radius: 12px; margin-top: 32px;
  }
  .cl-badge-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
    animation: clPulse 2s ease infinite;
  }
  @keyframes clPulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.2); }
    50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0.08); }
  }
  .cl-badge-text {
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.55);
  }

  .cl-left-footer {
    font-size: 11px; color: rgba(255,255,255,0.2);
    font-weight: 500; letter-spacing: 0.02em;
  }

  /* RIGHT PANEL */
  .cl-right {
    flex: 1;
    display: flex; align-items: center; justify-content: center;
    padding: 40px;
    background: #f0f4f8;
  }

  .cl-card {
    background: white; border-radius: 28px;
    padding: 44px 40px; width: 100%; max-width: 420px;
    box-shadow: 0 8px 40px rgba(27,58,92,0.10);
    border: 1px solid rgba(27,58,92,0.06);
    animation: clFadeUp 0.5s ease both;
  }
  @keyframes clFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .cl-eyebrow {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em;
    color: #94a3b8; margin-bottom: 6px;
  }
  .cl-card-title {
    font-size: 26px; font-weight: 800;
    color: #111827; letter-spacing: -0.5px; margin-bottom: 32px;
  }

  .cl-field-label {
    font-size: 11px; font-weight: 700; color: #64748b;
    text-transform: uppercase; letter-spacing: 0.08em;
    margin-bottom: 8px; display: block;
  }

  .cl-input-wrap {
    position: relative; margin-bottom: 20px;
  }
  .cl-input-icon {
    position: absolute; left: 14px; top: 50%;
    transform: translateY(-50%);
    color: #94a3b8; font-size: 14px;
    pointer-events: none; transition: color 0.2s;
  }
  .cl-input {
    width: 100%; padding: 13px 14px 13px 42px;
    border: 1.5px solid #e2e8f0; border-radius: 14px;
    font-size: 14px; font-weight: 500;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #111827; background: #f8fafc; outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .cl-input:focus {
    border-color: #1B3A5C; background: white;
    box-shadow: 0 0 0 4px rgba(27,58,92,0.07);
  }
  .cl-input.error { border-color: #f87171; background: #fff5f5; }

  .cl-input-toggle {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: #94a3b8; padding: 0;
    display: flex; align-items: center; font-size: 14px;
    transition: color 0.2s;
  }
  .cl-input-toggle:hover { color: #1B3A5C; }

  .cl-error-msg {
    font-size: 11px; color: #ef4444; font-weight: 600;
    margin-top: -14px; margin-bottom: 16px; padding-left: 4px;
  }
  .cl-error-general {
    background: #fff5f5; border: 1px solid #fecaca;
    border-radius: 12px; padding: 12px 14px;
    font-size: 13px; font-weight: 600; color: #dc2626;
    text-align: center; margin-bottom: 20px;
  }

  /* REMEMBER */
  .cl-remember {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 28px; cursor: pointer; user-select: none;
  }
  .cl-remember-box {
    width: 18px; height: 18px; border-radius: 6px;
    border: 1.5px solid #e2e8f0; background: #f8fafc;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; flex-shrink: 0;
  }
  .cl-remember-box.checked {
    background: #1B3A5C; border-color: #1B3A5C;
  }
  .cl-remember-box.checked::after {
    content: '';
    width: 5px; height: 8px;
    border: 2px solid white;
    border-top: none; border-left: none;
    transform: rotate(45deg) translateY(-1px);
    display: block;
  }
  .cl-remember-label {
    font-size: 13px; font-weight: 500; color: #475569;
  }

  /* BUTTON */
  .cl-btn {
    width: 100%; padding: 14px;
    background: #1B3A5C; color: white;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; font-weight: 700;
    border: none; border-radius: 14px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    letter-spacing: 0.02em;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 16px rgba(27,58,92,0.25);
    margin-bottom: 20px;
  }
  .cl-btn:hover:not(:disabled) {
    background: #15304d; transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(27,58,92,0.30);
  }
  .cl-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .cl-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: clSpin 0.7s linear infinite;
  }
  @keyframes clSpin { to { transform: rotate(360deg); } }

  .cl-register-link {
    text-align: center; font-size: 13px; color: #64748b; font-weight: 500;
  }
  .cl-register-link button {
    background: none; border: none; cursor: pointer;
    color: #1B3A5C; font-weight: 700; font-size: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    margin-left: 4px; text-decoration: underline;
    transition: color 0.2s;
  }
  .cl-register-link button:hover { color: #E63946; }

  @media (max-width: 768px) {
    .cl-left { display: none; }
    .cl-right { padding: 24px; }
    .cl-card { padding: 32px 24px; }
  }
`;

export default function CompradorLogin() {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const sesionGuardada = localStorage.getItem("comprador");
    if (sesionGuardada && sesionGuardada !== "undefined") {
      navigate("/");
      return;
    }
    // Cargar credenciales recordadas
    const savedCedula = localStorage.getItem("comprador_remember_cedula");
    const savedPass   = localStorage.getItem("comprador_remember_pass");
    if (savedCedula) { setCedula(savedCedula); setRememberMe(true); }
    if (savedPass)   setPassword(savedPass);
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!cedula.trim())   newErrors.cedula   = "La cédula es requerida";
    if (!password.trim()) newErrors.password = "La contraseña es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch("https://backend-m3nj.onrender.com/api/auth/comprador-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula, password }),
      });
      const data = await response.json();

      if (response.ok) {
        const userData = data.user || data.comprador || data.usuario || data;
        localStorage.setItem("comprador", JSON.stringify(userData));
        if (data.token) localStorage.setItem("token", data.token);

        if (rememberMe) {
          localStorage.setItem("comprador_remember_cedula", cedula);
          localStorage.setItem("comprador_remember_pass", password);
        } else {
          localStorage.removeItem("comprador_remember_cedula");
          localStorage.removeItem("comprador_remember_pass");
        }

        window.location.href = "/";
      } else {
        setErrors({ general: data.message || "Cédula o contraseña incorrectos" });
      }
    } catch {
      setErrors({ general: "Error de conexión con el servidor" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="cl-root">

        {/* ── PANEL IZQUIERDO ── */}
        <div className="cl-left">
          <div className="cl-logo">G<span>T</span>G</div>

          <div className="cl-left-body">
            <div className="cl-left-title">
              Área de<br />Compradores
            </div>
            <p className="cl-left-sub">
              Accede a tu cuenta para gestionar tus pedidos, personalizar tus empaques y más.
            </p>
            <div className="cl-left-badge">
              <div className="cl-badge-dot" />
              <span className="cl-badge-text">Plataforma segura</span>
            </div>
          </div>

          <div className="cl-left-footer">© 2025 GTG · Todos los derechos reservados</div>
        </div>

        {/* ── PANEL DERECHO ── */}
        <div className="cl-right">
          <div className="cl-card">

            <div className="cl-eyebrow">Bienvenido</div>
            <div className="cl-card-title">Iniciar sesión</div>

            <form onSubmit={handleSubmit}>

              {/* CÉDULA */}
              <label className="cl-field-label">Cédula</label>
              <div className="cl-input-wrap">
                <FaUser className="cl-input-icon" />
                <input
                  type="text"
                  className={`cl-input${errors.cedula ? ' error' : ''}`}
                  placeholder="Ej: 001-0000000-0"
                  value={cedula}
                  onChange={(e) => { setCedula(e.target.value); if (errors.cedula) setErrors({ ...errors, cedula: "" }); }}
                />
              </div>
              {errors.cedula && <p className="cl-error-msg">{errors.cedula}</p>}

              {/* CONTRASEÑA */}
              <label className="cl-field-label">Contraseña</label>
              <div className="cl-input-wrap">
                <FaLock className="cl-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`cl-input${errors.password ? ' error' : ''}`}
                  placeholder="Tu contraseña"
                  value={password}
                  style={{ paddingRight: 42 }}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: "" }); }}
                />
                <button type="button" className="cl-input-toggle" onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="cl-error-msg">{errors.password}</p>}

              {/* RECORDARME */}
              <div className="cl-remember" onClick={() => setRememberMe(v => !v)}>
                <div className={`cl-remember-box${rememberMe ? ' checked' : ''}`} />
                <span className="cl-remember-label">Recordar mis credenciales</span>
              </div>

              {/* ERROR GENERAL */}
              {errors.general && <div className="cl-error-general">{errors.general}</div>}

              {/* BOTÓN */}
              <button type="submit" className="cl-btn" disabled={isLoading}>
                {isLoading
                  ? <><div className="cl-spinner" /> Validando...</>
                  : <><FaSignInAlt /> Ingresar</>
                }
              </button>

            </form>

            <div className="cl-register-link">
              ¿No tienes cuenta?
              <button type="button" onClick={() => navigate("/comprador-register")}>
                Registrarse
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}