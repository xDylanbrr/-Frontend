import React, { useState, useEffect } from 'react';

export default function FacturaList({ onNuevaFactura }) {
  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reemplaza "3000" por el puerto donde corre tu backend si es diferente
  const API_URL = 'http://localhost:3000/api/facturas'; 

  useEffect(() => {
    cargarFacturas();
  }, []);

  const cargarFacturas = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        // Si tu API devuelve { total: X, data: [...] }, extraemos la 'data'
        setFacturas(data.data || data); 
      }
    } catch (error) {
      console.error("Error al cargar las facturas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
      
      {/* HEADER DE LA LISTA */}
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-slate-900 text-white">
        <div>
          <h1 className="text-3xl font-black">Historial de Facturas</h1>
          <p className="text-slate-400 mt-1">Administración de ventas y cobros.</p>
        </div>
        <button 
          onClick={onNuevaFactura}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <span className="material-symbols-outlined">add</span> Nueva Factura
        </button>
      </div>

      <button 
  onClick={() => onVerDetalle(fac)} 
  className="text-blue-600 hover:text-blue-800 font-bold text-sm"
>
  Ver Detalle
</button>

      {/* TABLA DE DATOS */}
      <div className="p-8 overflow-x-auto">
        {loading ? (
          <p className="text-center text-slate-500 py-10 font-bold">Cargando facturas desde la base de datos...</p>
        ) : facturas.length === 0 ? (
          <p className="text-center text-slate-500 py-10 font-bold">No hay facturas registradas aún.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100 text-slate-400 text-xs uppercase tracking-widest">
                <th className="py-4 font-bold">No. Factura</th>
                <th className="py-4 font-bold">Cliente</th>
                <th className="py-4 font-bold">Fecha</th>
                <th className="py-4 font-bold text-right">Total (RD$)</th>
                <th className="py-4 font-bold text-center">Estado</th>
                <th className="py-4 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((fac) => (
                <tr key={fac.id_factura} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-mono font-bold text-slate-800">{fac.numero_factura || `FAC-${fac.id_factura}`}</td>
                  {/* Si es de un pedido, el cliente_nombre puede venir nulo, ahí dirá "Cliente de Pedido" */}
                  <td className="py-4 font-medium text-slate-700">{fac.cliente_nombre || `Pedido #${fac.id_pedido_cliente}`}</td>
                  <td className="py-4 text-slate-500 text-sm">{new Date(fac.fecha).toLocaleDateString('es-DO')}</td>
                  <td className="py-4 font-black text-slate-800 text-right">RD${Number(fac.monto_total).toLocaleString()}</td>
                  <td className="py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${fac.estado === 'pagada' ? 'bg-green-100 text-green-700' : fac.estado === 'anulada' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {fac.estado ? fac.estado.toUpperCase() : 'PENDIENTE'}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">Ver Detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}