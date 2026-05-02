import { Package, Truck, Calendar, MapPin, Hash, User } from 'lucide-react';

const TransporteList = ({ data }) => {
    return (
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900 rounded-xl text-white shadow-lg shadow-slate-200">
                        <Truck size={20} />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Historial de Despachos</h2>
                </div>
                <span className="text-[10px] font-bold bg-white px-3 py-1 rounded-full text-slate-400 border border-slate-100 uppercase tracking-widest">
                    {data.length} Registros
                </span>
            </div>

            <div className="overflow-x-auto px-4 pb-4">
                <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-slate-400">
                            <th className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest">ID</th>
                            <th className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Logística</th>
                            <th className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Destino</th>
                            <th className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-center">Carga</th>
                            <th className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Fecha Salida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-20">
                                    <div className="flex flex-col items-center gap-2 opacity-20">
                                        <Truck size={48} />
                                        <p className="text-sm font-bold uppercase tracking-tighter">Sin registros de transporte</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data.map((transporte) => (
                                <tr key={transporte.id_transporte} className="group transition-all hover:translate-x-1">
                                    <td className="px-6 py-4 bg-slate-50 first:rounded-l-2xl border-y border-l border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                                        <div className="flex items-center gap-2">
                                            <Hash size={12} className="text-slate-300" />
                                            <span className="font-black text-slate-800">{transporte.id_transporte}</span>
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-4 bg-slate-50 border-y border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-blue-200 group-hover:text-blue-500 transition-all">
                                                <User size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 leading-tight">{transporte.chofer}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{transporte.empresa} · {transporte.placa}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 bg-slate-50 border-y border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-blue-500" />
                                            <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">
                                                {transporte.destino || 'NO ESPECIFICADO'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 bg-slate-50 border-y border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <Package size={12} className="text-slate-400" />
                                                <span className="text-sm font-black text-slate-800">{transporte.numero_paquetes || 0}</span>
                                            </div>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                                                {transporte.pedidos_asociados ? `Lotes: ${transporte.pedidos_asociados}` : 'Sin Lotes'}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 bg-slate-50 last:rounded-r-2xl border-y border-r border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Calendar size={14} className="text-slate-300" />
                                            <span className="text-xs font-bold uppercase tracking-tighter">
                                                {new Date(transporte.fecha_salida).toLocaleString('es-DO', { 
                                                    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' 
                                                })}
                                            </span>
                                        </div>
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

export default TransporteList;