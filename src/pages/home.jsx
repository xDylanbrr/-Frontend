import React from "react";
import {
  FaBoxOpen,
  FaLayerGroup,
  FaTags,
  FaBullseye,
  FaEye,
  FaShieldAlt,
  FaRecycle,
  FaCog,
  FaCertificate,
  FaArrowRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main 
      className="min-h-screen w-full font-display flex flex-col text-[#F8FAFC] selection:bg-[#14B8A6] selection:text-white"
      style={{ backgroundColor: "#0F172A" }} // Fondo Pizarra Profundo
    >
      
      {/* HERO SECTION */}
      <section className="relative w-full">
        <div
          className="flex min-h-[calc(100vh-80px)] max-h-[720px] w-full bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_LaXop1JmHJGeyXHeda1Yjy6IyNTzy-PlCMg3zyySl1PyyKzRb9gytexXhUl0nzWCOwHurHSEbFpXtYPxYs4YJDWoImHx5DzxI2Ave31sKx8YLW1WEoSbmordQd6YTqbNz9a5YMyWNLTohwXif7Ezbh4qyFy-BQ9ZySUrQ2bL6PL7QgQQLXGImSvqJFagMDrxArTpCGtW2txRGGMR-W7YL04QenKpFSQxtg6pyA6pt25akykMz0Z7_NmrgjS22VJlujQmUTKzcxrx")`,
          }}
        >
          {/* Capa oscura con degradado sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/80 to-transparent"></div>

          <div className="container mx-auto px-4 max-w-7xl flex items-center relative z-10">
            <div className="max-w-3xl flex flex-col gap-6 items-start mt-8">
              <span className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm">
                Soluciones Industriales
              </span>
              <h1 className="text-[#F8FAFC] text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-left">
                Innovación en <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF]">
                  Empaques Flexibles
                </span>
              </h1>
              <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl font-light tracking-wide leading-relaxed text-left border-l-4 border-[#14B8A6] pl-6 py-1">
                Ofrecemos soluciones de empaque de alta calidad adaptadas a las
                necesidades de su negocio, combinando tecnología y sostenibilidad.
              </p>
              
              {/* Botón redondeado (forma de píldora) */}
              <button 
                onClick={() => navigate('/productos')}
                className="mt-4 px-8 py-4 bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:from-[#2DD4BF] hover:to-[#14B8A6] text-white font-bold rounded-full transition-all duration-300 shadow-lg flex items-center gap-3 transform hover:-translate-y-1"
              >
                Explorar Productos
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS SECTION */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC] mb-4">
              Nuestros Productos
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#14B8A6] to-transparent rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Bolsas y Rollos Pigmentados",
                desc: "Soluciones versátiles para todo tipo de productos.",
                img: "https://www.gtg.com.do/media/design/PIGMENTADO-01-min.webp",
                icon: <FaBoxOpen className="text-[#14B8A6] text-3xl mb-3" />
              },
              {
                title: "Films",
                desc: "Películas de alta barrera para máxima protección.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgPyXi69MN1rYv4JNv6x-_UTcxfM2lT7yaiZyUu4neHCkRLgcjjPYvBbCR1bHste1Q1ZGPLj4wFe85QTm9OKbX0qE1UIAORlCSB_ZCfWxjF3JIF1xK_VGOdvp8isIrU-fBDFHmO8-PRIvRYAgZEWCi-9lUKz1MrQ94GtuWffVvcR4rJAr7vqqksbqFtoOh_TNDWAa86NQ_BOUK_MQVUcatKDHP4moofIsQBHQop-67xYAp27DxF-MGH0rBs0F6UaoD-BT0OrV2mMfH",
                icon: <FaLayerGroup className="text-[#14B8A6] text-3xl mb-3" />
              },
              {
                title: "Etiquetas",
                desc: "Etiquetas personalizadas para resaltar su marca.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMzk7JRR-ObN_Tu4Kgzc3hEt0-qa6ac1lEEpbmmNMweVgBQag1bTqyMw3qCNXPIurtC7h-SkxyIj0IsIQvi_UqwMtA83nO9f521TepnAtDae3ZbJECoEp3GMkALPbbWBmydWxHPeUjwbv6wWO5QJiVyKpLkJiC5qU3NoZsxQzN6kcbJr6i-6F5KNLyIhgRifGZTQqiK3Qg7c7xjp33AixuqN0zZUiiaMJAaKPxg75ARL7_e1LTHomFKuGm6diLRTQUD-rqz_EVkCfF",
                icon: <FaTags className="text-[#14B8A6] text-3xl mb-3" />
              },
            ].map((p, index) => (
              <div
                key={index}
                // Aquí volvemos a poner rounded-2xl para bordes bien suaves
                className="group flex flex-col rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-[#334155] hover:border-[#14B8A6]/50 shadow-lg"
                style={{ backgroundColor: "#1E293B" }}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  {p.icon}
                  <h3 className="font-bold text-xl mb-3 text-[#F8FAFC] group-hover:text-[#14B8A6] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDENTIDAD SECTION */}
      <section className="py-24 border-t border-[#1E293B]" style={{ backgroundColor: "#020617" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC] mb-4">
              Nuestra Identidad
            </h2>
            <div className="w-24 h-1 bg-[#14B8A6] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjetas de identidad con bordes redondos */}
            <div 
                className="group p-10 border border-[#334155] rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-[#14B8A6]/50"
                style={{ backgroundColor: "#0F172A" }}
            >
              <div className="flex items-center justify-center w-20 h-20 bg-[#1E293B] rounded-2xl border border-[#334155] group-hover:border-[#14B8A6]/50 transition-all duration-300 mb-6">
                <FaBullseye className="text-[#14B8A6] text-4xl" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-[#F8FAFC]">Misión</h3>
              <p className="text-[#94A3B8] text-base">
                Proveer soluciones de empaque innovadoras y sostenibles con calidad excepcional.
              </p>
            </div>

            <div 
                className="group p-10 border border-[#334155] rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-[#14B8A6]/50"
                style={{ backgroundColor: "#0F172A" }}
            >
              <div className="flex items-center justify-center w-20 h-20 bg-[#1E293B] rounded-2xl border border-[#334155] group-hover:border-[#14B8A6]/50 transition-all duration-300 mb-6">
                <FaEye className="text-[#14B8A6] text-4xl" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-[#F8FAFC]">Visión</h3>
              <p className="text-[#94A3B8] text-base">
                Ser líderes reconocidos en la industria del empaque flexible en la región.
              </p>
            </div>

            <div 
                className="group p-10 border border-[#334155] rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-[#14B8A6]/50"
                style={{ backgroundColor: "#0F172A" }}
            >
              <div className="flex items-center justify-center w-20 h-20 bg-[#1E293B] rounded-2xl border border-[#334155] group-hover:border-[#14B8A6]/50 transition-all duration-300 mb-6">
                <FaShieldAlt className="text-[#14B8A6] text-4xl" />
              </div>
              <h3 className="font-bold text-2xl mb-4 text-[#F8FAFC]">Valores</h3>
              <p className="text-[#94A3B8] text-base">
                Integridad, innovación constante y enfoque total en el cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALIDAD Y SOSTENIBILIDAD */}
      <section className="py-24 border-t border-[#1E293B] bg-gradient-to-b from-[#0F172A] to-[#020617]">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-[#F8FAFC]">
            Calidad y Sostenibilidad
          </h2>
          <div className="w-24 h-1 bg-[#14B8A6] rounded-full mb-10 mx-auto"></div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div 
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-[#334155] hover:border-[#14B8A6] transition-all duration-300"
                style={{ backgroundColor: "#1E293B" }}
            >
              <FaCertificate className="text-[#14B8A6] text-3xl mb-2" />
              <span className="font-medium text-base text-[#F8FAFC]">ISO 9001</span>
            </div>

            <div 
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-[#334155] hover:border-[#14B8A6] transition-all duration-300"
                style={{ backgroundColor: "#1E293B" }}
            >
              <FaRecycle className="text-[#14B8A6] text-3xl mb-2" />
              <span className="font-medium text-base text-[#F8FAFC]">Reciclable</span>
            </div>

            <div 
                className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-[#334155] hover:border-[#14B8A6] transition-all duration-300"
                style={{ backgroundColor: "#1E293B" }}
            >
              <FaCog className="text-[#14B8A6] text-3xl mb-2" />
              <span className="font-medium text-base text-[#F8FAFC]">Eficiencia</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}