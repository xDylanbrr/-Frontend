import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield } from "react-icons/fa";

export default function LoginIndex() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 text-text-light font-display relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary-accent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300 rounded-full blur-lg"></div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm w-[420px] p-10 rounded-2xl shadow-2xl border border-blue-200 animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-blue-300/50">
            <FaUserShield className="text-black text-2xl drop-shadow-lg" />
          </div>
          <h1 className="text-center font-extrabold text-3xl mb-2 text-primary bg-gradient-to-r from-primary to-primary-accent bg-clip-text text-transparent">
            Sistema de Acceso
          </h1>
          <p className="text-center text-sm text-gray-600">Seleccione el tipo de acceso</p>
        </div>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => navigate("/comprador-login")}
            className="group flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-primary to-primary-accent text-black font-bold rounded-xl hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 border border-primary/20"
          >
            <FaUser className="text-xl group-hover:rotate-12 transition-transform duration-300" />
            Login de Comprador
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="group flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-gray-700/30 hover:scale-105 transition-all duration-300 border border-gray-600/20"
          >
            <FaUserShield className="text-xl group-hover:rotate-12 transition-transform duration-300" />
            Login de Administrador
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">Acceso seguro y confiable</p>
        </div>
      </div>
    </div>
  );
}