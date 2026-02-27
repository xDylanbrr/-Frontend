import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  obtenerEmpleados,
  crearEmpleado,
  eliminarEmpleado,
  actualizarEmpleado
} from "../../../services/administracion/empleadosServices.js";
import EmpleadoForm from "./EmpleadoForm";
import EmpleadoList from "./EmpleadoList";

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [empleadoEditar, setEmpleadoEditar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [itemsPorPagina] = useState(5); // cantidad por página
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const cargarEmpleados = async () => {
    setLoading(true);
    try {
      const data = await obtenerEmpleados();
      setEmpleados(data);
    } catch (error) {
      toast.error("Error al cargar empleados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const handleCrear = async (nuevoEmpleado) => {
    try {
      if (empleadoEditar) {
        await actualizarEmpleado(empleadoEditar.id_empleado, nuevoEmpleado);
        toast.success("Empleado actualizado correctamente");
        setEmpleadoEditar(null);
      } else {
        await crearEmpleado(nuevoEmpleado);
        toast.success("Empleado creado correctamente");
      }
      cargarEmpleados();
    } catch (error) {
      toast.error("Error al guardar empleado");
    }
  };

  const handleEliminar = async (id_empleado) => {
    if (!window.confirm("¿Seguro quieres eliminar este empleado?")) return;

    try {
      await eliminarEmpleado(id_empleado);
      setEmpleados(empleados.filter(e => e.id_empleado !== id_empleado));
      toast.success("Empleado eliminado correctamente");
    } catch (error) {
      toast.error("Error eliminando empleado");
    }
  };

  const handleEditar = (empleado) => {
    setEmpleadoEditar(empleado);
  };

  const cancelarEditar = () => {
    setEmpleadoEditar(null);
  };

  // Paginación
  const totalPaginas = Math.ceil(empleados.length / itemsPorPagina);
  const empleadosPaginados = empleados.slice(
    (pagina - 1) * itemsPorPagina,
    pagina * itemsPorPagina
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Administración de Empleados
          </h1>
          <button
            onClick={cerrarSesion}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
          >
            Cerrar sesión
          </button>
        </div>

        {loading && <div className="text-center mb-4 text-gray-600">Cargando empleados...</div>}

        {/* GRID CONTENIDO */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* FORMULARIO */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {empleadoEditar ? "Editar Empleado" : "Registrar Empleado"}
            </h2>
            <EmpleadoForm alEnviar={handleCrear} empleadoEditar={empleadoEditar} cancelarEditar={cancelarEditar} />
          </div>

          {/* TABLA */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Lista de Empleados
            </h2>
            <EmpleadoList empleados={empleadosPaginados} onEliminar={handleEliminar} onEditar={handleEditar} />

            {/* Controles de paginación */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setPagina(pagina - 1)}
                disabled={pagina === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="px-3 py-1 text-gray-700">
                Página {pagina} de {totalPaginas || 1}
              </span>
              <button
                onClick={() => setPagina(pagina + 1)}
                disabled={pagina === totalPaginas}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpleadosPage;