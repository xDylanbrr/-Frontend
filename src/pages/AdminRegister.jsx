import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaLock, FaUserPlus } from "react-icons/fa";

export default function AdminRegister() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!id.trim()) newErrors.id = "El ID es requerido";
    if (!password.trim()) newErrors.password = "La contraseña es requerida";
    if (password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log("Admin Register:", { id, password });
      setIsLoading(false);
      navigate("/admin-login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-display relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-[#E63946] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#DC2626] rounded-full blur-2xl"></div>
      </div>

      <div className="bg-white w-[420px] p-10 rounded-2xl shadow-2xl border border-gray-100 relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-red-50">
            <FaUserShield className="text-white text-2xl" />
          </div>
          <h1 className="font-extrabold text-3xl text-[#1e293b]">
            Registrar Administrador
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Acceso restringido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* ID */}
          <div>
            <input
              type="text"
              placeholder="ID Administrador"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${
                errors.id
                  ? "border-red-400"
                  : "border-gray-200 focus:border-[#E63946]"
              }`}
            />
            {errors.id && <p className="text-xs text-red-500 mt-1">{errors.id}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${
                errors.password
                  ? "border-red-400"
                  : "border-gray-200 focus:border-[#E63946]"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm */}
          <div>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${
                errors.confirmPassword
                  ? "border-red-400"
                  : "border-gray-200 focus:border-[#E63946]"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group flex items-center justify-center gap-3 mt-4 py-3 bg-[#E63946] text-white font-bold rounded-xl hover:bg-[#DC2626] transition disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaUserPlus />
            )}
            {isLoading ? "Registrando..." : "Registrar Admin"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <button
            onClick={() => navigate("/admin-login")}
            className="hover:underline"
          >
            Volver al login
          </button>
        </div>
      </div>
    </div>
  );
}
