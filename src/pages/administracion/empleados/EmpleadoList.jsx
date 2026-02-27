import { useState } from "react";

function EmpleadoList({ empleados, onEliminar, onEditar }) {
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState({ campo: "id_empleado", asc: true });

  // Filtrar por búsqueda
  const empleadosFiltrados = empleados
    .filter((e) =>
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.apellido?.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.departamento?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => {
      const campoA = a[orden.campo] || "";
      const campoB = b[orden.campo] || "";
      if (campoA < campoB) return orden.asc ? -1 : 1;
      if (campoA > campoB) return orden.asc ? 1 : -1;
      return 0;
    });

  const cambiarOrden = (campo) => {
    setOrden({ campo, asc: orden.campo === campo ? !orden.asc : true });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o departamento"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border p-2 rounded mb-3 w-full"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-100 cursor-pointer">
            <tr>
              {["ID","Nombre","Apellido","Cédula","Teléfono","Correo","Puesto","Fecha Contratación","Departamento","Acciones"].map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  onClick={() => col !== "Acciones" && cambiarOrden(col.toLowerCase().replace(" ", "_"))}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {empleadosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500 text-sm">
                  No hay empleados
                </td>
              </tr>
            ) : (
              empleadosFiltrados.map((e) => (
                <tr key={e.id_empleado} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 text-sm text-gray-700">{e.id_empleado}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">{e.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{e.apellido || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{e.cedula || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{e.telefono || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{e.correo || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{e.puesto || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {e.fecha_contratacion ? new Date(e.fecha_contratacion).toISOString().split("T")[0] : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{e.departamento?.nombre || "Sin asignar"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 flex gap-2">
                    <button
                      onClick={() => onEditar(e)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onEliminar(e.id_empleado)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmpleadoList;