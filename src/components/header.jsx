import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

const GestionIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
const LogisticaIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const EmpaqueIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const DespachoIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const OrdenesIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const ProcesoIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const TerminadoIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;

// 🔥 AQUÍ ESTÁ EL CAMBIO LÓGICO DE ORDEN
const adminLinks = [
  { to: "/administracion/empleados", label: "Gestión",    Icon: GestionIcon },
  { to: "/produccion/orden-pedido",  label: "Órdenes",    Icon: OrdenesIcon },
  { to: "/produccion/proceso",       label: "Proceso",    Icon: ProcesoIcon },
  { to: "/produccion/terminado",     label: "Terminados", Icon: TerminadoIcon }, 
  { to: "/logistica/empaque",        label: "Empaque",    Icon: EmpaqueIcon },
  { to: "/logistica/transporte",     label: "Logística",  Icon: LogisticaIcon },
  { to: "/logistica/despacho",       label: "Despacho",   Icon: DespachoIcon },
];

const publicLinks = [
  { to: "/",          label: "Inicio"   },
  { to: "/nosotros",  label: "Nosotros" },
  { to: "/productos", label: "Productos"},
  { to: "/calidad",   label: "Calidad"  },
];

export default function Header({ user, setUser }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [adminOpen, setAdminOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.cantidad, 0);

  const handleLogout = () => {
    localStorage.removeItem("comprador");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login-gtg");
  };

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        .gtg-header * { font-family: 'Sora', sans-serif; box-sizing: border-box; }

        /* ── base ── */
        .gtg-header {
          position: sticky; top: 0; z-index: 100;
          background: #1B3A5C;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .gtg-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between; gap: 32px;
        }

        /* ── logo ── */
        .gtg-logo {
          text-decoration: none;
          display: flex; align-items: center; gap: 2px;
          font-size: 22px; font-weight: 800; letter-spacing: -0.5px;
          flex-shrink: 0;
        }
        .gtg-logo .r { color: #E63946; }
        .gtg-logo .w { color: #E8F0F8; }

        /* ── public nav ── */
        .gtg-public-nav {
          display: flex; align-items: center; gap: 2px;
        }
        .gtg-nav-link {
          text-decoration: none;
          font-size: 13px; font-weight: 600;
          color: rgba(232,240,248,0.65);
          padding: 6px 14px; border-radius: 8px;
          transition: color .2s, background .2s;
          white-space: nowrap;
        }
        .gtg-nav-link:hover { color: #E8F0F8; background: rgba(255,255,255,0.1); }
        .gtg-nav-link.active { color: #E8F0F8; background: rgba(255,255,255,0.12); }

        /* ── admin panel ── */
        .gtg-admin-trigger {
          position: relative;
        }
        .gtg-admin-btn {
          display: flex; align-items: center; gap: 6px;
          background: rgba(230,57,70,0.18);
          border: 1px solid rgba(230,57,70,0.4);
          color: #fca5a5;
          font-size: 12px; font-weight: 700;
          padding: 6px 14px; border-radius: 8px;
          cursor: pointer; letter-spacing: 0.3px;
          transition: all .2s; white-space: nowrap;
          font-family: 'Sora', sans-serif;
        }
        .gtg-admin-btn:hover, .gtg-admin-btn.open {
          background: rgba(230,57,70,0.3);
          border-color: rgba(230,57,70,0.65);
          color: #ffd0d3;
        }
        .gtg-admin-btn svg {
          width: 12px; height: 12px;
          transition: transform .2s;
        }
        .gtg-admin-btn.open svg { transform: rotate(180deg); }

        .gtg-admin-dropdown {
          position: absolute; top: calc(100% + 10px); left: 50%;
          transform: translateX(-50%);
          background: #F4F6F9;
          border: 1px solid #dce3ec;
          border-radius: 14px;
          padding: 8px;
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 4px; width: 300px;
          box-shadow: 0 16px 48px rgba(27,58,92,0.2);
          animation: dropIn .18s ease;
        }
        @keyframes dropIn {
          from { opacity:0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }
        .gtg-admin-item {
          text-decoration: none;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 12px 8px; border-radius: 10px;
          color: #4A6582;
          font-size: 11px; font-weight: 600;
          transition: all .15s;
          text-align: center;
        }
        .gtg-admin-item:hover { background: #dce6f0; color: #1B3A5C; }
        .gtg-admin-item.active { background: #fde8ea; color: #E63946; }
        .gtg-admin-item svg { flex-shrink: 0; }

        /* ── divider ── */
        .gtg-sep {
          width: 1px; height: 28px;
          background: rgba(255,255,255,0.15);
          flex-shrink: 0;
        }

        /* ── right section ── */
        .gtg-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

        .gtg-user {
          display: flex; align-items: center; gap: 10px;
        }
        .gtg-avatar-wrap {
          position: relative;
        }
        .gtg-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(232,240,248,0.3);
          display: block;
          transition: border-color .2s, transform .2s;
          cursor: pointer;
        }
        .gtg-avatar:hover { border-color: #E63946; transform: scale(1.06); }

        .gtg-user-info { display: flex; flex-direction: column; line-height: 1; gap: 3px; }
        .gtg-role {
          font-size: 9px; font-weight: 800; letter-spacing: 1.2px;
          text-transform: uppercase; color: #fca5a5;
        }
        .gtg-name { font-size: 13px; font-weight: 700; color: #E8F0F8; }

        .gtg-logout {
          background: transparent;
          border: 1px solid rgba(232,240,248,0.2);
          color: rgba(232,240,248,0.6);
          font-size: 11px; font-weight: 700;
          padding: 6px 14px; border-radius: 8px;
          cursor: pointer; transition: all .2s;
          font-family: 'Sora', sans-serif;
          letter-spacing: 0.3px;
          white-space: nowrap;
        }
        .gtg-logout:hover {
          border-color: #E63946; color: #fca5a5;
          background: rgba(230,57,70,0.12);
        }

        .gtg-login {
          text-decoration: none;
          background: #E63946; color: #fff;
          font-size: 12px; font-weight: 700;
          padding: 8px 20px; border-radius: 8px;
          transition: background .2s, transform .15s;
          letter-spacing: 0.3px;
        }
        .gtg-login:hover { background: #c62b39; transform: scale(1.03); }

        /* ── cart icon ── */
        .gtg-cart-link {
          position: relative;
          text-decoration: none;
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px;
          border-radius: 10px;
          color: rgba(232,240,248,0.65);
          transition: color .2s, background .2s;
        }
        .gtg-cart-link:hover { color: #E8F0F8; background: rgba(255,255,255,0.1); }
        .gtg-cart-link.active { color: #E8F0F8; background: rgba(255,255,255,0.12); }
        .gtg-cart-badge {
          position: absolute; top: 2px; right: 1px;
          min-width: 16px; height: 16px;
          background: #E63946; color: #fff;
          font-size: 9px; font-weight: 800;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px;
          line-height: 1;
          border: 2px solid #1B3A5C;
          animation: cartBadgePop .25s ease;
        }
        @keyframes cartBadgePop {
          from { transform: scale(0); } to { transform: scale(1); }
        }

        /* ── overlay ── */
        .gtg-overlay {
          position: fixed; inset: 0; z-index: 99;
        }
      `}</style>

      <header className="gtg-header">
        <div className="gtg-inner">

          {/* Logo */}
          <Link to="/" className="gtg-logo">
            <span className="r">G</span>
            <span className="w">T</span>
            <span className="w">G</span>
          </Link>

          {/* Public nav */}
          <nav className="gtg-public-nav">
            {publicLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`gtg-nav-link${isActive(to) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Admin section */}
          {user?.role === "admin" && (
            <>
              <div className="gtg-sep" />
              <div className="gtg-admin-trigger">
                <button
                  className={`gtg-admin-btn${adminOpen ? " open" : ""}`}
                  onClick={() => setAdminOpen((v) => !v)}
                >
                  Panel Admin
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="2,3.5 5,6.5 8,3.5"/>
                  </svg>
                </button>

                {adminOpen && (
                  <>
                    <div className="gtg-overlay" onClick={() => setAdminOpen(false)} />
                    <div className="gtg-admin-dropdown" style={{ zIndex: 200 }}>
                      {adminLinks.map(({ to, label, Icon }) => (
                        <Link
                          key={to}
                          to={to}
                          className={`gtg-admin-item${isActive(to) ? " active" : ""}`}
                          onClick={() => setAdminOpen(false)}
                        >
                          <Icon />
                          <span>{label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* Cart icon */}
          <Link
            to="/carrito"
            className={`gtg-cart-link${isActive("/carrito") ? " active" : ""}`}
            title="Carrito"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && (
              <span className="gtg-cart-badge">{cartCount}</span>
            )}
          </Link>

          {/* Right — user / login */}
          <div className="gtg-right">
            {user ? (
              <div className="gtg-user">
                <Link to="/perfil" className="gtg-avatar-wrap">
                  <img
                    src={user.data?.profileImageUrl}
                    className="gtg-avatar"
                    alt="perfil"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${user.data?.nombre}&background=1B3A5C&color=E8F0F8`;
                    }}
                  />
                </Link>
                <div className="gtg-user-info">
                  <span className="gtg-role">{user.role}</span>
                  <span className="gtg-name">{user.data?.nombre?.split(" ")[0] || "Usuario"}</span>
                </div>
                <button className="gtg-logout" onClick={handleLogout}>
                  Salir
                </button>
              </div>
            ) : (
              <Link to="/login-gtg" className="gtg-login">
                Iniciar sesión
              </Link>
            )}
          </div>

        </div>
      </header>
    </>
  );
}