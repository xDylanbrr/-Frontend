// src/services/produccion/pedido_terminado.service.js
const API_URL = 'http://localhost:3000/api/produccion/terminado';

export const obtenerPedidosTerminados = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al cargar los pedidos terminados');
    return await respuesta.json();
  } catch (error) {
    console.error("Error en obtenerPedidosTerminados:", error);
    throw error;
  }
};

export const crearPedidoTerminado = async (datos) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });
    
    const data = await respuesta.json();
    if (!respuesta.ok) {
      // Si el backend devuelve array de errores del DTO, los unimos
      throw new Error(data.errores ? data.errores.join(', ') : data.error || 'Error al registrar'); 
    }
    return data;
  } catch (error) {
    throw error;
  }
};