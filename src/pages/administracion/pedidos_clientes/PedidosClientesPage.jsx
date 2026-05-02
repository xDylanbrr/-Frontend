import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, Search, ChevronRight, DollarSign, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import API_BASE_URL from '../../../apiConfig';

const PedidosClientesPage = () => {
    const [pedidos, setPedidos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [filtro, setFiltro] = useState('');

    const cargarPedidos = async () => {
        try {
            setCargando(true);
            const res = await fetch(`${API_BASE_URL}/pedidos`);
            if (res.ok) {
                const data = await res.json();
                setPedidos(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error("Error cargando pedidos:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    const actualizarEstado = async (id, nuevoEstado, estadoActual) => {
        if (nuevoEstado === estadoActual) return;
        
        // Alerta de buenas prácticas de ERP
        const confirmar = window.confirm(
            `ATENCIÓN: Estás a punto de forzar el estado a '${nuevoEstado}'.\n\nEn un ERP real (Master Data Management), los estados deben cambiar automáticamente cuando los departamentos (Producción, Logística, etc.) completan sus tareas.\n\n¿Deseas forzar este cambio manualmente?`
        );
        if (!confirmar) return;

        try {
            const res = await fetch(`${API_BASE_URL}/pedidos/${id}/estado`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            if (res.ok) {
                cargarPedidos();
            } else {
                throw new Error("No se pudo actualizar el estado");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Pendiente': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'En Producción': return 'bg-red-100 text-red-700 border-red-200';
            case 'Control de Calidad': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Listo para Empaque': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'En Despacho/Tránsito': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'Entregado': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const estadosFlujo = ['Pendiente', 'En Producción', 'Control de Calidad', 'Listo para Empaque', 'En Despacho/Tránsito', 'Entregado'];

    const pedidosFiltrados = pedidos.filter(p => 
        (p.cliente?.nombre?.toLowerCase().includes(filtro.toLowerCase()) || 
        p.id_pedido_cliente.toString().includes(filtro)) &&
        p.estado !== 'Entregado'
    );

    const totalIngresos = pedidos.reduce((sum, p) => sum + parseFloat(p.total), 0);
    const completados = pedidos.filter(p => p.estado === 'Entregado').length;
    const pendientes = pedidos.filter(p => p.estado === 'Pendiente').length;

    return (
        <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                {/* ENCABEZADO */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Torre de Control ERP</h1>
                        <p className="text-slate-500 mt-1 text-sm font-medium">Trazabilidad End-to-End de pedidos y procesos departamentales.</p>
                    </div>
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Buscar por ID o Cliente..." 
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 shadow-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all text-sm font-medium bg-white"
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </div>
                </div>

                {/* DASHBOARD DE MÉTRICAS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center gap-4 transition-transform hover:-translate-y-1">
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl"><FileText size={22} strokeWidth={2.5} /></div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Pedidos</p>
                            <h3 className="text-2xl font-black text-slate-800 leading-none">{pedidos.length}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center gap-4 transition-transform hover:-translate-y-1">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><DollarSign size={22} strokeWidth={2.5} /></div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ingresos Proyectados</p>
                            <h3 className="text-2xl font-black text-slate-800 leading-none">RD${totalIngresos.toLocaleString('es-DO')}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center gap-4 transition-transform hover:-translate-y-1">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock size={22} strokeWidth={2.5} /></div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">En Proceso</p>
                            <h3 className="text-2xl font-black text-slate-800 leading-none">{pendientes}</h3>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center gap-4 transition-transform hover:-translate-y-1">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><CheckCircle size={22} strokeWidth={2.5} /></div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Completados</p>
                            <h3 className="text-2xl font-black text-slate-800 leading-none">{completados}</h3>
                        </div>
                    </div>
                </div>

                {/* LISTA DE PEDIDOS ERP */}
                {cargando ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <RefreshCw className="animate-spin text-red-500 mb-4" size={32} />
                        <span className="font-bold text-slate-500">Sincronizando con ERP...</span>
                    </div>
                ) : pedidosFiltrados.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
                        <AlertCircle className="mx-auto text-slate-300 mb-3" size={48} />
                        <h3 className="text-lg font-bold text-slate-700">No hay pedidos</h3>
                        <p className="text-slate-500 text-sm mt-1">No se encontraron pedidos que coincidan con la búsqueda.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {pedidosFiltrados.map((pedido) => (
                            <div key={pedido.id_pedido_cliente} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
                                
                                {/* CABECERA DEL PEDIDO */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                                            <Package className="text-slate-400" size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-sm font-black text-slate-800">#{pedido.id_pedido_cliente}</span>
                                                <span className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${getEstadoColor(pedido.estado)}`}>
                                                    {pedido.estado}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-bold text-slate-700">{pedido.cliente?.nombre || 'Cliente Interno'}</h3>
                                            <p className="text-xs font-medium text-slate-400">{new Date(pedido.fecha).toLocaleString('es-DO', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                                        </div>
                                    </div>
                                    <div className="md:text-right w-full md:w-auto bg-slate-50 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none">
                                        <span className="text-sm font-bold text-slate-400 block md:inline mb-1 md:mb-0 md:mr-2">Total Orden:</span>
                                        <span className="text-2xl font-black text-red-600 block md:inline">RD${parseFloat(pedido.total).toLocaleString('es-DO')}</span>
                                    </div>
                                </div>

                                {/* LÍNEA DE TIEMPO (PROGRESS BAR ERP) */}
                                <div className="mb-6 pt-4 border-t border-slate-100">
                                    <div className="flex items-center justify-between relative px-2 md:px-8">
                                        {/* Línea de fondo */}
                                        <div className="absolute left-6 right-6 md:left-12 md:right-12 top-4 h-1 bg-slate-100 rounded-full z-0"></div>
                                        
                                        {/* Línea de progreso real */}
                                        <div 
                                            className="absolute left-6 md:left-12 top-4 h-1 bg-red-500 rounded-full z-0 transition-all duration-500" 
                                            style={{ width: `${(estadosFlujo.indexOf(pedido.estado) / (estadosFlujo.length - 1)) * 100}%`, maxWidth: 'calc(100% - 48px)' }}
                                        ></div>

                                        {estadosFlujo.map((est, i) => {
                                            const alcanzado = estadosFlujo.indexOf(pedido.estado) >= i;
                                            const actual = pedido.estado === est;
                                            
                                            return (
                                                <div key={est} className="flex flex-col items-center gap-2 z-10 w-16 md:w-24 group relative">
                                                    <button 
                                                        onClick={() => actualizarEstado(pedido.id_pedido_cliente, est, pedido.estado)}
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                                            ${actual ? 'bg-red-600 text-white shadow-[0_0_0_4px_rgba(220,38,38,0.15)] scale-110' : 
                                                              alcanzado ? 'bg-red-500 text-white' : 'bg-white text-slate-300 border-2 border-slate-200 hover:border-red-300'}`}
                                                    >
                                                        {alcanzado && !actual ? <CheckCircle size={14} strokeWidth={3} /> : <div className="w-2.5 h-2.5 rounded-full bg-current"></div>}
                                                    </button>
                                                    <span className={`text-[9px] md:text-[10px] font-bold text-center leading-tight transition-colors
                                                        ${actual ? 'text-red-700' : alcanzado ? 'text-slate-700' : 'text-slate-400'}`}
                                                    >
                                                        {est}
                                                    </span>
                                                    
                                                    {/* Tooltip hint for manual override */}
                                                    {!actual && (
                                                        <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none z-20">
                                                            Forzar estado
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* DESGLOSE DE PRODUCTOS */}
                                <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Desglose de Artículos ({pedido.detalle_pedido_cliente?.length || 0})</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {pedido.detalle_pedido_cliente?.map((prod, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center">
                                                        <Package size={14} className="text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-slate-700 text-sm block">{prod.nombre_producto}</span>
                                                        <span className="text-slate-400 text-xs font-medium">Cant: {prod.cantidad}</span>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-slate-700 text-sm">RD${parseFloat(prod.subtotal).toLocaleString('es-DO')}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PedidosClientesPage;
