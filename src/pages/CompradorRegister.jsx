import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaPhone, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";

export default function CompradorRegister() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.cedula.trim()) newErrors.cedula = "La cédula es requerida";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.password.trim()) newErrors.password = "La contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Register:", formData);
      setIsLoading(false);
      // In real app, handle success/failure
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 text-text-light font-display relative overflow-hidden py-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary-accent rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-300 rounded-full blur-lg"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm w-[480px] max-w-[90vw] p-8 rounded-2xl shadow-2xl border border-blue-200 animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-blue-300/50">
            <FaUserPlus className="text-white text-2xl drop-shadow-lg" />
          </div>
          <h1 className="text-center font-extrabold text-3xl mb-2 text-primary bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-black">
            Registro
          </h1>
          <p className="text-center text-sm text-gray-600">Nuevo Comprador</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre Completo"
                value={formData.nombre}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none bg-white transition-all duration-300 ${
                  errors.nombre
                    ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                    : "border-gray-200 focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(0,123,255,0.15)]"
                }`}
              />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>

            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="cedula"
                placeholder="Cédula"
                value={formData.cedula}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none bg-white transition-all duration-300 ${
                  errors.cedula
                    ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                    : "border-gray-200 focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(0,123,255,0.15)]"
                }`}
              />
              {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="empresa"
                placeholder="Empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl outline-none bg-white transition-all focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(0,123,255,0.15)]"
              />
            </div>

            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="telefono"
                placeholder="Número de Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl outline-none bg-white transition-all focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(0,123,255,0.15)]"
              />
            </div>
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-3 border-2 rounded-xl outline-none bg-white transition-all duration-300 ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                  : "border-gray-200 focus:border-primary-accent focus:shadow-[0_0_0_3px_rgba(0,123,255,0.15)]"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
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
            className="group flex items-center justify-center gap-3 mt-4 py-3 bg-gradient-to-r from-primary to-primary-accent text-black font-bold rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaUserPlus className="text-lg group-hover:scale-110 transition-transform duration-300" />
            )}
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <button
            onClick={() => navigate("/comprador-login")}
            className="text-primary font-semibold hover:text-primary-accent transition-colors duration-300 hover:underline"
          >
            Volver al login
          </button>
        </div>
      </div>
    </div>
  );
}