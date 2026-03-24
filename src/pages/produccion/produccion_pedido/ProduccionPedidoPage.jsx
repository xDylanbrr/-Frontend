import React, { useState, useEffect } from 'react';
import ProduccionPedidoForm from './ProduccionPedidoForm';
import ProduccionPedidoList from './ProduccionPedidoList';
import { obtenerProcesos, completarProceso } from '../../../services/produccion/produccion_pedido.service';

const ProduccionPedidoPage = () => {
  const [procesos, setProcesos] = useState([]);
  const [errorCarga, setErrorCarga] = useState(false);

  useEffect(() => {
    cargarLista();
  }, []);

  const cargarLista = async () => {
    try {
      setErrorCarga(false);
      const data = await obtenerProcesos();
      // Aseguramos que data es un array
      const listaArray = Array.isArray(data) ? data : (data.data || []);
      setProcesos(listaArray);
    } catch (error) {
      console.error("Error cargando procesos:", error);
      setErrorCarga(true);
    }
  };

  const handleCompletar = async (id) => {
    if (window.confirm('¿Seguro que deseas marcar este proceso como COMPLETADO?')) {
      try {
        await completarProceso(id);
        cargarLista(); // Recargamos para ver la fecha_fin y el nuevo estado
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">⚙️ Proceso de Producción</h1>
          <p className="text-gray-500">Gestión del trabajo en máquinas de fundas y empaques.</p>
        </div>
      </div>

      {errorCarga && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>⚠️ No se pudo conectar con el servidor. Verifica que el backend esté corriendo.</span>
          <button onClick={cargarLista} className="underline font-bold">Reintentar</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <ProduccionPedidoForm onProcesoIniciado={cargarLista} />
        <ProduccionPedidoList procesos={procesos} onCompletar={handleCompletar} />
      </div>
    </div>
  );
};

export default ProduccionPedidoPage;