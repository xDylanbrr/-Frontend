import { useState, useEffect } from 'react';
import { crearTransporte } from '../../../services/logistica/transporte.service';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../../apiConfig';
import { Package, CheckSquare, Square } from 'lucide-react';

const TransporteForm = ({ onGuardado, historialTransportes = [] }) => {
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('transporte_form_data');
        return saved ? JSON.parse(saved) : {
            empresa: '',
            chofer: '',
            placa: '',
            fecha_salida: '',
            numero_paquetes: '',
            destino: '',
            pedidos_asociados: ''
        };
    });

    const [empaquesListos, setEmpaquesListos] = useState([]);
    const [empaquesSeleccionados, setEmpaquesSeleccionados] = useState([]);

    useEffect(() => {
        localStorage.setItem('transporte_form_data', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        const cargarEmpaques = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/logistica/empaque`);
                const data = await res.json();
                const empaques = (Array.isArray(data) ? data : (data.data || []))
                    .filter(e => e.estado === "Completado");

                // 🚀 FILTRO DE EXCLUSIÓN ROBUSTO
                const idsYaDespachados = (Array.isArray(historialTransportes) ? historialTransportes : []).flatMap(t => {
                    if (!t.pedidos_asociados) return [];
                    const matches = t.pedidos_asociados.match(/\d+/g);
                    return matches ? matches.map(Number) : [];
                });

                const filtrados = empaques.filter(e => {
                    const idLote = Number(e.id_pedido_terminado);
                    return !idsYaDespachados.includes(idLote);
                });
                
                setEmpaquesListos(filtrados);
            } catch (error) {
                console.error("Error cargando empaques listos:", error);
            }
        };
        cargarEmpaques();
    }, [historialTransportes]);

    const toggleEmpaque = (id_lote) => {
        setEmpaquesSeleccionados(prev => {
            const isSelected = prev.includes(id_lote);
            const newList = isSelected ? prev.filter(id => id !== id_lote) : [...prev, id_lote];
            
            // Actualizar formData automáticamente
            setFormData(old => ({
                ...old,
                pedidos_asociados: newList.join(', '),
                numero_paquetes: newList.length
            }));
            
            return newList;
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearTransporte(formData);
            
            // 🔄 ACTUALIZACIÓN AUTOMÁTICA DE ESTADOS EN ERP (A "ENTREGADO")
            const idsLotes = empaquesSeleccionados;
            const promesas = idsLotes.map(async (idLote) => {
                const empaqueInfo = empaquesListos.find(e => e.id_pedido_terminado === idLote);
                // Intentamos obtener el ID del pedido desde la relación del empaque
                const idPedido = empaqueInfo?.terminado?.produccion_pedido?.orden_pedido?.id_pedido_cliente;
                
                if (idPedido) {
                    return fetch(`${API_BASE_URL}/pedidos/${idPedido}/estado`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ estado: 'Entregado' })
                    });
                }
            });
            await Promise.all(promesas);

            toast.success("✅ Transporte registrado correctamente");
            localStorage.removeItem('transporte_form_data');
            setFormData({ empresa: '', chofer: '', placa: '', fecha_salida: '', numero_paquetes: '', destino: '', pedidos_asociados: '' }); 
            onGuardado(); 
        } catch (error) {
            toast.error("❌ Error al guardar: " + error.message);
        }
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-6 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
                    <Package size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-slate-800 leading-tight">Despacho de Mercancía</h2>
                    <p className="text-slate-400 text-sm">Asignación de transporte y salida de almacén.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Empresa de Transporte</label>
                        <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700" 
                            placeholder="Ej. Logística Nacional" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nombre del Chofer</label>
                        <input type="text" name="chofer" value={formData.chofer} onChange={handleChange} required
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700" 
                            placeholder="Ej. Juan Pérez" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Placa del Vehículo</label>
                        <input type="text" name="placa" value={formData.placa} onChange={handleChange} required
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700" 
                            placeholder="Ej. L-123456" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Fecha y Hora de Salida</label>
                        <input type="datetime-local" name="fecha_salida" value={formData.fecha_salida} onChange={handleChange} required
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700" />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Destino (Zona/Ciudad)</label>
                        <input type="text" name="destino" value={formData.destino} onChange={handleChange} required
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700" 
                            placeholder="Ej. Santiago, Zona Industrial" />
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Estado de Salida</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-700">
                            <option>Despachado</option>
                            <option>En Tránsito</option>
                            <option>Pendiente</option>
                        </select>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                        Empaques Completados para este Despacho
                    </label>
                    
                    {empaquesListos.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-4 bg-slate-50 rounded-3xl border border-slate-100">
                            {empaquesListos.map(emp => {
                                const isSelected = empaquesSeleccionados.includes(emp.id_pedido_terminado);
                                return (
                                    <div 
                                        key={emp.id_empaque}
                                        onClick={() => toggleEmpaque(emp.id_pedido_terminado)}
                                        className={`group cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col gap-2 ${
                                            isSelected 
                                            ? 'border-blue-600 bg-white shadow-md ring-4 ring-blue-50' 
                                            : 'border-transparent bg-white hover:border-slate-200 hover:shadow-sm'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {isSelected ? <CheckSquare size={20} className="text-blue-600" /> : <Square size={20} className="text-slate-200" />}
                                                <span className="text-xs font-black text-slate-800">LOTE #{emp.id_pedido_terminado}</span>
                                            </div>
                                            <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">Listo</span>
                                        </div>
                                        <div className="flex items-end justify-between border-t border-slate-50 pt-2">
                                            <div>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">{emp.tipo_empaque}</p>
                                                <p className="text-[10px] font-black text-slate-600">{emp.cantidad} bultos</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400 font-bold tracking-tighter uppercase">Peso</p>
                                                <p className="text-xs font-black text-blue-600">{emp.peso_total}kg</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                            <Package className="mx-auto text-slate-200 mb-2" size={40} />
                            <p className="text-sm text-slate-400 font-medium italic">No hay empaques completados esperando despacho.</p>
                        </div>
                    )}
                    
                    <div className="mt-6 p-5 bg-slate-900 rounded-3xl text-white flex justify-between items-center shadow-2xl shadow-slate-900/40 relative overflow-hidden">
                        {/* Decoración */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full"></div>
                        
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Carga a Despachar</p>
                            <p className="text-2xl font-black">{empaquesSeleccionados.length} <span className="text-slate-500 text-sm font-bold uppercase tracking-widest ml-1">Paquetes</span></p>
                        </div>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                            Registrar Despacho
                            <Package size={20} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TransporteForm;