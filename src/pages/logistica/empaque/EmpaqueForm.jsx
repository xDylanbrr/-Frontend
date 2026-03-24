import React, { useState } from 'react';
import { crearEmpaque } from '../../../services/logistica/empaque.service';

const EmpaqueForm = ({ onEmpaqueAgregado }) => {
    const [formData, setFormData] = useState({
        id_lote: '', 
        id_empleado: '', 
        cantidad_bultos: '', 
        peso_total: '', 
        tipo_empaque: '', 
        estado: 'Completado', 
        observaciones: ''
    });

    // Esta función maneja todos los inputs automáticamente
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // LÓGICA CLAVE: Traducimos los nombres del formulario a lo que espera tu Backend
            const datosParaEnviar = {
                id_pedido_terminado: parseInt(formData.id_lote), // El backend espera id_pedido_terminado
                id_empleado: parseInt(formData.id_empleado),
                cantidad: parseInt(formData.cantidad_bultos),    // El backend espera cantidad
                peso_total: parseFloat(formData.peso_total),
                tipo_empaque: formData.tipo_empaque,
                estado: formData.estado,
                observaciones: formData.observaciones || ''
            };

            await crearEmpaque(datosParaEnviar);
            
            alert('✅ Registro exitoso');
            onEmpaqueAgregado();
            
            // Limpiamos el formulario para el siguiente registro
            setFormData({ 
                id_lote: '', 
                id_empleado: '', 
                cantidad_bultos: '', 
                peso_total: '', 
                tipo_empaque: '', 
                estado: 'Completado', 
                observaciones: '' 
            });
        } catch (error) {
            // Si hay error, mostramos el motivo exacto (ej. "Lote no existe")
            alert('❌ Error al registrar: ' + (error.message || 'Revisa la consola'));
            console.error("Error en submit:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 space-y-4 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Nuevo Registro</h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 uppercase">Lote (Pedido)</label>
                    <input type="number" name="id_lote" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 transition-all" value={formData.id_lote} onChange={handleChange} required />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 uppercase">Operario ID</label>
                    <input type="number" name="id_empleado" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 transition-all" value={formData.id_empleado} onChange={handleChange} required />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase">Tipo</label>
                <select name="tipo_empaque" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 bg-transparent" value={formData.tipo_empaque} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="Cajas">📦 Cajas</option>
                    <option value="Pallets">🏗️ Pallets</option>
                    <option value="Rollos">🧵 Rollos</option>
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 uppercase">Bultos</label>
                    <input type="number" name="cantidad_bultos" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1" value={formData.cantidad_bultos} onChange={handleChange} required />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-400 uppercase">Peso (kg)</label>
                    <input type="number" step="0.01" name="peso_total" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1" value={formData.peso_total} onChange={handleChange} required />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-400 uppercase">Estado</label>
                <select name="estado" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 bg-transparent" value={formData.estado} onChange={handleChange}>
                    <option value="Completado">✅ Completado</option>
                    <option value="Pendiente">⏳ Pendiente</option>
                </select>
            </div>

            {/* Este campo faltaba en tu código visual */}
            <div className="flex flex-col mt-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Observaciones</label>
                <textarea name="observaciones" rows="2" className="border-b-2 border-gray-100 focus:border-emerald-500 outline-none py-1 resize-none" placeholder="Notas adicionales..." value={formData.observaciones} onChange={handleChange}></textarea>
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all mt-4">
                Finalizar Empaque
            </button>
        </form>
    );
};

export default EmpaqueForm;