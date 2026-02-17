import api from "../api";

// Obtener todos los empleados
export const obtenerEmpleados = async () => {
  const res = await api.get("/administracion/empleados");
  return res.data.data;
};

// Crear empleado
export const crearEmpleado = async (data) => {
  const res = await api.post("/administracion/empleados", data);
  return res.data.data;
};