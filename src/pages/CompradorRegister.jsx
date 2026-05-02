import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaPhone, FaEnvelope, FaLock, FaUserPlus, FaIdCard } from "react-icons/fa";
import API_BASE_URL from "../apiConfig";

export default function CompradorRegister({ setUser }) {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    empresa: "",
    telefono: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ Función para formatear la cédula dominicana automáticamente
  const formatCedula = (value) => {
    // Elimina todo lo que no sea un número
    const digits = value.replace(/\D/g, "");
    let formatted = digits;

    if (digits.length > 3 && digits.length <= 10) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length > 10) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10, 11)}`;
    }
    return formatted.slice(0, 13); // Límite máximo de caracteres con guiones
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si el campo es cédula, aplicamos el formato
    const finalValue = name === "cedula" ? formatCedula(value) : value;

    setFormData({ ...formData, [name]: finalValue });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    
    // Validación de cédula completa (11 números + 2 guiones = 13 caracteres)
    if (!formData.cedula.trim() || formData.cedula.length < 13) {
      newErrors.cedula = "Cédula incompleta";
    }

    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    
    if (!formData.password.trim()) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/comprador-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const userData = data.user || data;
        localStorage.setItem("comprador", JSON.stringify(userData));
        if (data.token) localStorage.setItem("token", data.token);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);

        if (setUser) setUser({ role: "comprador", data: userData });
        navigate("/");
      } else {
        setErrors({ general: data.message || "Error al registrar" });
      }
    } catch (error) {
      setErrors({ general: "No hay conexión con el servidor" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-display py-8">
      <div className="bg-white w-[480px] max-w-[90vw] p-8 rounded-2xl shadow-2xl border border-gray-100 relative z-10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-red-50">
            <FaUserPlus className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1e293b]">Registro</h1>
          <p className="text-gray-500 text-sm">Nuevo Comprador</p>
        </div>

        {errors.general && (
          <div className="mb-4 p-2 bg-red-100 border-l-4 border-red-500 text-red-700 text-xs font-bold">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre Completo"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none transition-all ${
                  errors.nombre ? "border-red-400" : "border-gray-200 focus:border-[#E63946]"
                }`}
              />
            </div>

            <div className="relative">
              <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="cedula"
                placeholder="000-0000000-0"
                value={formData.cedula}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none transition-all ${
                  errors.cedula ? "border-red-400" : "border-gray-200 focus:border-[#E63946]"
                }`}
              />
              {errors.cedula && <span className="text-[10px] text-red-500 absolute -bottom-4 left-0">{errors.cedula}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="empresa"
                placeholder="Empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#E63946]"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#E63946]"
              />
            </div>
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none ${
                errors.email ? "border-red-400" : "border-gray-200 focus:border-[#E63946]"
              }`}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none ${
                errors.password ? "border-red-400" : "border-gray-200 focus:border-[#E63946]"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-3 mt-4 py-3 bg-[#E63946] text-white font-bold rounded-xl hover:bg-[#DC2626] transition-all disabled:opacity-50 shadow-lg shadow-red-100"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaUserPlus />
            )}
            {isLoading ? "Procesando..." : "Registrarse Ahora"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/login-gtg")}
            className="text-[#E63946] font-semibold hover:underline"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}