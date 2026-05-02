// src/pages/logistica/despacho/DespachoForm.jsx
import React, { useState } from 'react';
import { crearDespacho } from '../../../services/logistica/despacho.service';

const DespachoForm = ({ onDespachoCreado }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Nuevo: Estado de carga
  const [formData, setFormData] = useState({
    id_pedido_terminado: '',
    id_empleado: '',
    destino: '',
    estado: 'Programado'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Bloqueamos el botón

    try {
      await crearDespacho(formData);
      // Limpiamos el formulario
      setFormData({ id_pedido_terminado: '', id_empleado: '', destino: '', estado: 'Programado' });
      // Notificamos éxito y recargamos tabla
      onDespachoCreado(); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Liberamos el botón
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full lg:w-1/3 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Nuevo Registro</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-xs font-bold text-gray-500 mb-1">LOTE (PEDIDO ID)</label>
            <input 
              type="number" 
              name="id_pedido_terminado"
              value={formData.id_pedido_terminado} 
              onChange={handleChange}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-[#0a4d3c] outline-none"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-xs font-bold text-gray-500 mb-1">OPERARIO ID</label>
            <input 
              type="number" 
              name="id_empleado"
              value={formData.id_empleado} 
              onChange={handleChange}
              className="w-full border rounded p-2 focus:ring-2 focus:ring-[#0a4d3c] outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">DESTINO</label>
          <input 
            type="text" 
            name="destino"
            value={formData.destino} 
            onChange={handleChange}
            placeholder="Ej. Parque Industrial, Haina"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-[#0a4d3c] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1">ESTADO</label>
          <select 
            name="estado"
            value={formData.estado} 
            onChange={handleChange}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-[#0a4d3c] outline-none"
          >
            <option value="Programado">Programado</option>
            <option value="En Tránsito">En Tránsito</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading} // ✅ Evita doble envío
          className={`w-full text-white font-bold py-3 rounded mt-4 transition-colors ${
            loading ? 'bg-gray-400' : 'bg-[#0a4d3c] hover:bg-[#07382a]'
          }`}
        >
          {loading ? 'Procesando...' : 'Registrar Despacho'}
        </button>
      </form>
    </div>
  );
};

export default DespachoForm;