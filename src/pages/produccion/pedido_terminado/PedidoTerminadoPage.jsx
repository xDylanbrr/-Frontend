import React, { useState, useEffect } from 'react';
import PedidoTerminadoForm from './PedidoTerminadoForm';
import PedidoTerminadoList from './PedidoTerminadoList';
import { obtenerPedidosTerminados } from '../../../services/produccion/pedido_terminado.service';

const PedidoTerminadoPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [errorCarga, setErrorCarga] = useState(false);

  useEffect(() => {
    cargarLista();
  }, []);

  const cargarLista = async () => {
    try {
      setErrorCarga(false);
      const data = await obtenerPedidosTerminados();
      // Aseguramos que data es un array
      const listaArray = Array.isArray(data) ? data : (data.data || []);
      setPedidos(listaArray);
    } catch (error) {
      console.error("Error cargando pedidos terminados:", error);
      setErrorCarga(true);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">✅ Pedidos Terminados Fábrica</h1>
          <p className="text-gray-500">Certificación final de lotes de fundas y empaques antes de Logística.</p>
        </div>
      </div>

      {errorCarga && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>⚠️ Error de conexión con el backend de GTG.</span>
          <button onClick={cargarLista} className="underline font-bold">Reintentar</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <PedidoTerminadoForm onPedidoTerminadoCreado={cargarLista} />
        <PedidoTerminadoList pedidos={pedidos} />
      </div>
    </div>
  );
};

export default PedidoTerminadoPage;