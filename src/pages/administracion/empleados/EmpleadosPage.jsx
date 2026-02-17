import { useEffect, useState } from "react";
import { obtenerEmpleados, crearEmpleado } from "../../../services/administracion/empleados.service";

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [nombre, setNombre] = useState("");
  const [departamentoId, setDepartamentoId] = useState("");

  const cargarEmpleados = async () => {
    const data = await obtenerEmpleados();
    setEmpleados(data);
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await crearEmpleado({
      nombre,
      departamento_id: departamentoId
    });

    setNombre("");
    setDepartamentoId("");
    cargarEmpleados();
  };

  return (
    <div>
      <h2>Empleados</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          placeholder="ID Departamento"
          value={departamentoId}
          onChange={(e) => setDepartamentoId(e.target.value)}
          required
        />

        <button type="submit">Crear</button>
      </form>

      <hr />

      <ul>
        {empleados.map((e) => (
          <li key={e.id_empleado}>
            {e.nombre} — {e.departamento?.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmpleadosPage;