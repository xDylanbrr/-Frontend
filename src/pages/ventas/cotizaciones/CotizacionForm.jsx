import { useState, useEffect } from "react";

function CotizacionForm({ cotizacion, alEnviar }) {
  const [form, setForm] = useState({
    id_cliente: 1,
    moneda: "DOP",
    peso_millar_caja: 0,
    costo_materia_bruta: 0,
    porcentaje_desperdicio: 0,
    costo_materia_liquida: 0,
    costo_embalaje: 0,
    precio_final: 0,
    margen_rentabilidad: 0,
    estado: "Pendiente"
  });

  const [error, setError] = useState("");
  const [procesando, setProcesando] = useState(false);

  // --- LÓGICA DE CÁLCULO (Mejorada para evitar bucles) ---
  useEffect(() => {
    const bruto = parseFloat(form.costo_materia_bruta) || 0;
    const desperdicio = parseFloat(form.porcentaje_desperdicio) || 0;
    const embalaje = parseFloat(form.costo_embalaje) || 0;
    const margen = parseFloat(form.margen_rentabilidad) || 0;

    const calculoLiquida = bruto + (bruto * (desperdicio / 100));
    const calculoFinal = calculoLiquida + embalaje + margen;

    // Solo actualizamos si los valores realmente cambiaron
    if (parseFloat(form.costo_materia_liquida) !== parseFloat(calculoLiquida.toFixed(2)) ||
        parseFloat(form.precio_final) !== parseFloat(calculoFinal.toFixed(2))) {
      setForm(prev => ({
        ...prev,
        costo_materia_liquida: calculoLiquida.toFixed(2),
        precio_final: calculoFinal.toFixed(2)
      }));
    }
  }, [form.costo_materia_bruta, form.porcentaje_desperdicio, form.costo_embalaje, form.margen_rentabilidad]);

  // Cargar datos al editar (Sincronización total)
  useEffect(() => {
    if (cotizacion) {
      setForm({ ...cotizacion });
    } else {
      setForm({
        id_cliente: 1, moneda: "DOP", peso_millar_caja: 0, costo_materia_bruta: 0,
        porcentaje_desperdicio: 0, costo_materia_liquida: 0, costo_embalaje: 0,
        precio_final: 0, margen_rentabilidad: 0, estado: "Pendiente"
      });
    }
  }, [cotizacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.id_cliente || form.id_cliente <= 0) return setError("ID de cliente inválido");

    setProcesando(true);
    try {
      // LIMPIEZA DE DATOS: Aseguramos que todo vaya como NÚMERO al backend
      const datosFinales = {
        ...form,
        id_cliente: parseInt(form.id_cliente),
        peso_millar_caja: parseFloat(form.peso_millar_caja) || 0,
        costo_materia_bruta: parseFloat(form.costo_materia_bruta) || 0,
        porcentaje_desperdicio: parseFloat(form.porcentaje_desperdicio) || 0,
        costo_materia_liquida: parseFloat(form.costo_materia_liquida) || 0,
        costo_embalaje: parseFloat(form.costo_embalaje) || 0,
        precio_final: parseFloat(form.precio_final) || 0,
        margen_rentabilidad: parseFloat(form.margen_rentabilidad) || 0
      };

      await alEnviar(datosFinales);
    } catch (err) {
      setError("Error al guardar. Revisa la conexión.");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4 border border-gray-100">
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-lg font-bold text-slate-800">
          {cotizacion ? "📦 Editando Registro" : "📝 Nueva Cotización"}
        </h3>
        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500 uppercase">
          {form.moneda}
        </span>
      </div>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs border border-red-200 font-medium">{error}</div>}

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div className="col-span-1">
          <label className="text-[10px] font-black text-gray-400 uppercase">ID Cliente</label>
          <input type="number" name="id_cliente" value={form.id_cliente} onChange={handleChange} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-1 transition-colors" />
        </div>

        <div className="col-span-1">
          <label className="text-[10px] font-black text-gray-400 uppercase">Moneda</label>
          <select name="moneda" value={form.moneda} onChange={handleChange} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-1 bg-transparent">
            <option value="DOP">DOP (RD$)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase">Costo Bruto</label>
          <input type="number" step="0.01" name="costo_materia_bruta" value={form.costo_materia_bruta} onChange={handleChange} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-1" />
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase">% Desperdicio</label>
          <input type="number" step="0.01" name="porcentaje_desperdicio" value={form.porcentaje_desperdicio} onChange={handleChange} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-1" />
        </div>

        <div className="col-span-2 bg-slate-50 p-2 rounded border-l-4 border-blue-500">
          <label className="text-[10px] font-bold text-blue-600 uppercase">Costo Líquido Calculado</label>
          <div className="text-sm font-mono font-bold text-slate-700">{form.costo_materia_liquida}</div>
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase">Embalaje</label>
          <input type="number" step="0.01" name="costo_embalaje" value={form.costo_embalaje} onChange={handleChange} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-1" />
        </div>

        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase">Margen</label>
          <input type="number" step="0.01" name="margen_rentabilidad" value={form.margen_rentabilidad} onChange={handleChange} className="w-full border-b-2 border-gray-200 focus:border-blue-500 outline-none py-1" />
        </div>
      </div>

      <div className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-xl shadow-md">
        <label className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Precio Final Sugerido</label>
        <div className="text-3xl font-black text-white">
          {form.moneda} {Number(form.precio_final).toLocaleString()}
        </div>
      </div>

      <button
        type="submit"
        disabled={procesando}
        className={`mt-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
          procesando 
            ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
            : "bg-slate-800 text-white hover:bg-slate-900 shadow-lg hover:shadow-blue-200 active:scale-95"
        }`}
      >
        {procesando ? "Procesando..." : cotizacion ? "Guardar Cambios" : "Crear Cotización"}
      </button>
    </form>
  );
}

export default CotizacionForm;