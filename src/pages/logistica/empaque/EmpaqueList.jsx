import React from 'react';
import { eliminarEmpaque, actualizarEmpaque } from '../../../services/logistica/empaque.service';
import { toast } from 'react-toastify';
import { X, Printer, Package, Scale, Hash, Edit2, Save } from 'lucide-react';

const EmpaqueList = ({ empaques, actualizarLista }) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editFormData, setEditFormData] = React.useState(null);

    const imprimirEtiqueta = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditFormData({ ...item });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await actualizarEmpaque(editFormData.id_empaque, {
                cantidad: parseInt(editFormData.cantidad),
                peso_total: parseFloat(editFormData.peso_total),
                tipo_empaque: editFormData.tipo_empaque,
                estado: editFormData.estado,
                observaciones: editFormData.observaciones
            });
            toast.success("Registro actualizado correctamente");
            setIsEditModalOpen(false);
            actualizarLista();
        } catch (error) {
            toast.error("Error al actualizar: " + error.message);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedItem(null);
    };

    const handleDelete = async (id) => {
        const confirmarEliminar = () => toast(
            ({ closeToast }) => (
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-bold">¿Eliminar este registro?</p>
                    <div className="flex gap-2">
                        <button 
                            className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold"
                            onClick={async () => {
                                try {
                                    await eliminarEmpaque(id);
                                    toast.success("Eliminado correctamente");
                                    actualizarLista();
                                    closeToast();
                                } catch (e) {
                                    toast.error("Error al eliminar");
                                }
                            }}
                        >
                            Sí, eliminar
                        </button>
                        <button className="bg-gray-200 px-3 py-1 rounded text-xs" onClick={closeToast}>Cancelar</button>
                    </div>
                </div>
            ),
            { autoClose: false, closeOnClick: false }
        );

        confirmarEliminar();
    };

    return (
        <>
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
                                            <div className="font-bold text-gray-900">Lote #{item.id_pedido_terminado}</div>
                                            <div className="text-xs text-gray-400">Ref: {item.id_empaque}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">{item.tipo_empaque}</div>
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
                                                <button onClick={() => handleEdit(item)} className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-600 hover:text-white transition-all" title="Editar">
                                                    <Edit2 size={16} />
                                                </button>
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

            {/* MODAL DE ETIQUETA PREMIUM */}
            {isModalOpen && selectedItem && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-200 border border-gray-100">
                        {/* Header del Modal */}
                        <div className="bg-slate-900 px-6 py-5 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-600 rounded-xl">
                                    <Printer size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Etiqueta de Despacho</h3>
                                    <p className="text-slate-400 text-xs">Información logística del lote</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Contenido de la Etiqueta */}
                        <div className="p-8">
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-6 relative">
                                {/* Decoración de código de barras simulado */}
                                <div className="absolute top-4 right-6 opacity-10">
                                    <Hash size={40} strokeWidth={1} />
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                            <Hash size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID de Lote</p>
                                            <p className="text-xl font-black text-slate-800">#{selectedItem.id_pedido_terminado}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                                <Package size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase">Bultos</p>
                                                <p className="text-sm font-bold text-slate-700">{selectedItem.cantidad} Unidades</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                                <Scale size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase">Peso Total</p>
                                                <p className="text-sm font-bold text-slate-700">{selectedItem.peso_total} kg</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-200">
                                        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-xl border border-red-100 flex items-center justify-center gap-2">
                                            <span className="animate-pulse w-2 h-2 rounded-full bg-red-600"></span>
                                            <span className="font-bold text-xs uppercase tracking-tighter">Listo para Despacho Logístico</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button onClick={() => window.print()} className="flex-1 bg-slate-900 text-white font-bold py-3 rounded-2xl shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                    <Printer size={18} />
                                    Imprimir Etiqueta
                                </button>
                                <button onClick={closeModal} className="px-6 bg-slate-100 text-slate-600 font-bold py-3 rounded-2xl hover:bg-slate-200 transition-all">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL DE EDICIÓN PREMIUM */}
            {isEditModalOpen && editFormData && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-200 border border-gray-100">
                        {/* Header del Modal */}
                        <div className="bg-slate-900 px-6 py-5 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500 rounded-xl">
                                    <Edit2 size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Editar Registro</h3>
                                    <p className="text-slate-400 text-xs">Lote #{editFormData.id_pedido_terminado}</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Formulario de Edición */}
                        <form onSubmit={handleUpdate} className="p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Cantidad Bultos</label>
                                    <input 
                                        type="number" 
                                        value={editFormData.cantidad} 
                                        onChange={(e) => setEditFormData({...editFormData, cantidad: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-slate-700"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Peso Total (kg)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={editFormData.peso_total} 
                                        onChange={(e) => setEditFormData({...editFormData, peso_total: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Tipo de Embalaje</label>
                                <select 
                                    value={editFormData.tipo_empaque}
                                    onChange={(e) => setEditFormData({...editFormData, tipo_empaque: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-slate-700"
                                >
                                    <option value="Cajas">📦 Cajas de Cartón</option>
                                    <option value="Pallets">🏗️ Pallets Madera</option>
                                    <option value="Rollos">🧵 Rollos de Film</option>
                                    <option value="Bolsas">🛍️ Bolsas Master</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Estado</label>
                                <select 
                                    value={editFormData.estado}
                                    onChange={(e) => setEditFormData({...editFormData, estado: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-slate-700"
                                >
                                    <option value="Completado">✅ Completado</option>
                                    <option value="Pendiente">⏳ Pendiente</option>
                                    <option value="En Proceso">⚙️ En Proceso</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Observaciones</label>
                                <textarea 
                                    rows="3"
                                    value={editFormData.observaciones} 
                                    onChange={(e) => setEditFormData({...editFormData, observaciones: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold text-slate-700 resize-none"
                                    placeholder="Notas adicionales..."
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="submit" className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                    <Save size={18} />
                                    Guardar Cambios
                                </button>
                                <button type="button" onClick={closeModal} className="px-8 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmpaqueList;