import React, { useState } from 'react';
import FacturaList from './FacturaList';
import FacturaForm from './FacturaForm';
import FacturaPrint from './FacturaPrint'; // Importamos el nuevo archivo

export default function FacturaPage() {
  const [vistaActual, setVistaActual] = useState('list'); // Puede ser 'list', 'form' o 'print'
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

  const irANuevaFactura = () => {
    setFacturaSeleccionada(null);
    setVistaActual('form');
  };

  const verDetalleFactura = (factura) => {
    setFacturaSeleccionada(factura);
    setVistaActual('print');
  };

  const volverALista = () => {
    setVistaActual('list');
    setFacturaSeleccionada(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Controlador Inteligente de Vistas */}
        {vistaActual === 'list' && (
          <FacturaList 
            onNuevaFactura={irANuevaFactura} 
            onVerDetalle={verDetalleFactura} 
          />
        )}
        
        {vistaActual === 'form' && (
          <FacturaForm onVolver={volverALista} />
        )}

        {vistaActual === 'print' && (
          <FacturaPrint factura={facturaSeleccionada} onVolver={volverALista} />
        )}

      </div>
    </div>
  );
}