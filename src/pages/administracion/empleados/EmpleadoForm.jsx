import { useState, useEffect } from "react";

function EmpleadoForm({ alEnviar, empleadoEditar, cancelarEditar }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    correo: "",
    puesto: "",
    fecha_contratacion: "",
    departamento_id: "",
  });

  const [error, setError] = useState("");

  // Si hay un empleado para editar, cargamos sus datos en el formulario
  useEffect(() => {
    if (empleadoEditar) {
      setForm({
        nombre: empleadoEditar.nombre || "",
        apellido: empleadoEditar.apellido || "",
        cedula: empleadoEditar.cedula || "",
        telefono: empleadoEditar.telefono || "",
        correo: empleadoEditar.correo || "",
        puesto: empleadoEditar.puesto || "",
        fecha_contratacion: empleadoEditar.fecha_contratacion
          ? empleadoEditar.fecha_contratacion.split("T")[0]
          : "",
        departamento_id: empleadoEditar.id_departamento || "",
      });
    }
  }, [empleadoEditar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.departamento_id) {
      setError("Nombre y Departamento son obligatorios");
      return;
    }

    setError("");

    alEnviar({ ...form, departamento_id: Number(form.departamento_id) });

    setForm({
      nombre: "",
      apellido: "",
      cedula: "",
      telefono: "",
      correo: "",
      puesto: "",
      fecha_contratacion: "",
      departamento_id: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>}

      <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" className="border p-2 rounded"/>
      <input type="text" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" className="border p-2 rounded"/>
      <input type="text" name="cedula" value={form.cedula} onChange={handleChange} placeholder="Cédula" className="border p-2 rounded"/>
      <input type="text" name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" className="border p-2 rounded"/>
      <input type="email" name="correo" value={form.correo} onChange={handleChange} placeholder="Correo" className="border p-2 rounded"/>
      <input type="text" name="puesto" value={form.puesto} onChange={handleChange} placeholder="Puesto" className="border p-2 rounded"/>
      <input type="date" name="fecha_contratacion" value={form.fecha_contratacion} onChange={handleChange} placeholder="Fecha Contratación" className="border p-2 rounded"/>
      <input type="number" name="departamento_id" value={form.departamento_id} onChange={handleChange} placeholder="ID Departamento" className="border p-2 rounded"/>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {empleadoEditar ? "Actualizar Empleado" : "Guardar Empleado"}
        </button>
        {empleadoEditar && (
          <button type="button" onClick={cancelarEditar} className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default EmpleadoForm;