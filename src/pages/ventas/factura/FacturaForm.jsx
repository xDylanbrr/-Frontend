import React, { useState } from 'react';

export default function FacturaForm({ onVolver }) {
  const [cliente, setCliente] = useState('');
  const [montoBase, setMontoBase] = useState(0);

  // Cálculos automáticos de República Dominicana
  const itbis = montoBase * 0.18;
  const totalGeneral = montoBase + itbis;

  const handleGuardar = (e) => {
    e.preventDefault();
    alert(`Factura guardada para ${cliente}. Total: RD$${totalGeneral}`);
    onVolver(); // Regresa a la lista después de guardar
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
      
      {/* HEADER DEL FORMULARIO */}
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-900 text-white">
        <div>
          <h1 className="text-3xl font-black">Nueva Factura</h1>
          <p className="text-slate-400 mt-1">Creación manual de documento fiscal.</p>
        </div>
        <button onClick={onVolver} className="text-slate-400 hover:text-white font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">close</span> Cancelar
        </button>
      </div>

      {/* FORMULARIO */}
      <form onSubmit={handleGuardar} className="p-8 space-y-8">
        
        {/* Sección Cliente */}
        <section>
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">1. Datos del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Nombre / Razón Social</label>
              <input 
                type="text" 
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-medium text-slate-700 focus:ring-2 focus:ring-blue-500" 
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">RNC o Cédula</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-medium text-slate-700 focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
        </section>

        {/* Sección Montos (Simplificada para el ejemplo) */}
        <section>
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">2. Detalle de Cobro</h2>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2">Monto Base de los Productos (RD$)</label>
              <input 
                type="number" 
                value={montoBase}
                onChange={(e) => setMontoBase(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 font-bold text-slate-800 text-lg focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="flex justify-between text-slate-500 text-sm pt-4">
              <span>ITBIS (18%)</span>
              <span className="font-bold">RD${itbis.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-2xl font-black text-slate-800 border-t border-slate-200 pt-4 mt-2">
              <span>Total a Facturar</span>
              <span className="text-blue-600">RD${totalGeneral.toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* Botón de Guardar */}
        <div className="flex justify-end pt-4">
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all">
            Generar Factura
          </button>
        </div>

      </form>
    </div>
  );
}