import { useEffect, useState } from "react";
import {
  obtenerCotizaciones,
  crearCotizacion,
  actualizarCotizacion,
  eliminarCotizacion
} from "../../../services/ventas/cotizacionesServices.js";
import CotizacionForm from "./CotizacionForm";
import CotizacionList from "./CotizacionList";

function CotizacionesPage() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [editarCotizacion, setEditarCotizacion] = useState(null);
  const [cargando, setCargando] = useState(false);

  // 1. Cargar datos
  const cargarCotizaciones = async () => {
    setCargando(true);
    try {
      const data = await obtenerCotizaciones();
      setCotizaciones(data);
    } catch (error) {
      console.error("Error al cargar:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCotizaciones();
  }, []);

  // 2. Crear (Sincronizado con Schema Prisma)
  const handleCrear = async (datos) => {
    try {
      // Los datos ya vienen listos y validados desde CotizacionForm
      await crearCotizacion(datos);
      await cargarCotizaciones(); // Recargar lista
      alert("¡Cotización guardada con éxito!");
    } catch (error) {
      alert("Error al crear: " + error.message);
    }
  };

  // 3. Actualizar
  const handleActualizar = async (id, datos) => {
    try {
      await actualizarCotizacion(id, datos);
      setEditarCotizacion(null); // Salir del modo edición
      await cargarCotizaciones();
      alert("¡Cotización actualizada!");
    } catch (error) {
      alert("Error al actualizar: " + error.message);
    }
  };

  // 4. Eliminar
  const handleEliminar = async (id) => {
    try {
      const res = await eliminarCotizacion(id);
      if (res.success || res) { 
        // Actualización optimista de la UI
        setCotizaciones(prev => prev.filter(c => c.id_cotizacion !== id));
      }
    } catch (error) {
      alert("No se pudo eliminar la cotización");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER CON INDICADOR DE CARGA */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Ventas y Cotizaciones
            </h1>
            <p className="text-slate-500 mt-1">Gestiona los presupuestos de tus clientes en tiempo real.</p>
          </div>
          {cargando && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-700">
                  {editarCotizacion ? "📝 Editando Registro" : "➕ Nueva Entrada"}
                </h2>
                {editarCotizacion && (
                  <button 
                    onClick={() => setEditarCotizacion(null)}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    CANCELAR
                  </button>
                )}
              </div>
              
              <CotizacionForm
                cotizacion={editarCotizacion}
                alEnviar={(datos) => {
                  if (editarCotizacion) {
                    handleActualizar(editarCotizacion.id_cotizacion, datos);
                  } else {
                    handleCrear(datos);
                  }
                }}
              />
            </div>
          </div>

          {/* COLUMNA DERECHA: LISTADO */}
          <div className="lg:col-span-8">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-700">Historial de Cotizaciones</h2>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                  {cotizaciones.length} registros
                </span>
              </div>
              
              <CotizacionList
                cotizaciones={cotizaciones}
                onEliminar={handleEliminar}
                onEditar={(c) => {
                  setEditarCotizacion(c);
                  window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir al formulario al editar
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CotizacionesPage;