// src/pages/logistica/despacho/DespachoList.jsx
import React from 'react';

const DespachoList = ({ despachos, onEliminar }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full lg:w-2/3 border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-500 uppercase">
              <th className="pb-3 font-semibold">Lote / Destino</th>
              <th className="pb-3 font-semibold">Estado Actual</th>
              <th className="pb-3 font-semibold text-center">Fecha</th>
              <th className="pb-3 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {despachos.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">No hay despachos registrados.</td>
              </tr>
            ) : (
              despachos.map((despacho) => (
                <tr key={despacho.id_despacho} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center font-bold">
                        #{despacho.id_pedido_terminado}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800">Hacia: {despacho.destino}</div>
                        <div className="text-xs text-gray-500">Resp: {despacho.empleado?.nombre} {despacho.empleado?.apellido}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 text-[11px] rounded-full font-bold border ${
                      despacho.estado === 'Entregado' ? 'bg-green-100 text-green-700 border-green-200' : 
                      despacho.estado === 'En Tránsito' ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                      'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }`}>
                      {despacho.estado}
                    </span>
                  </td>
                  <td className="py-4 text-center text-sm text-gray-600">
                    {new Date(despacho.fecha).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-center">
                    <button 
                      onClick={() => onEliminar(despacho.id_despacho)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DespachoList;