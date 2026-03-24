// src/services/logistica/despacho.service.js
// ✅ URL Corregida para que coincida con el backend
const API_URL = 'http://localhost:3000/api/logistica/despacho'; 

export const obtenerDespachos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) throw new Error('Error al cargar los despachos');
    return await respuesta.json();
  } catch (error) {
    console.error("Error en obtenerDespachos:", error);
    throw error;
  }
};

export const crearDespacho = async (datos) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data.error || 'Error al crear el despacho'); 
  }
  return data;
};

export const eliminarDespacho = async (id) => {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!respuesta.ok) throw new Error('Error al eliminar el despacho');
  return true;
};