// src/pages/logistica/despacho/DespachoPage.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
    const confirmar = () => toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold">¿Eliminar este despacho?</p>
          <div className="flex gap-2">
            <button className="bg-red-600 text-white px-3 py-1 rounded text-xs" onClick={async () => {
              try {
                await eliminarDespacho(id);
                toast.success("Despacho eliminado");
                cargarLista();
                closeToast();
              } catch (err) {
                toast.error(err.message);
              }
            }}>Eliminar</button>
            <button className="bg-gray-200 px-3 py-1 rounded text-xs" onClick={closeToast}>Cancelar</button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
    confirmar();
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