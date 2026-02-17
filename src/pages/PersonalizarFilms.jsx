import { useEffect } from "react";
import { useCart } from "../components/CartContext";

export default function PersonalizarFilms() {
  const { addToCart } = useCart();

  useEffect(() => {
    function updatePrice() {
      const calibre = parseInt(document.getElementById("calibre")?.value || 0);
      const cantidad = parseInt(document.getElementById("cantidad")?.value || 0);

      let precio = calibre * 0.5 * cantidad;
      precio = Math.max(precio, 2000);

      document.getElementById("precio-estimado").textContent =
        "RD$ " + precio.toLocaleString("es-DO", { minimumFractionDigits: 2 });
    }

    document.getElementById("calibre")?.addEventListener("input", updatePrice);
    document.getElementById("cantidad")?.addEventListener("input", updatePrice);
    updatePrice();
  }, []);

  const handleAddToCart = () => {
    const calibre = parseInt(document.getElementById("calibre").value || 0);
    const cantidad = parseInt(document.getElementById("cantidad").value || 0);

    const material = document.getElementById("material").value;
    const transparencia = document.getElementById("transparencia").value;
    const acabado = document.getElementById("acabado").value;
    const uso = document.getElementById("uso").value;

    let precio = calibre * 0.5 * cantidad;
    precio = Math.max(precio, 2000);

    addToCart({
      title: "Film Plástico Personalizado",
      details: `Calibre: ${calibre}, Cantidad: ${cantidad}, Material: ${material}, Transparencia: ${transparencia}, Acabado: ${acabado}, Uso: ${uso}`,
      price: precio
    });
  };

  return (
    <div className="font-display bg-background-light text-text-light">
      <main className="py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16">

          {/* IMAGEN */}
          <div className="flex justify-center p-8 bg-section-light rounded-xl sticky top-24">
            <img
              className="max-w-sm"
              src="https://ecuaplast.com/wp-content/uploads/2022/10/plastico-film.jpeg"
              alt="Films"
            />
          </div>

          {/* FORM */}
          <div>
            <h1 className="text-5xl font-bold mb-6">Personalizar Films</h1>

            <div className="space-y-6">

              {/* CALIBRE */}
              <div>
                <label>Calibre</label>
                <input
                  id="calibre"
                  type="range"
                  min="30"
                  max="200"
                  defaultValue="80"
                  className="w-full accent-primary"
                />
              </div>

              {/* CANTIDAD */}
              <div>
                <label>Cantidad</label>
                <input
                  id="cantidad"
                  type="number"
                  defaultValue="2000"
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              {/* MATERIAL */}
              <div>
                <label>Tipo de material</label>
                <select id="material" className="w-full border px-3 py-2 rounded-lg">
                  <option>PEBD (Baja densidad)</option>
                  <option>PEAD (Alta densidad)</option>
                  <option>PEBDL (Lineal)</option>
                  <option>PP (Polipropileno)</option>
                </select>
              </div>

              {/* TRANSPARENCIA */}
              <div>
                <label>Transparencia</label>
                <select id="transparencia" className="w-full border px-3 py-2 rounded-lg">
                  <option>Transparente</option>
                  <option>Translúcido</option>
                  <option>Opaco</option>
                  <option>Negro</option>
                </select>
              </div>

              {/* ACABADO */}
              <div>
                <label>Acabado</label>
                <select id="acabado" className="w-full border px-3 py-2 rounded-lg">
                  <option>Brillante</option>
                  <option>Mate</option>
                  <option>Antideslizante</option>
                  <option>Liso</option>
                </select>
              </div>

              {/* USO */}
              <div>
                <label>Uso</label>
                <select id="uso" className="w-full border px-3 py-2 rounded-lg">
                  <option>Empaque comercial</option>
                  <option>Uso industrial</option>
                  <option>Empaque de alimentos</option>
                  <option>Protección de productos</option>
                  <option>Embalaje y paletizado</option>
                </select>
              </div>

            </div>

            {/* PRECIO + BOTÓN */}
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between mb-4">
                <p>Precio Estimado:</p>
                <p id="precio-estimado" className="text-2xl font-bold text-primary">
                  RD$ 2,000.00
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                aria-label="Agregar al carrito"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 
                           hover:from-blue-700 hover:to-indigo-600 
                           text-white py-3 rounded-2xl font-bold 
                           flex items-center justify-center gap-3 
                           shadow-md hover:shadow-lg 
                           transform hover:-translate-y-0.5 
                           transition-all duration-200"
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
      </main>
    </div>
  );
}
