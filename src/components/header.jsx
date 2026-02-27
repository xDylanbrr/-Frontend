import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("comprador");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    setUser(null); // Limpiamos el estado global
    navigate("/login-gtg");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          <span className="text-red-500">G</span>
          <span className="text-gray-800">T</span>
          <span className="text-gray-800">G</span>
        </Link>

        {/* NAV */}
        <nav className="flex gap-6 text-sm font-medium text-gray-700 items-center">
          <Link to="/" className="transition-colors hover:text-sky-500">Inicio</Link>
          <Link to="/nosotros" className="transition-colors hover:text-sky-500">Nosotros</Link>
          <Link to="/productos" className="transition-colors hover:text-sky-500">Productos</Link>
          <Link to="/calidad" className="transition-colors hover:text-sky-500">Calidad</Link>

          {user?.role === "admin" && (
            <Link to="/administracion/empleados" className="text-red-600 font-bold hover:text-red-700">
              Gestión
            </Link>
          )}

          {/* 🔐 SECCIÓN DE USUARIO */}
          <div className="ml-4 border-l pl-6 flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/perfil">
                  <img 
                    src={user.data?.profileImageUrl} 
                    className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm hover:opacity-80 transition-opacity cursor-pointer" 
                    alt="perfil"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${user.data?.nombre}&background=0D8ABC&color=fff`;
                    }}
                  />
                </Link>
                
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-bold text-sky-600 leading-none">
                    {user.role}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {user.data?.nombre?.split(" ")[0] || "Usuario"}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="ml-2 text-[11px] bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100 font-bold hover:bg-red-600 hover:text-white transition-all"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link to="/login-gtg" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}