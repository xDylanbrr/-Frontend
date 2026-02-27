import React from 'react';

export default function FacturaPrint({ factura, onVolver }) {
  // Función nativa del navegador para abrir la ventana de impresión
  const handlePrint = () => {
    window.print();
  };

  if (!factura) return null;

  return (
    <div className="bg-gray-200 min-h-screen py-10 font-sans print:bg-white print:py-0">
      
      {/* BOTONES DE ACCIÓN (Se ocultan automáticamente al imprimir gracias a print:hidden) */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <button 
          onClick={onVolver} 
          className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
        >
          <span className="material-symbols-outlined">arrow_back</span> Volver a la lista
        </button>
        <button 
          onClick={handlePrint}
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
        >
          <span className="material-symbols-outlined">print</span> Imprimir / PDF
        </button>
      </div>

      {/* DOCUMENTO FÍSICO (Hoja 8.5 x 11) */}
      <div className="max-w-3xl mx-auto bg-white p-12 shadow-2xl print:shadow-none print:p-0">
        
        {/* ENCABEZADO DE LA EMPRESA */}
        <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-black text-blue-600 tracking-tighter">FACTURA</h1>
            <p className="text-slate-500 mt-2 font-bold">GTG Empaque Flexible</p>
            <p className="text-slate-500 text-sm">RNC: 130-XXXXX-X</p>
            <p className="text-slate-500 text-sm">República Dominicana</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">No. Documento</p>
            <p className="text-xl font-mono font-bold text-slate-800">
              {factura.numero_factura || `FAC-${factura.id_factura}`}
            </p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-4 mb-1">Fecha de Emisión</p>
            <p className="font-medium text-slate-800">
              {new Date(factura.fecha).toLocaleDateString('es-DO')}
            </p>
          </div>
        </div>

        {/* DATOS DEL CLIENTE */}
        <div className="mb-8 flex gap-8">
          <div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Facturado a:</p>
            <p className="font-bold text-slate-800 text-lg">
              {factura.cliente_nombre || `Cliente Pedido #${factura.id_pedido_cliente}`}
            </p>
            {factura.rnc_cliente && (
              <p className="text-slate-500 text-sm mt-1">RNC/Cédula: {factura.rnc_cliente}</p>
            )}
          </div>
          <div className="w-1/3 bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col justify-center items-center text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estado</p>
            <p className={`font-black uppercase tracking-widest ${
              factura.estado === 'pagada' ? 'text-green-600' : 
              factura.estado === 'anulada' ? 'text-red-600' : 'text-amber-500'
            }`}>
              {factura.estado || 'PENDIENTE'}
            </p>
          </div>
        </div>

        {/* DESGLOSE DE TOTALES */}
        <div className="mt-12 flex justify-end border-t-2 border-slate-100 pt-8">
          <div className="w-1/2 space-y-3">
            <div className="flex justify-between text-sm text-slate-600">
              <span className="font-bold">Subtotal Base</span>
              <span>RD${Number(factura.monto_base).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span className="font-bold">ITBIS (18%)</span>
              <span>RD${Number(factura.monto_itbis).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between border-t-2 border-slate-800 pt-3 mt-3">
              <span className="font-black uppercase tracking-widest text-slate-800">Total General</span>
              <span className="font-black text-2xl text-blue-600">
                RD${Number(factura.monto_total).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            </div>
          </div>
        </div>

        {/* PIE DE PÁGINA */}
        <div className="mt-20 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          <p className="font-bold">Gracias por confiar en GTG.</p>
          <p>Documento generado por el sistema administrativo.</p>
        </div>

      </div>
    </div>
  );
}