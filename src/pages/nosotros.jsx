import React from "react";
import { FaBullseye, FaEye, FaShieldAlt } from "react-icons/fa";

export default function Nosotros() {
  return (
    <main 
      className="min-h-screen w-full font-display flex flex-col text-[#F8FAFC] selection:bg-[#14B8A6] selection:text-white"
      style={{ backgroundColor: "#0F172A" }} // Fondo Pizarra Profundo
    >
      
      {/* HERO SECTION */}
      <section className="relative w-full">
        <div
          className="flex min-h-[calc(100vh-80px)] max-h-[500px] w-full bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070")`,
          }}
        >
          {/* Capa oscura con degradado sutil igual al Home */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/80 to-transparent"></div>

          <div className="container mx-auto px-4 max-w-7xl flex items-center relative z-10">
            <div className="max-w-3xl flex flex-col gap-6 items-start mt-8">
              <span className="text-[#14B8A6] font-bold tracking-widest uppercase text-sm">
                Sobre Nosotros
              </span>
              <h1 className="text-[#F8FAFC] text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-left">
                Conoce a <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-[#2DD4BF]">
                  GTG
                </span>
              </h1>
              <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl font-light tracking-wide leading-relaxed text-left border-l-4 border-[#14B8A6] pl-6 py-1">
                Líderes en la fabricación de empaques flexibles, comprometidos con la calidad operativa y la excelencia en el servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRA HISTORIA */}
      <section className="py-24 border-t border-[#1E293B]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC] mb-2">
                Nuestra Historia
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#14B8A6] to-transparent rounded-full mb-4"></div>
              <p className="text-[#94A3B8] text-lg leading-relaxed tracking-wide">
                Desde nuestra fundación, GTG se ha dedicado a la innovación y la calidad en el mundo del embalaje flexible. Nuestra trayectoria está marcada por un crecimiento constante y un compromiso inquebrantable con las necesidades de nuestros clientes, convirtiéndonos en un socio de confianza en la industria.
              </p>
              <p className="text-[#94A3B8] text-lg leading-relaxed tracking-wide">
                Con décadas de experiencia, hemos perfeccionado nuestros procesos para ofrecer soluciones que no solo protegen productos, sino que también realzan marcas en el mercado global.
              </p>
            </div>
            
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#334155] group">
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=80&w=2071")`
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* NUESTROS PRINCIPIOS (Misión, Visión, Valores) */}
      <section className="py-24 border-t border-[#1E293B]" style={{ backgroundColor: "#020617" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC] mb-4">
              Nuestros Principios
            </h2>
            <div className="w-24 h-1 bg-[#14B8A6] rounded-full mb-6"></div>
            <p className="text-[#94A3B8] max-w-2xl text-lg tracking-wide">
              Los pilares fundamentales que guían cada una de nuestras acciones y decisiones corporativas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaBullseye className="text-[#14B8A6] text-4xl" />, 
                title: "Misión", 
                desc: "Proveer soluciones de empaque innovadoras y sostenibles con calidad excepcional, impulsando el éxito y agregando valor a los productos de nuestros clientes." 
              },
              { 
                icon: <FaEye className="text-[#14B8A6] text-4xl" />, 
                title: "Visión", 
                desc: "Ser el referente y líder en la industria del empaque flexible, reconocidos por nuestra excelencia operativa, innovación constante y sostenibilidad." 
              },
              { 
                icon: <FaShieldAlt className="text-[#14B8A6] text-4xl" />, 
                title: "Valores", 
                desc: "Calidad, innovación, integridad y compromiso total con el cliente son los pilares fundamentales que nos definen y nos guían en cada proyecto." 
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="group p-10 border border-[#334155] rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-[#14B8A6]/50 shadow-lg transform hover:-translate-y-2"
                style={{ backgroundColor: "#0F172A" }}
              >
                <div className="flex items-center justify-center w-20 h-20 bg-[#1E293B] rounded-2xl border border-[#334155] group-hover:border-[#14B8A6]/50 transition-all duration-300 mb-6">
                  {item.icon}
                </div>
                <h3 className="font-bold text-2xl mb-4 text-[#F8FAFC] group-hover:text-[#14B8A6] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#94A3B8] leading-relaxed text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOSTENIBILIDAD AMBIENTAL */}
      <section className="py-24 border-t border-[#1E293B] bg-gradient-to-b from-[#0F172A] to-[#020617]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagen a la izquierda */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-[#334155] group order-2 lg:order-1">
              <div
                className="w-full h-full bg-center bg-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=2070")`
                }}
              />
            </div>
            
            {/* Texto a la derecha */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#F8FAFC] mb-2">
                Sostenibilidad Ambiental
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#14B8A6] to-transparent rounded-full mb-4"></div>
              <p className="text-[#94A3B8] text-lg leading-relaxed tracking-wide">
                Somos conscientes de nuestro impacto en el planeta. Por ello, en GTG estamos comprometidos con prácticas de producción eco-amigables, optimizando el uso de recursos y minimizando residuos.
              </p>
              <p className="text-[#94A3B8] text-lg leading-relaxed tracking-wide">
                Fomentamos activamente el uso de materiales reciclables y trabajamos constantemente en el desarrollo de soluciones de empaque más sostenibles, contribuyendo a un futuro más verde para las próximas generaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}