import { useEffect } from "react";
import { useCart } from "../components/CartContext";

export default function PersonalizarEtiquetas() {
  const { addToCart } = useCart();

  useEffect(() => {
    function updatePrice() {
      const cantidad = parseInt(document.getElementById("cantidad")?.value || 0);
      const material = document.getElementById("material")?.value;
      const acabado = document.getElementById("acabado")?.value;
      const impresion = document.getElementById("impresion")?.value;

      let precioUnitario = 1.2;

      if (material === "vinilo") precioUnitario += 0.8;
      if (acabado === "brillante") precioUnitario += 0.5;
      if (impresion === "color") precioUnitario += 0.7;

      let precio = precioUnitario * cantidad;
      precio = Math.max(precio, 1200);

      document.getElementById("precio-estimado").textContent =
        "RD$ " + precio.toLocaleString("es-DO", { minimumFractionDigits: 2 });
    }

    ["cantidad", "material", "acabado", "impresion"].forEach(id => {
      document.getElementById(id)?.addEventListener("input", updatePrice);
      document.getElementById(id)?.addEventListener("change", updatePrice);
    });

    updatePrice();
  }, []);

  const handleAddToCart = () => {
    const cantidad = parseInt(document.getElementById("cantidad").value || 0);
    const material = document.getElementById("material").value;
    const acabado = document.getElementById("acabado").value;
    const impresion = document.getElementById("impresion").value;

    let precioUnitario = 1.2;

    if (material === "vinilo") precioUnitario += 0.8;
    if (acabado === "brillante") precioUnitario += 0.5;
    if (impresion === "color") precioUnitario += 0.7;

    let precio = precioUnitario * cantidad;
    precio = Math.max(precio, 1200);

    addToCart({
      title: "Etiqueta Personalizada",
      details: `Cantidad: ${cantidad}, Material: ${material}, Acabado: ${acabado}, Impresión: ${impresion}`,
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
              src="https://images.unsplash.com/photo-1586953208448-b95a79798f07"
              alt="Etiquetas"
            />
          </div>

          {/* FORM */}
          <div>
            <h1 className="text-5xl font-bold mb-8">Personalizar Etiquetas</h1>

            <div className="space-y-6">

              <div>
                <label className="block mb-1">Cantidad</label>
                <input
                  id="cantidad"
                  type="number"
                  defaultValue="1000"
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1">Material</label>
                <select id="material" className="w-full border px-3 py-2 rounded-lg">
                  <option value="papel">Papel</option>
                  <option value="vinilo">Vinilo</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Acabado</label>
                <select id="acabado" className="w-full border px-3 py-2 rounded-lg">
                  <option value="mate">Mate</option>
                  <option value="brillante">Brillante</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">Impresión</label>
                <select id="impresion" className="w-full border px-3 py-2 rounded-lg">
                  <option value="byn">Blanco y negro</option>
                  <option value="color">A color</option>
                </select>
              </div>

            </div>

            {/* PRECIO + BOTÓN */}
            <div className="mt-10 border-t pt-6">
              <div className="flex justify-between mb-4">
                <p className="text-lg">Precio Estimado:</p>
                <p id="precio-estimado" className="text-2xl font-bold text-primary">
                  RD$ 1,200.00
                </p>
              </div>

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
      </main>
    </div>
  );
}
