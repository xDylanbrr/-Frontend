import React, { useState, useEffect } from 'react';
import { crearProceso } from '../../../services/produccion/produccion_pedido.service';

const ProduccionPedidoForm = ({ onProcesoIniciado }) => {
  const [formData, setFormData] = useState({
    id_orden: '',
    id_empleado: '',
    estado: 'En Proceso'
  });

  const [ordenesPendientes, setOrdenesPendientes] = useState([]);
  const [operarios, setOperarios] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatosDesplegables();
  }, []);

  const cargarDatosDesplegables = async () => {
    try {
      setCargando(true);
      const [resOrdenes, resEmpleados] = await Promise.all([
        fetch('http://localhost:3000/api/produccion/orden-pedido'),
        fetch('http://localhost:3000/api/administracion/empleados')
      ]);

      if (resOrdenes.ok && resEmpleados.ok) {
        const dataOrdenes = await resOrdenes.json();
        const dataEmpleados = await resEmpleados.json();
        
        // 1. Buscamos el array de Órdenes y filtramos las que están PENDIENTES
        const listaOrdenes = (Array.isArray(dataOrdenes) ? dataOrdenes : (dataOrdenes.data || []))
          .filter(orden => orden.estado === "Pendiente"); // Solo las que no han iniciado

        // 2. Buscamos el array de Empleados
        const listaEmpleados = Array.isArray(dataEmpleados) ? dataEmpleados : (dataEmpleados.data || []);

        setOrdenesPendientes(listaOrdenes);
        setOperarios(listaEmpleados);
      } else {
        throw new Error("Error al cargar los datos.");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las órdenes pendientes o los operarios.");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await crearProceso(formData);
      // Limpiamos y recargamos datos
      setFormData({ id_orden: '', id_empleado: '', estado: 'En Proceso' });
      onProcesoIniciado(); // Actualiza la tabla madre
      cargarDatosDesplegables(); // Recarga las órdenes (ya no saldrá la que iniciamos)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3 border-t-4 border-green-600">
      <h2 className="text-xl font-bold mb-4 text-gray-800">🚀 Iniciar Producción</h2>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium">❌ {error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* SELECT DE ÓRDENES PENDIENTES */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Orden de Pedido Pendiente</label>
          <select name="id_orden" value={formData.id_orden} onChange={handleChange} required disabled={cargando} className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none bg-gray-50">
            <option value="">-- Seleccione una orden --</option>
            {ordenesPendientes.length === 0 && !cargando && <option disabled>No hay órdenes pendientes</option>}
            {ordenesPendientes.map(orden => (
              <option key={orden.id_orden} value={orden.id_orden}>
                Orden #{orden.id_orden} - Pedido Cliente #{orden.id_pedido_cliente}
              </option>
            ))}
          </select>
        </div>
        
        {/* SELECT DE OPERARIOS */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Operario Encargado</label>
          <select name="id_empleado" value={formData.id_empleado} onChange={handleChange} required disabled={cargando} className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none bg-gray-50">
            <option value="">-- Asigne un operario --</option>
            {operarios.map(emp => (
              <option key={emp.id_empleado} value={emp.id_empleado}>{emp.nombre} {emp.apellido}</option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={cargando || ordenesPendientes.length === 0} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded hover:bg-green-700 transition-colors disabled:bg-gray-300 mt-4 shadow-sm">
          {cargando ? 'Cargando datos...' : '¡Iniciar Máquinas! 🏭'}
        </button>
      </form>
    </div>
  );
};

export default ProduccionPedidoForm;