import React, { useState } from 'react';
import EmpaquePage from './empaque/EmpaquePage';
import TransportePage from './transporte/TransportePage';
import { Package, Truck } from 'lucide-react';

const LogisticaPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('logistica_active_tab') || 'empaque';
  });

  // Persistir pestaña activa
  React.useEffect(() => {
    localStorage.setItem('logistica_active_tab', activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Unificado */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Centro de Logística y Despacho</h1>
              <p className="text-gray-500 mt-1">Gestión centralizada de salida de mercancía.</p>
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
              <button 
                onClick={() => setActiveTab('empaque')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
                  activeTab === 'empaque' 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Package size={18} />
                Empaque
              </button>
              <button 
                onClick={() => setActiveTab('transporte')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
                  activeTab === 'transporte' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Truck size={18} />
                Transporte y Despacho
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Dinámico */}
      <div className="container mx-auto">
        {activeTab === 'empaque' ? <EmpaquePage /> : <TransportePage />}
      </div>
    </div>
  );
};

export default LogisticaPage;
