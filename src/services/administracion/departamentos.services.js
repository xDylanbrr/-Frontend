import api from "../api";

// Obtener todos los departamentos
export const obtenerDepartamentos = async () => {
  const response = await api.get("/administracion/departamentos");
  return response.data;
};

// Crear departamento
export const crearDepartamento = async (data) => {
  const response = await api.post("/administracion/departamentos", data);
  return response.data;
};

// Eliminar departamento
export const eliminarDepartamento = async (id) => {
  const response = await api.delete(`/administracion/departamentos/${id}`);
  return response.data;
};