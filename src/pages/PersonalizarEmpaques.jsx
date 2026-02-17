import { useEffect, useState } from "react";
import { useCart } from '../components/CartContext';

export default function PersonalizarEmpaques() {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState({ show: false, fade: false });

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
      const profundidad = parseInt(document.getElementById("profundidad")?.value || 0);
      const cantidad = parseInt(document.getElementById("cantidad")?.value || 0);

      // Precio base según volumen
      let volumen = ancho * alto * profundidad;

      // Factor de precio ajustado para cambios significativos
      let precioUnitario = volumen * 0.1;

      // Mínimo por empaque reducido para permitir variación
      precioUnitario = Math.max(precioUnitario, 500);

      // Precio total
      let precio = precioUnitario * cantidad;

      const precioEl = document.querySelector("#precio-estimado");
      if (precioEl) {
        precioEl.textContent =
          "RD$ " + precio.toLocaleString("es-DO", { minimumFractionDigits: 2 });
      }
    }

    updateValue("ancho", "ancho-value", "cm");
    updateValue("alto", "alto-value", "cm");
    updateValue("profundidad", "profundidad-value", "cm");

    document.getElementById("cantidad")?.addEventListener("input", updatePrice);
    updatePrice();
  }, []);

  const handleAddToCart = () => {
    const ancho = parseInt(document.getElementById("ancho").value || 0);
    const alto = parseInt(document.getElementById("alto").value || 0);
    const profundidad = parseInt(document.getElementById("profundidad").value || 0);
    const cantidad = parseInt(document.getElementById("cantidad").value || 0);

    let volumen = ancho * alto * profundidad;
    let precioUnitario = volumen * 0.1;
    precioUnitario = Math.max(precioUnitario, 500);

    let precio = precioUnitario * cantidad;



    addToCart({
      title: "Empaque Personalizado",
      details: `Ancho: ${ancho}cm, Alto: ${alto}cm, Profundidad: ${profundidad}cm, Cantidad: ${cantidad}`,
      price: precio
    });
  };

  return (
    <div className="font-display bg-background-light text-text-light">
      <main className="py-12 sm:py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* IMAGEN */}
          <div className="flex items-center justify-center p-8 bg-section-light rounded-xl sticky top-24 min-h-[500px]">
            <img
              className="w-full max-w-sm drop-shadow-2xl"
              src="https://al.twosides.info/wp-content/uploads/sites/8/2021/06/carton-boxes-scaled-e1623762529515-730x411.jpg"
              alt="Empaques"
            />
          </div>

          {/* FORM */}
          <div className="py-8">
            <h1 className="text-4xl font-bold sm:text-5xl mb-6">
              Personalizar Empaques
            </h1>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between">
                  <label>Ancho</label>
                  <span id="ancho-value" className="font-semibold text-primary">20 cm</span>
                </div>
                <input id="ancho" type="range" min="10" max="60" defaultValue="20" className="w-full accent-primary" />
              </div>

              <div>
                <div className="flex justify-between">
                  <label>Alto</label>
                  <span id="alto-value" className="font-semibold text-primary">30 cm</span>
                </div>
                <input id="alto" type="range" min="10" max="80" defaultValue="30" className="w-full accent-primary" />
              </div>

              <div>
                <div className="flex justify-between">
                  <label>Profundidad</label>
                  <span id="profundidad-value" className="font-semibold text-primary">20 cm</span>
                </div>
                <input id="profundidad" type="range" min="10" max="60" defaultValue="20" className="w-full accent-primary" />
              </div>

              <div>
                <label>Cantidad</label>
                <input id="cantidad" type="number" defaultValue="3000" className="w-full rounded-lg border px-3 py-2" />
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between mb-4">
                <p className="text-lg">Precio Estimado:</p>
                <p id="precio-estimado" className="text-2xl font-bold text-primary">RD$ 1,500.00</p>
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
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l3-6H6.4M7 13l-1.2 4.4A2 2 0 008 20h8a2 2 0 001.8-1.4L19 13"
      />
    </svg>
  </span>
  <span>Agregar al Carrito</span>
</button>


              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
