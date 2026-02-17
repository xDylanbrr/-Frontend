import React, { useEffect } from 'react'; 
import { useCart } from '../components/CartContext'; 

export default function PersonalizarFundas() { 
  const { addToCart } = useCart(); 

  useEffect(() => { 
    function updateValue(inputId, labelId, suffix = "") { 
      const input = document.getElementById(inputId); 
      const label = document.getElementById(labelId); 
      if (!input || !label) return; 

      input.addEventListener("input", () => { 
        label.textContent = `${input.value} ${suffix}`; 
        updatePrice(); 
      }); 
    } 

    function updatePrice() { 
      const ancho = parseInt(document.getElementById("ancho")?.value || 0); 
      const alto = parseInt(document.getElementById("alto")?.value || 0); 
      const calibre = parseInt(document.getElementById("calibre")?.value || 0); 
      const cantidad = parseInt(document.getElementById("cantidad")?.value || 0); 

      let precio = ancho * alto * calibre * 0.002 * cantidad; 
      precio = Math.max(precio, 100); 

      const precioEl = document.querySelector("#precio-estimado"); 
      if (precioEl) { 
        precioEl.textContent = 
          "RD$" + precio.toLocaleString("es-DO", { minimumFractionDigits: 2 }); 
      } 
    } 

    updateValue("ancho", "ancho-value", "cm"); 
    updateValue("alto", "alto-value", "cm"); 
    updateValue("calibre", "calibre-value", "micrones"); 

    document.getElementById("cantidad")?.addEventListener("input", updatePrice); 
    updatePrice(); 
  }, []); 

  const handleAddToCart = () => { 
    const ancho = parseInt(document.getElementById("ancho").value || 0); 
    const alto = parseInt(document.getElementById("alto").value || 0); 
    const calibre = parseInt(document.getElementById("calibre").value || 0); 
    const cantidad = parseInt(document.getElementById("cantidad").value || 0); 
    const color = document.getElementById("color").value; 
    const material = document.getElementById("material").value; 
    const sello = document.getElementById("sello").value; 

    let precio = ancho * alto * calibre * 0.002 * cantidad; 
    precio = Math.max(precio, 100); 

    addToCart({ 
      title: "Funda Personalizada", 
      details: `Ancho: ${ancho}cm, Alto: ${alto}cm, Calibre: ${calibre}micrones, Cantidad: ${cantidad}, Color: ${color}, Material: ${material}, Sello: ${sello}`, 
      price: precio 
    }); 
  }; 

  return ( 
    <div className="font-display bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark min-h-screen flex flex-col">


      {/* ================= MAIN ================= */}
      <main className="flex-1">
        <section className="py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* IMAGEN */}
            <div className="sticky top-24 flex items-center justify-center bg-section-light dark:bg-section-dark rounded-xl p-8 min-h-[500px]">
              <img
                src="https://www.matrixcomercial.com/wp-content/uploads/2021/12/Funda-tipo-t-shirt-51.png"
                alt="Funda personalizada"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* FORMULARIO */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
                  Personaliza tu Funda
                </h1>
                <p className="text-text-light/80 dark:text-text-dark/80">
                  Crea la funda perfecta para tus necesidades. Ajusta las dimensiones, material y más.
                </p>
              </div>

              {/* DIMENSIONES */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
                  Dimensiones
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ancho" className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-2">
                      Ancho (cm)
                    </label>
                    <input
                      type="range"
                      id="ancho"
                      min="10"
                      max="100"
                      defaultValue="30"
                      className="w-full h-2 bg-section-light dark:bg-background-dark rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-text-light/60 dark:text-text-dark/60 mt-1">
                      <span>10cm</span>
                      <span id="ancho-value" className="font-medium">30 cm</span>
                      <span>100cm</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="alto" className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-2">
                      Alto (cm)
                    </label>
                    <input
                      type="range"
                      id="alto"
                      min="10"
                      max="100"
                      defaultValue="40"
                      className="w-full h-2 bg-section-light dark:bg-background-dark rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-text-light/60 dark:text-text-dark/60 mt-1">
                      <span>10cm</span>
                      <span id="alto-value" className="font-medium">40 cm</span>
                      <span>100cm</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="calibre" className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-2">
                    Calibre (micrones)
                  </label>
                  <input
                    type="range"
                    id="calibre"
                    min="20"
                    max="200"
                    defaultValue="50"
                    className="w-full h-2 bg-section-light dark:bg-background-dark rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-text-light/60 dark:text-text-dark/60 mt-1">
                    <span>20μ</span>
                    <span id="calibre-value" className="font-medium">50 micrones</span>
                    <span>200μ</span>
                  </div>
                </div>
              </div>

              {/* CANTIDAD */}
              <div>
                <label htmlFor="cantidad" className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  id="cantidad"
                  min="1"
                  defaultValue="100"
                  className="w-full bg-section-light dark:bg-background-dark border border-section-light dark:border-section-dark rounded-lg px-4 py-2 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* OPCIONES ADICIONALES */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
                  Opciones Adicionales
                </h2>

                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-2">
                    Color
                  </label>
                  <select
                    id="color"
                    className="w-full bg-section-light dark:bg-background-dark border border-section-light dark:border-section-dark rounded-lg px-4 py-2 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Transparente">Transparente</option>
                    <option value="Blanco">Blanco</option>
                    <option value="Negro">Negro</option>
                    <option value="Azul">Azul</option>
                    <option value="Rojo">Rojo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="material" className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-2">
                    Material
                  </label>
                  <select
                    id="material"
                    className="w-full bg-section-light dark:bg-background-dark border border-section-light dark:border-section-dark rounded-lg px-4 py-2 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Polietileno">Polietileno</option>
                    <option value="Polipropileno">Polipropileno</option>
                    <option value="PVC">PVC</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sello" className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-2">
                    Tipo de Sello
                  </label>
                  <select
                    id="sello"
                    className="w-full bg-section-light dark:bg-background-dark border border-section-light dark:border-section-dark rounded-lg px-4 py-2 text-text-light dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="Lateral">Lateral</option>
                    <option value="Fondo">Fondo</option>
                    <option value="Superior">Superior</option>
                  </select>
                </div>
              </div>

              {/* PRECIO ESTIMADO */}
              <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-text-light dark:text-text-dark">
                    Precio Estimado
                  </span>
                  <span id="precio-estimado" className="text-2xl font-bold text-primary">
                    RD$100.00
                  </span>
                </div>
              </div>

              {/* BOTÓN */}
              <div>
                <button
                  onClick={handleAddToCart}
                  aria-label="Agregar al carrito"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 bg-white/20 rounded-full">
                    <svg
                      className="w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l3-6H6.4M7 13l-1.2 4.4A2 2 0 008 20h8a2 2 0 001.8-1.4L19 13" />
                    </svg>
                    <span className="sr-only">Carrito</span>
                  </span>
                  <span>Agregar al Carrito</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  ); 
}
