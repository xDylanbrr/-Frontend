// src/services/produccion/produccion_pedido.service.js
const API_URL = 'https://backend-m3nj.onrender.com/api/produccion/proceso';

export const obtenerProcesos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al cargar los procesos de producción');
    return await respuesta.json();
  } catch (error) {
    console.error("Error en obtenerProcesos:", error);
    throw error;
  }
};

export const crearProceso = async (datos) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al iniciar el proceso de producción'); 
  }
  return data;
};

export const completarProceso = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado: "Completado" }), // El backend llenará la fecha_fin automática
  });
  
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al completar el proceso'); 
  }
  return data;
};