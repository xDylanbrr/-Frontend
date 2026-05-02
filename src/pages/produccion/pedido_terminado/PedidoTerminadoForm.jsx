import React, { useState, useEffect } from 'react';
import { crearPedidoTerminado } from '../../../services/produccion/pedido_terminado.service';
import API_BASE_URL from '../../../apiConfig';

const PedidoTerminadoForm = ({ onPedidoTerminadoCreado }) => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('pedido_terminado_form');
    return saved ? JSON.parse(saved) : {
      id_produccion: '',
      id_empleado: '',
      estado: 'Listo para empacar'
    };
  });

  const [procesosActivos, setProcesosActivos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    localStorage.setItem('pedido_terminado_form', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    cargarDatosDesplegables();
  }, []);

  const cargarDatosDesplegables = async () => {
    try {
      setCargando(true);
      const [resProcesos, resEmpleados] = await Promise.all([
        fetch(`${API_BASE_URL}/produccion/proceso`), 
        fetch(`${API_BASE_URL}/administracion/empleados`)
      ]);

      if (resProcesos.ok && resEmpleados.ok) {
        const dataProcesos = await resProcesos.json();
        const dataEmpleados = await resEmpleados.json();
        
        const listaProcesos = (Array.isArray(dataProcesos) ? dataProcesos : (dataProcesos.data || []))
          .filter(p => p.estado !== "Completado"); 

        const listaEmpleados = Array.isArray(dataEmpleados) ? dataEmpleados : (dataEmpleados.data || []);

        setProcesosActivos(listaProcesos); // 🔥 ¡AQUÍ ESTABA EL BUG MÍO!
        setEmpleados(listaEmpleados);
      } else {
        throw new Error("Error al cargar los datos del servidor.");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los procesos activos o los empleados.");
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
      await crearPedidoTerminado(formData);
      localStorage.removeItem('pedido_terminado_form');
      setFormData({ id_produccion: '', id_empleado: '', estado: 'Listo para empacar' });
      onPedidoTerminadoCreado(); 
      cargarDatosDesplegables(); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3 border-t-4 border-blue-600">
      <h2 className="text-xl font-bold mb-4 text-gray-800">✅ Certificar Finalización</h2>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium">❌ {error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Proceso de Máquina Terminado</label>
          <select name="id_produccion" value={formData.id_produccion} onChange={handleChange} required disabled={cargando} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50">
            <option value="">-- Seleccione el proceso --</option>
            {procesosActivos.length === 0 && !cargando && <option disabled>No hay procesos activos en máquinas</option>}
            {procesosActivos.map(p => (
              <option key={p.id_produccion} value={p.id_produccion}>
                Proceso #{p.id_produccion} (Orden #{p.id_orden}) - {p.empleado ? `${p.empleado.nombre} ${p.empleado.apellido}` : 'Sin operario'}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Aprobado por (Control de Calidad)</label>
          <select name="id_empleado" value={formData.id_empleado} onChange={handleChange} required disabled={cargando} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50">
            <option value="">-- Asigne quién aprueba --</option>
            {empleados.map(emp => (
              <option key={emp.id_empleado} value={emp.id_empleado}>{emp.nombre} {emp.apellido}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Línea/Paso de producción</label>
          <select name="paso_produccion" value={formData.paso_produccion} onChange={handleChange} required className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50">
            <option value="">-- Seleccione la línea --</option>
            <option value="Extrusión">Extrusión</option>
            <option value="Impresión">Impresión</option>
            <option value="Sellado">Sellado</option>
            <option value="Corte">Corte</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Estado de Salida</label>
          <select name="estado" value={formData.estado} onChange={handleChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50">
            <option value="Listo para empacar">Listo para empacar</option>
            <option value="Dañado">Dañado</option>
          </select>
        </div>

        <button type="submit" disabled={cargando || procesosActivos.length === 0} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-300 mt-4 shadow-sm">
          {cargando ? 'Cargando datos...' : 'Aprobar y Finalizar Lote ✅'}
        </button>
      </form>
    </div>
  );
};

export default PedidoTerminadoForm;