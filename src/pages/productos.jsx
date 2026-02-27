import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";

// Exportamos la data para que DetalleProducto.jsx pueda encontrar el producto por ID
export const productosData = [
  {
    id: 1,
    title: "Bolsas de ziploc Personalizadas",
    price: 190.00,
    img: "https://http2.mlstatic.com/D_NQ_NP_2X_835713-MLC73799905083_012024-F-pack-500-bolsas-tipo-zipperziploc-de-4x6-cm.webp",
    desc: "Bolsas con cierre hermético de alta calidad, ideales para el sector alimenticio y farmacéutico. Disponibles en varios tamaños.",
  },
  {
    id: 2,
    title: "Rollos de Plástico Termoencogible",
    price: 2500.00,
    img: "https://www.novamart.com/shop/image/cachewebp/catalog/Material/Termoencogible/POF/POF-16/01-400x300.webp",
    desc: "Película de polietileno de alto rendimiento que se adapta a la forma de su producto mediante calor.",
  },
  {
    id: 3,
    title: "Empaques con Impresión Personalizada",
    price: 900.00,
    img: "https://agenciapalmlopez.com/cdn/shop/products/BO-BLAN9-5_473x293.jpg?v=1652145634",
    desc: "Soluciones completas de empaque con diseño flexográfico personalizado para resaltar su marca.",
  },
  {
    id: 4,
    title: "Bolsas y Rollos (Pigmentados)",
    price: 450.00,
    img: "",
    desc: "Fabricación de bolsas y rollos en polietileno de alta y baja densidad. Disponibles en opciones transparentes o pigmentadas (colores) según su requerimiento.",
  },
  {
    id: 5,
    title: "Láminas de Polietileno",
    price: 600.00,
    img: "https://www.plasticosyempaques.com/wp-content/uploads/2018/05/laminas-de-polietileno.jpg",
    desc: "Láminas de plástico resistentes y versátiles, ideales para procesos de corte industrial, división de productos o empaque manual de alta protección.",
  },
  {
    id: 6,
    title: "Rollos Precortados (Lavandería)",
    price: 1200.00,
    img: "https://www.fundaexpress.com.do/wp-content/uploads/2020/07/rollos-precortados-transparente.jpg",
    desc: "Rollos con precorte especial diseñados para agilizar el trabajo en lavanderías, tintorerías y textil. Facilita el desprendimiento rápido de cada funda.",
  }
];

export default function Productos() {
  return (
    <main className="flex-1 bg-gray-50/30">
      {/* Encabezado de la página */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 flex flex-col gap-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
              Catálogo de Productos
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Soluciones integrales en empaques flexibles para optimizar su cadena de suministro.
            </p>
          </div>

          {/* Grid Responsivo de Productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {productosData.map((p) => (
              <Link
                key={p.id}
                to={`/producto/${p.id}`}
                className="group bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
              >
                {/* Contenedor de Imagen con Efecto Hover */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                  {/* Capa de interacción visual */}
                  <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/95 p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Información del Producto */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                    {p.title}
                  </h3>
                  
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {p.desc}
                  </p>
                  
                  <div className="mt-8 pt-6 flex items-center justify-between border-t border-gray-100">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em]">
                        Precio Inicial
                      </span>
                      <p className="text-2xl font-black text-slate-900">
                        RD${p.price.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-100 group-hover:bg-blue-700 transition-all active:scale-90">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner de CTA para Personalización */}
      <section className="pb-24 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

            <h2 className="text-3xl md:text-4xl font-black mb-4 relative z-10">
              ¿Requiere dimensiones específicas?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg relative z-10">
              Diseñamos empaques a la medida de sus necesidades técnicas y de marca.
            </p>
            <Link 
              to="/personalizar/fundas" 
              className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black hover:bg-blue-50 transition-all transform hover:scale-105 relative z-10"
            >
              Solicitar Cotización
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}