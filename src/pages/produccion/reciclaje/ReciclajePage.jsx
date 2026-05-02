import React, { useState, useEffect } from 'react';
import { Trash2, RotateCw, ExternalLink } from 'lucide-react';
import API_BASE_URL from "../../../apiConfig";

const ReciclajePage = () => {
    const [registros, setRegistros] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarReciclaje = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/produccion/reciclaje`);
                if (res.ok) {
                    const data = await res.json();
                    setRegistros(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Error al cargar reciclaje:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarReciclaje();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="bg-red-100 p-3 rounded-2xl text-red-600">
                        <RotateCw size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Flujo de Reciclaje</h1>
                        <p className="text-gray-500">Productos desviados por falla en Control de Calidad.</p>
                    </div>
                </div>

                {cargando ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-gray-700">ID</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Origen (Producción)</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Motivo</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Máquina Externa</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Fecha Desvío</th>
                                    <th className="px-6 py-4 font-bold text-gray-700">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {registros.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-20 text-center text-gray-400">
                                            <Trash2 size={48} className="mx-auto mb-4 opacity-20" />
                                            No hay productos en reciclaje actualmente.
                                        </td>
                                    </tr>
                                ) : (
                                    registros.map((item) => (
                                        <tr key={item.id_reciclaje} className="hover:bg-red-50/30 transition-colors">
                                            <td className="px-6 py-4 font-mono text-sm text-red-600">#REC-{item.id_reciclaje}</td>
                                            <td className="px-6 py-4 font-medium text-gray-800">Proceso #{item.id_produccion}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.motivo}</td>
                                            <td className="px-6 py-4">
                                                <span className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                                                    {item.maquina_externa}
                                                    <ExternalLink size={14} />
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(item.fecha).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    En Proceso
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReciclajePage;
