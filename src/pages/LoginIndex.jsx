import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield, FaArrowRight } from "react-icons/fa";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .login-index-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    background: #f0f4f8;
    overflow: hidden;
  }

  /* ── LEFT BRAND PANEL ── */
  .li-left {
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
  .li-left::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 280px; height: 280px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .li-left::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -60px;
    width: 220px; height: 220px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }

  .li-logo {
    font-size: 28px;
    font-weight: 800;
    color: white;
    letter-spacing: -1px;
  }
  .li-logo span { color: #E63946; }

  .li-left-body { position: relative; z-index: 1; }

  .li-left-title {
    font-size: 34px;
    font-weight: 800;
    color: white;
    line-height: 1.15;
    letter-spacing: -0.5px;
    margin-bottom: 14px;
  }

  .li-left-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    font-weight: 400;
  }

  .li-left-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 10px 16px;
    border-radius: 12px;
    margin-top: 32px;
  }
  .li-badge-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 0 3px rgba(74,222,128,0.2);
    animation: liPulse 2s ease infinite;
  }
  @keyframes liPulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.2); }
    50%       { box-shadow: 0 0 0 6px rgba(74,222,128,0.08); }
  }
  .li-badge-text {
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.55);
  }

  .li-left-footer {
    font-size: 11px;
    color: rgba(255,255,255,0.2);
    font-weight: 500;
  }

  /* ── RIGHT PANEL ── */
  .li-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: #f0f4f8;
  }

  .li-card {
    background: white;
    border-radius: 28px;
    padding: 44px 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 8px 40px rgba(27,58,92,0.10);
    border: 1px solid rgba(27,58,92,0.06);
    animation: liFadeUp 0.5s ease both;
  }
  @keyframes liFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .li-eyebrow {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #94a3b8;
    margin-bottom: 6px;
  }
  .li-card-title {
    font-size: 26px;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
  }
  .li-card-sub {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 400;
    margin-bottom: 36px;
    line-height: 1.5;
  }

  /* ACCESS OPTION BUTTONS */
  .li-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    border-radius: 18px;
    border: 1.5px solid #e2e8f0;
    background: #f8fafc;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 12px;
    text-align: left;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .li-option:last-of-type { margin-bottom: 0; }

  .li-option:hover {
    border-color: #1B3A5C;
    background: white;
    box-shadow: 0 4px 20px rgba(27,58,92,0.10);
    transform: translateY(-1px);
  }
  .li-option:hover .li-option-arrow { opacity: 1; transform: translateX(0); }
  .li-option:hover .li-option-icon-wrap { background: #1B3A5C; color: white; }

  .li-option.admin:hover .li-option-icon-wrap { background: #E63946; }

  .li-option-icon-wrap {
    width: 44px; height: 44px;
    border-radius: 13px;
    background: #f1f5f9;
    color: #475569;
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .li-option-text { flex: 1; }
  .li-option-label {
    font-size: 15px;
    font-weight: 700;
    color: #111827;
    display: block;
    margin-bottom: 2px;
  }
  .li-option-desc {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 500;
  }

  .li-option-arrow {
    color: #94a3b8;
    font-size: 13px;
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.2s;
  }

  .li-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
  }
  .li-divider-line {
    flex: 1; height: 1px; background: #f1f5f9;
  }
  .li-divider-text {
    font-size: 11px; color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
  }

  .li-footer-note {
    margin-top: 28px;
    text-align: center;
    font-size: 11px;
    color: #cbd5e1;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .li-left { display: none; }
    .li-right { padding: 24px; }
    .li-card { padding: 32px 24px; }
  }
`;

export default function LoginIndex() {
  const navigate = useNavigate();

  return (
    <>
      <style>{css}</style>
      <div className="login-index-root">

        {/* ── PANEL IZQUIERDO ── */}
        <div className="li-left">
          <div className="li-logo">G<span>T</span>G</div>

          <div className="li-left-body">
            <div className="li-left-title">
              Bienvenido<br />al Sistema
            </div>
            <p className="li-left-sub">
              Plataforma de gestión GTG. Selecciona tu tipo de acceso para continuar de forma segura.
            </p>
            <div className="li-left-badge">
              <div className="li-badge-dot" />
              <span className="li-badge-text">Sistema operativo</span>
            </div>
          </div>

          <div className="li-left-footer">© 2025 GTG · Todos los derechos reservados</div>
        </div>

        {/* ── PANEL DERECHO ── */}
        <div className="li-right">
          <div className="li-card">

            <div className="li-eyebrow">Acceso al sistema</div>
            <div className="li-card-title">¿Cómo deseas entrar?</div>
            <p className="li-card-sub">Selecciona tu tipo de cuenta para continuar.</p>

            {/* COMPRADOR */}
            <button className="li-option" onClick={() => navigate("/comprador-login")}>
              <div className="li-option-icon-wrap">
                <FaUser />
              </div>
              <div className="li-option-text">
                <span className="li-option-label">Comprador</span>
                <span className="li-option-desc">Accede a tu cuenta y pedidos</span>
              </div>
              <FaArrowRight className="li-option-arrow" />
            </button>

            <div className="li-divider">
              <div className="li-divider-line" />
              <span className="li-divider-text">o</span>
              <div className="li-divider-line" />
            </div>

            {/* ADMINISTRADOR */}
            <button className="li-option admin" onClick={() => navigate("/admin-login")}>
              <div className="li-option-icon-wrap">
                <FaUserShield />
              </div>
              <div className="li-option-text">
                <span className="li-option-label">Administrador</span>
                <span className="li-option-desc">Panel de gestión y control</span>
              </div>
              <FaArrowRight className="li-option-arrow" />
            </button>

            <p className="li-footer-note">🔒 Acceso seguro y encriptado</p>

          </div>
        </div>

      </div>
    </>
  );
}