import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { productosData } from './productos';

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const producto = productosData.find(p => p.id === parseInt(id));
  
  const [cantidad, setCantidad] = useState(1);
  const [formato, setFormato] = useState('Individual');

  if (!producto) return <div className="text-center py-20 font-bold">Producto no encontrado</div>;

  const crearItemCarrito = () => ({
    ...producto,
    instanceId: Date.now(),
    cantidad,
    formato,
    price: producto.price 
  });

  const handleAgregar = () => {
    const itemParaCarrito = crearItemCarrito();
    addToCart(itemParaCarrito);
    navigate('/carrito');
  };

  const handleComprarAhora = () => {
    const itemParaCarrito = crearItemCarrito();
    addToCart(itemParaCarrito);
    navigate('/carrito'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-100">
          
          {/* SECCIÓN IMAGEN */}
          <div className="p-8 bg-slate-50 flex items-center justify-center border-r border-gray-100">
            <img 
              src={producto.img} 
              alt={producto.title} 
              className="max-h-[450px] w-full object-contain transition-transform duration-500 hover:scale-105" 
            />
          </div>

          {/* SECCIÓN INFO */}
          <div className="p-8 md:p-16 flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-green-600 font-bold text-sm tracking-wide">Disponible en stock</span>
            </div>

            <h1 className="text-4xl font-black text-slate-900 leading-tight">{producto.title}</h1>
            <p className="text-5xl font-light text-slate-800">RD${producto.price.toLocaleString()}</p>

            {/* SELECTOR FORMATO - Ahora en AZUL */}
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Seleccionar Formato</p>
              <div className="flex flex-wrap gap-3">
                {['Individual', 'x10 unidades', 'x100 unidades'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormato(f)}
                    className={`px-6 py-3 rounded-2xl font-bold border-2 transition-all duration-300 ${
                      formato === f 
                      ? 'border-blue-400 bg-blue-50 text-blue-700 shadow-sm' 
                      : 'border-slate-100 text-slate-400 hover:border-slate-200 bg-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* CANTIDAD Y BOTÓN AGREGAR - Ahora en AZUL */}
            <div className="flex gap-4 pt-4">
              <div className="flex items-center border-2 border-slate-100 rounded-2xl p-2 bg-slate-50 shadow-inner">
                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="w-10 h-10 text-2xl font-bold text-slate-400 hover:text-blue-600 transition-colors">-</button>
                <span className="w-12 text-center text-xl font-black text-slate-800">{cantidad}</span>
                <button onClick={() => setCantidad(cantidad + 1)} className="w-10 h-10 text-2xl font-bold text-slate-400 hover:text-blue-600 transition-colors">+</button>
              </div>

              <button 
                onClick={handleAgregar}
                className="flex-grow bg-blue-50 hover:bg-blue-100 text-blue-700 font-black rounded-2xl py-4 flex items-center justify-center gap-3 transition-all active:scale-95 shadow-md shadow-blue-100/50"
              >
                <span className="material-symbols-outlined font-bold">shopping_cart</span>
                Agregar al Carro
              </button>
            </div>

            {/* BOTÓN COMPRAR AHORA - Fondo AZUL y letras BLANCAS */}
            <button 
              onClick={handleComprarAhora}
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all tracking-wider shadow-lg shadow-blue-200 active:scale-[0.98]"
            >
              Comprar ahora
            </button>

            <div className="pt-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Descripción</p>
              <p className="text-slate-600 leading-relaxed italic">{producto.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}