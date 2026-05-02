import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaFlask, 
  FaCheckCircle, 
  FaPalette, 
  FaLeaf, 
  FaRecycle, 
  FaTrash, 
  FaBolt, 
  FaArrowRight 
} from "react-icons/fa";

export default function Calidad() {
  const navigate = useNavigate();

  return (
    <main 
      className="min-h-screen w-full font-display flex flex-col text-[#F8FAFC] selection:bg-[#14B8A6] selection:text-white"
      style={{ backgroundColor: "#0F172A" }}
    >
      
      {/* ── HERO SECTION ── */}
      <section className="relative w-full border-b border-[#1E293B]">
        <div
          className="flex min-h-[calc(100vh-80px)] max-h-[500px] w-full bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuHYeGNxz_m9U0bfCBWd2n2jF61Uk6Th_jTcqHXjjx5mKkurxFo2LwZZaDJwjHC1Wxu_NIRHmUN3EyItSw5WeV5ZkNKUduAMw4ORDntL6WAYUyr6A5nY3qcaBKtiNmvI-Ihnc0ptecZ5IR8ksVavFFeWkhACtbyq7gzpU3M0gSwmy0EZJ-WX5wBhpf9i7k7SnkPN-q1JOh16kvhJS4jGu6hKGl0nnMg-AteJ8m2FJjOjxDwXmfBL_KZXB1D923aXNnrTal1rtdQqT0")`,
          }}
        >
          {/* Capa oscura con degradado sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/80 to-transparent"></div>

          <div className="container mx-auto px-4 max-w-7xl flex items-center relative z-10">
            <div className="max-w-3xl flex flex-col gap-6 items-start mt-8">
              <span className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm">
                Nuestro Compromiso
              </span>
              <h1 className="text-[#F8FAFC] text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-left">
                Calidad y <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF]">
                  Sostenibilidad
                </span>
              </h1>
              <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl font-light tracking-wide leading-relaxed text-left border-l-4 border-[#14B8A6] pl-6 py-1">
                Destacando nuestro compromiso con los más altos estándares de calidad y responsabilidad ambiental en la fabricación de empaques flexibles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRODUCCIÓN (Pilares) ── */}
      <section className="py-24 border-t border-[#1E293B]" style={{ backgroundColor: "#020617" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC] mb-4">
              Nuestros Pilares de Excelencia
            </h2>
            <div className="w-24 h-1 bg-[#14B8A6] rounded-full mb-6"></div>
            <p className="text-[#94A3B8] max-w-3xl text-lg md:text-xl tracking-wide leading-relaxed">
              Construimos nuestra reputación sobre tres pilares fundamentales: adhesión a normas internacionales, control de calidad riguroso y un profundo compromiso con la sostenibilidad ambiental.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 1: CONTROL DE CALIDAD RIGUROSO ── */}
      <section className="py-24 border-t border-[#1E293B]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col gap-6 lg:order-1 order-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 bg-[#1E293B] rounded-2xl flex items-center justify-center border border-[#334155] text-[#14B8A6] shadow-lg">
                  <FaFlask size={26} />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                  Control de Calidad Riguroso
                </h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-[#14B8A6] to-transparent rounded-full mb-2"></div>
              
              <p className="text-[#94A3B8] text-lg leading-relaxed tracking-wide">
                Nuestro proceso de control en múltiples etapas garantiza que cada producto cumpla con criterios estrictos de rendimiento y seguridad. Desde la inspección de materia prima hasta las pruebas finales, no dejamos lugar a errores.
              </p>
              
              <ul className="flex flex-col gap-4 mt-4">
                <li className="flex items-center gap-4 bg-[#020617] p-5 rounded-2xl border border-[#334155] shadow-lg">
                  <FaCheckCircle className="text-[#14B8A6] text-2xl shrink-0" />
                  <span className="text-[#F8FAFC] font-semibold text-lg">Pruebas de Resistencia de Materiales</span>
                </li>
                <li className="flex items-center gap-4 bg-[#020617] p-5 rounded-2xl border border-[#334155] shadow-lg">
                  <FaCheckCircle className="text-[#14B8A6] text-2xl shrink-0" />
                  <span className="text-[#F8FAFC] font-semibold text-lg">Análisis de Integridad de Sellado</span>
                </li>
                <li className="flex items-center gap-4 bg-[#020617] p-5 rounded-2xl border border-[#334155] shadow-lg">
                  <FaPalette className="text-[#14B8A6] text-2xl shrink-0" />
                  <span className="text-[#F8FAFC] font-semibold text-lg">Calidad de Impresión y Precisión de Color</span>
                </li>
              </ul>
            </div>
            
            <div className="w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-lg border border-[#334155] group lg:order-2 order-1">
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLbzbaDOdPJBFD8qeLOuhHv7ib7X3AicPic0fEJwn4J9-JJEPX398ADE7Aw3LUSgeNwLmDgvihS7aXgVsDvl9ZSwwPYVuIGZV7-CM6MOElQiKQqHLYUWmevD9FmOATxCbgInWhcwL-6R5wR9ftz3DgJ8h0LbVTqNcuXZAxROSKQEyjT2kNNE381szwLOOCULww02XqLlRDQudcQ57c-KBTfX3qDE7YevekoUmNllOaaUgWOgBJN0uPiCVwScZkUsLyUf9Dpc-TV-T2")` }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: SOSTENIBILIDAD AMBIENTAL ── */}
      <section className="py-24 border-t border-[#1E293B]" style={{ backgroundColor: "#020617" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-lg border border-[#334155] group order-2 lg:order-1">
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBA-NMJq5mOzLtlpJHBUqWzaA90gOn2Iz-p39wGlxnoKukQUCIt4-tFwCV0fn8PJDjobqnzL-bCoGH8PyuVmrJLS9lmG8_sp_OmqxoEPZNaVT4yPw0eBPKJJz_o8tVT14uOG_avA2B2HzxW4ExVRUYQJp7vf9WdqPd2vLDszLrxTa6WqlIomv0C0laQNfn58UAxvbxxq-zGboJETyWiFsuunMDFA3x0Sdu37oFFBZkoKkRdtRhjpQwV_WXW6dFOMlELjJJIcsq76-_2")` }}
              />
            </div>

            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 bg-[#1E293B] rounded-2xl flex items-center justify-center border border-[#334155] text-[#14B8A6] shadow-lg">
                  <FaLeaf size={26} />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
                  Sostenibilidad Ambiental
                </h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-[#14B8A6] to-transparent rounded-full mb-2"></div>
              
              <p className="text-[#94A3B8] text-lg leading-relaxed tracking-wide">
                Estamos dedicados a prácticas ecológicas como parte fundamental de nuestra filosofía. Innovamos continuamente para minimizar nuestro impacto ambiental y promover una economía circular.
              </p>

              <div className="grid grid-cols-1 gap-5 mt-4">
                {/* Tarjeta 1 */}
                <div className="flex items-start gap-5 p-6 rounded-2xl border border-[#334155] bg-[#0F172A] hover:border-[#14B8A6]/50 transition-colors shadow-lg group/card">
                  <div className="mt-1 bg-[#1E293B] p-3 rounded-xl group-hover/card:bg-[#14B8A6]/10 transition-colors">
                    <FaRecycle className="text-[#14B8A6] text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#F8FAFC] mb-2">Materiales Reciclables</h3>
                    <p className="text-[#94A3B8] leading-relaxed">Priorizando materiales que pueden ser reciclados y reutilizados en nuevos ciclos productivos.</p>
                  </div>
                </div>

                {/* Tarjeta 2 */}
                <div className="flex items-start gap-5 p-6 rounded-2xl border border-[#334155] bg-[#0F172A] hover:border-[#14B8A6]/50 transition-colors shadow-lg group/card">
                  <div className="mt-1 bg-[#1E293B] p-3 rounded-xl group-hover/card:bg-[#14B8A6]/10 transition-colors">
                    <FaTrash className="text-[#14B8A6] text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#F8FAFC] mb-2">Reducción de Residuos</h3>
                    <p className="text-[#94A3B8] leading-relaxed">Implementando procesos eficientes para minimizar los mermas en cada etapa de producción.</p>
                  </div>
                </div>

                {/* Tarjeta 3 */}
                <div className="flex items-start gap-5 p-6 rounded-2xl border border-[#334155] bg-[#0F172A] hover:border-[#14B8A6]/50 transition-colors shadow-lg group/card">
                  <div className="mt-1 bg-[#1E293B] p-3 rounded-xl group-hover/card:bg-[#14B8A6]/10 transition-colors">
                    <FaBolt className="text-[#14B8A6] text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#F8FAFC] mb-2">Eficiencia Energética</h3>
                    <p className="text-[#94A3B8] leading-relaxed">Invirtiendo en tecnología de última generación para reducir nuestro consumo de energía.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA (LLAMADO A LA ACCIÓN) ── */}
      <section className="py-24 border-t border-[#1E293B] bg-gradient-to-b from-[#0F172A] to-[#020617]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-lg">
            
            {/* Decoraciones de fondo sutiles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#14B8A6]/5 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-[#14B8A6]/5 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC] mb-6">
                Comprometidos con la Excelencia, <br className="hidden md:block"/> Dedicados al Planeta.
              </h2>
              <p className="text-[#94A3B8] text-lg md:text-xl mb-10 max-w-2xl mx-auto tracking-wide">
                Aprende más sobre cómo nuestras iniciativas de calidad y sostenibilidad pueden beneficiar a tu negocio y optimizar tu cadena de suministro.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => navigate('/contacto')}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#2DD4BF] hover:to-[#14B8A6] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg transform hover:-translate-y-1"
                >
                  Contáctanos
                  <FaArrowRight size={18} />
                </button>
                <Link 
                  to="/productos" 
                  className="text-[#F8FAFC] font-semibold hover:text-[#14B8A6] transition-colors flex items-center gap-2 group"
                >
                  Explorar productos 
                  <FaArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}