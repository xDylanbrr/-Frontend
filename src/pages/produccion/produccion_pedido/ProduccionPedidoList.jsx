import React from 'react';

const ProduccionPedidoList = ({ procesos, onCompletar }) => {
  // Formateador de fecha amigable
  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '-';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) + 
           ' ' + fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-2/3 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 text-gray-600 text-sm uppercase tracking-wider">
            <th className="p-3">ID Proceso</th>
            <th className="p-3">Orden Origen</th>
            <th className="p-3">Operario</th>
            <th className="p-3">Inicio</th>
            <th className="p-3">Fin</th>
            <th className="p-3">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {procesos.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-6 text-center text-gray-500">No hay procesos de producción registrados.</td>
            </tr>
          ) : (
            procesos.map((proceso) => (
              <tr key={proceso.id_produccion} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-3 font-bold text-gray-700">#{proceso.id_produccion}</td>
                <td className="p-3">Orden #{proceso.id_orden}</td>
                <td className="p-3">{proceso.empleado ? `${proceso.empleado.nombre} ${proceso.empleado.apellido}` : `ID: ${proceso.id_empleado}`}</td>
                <td className="p-3 text-sm">{formatearFecha(proceso.fecha_inicio)}</td>
                <td className="p-3 text-sm">{formatearFecha(proceso.fecha_fin)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${proceso.estado === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {proceso.estado}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {proceso.estado === 'En Proceso' && (
                    <button onClick={() => onCompletar(proceso.id_produccion)} className="text-sm bg-green-50 text-green-600 font-bold px-3 py-1 rounded border hover:bg-green-600 hover:text-white transition-all">
                      Terminar ✅
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProduccionPedidoList;