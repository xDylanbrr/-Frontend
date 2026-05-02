import React, { useState, useEffect } from 'react';
import { crearEmpaque } from '../../../services/logistica/empaque.service';
import { toast } from 'react-toastify';
import API_BASE_URL from '../../../apiConfig';

const EmpaqueForm = ({ onEmpaqueAgregado, empaquesExistentes = [] }) => {
    const [formData, setFormData] = useState(() => {
        // Recuperar datos guardados para persistencia
        const saved = localStorage.getItem('empaque_form_data');
        return saved ? JSON.parse(saved) : {
            id_lote: '', 
            id_empleado: '', 
            cantidad_bultos: '', 
            peso_total: '', 
            tipo_empaque: '', 
            estado: 'Completado', 
            observaciones: ''
        };
    });

    const [lotesDisponibles, setLotesDisponibles] = useState([]);
    const [empleados, setEmpleados] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Guardar en localStorage cada vez que cambie el formulario
    useEffect(() => {
        localStorage.setItem('empaque_form_data', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [resLotes, resEmpleados] = await Promise.all([
                    fetch(`${API_BASE_URL}/produccion/terminado`),
                    fetch(`${API_BASE_URL}/administracion/empleados`)
                ]);
                
                if (resLotes.ok && resEmpleados.ok) {
                    const dataLotes = await resLotes.json();
                    const dataEmpleados = await resEmpleados.json();
                    
                    // 🔥 FILTRO FLEXIBLE: Busca "emp" para cubrir "empacar" o "empaque" y es case-insensitive
                    let listaLotes = (Array.isArray(dataLotes) ? dataLotes : (dataLotes.data || []))
                        .filter(lote => {
                            const st = (lote.estado || "").toLowerCase();
                            return st.includes("emp"); // Captura "Listo para empacar" y "Listo para Empaque"
                        });
                    
                    // 🚀 NUEVO FILTRO: Excluir los que ya están en la lista de empaquetados
                    const idsYaEmpaquetados = empaquesExistentes.map(e => e.id_pedido_terminado);
                    listaLotes = listaLotes.filter(lote => !idsYaEmpaquetados.includes(lote.id_pedido_terminado));
                    
                    setLotesDisponibles(listaLotes);
                    setEmpleados(Array.isArray(dataEmpleados) ? dataEmpleados : (dataEmpleados.data || []));
                }
            } catch (error) {
                console.error("Error al cargar datos de empaque:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, [empaquesExistentes]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const datosParaEnviar = {
                id_pedido_terminado: parseInt(formData.id_lote),
                id_empleado: parseInt(formData.id_empleado),
                cantidad: parseInt(formData.cantidad_bultos),
                peso_total: parseFloat(formData.peso_total),
                tipo_empaque: formData.tipo_empaque,
                estado: formData.estado,
                observaciones: formData.observaciones || ''
            };

            await crearEmpaque(datosParaEnviar);

            // 🔄 ACTUALIZACIÓN AUTOMÁTICA DE ESTADO EN ERP
            const loteSeleccionado = lotesDisponibles.find(l => l.id_pedido_terminado === parseInt(formData.id_lote));
            const idPedido = loteSeleccionado?.produccion_pedido?.orden_pedido?.id_pedido_cliente;
            
            if (idPedido) {
                try {
                    await fetch(`${API_BASE_URL}/pedidos/${idPedido}/estado`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ estado: 'En Despacho/Tránsito' })
                    });
                    console.log(`Estado del pedido #${idPedido} actualizado a 'En Despacho/Tránsito'`);
                } catch (err) {
                    console.error("Error al actualizar estado del pedido:", err);
                }
            }

            toast.success('✅ Empaque registrado con éxito');
            localStorage.removeItem('empaque_form_data'); // Limpiar persistencia tras éxito
            onEmpaqueAgregado();
            setFormData({ id_lote: '', id_empleado: '', cantidad_bultos: '', peso_total: '', tipo_empaque: '', estado: 'Completado', observaciones: '' });
        } catch (error) {
            toast.error('❌ Error: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 space-y-4 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">📦 Nuevo Empaque</h3>
            
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 uppercase">Lote (Listo para empacar)</label>
                    <select name="id_lote" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 bg-transparent" value={formData.id_lote} onChange={handleChange} required>
                        <option value="">Seleccione un lote...</option>
                        {lotesDisponibles.map(lote => (
                            <option key={lote.id_pedido_terminado} value={lote.id_pedido_terminado}>
                                Lote #{lote.id_pedido_terminado} - {lote.produccion_pedido?.orden_pedido?.id_pedido_cliente ? `Pedido #${lote.produccion_pedido.orden_pedido.id_pedido_cliente}` : 'Sin Pedido'}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 uppercase">Encargado de Empaque</label>
                    <select name="id_empleado" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 bg-transparent" value={formData.id_empleado} onChange={handleChange} required>
                        <option value="">Seleccione operario...</option>
                        {empleados.map(emp => (
                            <option key={emp.id_empleado} value={emp.id_empleado}>{emp.nombre} {emp.apellido}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 uppercase">Tipo de Embalaje</label>
                    <select name="tipo_empaque" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 bg-transparent" value={formData.tipo_empaque} onChange={handleChange} required>
                        <option value="">Seleccione...</option>
                        <option value="Cajas">📦 Cajas de Cartón</option>
                        <option value="Pallets">🏗️ Pallets Madera</option>
                        <option value="Rollos">🧵 Rollos de Film</option>
                        <option value="Bolsas">🛍️ Bolsas Master</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase">Cantidad Bultos</label>
                        <input type="number" name="cantidad_bultos" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1" value={formData.cantidad_bultos} onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-400 uppercase">Peso Total (kg)</label>
                        <input type="number" step="0.01" name="peso_total" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1" value={formData.peso_total} onChange={handleChange} required />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 uppercase">Observaciones</label>
                    <textarea name="observaciones" rows="2" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 resize-none" placeholder="Estado del empaque..." value={formData.observaciones} onChange={handleChange}></textarea>
                </div>
            </div>

            <button type="submit" disabled={cargando} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all mt-4">
                {cargando ? 'Cargando...' : 'Finalizar Registro de Empaque'}
            </button>
        </form>
    );
};

export default EmpaqueForm;