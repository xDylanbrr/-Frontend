import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

export default function CompradorLogin() {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!cedula.trim()) newErrors.cedula = "La cédula es requerida";
    if (!password.trim()) newErrors.password = "La contraseña es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // ✅ Petición al puerto 3000
      const response = await fetch("http://localhost:3000/api/auth/comprador-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos la sesión
        localStorage.setItem("comprador", JSON.stringify(data.user));
        if (data.token) localStorage.setItem("token", data.token);
        
        // Redirigir al inicio
        navigate("/"); 
      } else {
        // Error desde el backend (ej. contraseña incorrecta)
        setErrors({ general: data.message || "Cédula o contraseña incorrectos" });
      }
    } catch (error) {
      setErrors({ general: "Error de conexión con el servidor (Puerto 3000)" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-100 text-gray-900 font-display relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-600 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-500 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-md w-[420px] p-10 rounded-2xl shadow-2xl border-2 border-blue-200/60 animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-blue-300/50">
            <FaUser className="text-white text-2xl" />
          </div>
          <h1 className="text-center font-extrabold text-3xl mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Inicio de Sesión
          </h1>
          <p className="text-center text-sm text-blue-800 font-semibold">Área de Compradores</p>
        </div>

        {/* Alerta de error general del backend */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold rounded animate-shake">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input Cédula */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => {
                setCedula(e.target.value);
                if (errors.cedula) setErrors({ ...errors, cedula: "" });
              }}
              className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none transition-all ${
                errors.cedula || errors.general ? "border-red-400" : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors.cedula && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.cedula}</p>}
          </div>

          {/* Input Password */}
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
              className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none transition-all ${
                errors.password || errors.general ? "border-red-400" : "border-gray-200 focus:border-blue-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group flex items-center justify-center gap-3 mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaSignInAlt />
            )}
            {isLoading ? "Validando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-blue-700 font-medium">
          ¿No tienes cuenta?{" "}
          <button 
            type="button"
            onClick={() => navigate("/comprador-register")} 
            className="text-blue-600 font-bold hover:underline ml-1"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}