// src/pages/logistica/despacho/DespachoPage.jsx
import React, { useState, useEffect } from 'react';
import DespachoForm from './DespachoForm';
import DespachoList from './DespachoList';
import { obtenerDespachos, eliminarDespacho } from '../../../services/logistica/despacho.service';

const DespachoPage = () => {
  const [despachos, setDespachos] = useState([]);
  const [errorCarga, setErrorCarga] = useState(false);

  useEffect(() => {
    cargarLista();
  }, []);

  const cargarLista = async () => {
    try {
      setErrorCarga(false);
      const data = await obtenerDespachos();
      // Verificamos que sea un array para evitar errores en el .map de la lista
      setDespachos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando lista:", error);
      setErrorCarga(true);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este despacho?')) {
      try {
        await eliminarDespacho(id);
        cargarLista(); 
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🚚 Módulo de Despacho</h1>
        <p className="text-gray-500">Control de salida y destino de mercancía terminada.</p>
      </div>

      {errorCarga && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
          <span>⚠️ No se pudo conectar con el servidor. Verifica que el backend esté corriendo.</span>
          <button onClick={cargarLista} className="underline font-bold">Reintentar</button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <DespachoForm onDespachoCreado={cargarLista} />
        <DespachoList despachos={despachos} onEliminar={handleEliminar} />
      </div>
    </div>
  );
};

export default DespachoPage;