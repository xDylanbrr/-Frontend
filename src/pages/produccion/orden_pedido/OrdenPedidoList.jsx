import React from 'react';

const OrdenPedidoList = ({ ordenes, onEliminar }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-2/3 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 text-gray-600 text-sm uppercase tracking-wider">
            <th className="p-3">ID</th>
            <th className="p-3">Pedido Cliente</th>
            <th className="p-3">Supervisor</th>
            <th className="p-3">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">No hay órdenes registradas.</td>
            </tr>
          ) : (
            ordenes.map((orden) => (
              <tr key={orden.id_orden} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 font-bold text-gray-700">#{orden.id_orden}</td>
                <td className="p-3">Pedido #{orden.id_pedido_cliente}</td>
                <td className="p-3">{orden.empleado ? `${orden.empleado.nombre} ${orden.empleado.apellido}` : `ID: ${orden.id_empleado}`}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${orden.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {orden.estado}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button onClick={() => onEliminar(orden.id_orden)} className="text-red-500 hover:text-red-700 font-bold p-1">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdenPedidoList;