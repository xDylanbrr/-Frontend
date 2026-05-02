import API_BASE_URL from '../../apiConfig';
const API_URL = `${API_BASE_URL}/produccion/proceso`;

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
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || 'Error al iniciar el proceso de producción');
    return data;
  } catch (error) {
    console.error("Error en crearProceso:", error);
    throw error;
  }
};

export const completarProceso = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: "Completado" }),
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || 'Error al completar el proceso');
    return data;
  } catch (error) {
    console.error("Error en completarProceso:", error);
    throw error;
  }
};