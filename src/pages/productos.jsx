import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Package } from "lucide-react";

export const productosData = [
  {
    id: 1,
    title: "Bolsas de ziploc Personalizadas",
    price: 190.00,
    tag: "Alimenticio",
    img: "https://http2.mlstatic.com/D_NQ_NP_2X_835713-MLC73799905083_012024-F-pack-500-bolsas-tipo-zipperziploc-de-4x6-cm.webp",
    desc: "Bolsas con cierre hermético de alta calidad, ideales para el sector alimenticio y farmacéutico. Disponibles en varios tamaños.",
  },
  {
    id: 2,
    title: "Rollos de Plástico Termoencogible",
    price: 2500.00,
    tag: "Industrial",
    img: "https://www.gtg.com.do/media/design/termoencogible-01-min.webp",
    desc: "Película de polietileno de alto rendimiento que se adapta a la forma de su producto mediante calor.",
  },
  {
    id: 3,
    title: "Empaques con Impresión Personalizada",
    price: 900.00,
    tag: "Branding",
    img: "https://www.gtg.com.do/media/design/Flat_bag_making_machine_4a-01.webp",
    desc: "Soluciones completas de empaque con diseño flexográfico personalizado para resaltar su marca.",
  },
  {
    id: 4,
    title: "Bolsas y Rollos Pigmentados",
    price: 450.00,
    tag: "Variedad",
    img: "https://www.gtg.com.do/media/design/PIGMENTADO-01-min.webp",
    desc: "Fabricación de bolsas y rollos en polietileno de alta y baja densidad. Disponibles en opciones transparentes o pigmentadas.",
  },
  {
    id: 5,
    title: "Láminas de Polietileno",
    price: 600.00,
    tag: "Protección",
    img: "https://www.gtg.com.do/media/design/POLYOVERLAY-01-min.webp",
    desc: "Láminas de plástico resistentes y versátiles, ideales para procesos de corte industrial, división de productos o empaque manual.",
  },
  {
    id: 6,
    title: "Rollos Precortados (Lavandería)",
    price: 1200.00,
    tag: "Textil",
    img: "https://www.gtg.com.do/media/design/PRECORTADO-01-min.webp",
    desc: "Rollos con precorte especial diseñados para agilizar el trabajo en lavanderías, tintorerías y textil.",
  }
];

export default function Productos() {
  return (
    <main
      className="min-h-screen w-full font-display flex flex-col text-[#1e293b]"
      style={{ backgroundColor: "#F1F5F9" }}
    >

      {/* ── GRID DE PRODUCTOS ── */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {productosData.map((p) => (
              <Link
                key={p.id}
                to={`/producto/${p.id}`}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 border border-[#e2e8f0] hover:border-[#E63946]/50 shadow-lg hover:shadow-[0_15px_40px_rgba(230,57,70,0.1)]"
              >
                {/* IMAGEN */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-[#f1f5f9]">
                  {p.img ? (
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${p.img})` }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#334155]">
                      <Package size={64} strokeWidth={1} />
                    </div>
                  )}

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 border border-white/20">
                      <Search size={28} className="text-white" />
                    </div>
                  </div>

                  {/* Tag badge */}
                  <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-md border border-[#e2e8f0] text-[#E63946] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-10">
                    {p.tag}
                  </span>
                </div>

                {/* CUERPO */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-extrabold text-2xl mb-3 text-[#1e293b] group-hover:text-[#E63946] transition-colors leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 flex-grow mb-6">
                    {p.desc}
                  </p>

                  <div className="pt-6 border-t border-[#e2e8f0] flex flex-col gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest block mb-1">
                        Precio Unitario
                      </span>
                      <span className="text-2xl font-black text-[#1e293b]">
                        RD${p.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Botón */}
                    <div className="w-full h-12 rounded-full bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center gap-2 text-[#64748B] group-hover:bg-[#E63946] group-hover:text-white group-hover:border-transparent transition-all duration-500 font-bold text-sm shadow-inner group-hover:shadow-[0_5px_15px_rgba(230,57,70,0.2)]">
                      Ver Detalles
                      <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-[#e2e8f0] bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white border border-[#e2e8f0] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-lg">

            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#E63946]/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-[#E63946]/10 blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1e293b] mb-6">
                ¿Requiere dimensiones específicas?
              </h2>
              <p className="text-[#64748B] text-lg md:text-xl mb-10 max-w-2xl mx-auto tracking-wide">
                En GTG diseñamos y fabricamos empaques totalmente a la medida de sus necesidades técnicas y requerimientos de marca.
              </p>
              <Link
                to="/personalizar-fundas"
                className="inline-flex items-center gap-3 bg-[#E63946] hover:bg-[#DC2626] text-white px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_8px_20px_rgba(230,57,70,0.2)] hover:shadow-[0_8px_25px_rgba(230,57,70,0.3)] transform hover:-translate-y-1"
              >
                Solicitar Cotización
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
