import React, { useState, useEffect } from 'react';
import EmpaqueForm from './EmpaqueForm';
import EmpaqueList from './EmpaqueList';
import { getEmpaques } from '../../../services/logistica/empaque.service';

const EmpaquePage = () => {
    const [listaEmpaques, setListaEmpaques] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const cargarEmpaques = async () => {
        try {
            const data = await getEmpaques();
            // Aseguramos que siempre sea un Array para que no crasheé la página
            const empaquesArray = data.data ? data.data : (Array.isArray(data) ? data : []);
            setListaEmpaques(empaquesArray);
        } catch (error) {
            console.error("Error cargando la lista:", error);
            setListaEmpaques([]); // Si hay error, ponemos un array vacío por seguridad
        }
    };

    useEffect(() => {
        cargarEmpaques();
    }, []);

    // Lógica de filtrado SEGURA (Usa id_pedido_terminado en vez de id_lote)
    const empaquesFiltrados = Array.isArray(listaEmpaques) 
        ? listaEmpaques.filter(item => {
            // Extraemos el ID y lo convertimos a texto de forma segura
            const idBuscado = item.id_pedido_terminado || '';
            return idBuscado.toString().includes(busqueda);
        })
        : [];

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-end mb-6">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Buscar por lote..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64 shadow-sm"
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <EmpaqueForm onEmpaqueAgregado={cargarEmpaques} empaquesExistentes={listaEmpaques} />
                    </div>
                    <div className="lg:col-span-2">
                        <EmpaqueList empaques={empaquesFiltrados} actualizarLista={cargarEmpaques} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpaquePage;