import React, { useState } from 'react'; 
import { useCart } from '../components/CartContext'; 

export default function PersonalizarFundas() { 
  const { addToCart } = useCart(); 

  const [ancho, setAncho] = useState(30);
  const [alto, setAlto] = useState(40);
  const [calibre, setCalibre] = useState(50);
  const [cantidad, setCantidad] = useState(100);
  const [color, setColor] = useState("Blanco");
  const [material, setMaterial] = useState("Polietileno");
  const [sello, setSello] = useState("Lateral");
  
  const [logo, setLogo] = useState(null);
  const [posicionLogo, setPosicionLogo] = useState("center"); 
  const [tamanoLogo, setTamanoLogo] = useState(30);

  const URL_BOLSA = "https://www.matrixcomercial.com/wp-content/uploads/2021/12/Funda-tipo-t-shirt-51.png";

  const coloresMap = {
    "Transparente": "rgba(200, 225, 255, 0.4)",
    "Blanco": "#ffffff",
    "Negro": "#333333", 
    "Azul": "#2563eb",
    "Rojo": "#dc2626"
  };

  const precioEstimado = Math.max(ancho * alto * calibre * 0.002 * parseInt(cantidad || 0), 100);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleAddToCart = () => {
    // AGREGADO: Validación para asegurar un mínimo de 100 unidades
    if (cantidad < 100) {
      alert("⚠️ La cantidad mínima de producción es de 100 unidades.");
      return; 
    }

    addToCart({ 
      id: Date.now(), 
      title: "Funda Personalizada", 
      details: `Ancho: ${ancho}cm, Alto: ${alto}cm, Calibre: ${calibre}μ, Cantidad: ${cantidad}, Color: ${color}, Material: ${material}, Sello: ${sello}`, 
      price: precioEstimado,
      image: logo || URL_BOLSA 
    });
    alert("¡Producto añadido al carrito!");
  };

  return ( 
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans text-slate-900">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* VISTA PREVIA DINÁMICA - TAMAÑO MAXIMIZADO */}
        <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm border border-gray-100 sticky top-10 min-h-[700px] overflow-hidden">
          <div 
            className="relative flex items-center justify-center transition-all duration-300"
            style={{
              // MULTIPLICADORES MÁS ALTOS PARA MAYOR TAMAÑO
              width: `${ancho * 12}px`, 
              height: `${alto * 12}px`,
              // LÍMITES AMPLIADOS
              maxWidth: '95%',
              maxHeight: '800px', 
              backgroundColor: coloresMap[color],
              borderRadius: '1rem',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
            }}
          >
            {/* LA BOLSA */}
            <img 
              src={URL_BOLSA} 
              alt="Funda" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none mix-blend-multiply" 
              style={{ opacity: color === "Blanco" ? 1 : 0.85 }}
            />

            {/* EL LOGO */}
            {logo && (
              <div 
                className="absolute z-20 flex items-center justify-center transition-all duration-300"
                style={{
                  width: `${tamanoLogo}%`,
                  height: `${tamanoLogo}%`,
                  top: posicionLogo === 'start' ? '20%' : posicionLogo === 'end' ? '60%' : '40%',
                }}
              >
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            )}
          </div>
          <p className="mt-8 text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">Prototipo de Alta Resolución</p>
        </div>

        {/* FORMULARIO */}
        <div className="space-y-6">
          <section>
            <h1 className="text-3xl font-black mb-2 text-slate-900">Configurador de Pedido</h1>
            <p className="text-slate-500">Personaliza tu funda en tiempo real.</p>
          </section>

          {/* ARTE E IMPRESIÓN */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-sm flex items-center gap-2 text-blue-600">🖼️ Arte e Impresión</h2>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
            
            {logo && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-50">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Tamaño: {tamanoLogo}%</label>
                  <input type="range" min="10" max="65" value={tamanoLogo} onChange={(e)=>setTamanoLogo(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none accent-blue-600" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Ubicación</label>
                  <div className="flex gap-1">
                    {['start', 'center', 'end'].map((pos) => (
                      <button key={pos} type="button" onClick={() => setPosicionLogo(pos)} className={`flex-1 py-1 text-[10px] font-bold rounded-lg border transition-all ${posicionLogo === pos ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 text-slate-400'}`}>
                        {pos === 'start' ? 'Arriba' : pos === 'center' ? 'Centro' : 'Abajo'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DIMENSIONES */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-sm text-blue-600">📏 Dimensiones</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Ancho (cm)</label>
                <input type="number" value={ancho} onChange={(e)=>setAncho(Number(e.target.value))} className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Alto (cm)</label>
                <input type="number" value={alto} onChange={(e)=>setAlto(Number(e.target.value))} className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-2">
                <span>Calibre: {calibre}μ</span>
              </div>
              <input type="range" min="20" max="200" value={calibre} onChange={(e)=>setCalibre(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none accent-blue-600" />
            </div>

            {/* AGREGADO: CAMPO DE CANTIDAD */}
            <div className="pt-2 border-t border-gray-50">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Cantidad de Unidades</label>
              <input 
                type="number" 
                value={cantidad} 
                onChange={(e)=>setCantidad(Number(e.target.value))} 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500" 
                min="100" 
              />
            </div>
          </div>

          {/* ESPECIFICACIONES (COLORES) */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-blue-600">🧪 Especificaciones</h2>
            <div className="grid grid-cols-2 gap-4">
              <select value={material} onChange={(e)=>setMaterial(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-medium">
                <option value="Polietileno">Polietileno</option>
                <option value="Polipropileno">Polipropileno</option>
              </select>
              <select value={sello} onChange={(e)=>setSello(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-medium">
                <option value="Lateral">Lateral</option>
                <option value="Fondo">Fondo</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-3">Color del Plástico</label>
              <div className="flex justify-between px-2">
                {Object.keys(coloresMap).map((c) => (
                  <button 
                    key={c} 
                    type="button"
                    onClick={() => setColor(c)} 
                    className={`w-10 h-10 rounded-full border-4 transition-all ${color === c ? 'border-blue-600 scale-125 shadow-lg' : 'border-white shadow-sm hover:scale-105'}`} 
                    style={{ backgroundColor: c === "Transparente" ? "#f1f5f9" : coloresMap[c] }} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* TOTAL Y CARRITO */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex items-center justify-between shadow-xl">
            <div>
              <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Total (RD$)</p>
              <h2 className="text-4xl font-black">RD${precioEstimado.toLocaleString()}</h2>
            </div>
            <button 
              type="button"
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg"
            >
              Confirmar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}