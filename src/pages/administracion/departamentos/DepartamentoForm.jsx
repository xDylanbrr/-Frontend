import { useState } from "react";
import { crearDepartamento } from "../../../services/administracion/departamentos.services";

function DepartamentoForm() {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      setLoading(true);
      await crearDepartamento({ nombre });
      setNombre("");
      alert("Departamento creado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al crear departamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Departamento</h2>

      <input
        type="text"
        placeholder="Nombre del departamento"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}

export default DepartamentoForm;