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
const ReciclajeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 2h10l4 12H3L7 2z"/><path d="M5 14l2 8h10l2-8"/><path d="M15 6H9"/><path d="M10 6l-1 4"/><path d="M14 6l1 4"/></svg>;

const adminLinks = [
  { to: "/administracion/empleados", label: "Gestión",    Icon: GestionIcon },
  { to: "/administracion/pedidos-clientes", label: "Trazabilidad", Icon: OrdenesIcon },
  { to: "/produccion/orden-pedido",  label: "Órdenes",    Icon: OrdenesIcon },
  { to: "/produccion/proceso",       label: "Proceso",    Icon: ProcesoIcon },
  { to: "/produccion/terminado",     label: "Terminados", Icon: TerminadoIcon }, 
  { to: "/produccion/reciclaje",    label: "Reciclaje",  Icon: ReciclajeIcon },
  { to: "/logistica",                label: "Logística",  Icon: LogisticaIcon },
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .gtg-header * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

        /* ── base ── */
        .gtg-header {
          position: sticky; top: 0; z-index: 100;
          background: #1e293b;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .gtg-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 24px;
          height: 68px;
          display: flex; align-items: center; justify-content: space-between; gap: 32px;
        }

        /* ── logo ── */
        .gtg-logo {
          text-decoration: none;
          display: flex; align-items: center; gap: 2px;
          font-size: 24px; font-weight: 800; letter-spacing: -0.8px;
          flex-shrink: 0;
        }
        .gtg-logo .r { color: #E63946; }
        .gtg-logo .w { color: #f8fafc; }

        /* ── public nav ── */
        .gtg-public-nav {
          display: flex; align-items: center; gap: 4px;
        }
        .gtg-nav-link {
          text-decoration: none;
          font-size: 14px; font-weight: 600;
          color: #94a3b8;
          padding: 8px 16px; border-radius: 10px;
          transition: all .2s;
          white-space: nowrap;
        }
        .gtg-nav-link:hover { color: #f8fafc; background: rgba(255, 255, 255, 0.05); }
        .gtg-nav-link.active { color: #ffffff; background: #E63946; }

        /* ── admin panel ── */
        .gtg-admin-trigger {
          position: relative;
        }
        .gtg-admin-btn {
          display: flex; align-items: center; gap: 8px;
          background: rgba(230, 57, 70, 0.15);
          border: 1px solid rgba(230, 57, 70, 0.4);
          color: #fca5a5;
          font-size: 13px; font-weight: 700;
          padding: 8px 18px; border-radius: 12px;
          cursor: pointer; letter-spacing: 0.3px;
          transition: all .2s; white-space: nowrap;
          font-family: inherit;
        }
        .gtg-admin-btn:hover, .gtg-admin-btn.open {
          background: rgba(230, 57, 70, 0.25);
          color: #ffffff;
        }
        .gtg-admin-btn svg {
          width: 12px; height: 12px;
          transition: transform .2s;
        }
        .gtg-admin-btn.open svg { transform: rotate(180deg); }

        .gtg-admin-dropdown {
          position: absolute; top: calc(100% + 12px); left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 10px;
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 6px; width: 340px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          animation: dropIn .2s ease;
          z-index: 200;
        }
        @keyframes dropIn {
          from { opacity:0; transform: translateX(-50%) translateY(8px); }
          to   { opacity:1; transform: translateX(-50%) translateY(0); }
        }
        .gtg-admin-item {
          text-decoration: none;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          padding: 14px 8px; border-radius: 12px;
          color: #475569;
          font-size: 12px; font-weight: 600;
          transition: all .2s;
          text-align: center;
        }
        .gtg-admin-item:hover { background: #f1f5f9; color: #0f172a; }
        .gtg-admin-item.active { background: #fff1f2; color: #E63946; }
        .gtg-admin-item svg { width: 20px; height: 20px; }

        /* ── divider ── */
        .gtg-sep {
          width: 1px; height: 32px;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        /* ── right section ── */
        .gtg-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }

        .gtg-user {
          display: flex; align-items: center; gap: 12px;
        }
        .gtg-avatar-wrap {
          position: relative;
        }
        .gtg-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: block;
          transition: all .2s;
          cursor: pointer;
        }
        .gtg-avatar:hover { border-color: #E63946; transform: scale(1.05); }

        .gtg-user-info { display: flex; flex-direction: column; line-height: 1.2; }
        .gtg-role {
          font-size: 9px; font-weight: 800; letter-spacing: 1px;
          text-transform: uppercase; color: #fca5a5;
        }
        .gtg-name { font-size: 14px; font-weight: 700; color: #f8fafc; }

        .gtg-logout {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #94a3b8;
          font-size: 12px; font-weight: 700;
          padding: 8px 16px; border-radius: 10px;
          cursor: pointer; transition: all .2s;
          font-family: inherit;
        }
        .gtg-logout:hover {
          border-color: #E63946; color: #fca5a5;
          background: rgba(230, 57, 70, 0.1);
        }

        .gtg-login {
          text-decoration: none;
          background: #E63946; color: #fff;
          font-size: 14px; font-weight: 700;
          padding: 10px 24px; border-radius: 12px;
          transition: all .2s;
          box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
        }
        .gtg-login:hover { background: #c62b39; transform: translateY(-1px); }

        /* ── cart icon ── */
        .gtg-cart-link {
          position: relative;
          text-decoration: none;
          display: flex; align-items: center; justify-content: center;
          width: 42px; height: 42px;
          border-radius: 12px;
          color: #94a3b8;
          transition: all .2s;
          background: rgba(255, 255, 255, 0.05);
        }
        .gtg-cart-link:hover { color: #f8fafc; background: rgba(255, 255, 255, 0.1); }
        .gtg-cart-link.active { color: #ffffff; background: #E63946; }
        .gtg-cart-badge {
          position: absolute; top: -4px; right: -4px;
          min-width: 18px; height: 18px;
          background: #E63946; color: #fff;
          font-size: 10px; font-weight: 800;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 5px;
          border: 2px solid #1e293b;
        }

        /* ── overlay ── */
        .gtg-overlay {
          position: fixed; inset: 0; z-index: 150;
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
                    <div className="gtg-admin-dropdown">
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

          {/* Right section */}
          <div className="gtg-right">
            {/* Cart icon */}
            <Link
              to="/carrito"
              className={`gtg-cart-link${isActive("/carrito") ? " active" : ""}`}
              title="Carrito"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && (
                <span className="gtg-cart-badge">{cartCount}</span>
              )}
            </Link>

            {user ? (
              <div className="gtg-user">
                <div className="gtg-user-info text-right">
                  <span className="gtg-role">{user.role}</span>
                  <span className="gtg-name">{user.data?.nombre?.split(" ")[0] || "Usuario"}</span>
                </div>
                <Link to="/perfil" className="gtg-avatar-wrap">
                  <img
                    src={user.data?.profileImageUrl}
                    className="gtg-avatar"
                    alt="perfil"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${user.data?.nombre}&background=E63946&color=ffffff&bold=true`;
                    }}
                  />
                </Link>
                <button className="gtg-logout" onClick={handleLogout}>
                  Salir
                </button>
              </div>
            ) : (
              <Link to="/login-gtg" className="gtg-login">
                Iniciar Sesión
              </Link>
            )}
          </div>

        </div>
      </header>
    </>
  );
}