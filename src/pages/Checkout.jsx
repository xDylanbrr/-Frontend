import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [entrega, setEntrega] = useState('envio');
  const [loading, setLoading] = useState(false);
  const [datosCliente, setDatosCliente] = useState(null);

  // 1. Efecto para cargar los datos del cliente desde el Backend (Seguridad)
  useEffect(() => {
    const fetchPerfil = async () => {
      const token = localStorage.getItem('token'); // Asumiendo que guardas el JWT aquí
      if (!token) {
        navigate('/comprador-login');
        return;
      }

      try {
        // Ajusta esta URL a tu endpoint real de perfil de usuario/cliente
        const response = await fetch('http://localhost:3000/api/perfil', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
          const data = await response.json();
          setDatosCliente(data);
        } else {
          navigate('/comprador-login');
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

    fetchPerfil();
  }, [navigate]);

  const costoEnvio = entrega === 'envio' ? 150 : 0;
  const total = getCartTotal() + costoEnvio;
  const itbis = total * 0.18; 
  const subtotal = total - itbis;

  // 2. FUNCIÓN PARA GENERAR EL PDF (Independiente para limpieza)
  const generarPDF = (pedidoId, cliente, productos) => {
    const doc = new jsPDF();
    
    // Estilo de encabezado GTG
    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("GTG - FACTURA DE PEDIDO", 20, 25);
    doc.setFontSize(10);
    doc.text("EMPAQUE FLEXIBLE EFICIENTE", 20, 33);

    // Info del Pedido
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`NÚMERO DE ORDEN: #${pedidoId}`, 130, 55);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-DO')}`, 130, 62);

    // Info del Cliente (Usando nombres de tu Schema)
    doc.text("FACTURADO A:", 20, 55);
    doc.setFont("helvetica", "normal");
    doc.text(`${cliente.nombre}`, 20, 62);
    doc.text(`${cliente.correo || cliente.email}`, 20, 69);
    doc.text(`${cliente.telefono}`, 20, 76);
    if(entrega === 'envio') doc.text(`Destino: ${cliente.direccion}`, 20, 83);

    // Tabla de Productos
    let y = 100;
    doc.setFont("helvetica", "bold");
    doc.text("DESCRIPCIÓN", 20, y);
    doc.text("CANT.", 130, y);
    doc.text("TOTAL", 170, y);
    doc.line(20, y + 2, 190, y + 2);

    y += 10;
    doc.setFont("helvetica", "normal");
    productos.forEach((item) => {
      doc.text(`${item.title}`, 20, y);
      doc.text(`${item.cantidad}`, 135, y, { align: "center" });
      doc.text(`RD$ ${(item.price * item.cantidad).toLocaleString()}`, 190, y, { align: "right" });
      y += 8;
    });

    // Totales
    y += 10;
    doc.line(120, y, 190, y);
    y += 10;
    doc.text("Subtotal:", 120, y);
    doc.text(`RD$ ${subtotal.toLocaleString()}`, 190, y, { align: "right" });
    y += 8;
    doc.text("ITBIS (18%):", 120, y);
    doc.text(`RD$ ${itbis.toLocaleString()}`, 190, y, { align: "right" });
    y += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);
    doc.text("TOTAL:", 120, y);
    doc.text(`RD$ ${total.toLocaleString()}`, 190, y, { align: "right" });

    doc.save(`Pedido_GTG_ORD${pedidoId}.pdf`);
  };

  // 3. FUNCIÓN PRINCIPAL: GUARDA EN DB Y LUEGO DESCARGA
  const handleFinalizarCompra = async () => {
    if (!datosCliente) return;
    setLoading(true);

    // Preparamos el objeto para el DTO que acabamos de arreglar en el backend
    const dataParaBackend = {
      id_cliente: datosCliente.id_cliente,
      total: total,
      items: cart, // El service ahora maneja el map interno
      estado: "Pendiente"
    };

    try {
      const response = await fetch('http://localhost:3000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataParaBackend)
      });

      if (!response.ok) throw new Error("No se pudo guardar el pedido en el servidor");

      const pedidoCreado = await response.json();

      // Si se guardó bien en Postgres, generamos el PDF
      generarPDF(pedidoCreado.id_pedido_cliente, datosCliente, cart);

      alert("¡Pedido realizado con éxito!");
      clearCart();
      localStorage.removeItem('datosEnvio');
      navigate('/');

    } catch (error) {
      console.error(error);
      alert("Error crítico: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!datosCliente) return <div className="text-center py-20 font-black text-slate-400">CARGANDO DATOS DEL CLIENTE...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: DATOS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">verified_user</span>
              Confirmación de Pedido
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase">Cliente</p>
                <p className="font-bold text-slate-700">{datosCliente.nombre}</p>
                <p className="text-sm text-slate-500">{datosCliente.correo || datosCliente.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase">Teléfono de contacto</p>
                <p className="font-bold text-slate-700">{datosCliente.telefono}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50">
              <p className="text-sm font-bold text-slate-600 mb-4">Seleccione método de entrega:</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setEntrega('envio')}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all ${entrega === 'envio' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}
                >
                  Envío (RD$150)
                </button>
                <button 
                  onClick={() => setEntrega('retiro')}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all ${entrega === 'retiro' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}
                >
                  Retiro en Planta
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">¿Todo listo?</h3>
                <p className="text-blue-200 text-sm mb-6">Al confirmar, se notificará al departamento de producción de GTG.</p>
                <button 
                  onClick={handleFinalizarCompra}
                  disabled={loading || cart.length === 0}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${loading ? 'bg-slate-700 cursor-not-allowed' : 'bg-white text-blue-900 hover:scale-[1.02] active:scale-95'}`}
                >
                  {loading ? 'REGISTRANDO EN SISTEMA...' : 'CONFIRMAR Y PAGAR'}
                </button>
             </div>
             {/* Decoración geométrica de fondo */}
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-800 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESUMEN */}
        <div className="lg:col-span-1">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-8">
            <h3 className="text-xl font-bold mb-8 border-b border-slate-800 pb-4">Resumen</h3>
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div key={item.instanceId} className="flex justify-between items-center">
                  <div className="text-sm">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-[10px] text-slate-400">Cantidad: {item.cantidad}</p>
                  </div>
                  <span className="font-bold text-blue-400">RD${(item.price * item.cantidad).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-slate-800 pt-6">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal base</span>
                <span>RD${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>ITBIS (18%)</span>
                <span>RD${itbis.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-white pt-4">
                <span>TOTAL</span>
                <span className="text-blue-500">RD${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}