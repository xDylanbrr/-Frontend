import { useEffect, useState } from "react";
import {
  obtenerDepartamentos,
  eliminarDepartamento
} from "../../../services/administracion/departamentos.services.js";

function DepartamentoList() {
  const [departamentos, setDepartamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDepartamentos = async () => {
    try {
      const data = await obtenerDepartamentos();
      setDepartamentos(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar departamentos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDepartamentos();
  }, []);

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este departamento?")) return;

    try {
      await eliminarDepartamento(id);
      cargarDepartamentos();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  if (loading) return <p>Cargando departamentos...</p>;

  return (
    <div>
      <h2>Lista de Departamentos</h2>

      <ul>
        {departamentos.map((dep) => (
          <li key={dep.id_departamento}>
            {dep.nombre}
            <button onClick={() => handleEliminar(dep.id_departamento)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DepartamentoList;