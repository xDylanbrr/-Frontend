// src/services/produccion/orden_pedido.service.js
const API_URL = 'http://localhost:3000/api/produccion/orden-pedido';

export const obtenerOrdenes = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al cargar las órdenes');
    return await respuesta.json();
  } catch (error) {
    console.error("Error en obtenerOrdenes:", error);
    throw error;
  }
};

export const crearOrden = async (datos) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data.error || data.errores?.join(', ') || 'Error al crear la orden'); 
  }
  return data;
};

export const eliminarOrden = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!respuesta.ok) throw new Error('Error al eliminar la orden');
  return true;
};