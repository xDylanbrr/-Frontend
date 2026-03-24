import React from 'react';
import { eliminarEmpaque } from '../../../services/logistica/empaque.service';

const EmpaqueList = ({ empaques, actualizarLista }) => {

    const imprimirEtiqueta = (item) => {
        alert(`🏷️ GENERANDO ETIQUETA\n--------------------------\nLOTE: ${item.id_pedido_terminado}\nTIPO: ${item.tipo_empaque}\nBULTOS: ${item.cantidad}\nPESO: ${item.peso_total}kg\n--------------------------\nLISTO PARA DESPACHO`);
    };

    const handleDelete = async (id) => {
        if(window.confirm('¿Eliminar este registro?')) {
            try { 
                await eliminarEmpaque(id); 
                actualizarLista(); 
            } catch (e) { 
                alert('Error al eliminar'); 
            }
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Lote / ID</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Detalles</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Peso / Estado</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {empaques && empaques.length > 0 ? (
                            empaques.map((item) => (
                                <tr key={item.id_empaque} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        {/* Usamos el nombre correcto de la BD */}
                                        <div className="font-bold text-gray-900">Lote #{item.id_pedido_terminado}</div>
                                        <div className="text-xs text-gray-400">Ref: {item.id_empaque}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">{item.tipo_empaque}</div>
                                        {/* Cantidad de bultos ahora viene en 'cantidad' */}
                                        <div className="text-xs font-bold text-emerald-500">{item.cantidad} Bultos</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg font-mono font-bold text-sm block mb-1 w-max">
                                            {item.peso_total} kg
                                        </span>
                                        <span className={`text-xs font-bold ${item.estado === 'Completado' ? 'text-green-600' : 'text-orange-500'}`}>
                                            {item.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => imprimirEtiqueta(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all" title="Imprimir Etiqueta">
                                                🏷️
                                            </button>
                                            {/* Pasamos el id_empaque correcto para eliminar */}
                                            <button onClick={() => handleDelete(item.id_empaque)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all" title="Borrar">
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-400 italic">
                                    No hay registros de empaque disponibles o buscando...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmpaqueList;