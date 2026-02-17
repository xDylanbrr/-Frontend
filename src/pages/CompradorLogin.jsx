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
    // Simulate API call
    setTimeout(() => {
      console.log("Login:", { cedula, password });
      setIsLoading(false);
      // In real app, handle success/failure
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-indigo-100 text-gray-900 font-display relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-primary-accent rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-indigo-300 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-md w-[420px] p-10 rounded-2xl shadow-2xl border-2 border-blue-200/60 animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10" style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.95) 100%)'}}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-blue-300/50 animate-bounce">
            <FaUser className="text-white text-2xl drop-shadow-lg" />
          </div>
          <h1 className="text-center font-extrabold text-3xl mb-2 bg-gradient-to-r from-primary via-blue-700 to-primary-accent bg-clip-text text-transparent animate-pulse">
            Inicio de Sesión
          </h1>
          <p className="text-center text-sm text-blue-800 font-semibold">Comprador</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              required
              className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none bg-white transition-all duration-300 ${
                errors.cedula
                  ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                  : "border-gray-200 focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(0,123,255,0.15)]"
              }`}
            />
            {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula}</p>}
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
              required
              className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none bg-white transition-all duration-300 ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                  : "border-gray-200 focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(0,123,255,0.15)]"
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group flex items-center justify-center gap-3 mt-4 py-3 bg-gradient-to-r from-primary to-primary-accent text-white font-bold rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaSignInAlt className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
            )}
            {isLoading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-blue-700 font-medium">
          ¿No tienes cuenta?{" "}
          <button
            onClick={() => navigate("/comprador-register")}
            className="text-primary font-bold hover:text-primary-accent transition-all duration-300 hover:underline hover:scale-105"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}