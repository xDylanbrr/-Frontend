import React, { useState, useEffect } from 'react';
import { crearOrden } from '../../../services/produccion/orden_pedido.service';

const OrdenPedidoForm = ({ onOrdenCreada }) => {
  const [formData, setFormData] = useState({
    id_pedido_cliente: '',
    id_empleado: '',
    descripcion: '',
    estado: 'Pendiente'
  });

  const [pedidos, setPedidos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatosDesplegables();
  }, []);

  const cargarDatosDesplegables = async () => {
    try {
      const [resPedidos, resEmpleados] = await Promise.all([
        fetch('https://backend-m3nj.onrender.com/api/pedidos'),
        fetch('https://backend-m3nj.onrender.com/api/administracion/empleados')
      ]);

      if (resPedidos.ok && resEmpleados.ok) {
        const dataPedidos = await resPedidos.json();
        const dataEmpleados = await resEmpleados.json();
        
        // 🔥 MAGIA AQUÍ: Buscamos el array sin importar cómo lo envíe el backend
        const listaPedidos = Array.isArray(dataPedidos) ? dataPedidos : (dataPedidos.pedidos || dataPedidos.data || Object.values(dataPedidos)[0] || []);
        const listaEmpleados = Array.isArray(dataEmpleados) ? dataEmpleados : (dataEmpleados.empleados || dataEmpleados.data || Object.values(dataEmpleados)[0] || []);

        setPedidos(listaPedidos);
        setEmpleados(listaEmpleados);
      } else {
        throw new Error("Error al cargar los datos.");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los pedidos o empleados del backend.");
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
      await crearOrden(formData);
      setFormData({ id_pedido_cliente: '', id_empleado: '', descripcion: '', estado: 'Pendiente' });
      onOrdenCreada(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3 border-t-4 border-purple-600">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Generar Orden</h2>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium">❌ {error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Pedido del Cliente</label>
          <select name="id_pedido_cliente" value={formData.id_pedido_cliente} onChange={handleChange} required disabled={cargando} className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50">
            <option value="">-- Seleccione un pedido --</option>
            {pedidos.map(pedido => {
              const id = pedido.id_pedido_cliente || pedido.id_pedido || pedido.id;
              return <option key={id} value={id}>Pedido #{id} - {pedido.estado || 'Recibido'}</option>;
            })}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Supervisor de Planta</label>
          <select name="id_empleado" value={formData.id_empleado} onChange={handleChange} required disabled={cargando} className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50">
            <option value="">-- Asigne un supervisor --</option>
            {empleados.map(emp => (
              <option key={emp.id_empleado} value={emp.id_empleado}>{emp.nombre} {emp.apellido} - {emp.puesto || emp.cargo || 'Empleado'}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Instrucciones / Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50 h-24" placeholder="Ej: Fabricar 500 fundas con logo rojo..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Estado Inicial</label>
          <select name="estado" value={formData.estado} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50">
            <option value="Pendiente">Pendiente</option>
            <option value="En Producción">En Producción</option>
          </select>
        </div>

        <button type="submit" disabled={cargando} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded hover:bg-purple-700 transition-colors disabled:bg-purple-300 mt-4 shadow-sm">
          {cargando ? 'Cargando datos...' : 'Generar Orden Oficial'}
        </button>
      </form>
    </div>
  );
};

export default OrdenPedidoForm;