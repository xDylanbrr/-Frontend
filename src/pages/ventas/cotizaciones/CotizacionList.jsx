import React from "react";

function CotizacionList({ cotizaciones, onEliminar, onEditar }) {
  
  // Función para confirmar antes de borrar
  const confirmarEliminacion = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta cotización?")) {
      onEliminar(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">ID</th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Fecha</th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Cliente</th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Costo Bruto</th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Precio Final</th>
            <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Estado</th>
            <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {cotizaciones.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-10 text-gray-400 italic">
                No hay cotizaciones registradas aún.
              </td>
            </tr>
          ) : (
            cotizaciones.map((c) => (
              <tr key={c.id_cotizacion} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-4 py-4 text-sm font-mono text-gray-500">
                  #{c.id_cotizacion}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {new Date(c.fecha_creacion).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span className="font-semibold text-gray-700">ID: {c.id_cliente}</span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {c.moneda} {Number(c.costo_materia_bruta).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-4 text-sm font-bold text-blue-700">
                  {c.moneda} {Number(c.precio_final).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    // AJUSTE: Coincidir con los Enums de tu Prisma
                    c.estado === 'Aprobado' ? 'bg-green-100 text-green-700 border border-green-200' : 
                    c.estado === 'Cancelado' ? 'bg-red-100 text-red-700 border border-red-200' : 
                    'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                    {c.estado}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEditar(c)}
                      className="text-amber-600 hover:text-amber-800 font-bold text-xs underline decoration-2 underline-offset-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => confirmarEliminacion(c.id_cotizacion)}
                      className="text-red-500 hover:text-red-700 font-bold text-xs underline decoration-2 underline-offset-4"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CotizacionList;