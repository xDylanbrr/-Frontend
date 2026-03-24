import React, { useState, useEffect } from 'react';
import OrdenPedidoForm from './OrdenPedidoForm';
import OrdenPedidoList from './OrdenPedidoList';
import { obtenerOrdenes, eliminarOrden } from '../../../services/produccion/orden_pedido.service';

const OrdenPedidoPage = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [errorCarga, setErrorCarga] = useState(false);

  useEffect(() => {
    cargarLista();
  }, []);

  const cargarLista = async () => {
    try {
      setErrorCarga(false);
      const data = await obtenerOrdenes();
      setOrdenes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando lista:", error);
      setErrorCarga(true);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta orden?')) {
      try {
        await eliminarOrden(id);
        cargarLista(); 
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🏭 Órdenes de Producción</h1>
        <p className="text-gray-500">Gestión de órdenes asignadas a planta según pedidos de clientes.</p>
      </div>

      {errorCarga && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>⚠️ No se pudo conectar con el servidor. Verifica que el backend esté corriendo.</span>
          <button onClick={cargarLista} className="underline font-bold">Reintentar</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <OrdenPedidoForm onOrdenCreada={cargarLista} />
        <OrdenPedidoList ordenes={ordenes} onEliminar={handleEliminar} />
      </div>
    </div>
  );
};

export default OrdenPedidoPage;