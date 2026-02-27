import React, { useState } from 'react'; 
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Carrito() {
  const { cart, removeFromCart, getCartTotal, updateQuantity } = useCart();
  const navigate = useNavigate();

  // FORMULARIO AVANZADO TIPO E-COMMERCE
  const [formData, setFormData] = useState({
    email: '',
    pais: 'República Dominicana',
    nombre: '',
    apellidos: '',
    empresa: '',
    direccion: '',
    apartamento: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    telefono: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); 
    if (val.length > 10) val = val.substring(0, 10);
    
    let formatted = val;
    if (val.length > 3 && val.length <= 6) {
      formatted = `${val.slice(0, 3)}-${val.slice(3)}`;
    } else if (val.length > 6) {
      formatted = `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`;
    }
    setFormData({ ...formData, telefono: formatted });
  };

  const subtotal = getCartTotal();
  const envio = cart.length > 0 ? 150 : 0;
  const total = subtotal + envio;

  const handleRealizarPedido = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío");
    
    // Validación de campos obligatorios
    if (!formData.email || !formData.nombre || !formData.apellidos || !formData.direccion || !formData.ciudad || formData.telefono.length < 12) {
      return alert("Por favor, completa todos los campos obligatorios del formulario de envío.");
    }

    localStorage.setItem('datosEnvio', JSON.stringify(formData));
    navigate('/checkout');
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* COLUMNA IZQUIERDA: RESUMEN DEL CARRITO */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">Tu Carrito</h2>
            
            <div className="space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <span className="material-symbols-outlined text-4xl text-blue-300">shopping_cart</span>
                  </div>
                  <p className="text-gray-400 italic">Tu carrito está vacío.</p>
                  <button onClick={() => navigate('/')} className="text-blue-600 font-bold mt-4 hover:underline">Ir a comprar</button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.instanceId} className="flex gap-4 items-center border-b border-gray-50 pb-6 group">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-800">{item.title}</h3>
                      <p className="text-xs text-gray-400 uppercase font-bold">{item.formato}</p>
                      <p className="font-bold text-blue-600 mt-1">RD${(item.price * item.cantidad).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => removeFromCart(item.instanceId)} className="text-red-400 hover:text-red-600 transition-colors">
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                      <div className="flex items-center gap-3 bg-gray-50 rounded-lg border border-gray-100 p-1">
                        <button onClick={() => updateQuantity(item.instanceId, item.cantidad - 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-white rounded shadow-sm">-</button>
                        <span className="text-sm font-bold w-4 text-center">{item.cantidad}</span>
                        <button onClick={() => updateQuantity(item.instanceId, item.cantidad + 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-white rounded shadow-sm">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 pt-6 space-y-3 border-t border-gray-100">
              <div className="flex justify-between text-gray-500 text-sm"><span>Subtotal</span><span>RD${subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500 text-sm"><span>Costo de Envío</span><span>RD${envio.toLocaleString()}</span></div>
              <div className="flex justify-between font-black text-2xl text-gray-900 pt-2 border-t border-gray-50 mt-2">
                <span>Total</span>
                <span className="text-blue-600">RD${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: INFORMACIÓN DE ENVÍO */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
             <div className="flex justify-between items-center mb-6 border-b pb-4">
                 <h2 className="text-2xl font-bold text-gray-800">Información de Envío</h2>
                 <span className="text-blue-600 material-symbols-outlined">local_shipping</span>
             </div>
             
             <div className="space-y-4">
               {/* Email */}
               <div>
                 <label className="text-xs font-bold text-gray-400 uppercase mb-1 block ml-1">Correo Electrónico</label>
                 <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="ejemplo@correo.com *" />
               </div>

               <div className="pt-4">
                 <label className="text-xs font-bold text-gray-400 uppercase mb-2 block ml-1">País / Región</label>
                 <select name="pais" value={formData.pais} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-700">
                   <option value="República Dominicana">República Dominicana</option>
                   <option value="Colombia">Colombia</option>
                   <option value="Estados Unidos">Estados Unidos</option>
                 </select>
               </div>

               {/* Nombres y Apellidos */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <input name="nombre" value={formData.nombre} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre *" />
                 </div>
                 <div>
                   <input name="apellidos" value={formData.apellidos} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Apellidos *" />
                 </div>
               </div>

               {/* Empresa (Opcional) */}
               <input name="empresa" value={formData.empresa} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Empresa (opcional)" />

               {/* Dirección y Apartamento */}
               <input name="direccion" value={formData.direccion} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Dirección calle y número *" />
               <input name="apartamento" value={formData.apartamento} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Apartamento, suite, etc. (opcional)" />

               {/* Ciudad, Provincia, Código Postal */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <input name="ciudad" value={formData.ciudad} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ciudad *" />
                 <input name="provincia" value={formData.provincia} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Provincia *" />
                 <input name="codigoPostal" value={formData.codigoPostal} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="C. Postal" />
               </div>

               {/* Teléfono */}
               <div>
                 <label className="text-xs font-bold text-gray-400 uppercase mb-1 block ml-1">Teléfono Móvil</label>
                 <input name="telefono" value={formData.telefono} onChange={handlePhoneChange} type="tel" className="w-full p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-medium" placeholder="809-000-0000 *" />
               </div>
             </div>

             {/* BOTÓN IR A PAGAR (AZUL) */}
             <button 
                onClick={handleRealizarPedido} disabled={cart.length === 0}
                className={`w-full mt-8 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex justify-center items-center gap-3 tracking-wider ${
                  cart.length === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] active:scale-95 shadow-blue-200'
                }`}
             >
                <span className="material-symbols-outlined">payments</span>
                CONTINUAR AL PAGO
             </button>
             
             <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-widest font-bold">
               Pago 100% seguro vía WhatsApp
             </p>
          </div>

        </div>
      </div>
    </div>
  );
}