import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaLock, FaSignInAlt } from "react-icons/fa";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    // Simulación de validación (puedes cambiar credenciales aquí)
    setTimeout(() => {
      if (id === "admin" && password === "1234") {
        // 🔐 Guardamos sesión
        localStorage.setItem("admin", "true");

        // 🔄 Redirigimos al panel
        navigate("/administracion/empleados");
      } else {
        setErrors({ general: "Credenciales incorrectas" });
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 text-text-light font-display relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gray-700 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gray-900 rounded-full blur-xl"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm w-[420px] p-10 rounded-2xl shadow-2xl border border-gray-300 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-gray-500/50">
            <FaUserShield className="text-white text-2xl" />
          </div>
          <h1 className="font-extrabold text-3xl mb-2 text-gray-800">
            Administrador
          </h1>
          <p className="text-sm text-gray-600">Inicio de Sesión</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FaUserShield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ID Administrador"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (errors.id) setErrors({ ...errors, id: "" });
              }}
              className="w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none bg-white border-gray-200 focus:border-gray-600"
            />
            {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              className="w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none bg-white border-gray-200 focus:border-gray-600"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-500 text-sm text-center">
              {errors.general}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-3 mt-4 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaSignInAlt className="text-lg" />
            )}
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Acceso restringido para administradores</p>
        </div>
      </div>
    </div>
  );
}