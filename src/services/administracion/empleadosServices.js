import api from "../api";

// Obtener todos los empleados
export const obtenerEmpleados = async () => {
  const res = await api.get("/administracion/empleados");
  return res.data.data;
};

export const crearEmpleado = async (data) => {
  const res = await api.post("/administracion/empleados", data);
  return res.data.data;
};

export const actualizarEmpleado = async (id, data) => {
  const res = await api.put(`/administracion/empleados/${id}`, data);
  return res.data.data;
};

export const eliminarEmpleado = async (id) => {
  const res = await api.delete(`/administracion/empleados/${id}`);
  return res.data;
};