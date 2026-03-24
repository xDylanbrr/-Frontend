import React from 'react';

const PedidoTerminadoList = ({ pedidos }) => {
  // Formateador de fecha amigable
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '-';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-2/3 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 text-gray-600 text-sm uppercase tracking-wider">
            <th className="p-3">ID Lote</th>
            <th className="p-3">ID Proceso Origen</th>
            <th className="p-3">Inspector Certificador</th>
            <th className="p-3">Fecha Cierre</th>
            <th className="p-3">Estado Final</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">No hay lotes terminados registrados aún.</td>
            </tr>
          ) : (
            pedidos.map((pedido) => (
              <tr key={pedido.id_pedido_terminado} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 font-bold text-gray-700">#{pedido.id_pedido_terminado}</td>
                <td className="p-3">Proceso #{pedido.id_produccion}</td>
                <td className="p-3">{pedido.empleado ? `${pedido.empleado.nombre} ${pedido.empleado.apellido}` : `ID: ${pedido.id_empleado}`}</td>
                <td className="p-3 text-sm">{formatearFecha(pedido.fecha)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${pedido.estado === 'Listo para Empaque' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                    {pedido.estado}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PedidoTerminadoList;