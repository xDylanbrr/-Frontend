import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { CheckCircle, Package, Mail, User, MapPin, Truck, ShoppingBag, FileText } from 'lucide-react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .ck-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f4f8;
    min-height: 100vh;
  }

  /* HERO */
  .ck-hero {
    background: #1B3A5C;
    padding: 36px 40px 44px;
    position: relative; overflow: hidden;
  }
  .ck-hero::before {
    content: ''; position: absolute;
    top: -70px; right: -70px;
    width: 240px; height: 240px; border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }
  .ck-hero::after {
    content: ''; position: absolute;
    bottom: -50px; left: -50px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(230,57,70,0.08);
  }
  .ck-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 5px 14px; border-radius: 20px;
    font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.45);
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px;
  }
  .ck-hero-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
    animation: ckPulse 2s ease infinite;
  }
  @keyframes ckPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .ck-hero-title {
    font-size: 34px; font-weight: 800; color: white;
    letter-spacing: -0.5px; line-height: 1.1;
    position: relative; z-index: 1;
  }
  .ck-hero-title span { color: #E63946; }
  .ck-hero-sub {
    font-size: 13px; color: rgba(255,255,255,0.4);
    font-weight: 400; margin-top: 8px;
    position: relative; z-index: 1;
  }

  /* MAIN */
  .ck-main {
    max-width: 1060px; margin: 0 auto;
    padding: 40px 40px 72px;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
    align-items: start;
  }

  /* CARD */
  .ck-card {
    background: white;
    border-radius: 24px;
    border: 1px solid rgba(27,58,92,0.06);
    box-shadow: 0 4px 20px rgba(27,58,92,0.06);
    overflow: hidden;
    margin-bottom: 16px;
  }
  .ck-card:last-child { margin-bottom: 0; }

  .ck-card-header {
    padding: 20px 26px;
    border-bottom: 1px solid #f1f5f9;
    display: flex; align-items: center; gap: 10px;
  }
  .ck-card-icon {
    width: 34px; height: 34px; border-radius: 10px;
    background: #f0f4f8; border: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: center;
    color: #1B3A5C; flex-shrink: 0;
  }
  .ck-card-title {
    font-size: 15px; font-weight: 800; color: #111827;
    letter-spacing: -0.2px;
  }

  .ck-card-body { padding: 24px 26px; }

  /* CLIENT INFO */
  .ck-info-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .ck-info-label {
    font-size: 10px; font-weight: 800; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 5px; display: block;
  }
  .ck-info-val {
    font-size: 14px; font-weight: 600; color: #111827;
  }

  /* DELIVERY */
  .ck-delivery-opts {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  }
  .ck-delivery-opt {
    padding: 16px; border-radius: 14px;
    border: 1.5px solid #e2e8f0; background: #f8fafc;
    cursor: pointer; transition: all 0.15s; text-align: left;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .ck-delivery-opt:hover { border-color: #1B3A5C; }
  .ck-delivery-opt.active {
    border-color: #1B3A5C; background: #eff6ff;
    box-shadow: 0 0 0 3px rgba(27,58,92,0.08);
  }
  .ck-delivery-opt-icon {
    width: 32px; height: 32px; border-radius: 9px;
    background: #e0e7ff; display: flex;
    align-items: center; justify-content: center;
    color: #1B3A5C; margin-bottom: 10px;
  }
  .ck-delivery-opt.active .ck-delivery-opt-icon {
    background: #1B3A5C; color: white;
  }
  .ck-delivery-opt-label {
    font-size: 13px; font-weight: 700; color: #111827;
    display: block; margin-bottom: 2px;
  }
  .ck-delivery-opt-sub {
    font-size: 11px; color: #94a3b8; font-weight: 500;
  }

  /* CONFIRM BTN */
  .ck-confirm-card {
    background: #1B3A5C;
    border-radius: 20px; padding: 28px 28px 24px;
    position: relative; overflow: hidden;
    margin-bottom: 0;
    border: none; box-shadow: 0 8px 32px rgba(27,58,92,0.25);
  }
  .ck-confirm-card::before {
    content: ''; position: absolute;
    top: -40px; right: -40px;
    width: 120px; height: 120px; border-radius: 50%;
    background: rgba(230,57,70,0.12);
  }
  .ck-confirm-note {
    font-size: 12px; color: rgba(255,255,255,0.4);
    font-weight: 500; margin-bottom: 16px;
    display: flex; align-items: center; gap: 6px;
    position: relative; z-index: 1;
  }
  .ck-confirm-btn {
    width: 100%; padding: 16px;
    background: #E63946; color: white;
    border: none; border-radius: 14px;
    font-size: 15px; font-weight: 800;
    cursor: pointer; transition: all 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 6px 20px rgba(230,57,70,0.35);
    position: relative; z-index: 1;
  }
  .ck-confirm-btn:hover:not(:disabled) { background: #c1121f; transform: translateY(-1px); }
  .ck-confirm-btn:disabled { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.4); cursor: not-allowed; box-shadow: none; }

  .ck-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white; border-radius: 50%;
    animation: ckSpin 0.7s linear infinite;
  }
  @keyframes ckSpin { to { transform: rotate(360deg); } }

  /* ORDER SUMMARY */
  .ck-summary {
    background: white;
    border-radius: 24px;
    border: 1px solid rgba(27,58,92,0.06);
    box-shadow: 0 4px 20px rgba(27,58,92,0.06);
    overflow: hidden;
    position: sticky; top: 24px;
  }
  .ck-summary-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f1f5f9;
    display: flex; align-items: center; gap: 10px;
  }
  .ck-summary-items { padding: 8px 0; }
  .ck-summary-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 24px;
    border-bottom: 1px solid #f8fafc;
    transition: background 0.15s;
  }
  .ck-summary-item:last-child { border-bottom: none; }
  .ck-summary-item:hover { background: #fafbfc; }
  .ck-summary-item-img {
    width: 44px; height: 44px; border-radius: 10px;
    background: #f0f4f8; border: 1px solid #e2e8f0;
    overflow: hidden; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .ck-summary-item-img img { width: 100%; height: 100%; object-fit: cover; }
  .ck-summary-item-info { flex: 1; min-width: 0; }
  .ck-summary-item-name {
    font-size: 12px; font-weight: 700; color: #111827;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .ck-summary-item-qty {
    font-size: 10px; color: #94a3b8; font-weight: 600; margin-top: 2px;
  }
  .ck-summary-item-price {
    font-size: 13px; font-weight: 800; color: #1B3A5C; flex-shrink: 0;
  }

  .ck-totals { padding: 16px 24px; border-top: 1px solid #f1f5f9; }
  .ck-total-row {
    display: flex; justify-content: space-between;
    font-size: 12px; color: #64748b; font-weight: 500;
    margin-bottom: 8px;
  }
  .ck-grand-row {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 12px; border-top: 1px solid #f1f5f9; margin-top: 4px;
  }
  .ck-grand-label { font-size: 15px; font-weight: 800; color: #111827; }
  .ck-grand-val { font-size: 22px; font-weight: 800; color: #1B3A5C; }

  /* SUCCESS */
  .ck-success {
    min-height: 100vh; background: #f0f4f8;
    display: flex; align-items: center; justify-content: center;
    padding: 40px;
  }
  .ck-success-card {
    background: white; border-radius: 28px; padding: 56px 48px;
    text-align: center; max-width: 440px; width: 100%;
    box-shadow: 0 8px 40px rgba(27,58,92,0.10);
    border: 1px solid rgba(27,58,92,0.06);
    animation: ckFadeUp 0.5s ease both;
  }
  @keyframes ckFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ck-success-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: #dcfce7; border: 1px solid #bbf7d0;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px; color: #16a34a;
  }
  .ck-success-title {
    font-size: 26px; font-weight: 800; color: #111827;
    letter-spacing: -0.5px; margin-bottom: 10px;
  }
  .ck-success-sub {
    font-size: 14px; color: #64748b; font-weight: 400;
    line-height: 1.6; margin-bottom: 28px;
  }

  /* LOADING */
  .ck-loading {
    min-height: 100vh; background: #f0f4f8;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; font-weight: 600; color: #94a3b8;
  }

  @media (max-width: 860px) {
    .ck-main { grid-template-columns: 1fr; padding: 24px 20px 60px; }
    .ck-hero { padding: 28px 20px 36px; }
    .ck-hero-title { font-size: 26px; }
    .ck-summary { position: static; }
    .ck-info-grid { grid-template-columns: 1fr; }
    .ck-delivery-opts { grid-template-columns: 1fr; }
  }
`;

export default function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [entrega, setEntrega] = useState('envio');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [datosCliente, setDatosCliente] = useState(null);

  useEffect(() => {
    const compradorSession = localStorage.getItem('comprador');
    const token = localStorage.getItem('token');
    if (!compradorSession || !token) { navigate('/comprador-login'); return; }
    try {
      const u = JSON.parse(compradorSession);
      setDatosCliente({
        id_cliente: u.id_cliente || u.id || u.id_usuario,
        nombre:     String(u.nombre || ""),
        apellidos:  String(u.apellido || ""),
        correo:     String(u.correo || u.email || ""),
        telefono:   String(u.telefono || "N/A"),
        direccion:  String(u.direccion || "Dirección no especificada"),
        ciudad:     String(u.ciudad || "")
      });
    } catch { navigate('/comprador-login'); }
  }, [navigate]);

  const costoEnvio = entrega === 'envio' ? 150 : 0;
  const total      = getCartTotal() + costoEnvio;
  const itbis      = total * 0.18;
  const subtotal   = total - itbis;

  const generarPDF = (pedidoId, cliente, productos) => {
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    doc.setFillColor(27, 58, 92);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("GTG — FACTURA DE PEDIDO", 20, 26);
    doc.setTextColor(27, 58, 92);
    doc.setFontSize(11);
    doc.text(`ORDEN: #${pedidoId}`, 130, 55);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-DO')}`, 130, 62);
    doc.text("CLIENTE:", 20, 55);
    doc.text(`${cliente.nombre} ${cliente.apellidos}`, 20, 62);
    doc.text(`${cliente.correo}`, 20, 69);
    let y = 100;
    productos.forEach((item) => {
      doc.text(`${item.title} x${item.cantidad}`, 20, y);
      doc.text(`RD$ ${(item.price * item.cantidad).toLocaleString()}`, 190, y, { align: "right" });
      y += 8;
    });
    doc.setFontSize(14);
    doc.text(`TOTAL: RD$ ${total.toLocaleString()}`, 190, y + 15, { align: "right" });
    doc.save(`Factura_GTG_${pedidoId}.pdf`);
  };

  const handleFinalizarCompra = async () => {
    if (!datosCliente) return;
    const idFinal = parseInt(datosCliente.id_cliente);
    if (!idFinal || isNaN(idFinal)) {
      alert("❌ No se detectó tu ID de cliente. Cierra sesión e intenta de nuevo.");
      return;
    }
    setLoading(true);
    try {
      // ✅ CAMBIO: Usamos la variable de entorno de Vite para la URL de Render
      const baseUrl = import.meta.env.VITE_API_URL || 'https://backend-m3nj.onrender.com';

      const response = await fetch(`${baseUrl}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id_cliente: idFinal, 
          total, 
          items: cart, 
          estado: "Pendiente" 
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || result.message || "Error en el servidor");
      
      generarPDF(result.id_pedido_cliente || result.id, datosCliente, cart);
      setSuccess(true);
      setTimeout(() => { clearCart(); localStorage.removeItem('datosEnvio'); navigate('/'); }, 3500);
    } catch (error) {
      alert("Error: " + error.message);
      setLoading(false);
    }
  };

  if (!datosCliente) return (
    <div className="ck-loading">
      <style>{css}</style>
      Cargando sesión...
    </div>
  );

  if (success) return (
    <>
      <style>{css}</style>
      <div className="ck-success">
        <div className="ck-success-card">
          <div className="ck-success-icon">
            <CheckCircle size={36} />
          </div>
          <div className="ck-success-title">¡Pedido Recibido!</div>
          <p className="ck-success-sub">
            Tu factura se está descargando. Serás redirigido al inicio en unos momentos.
          </p>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '3px solid #e2e8f0', borderTopColor: '#1B3A5C',
            animation: 'ckSpin 0.7s linear infinite', margin: '0 auto'
          }} />
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{css}</style>
      <div className="ck-root">

        {/* HERO */}
        <div className="ck-hero">
          <div className="ck-hero-eyebrow">
            <div className="ck-hero-dot" />
            Paso final
          </div>
          <h1 className="ck-hero-title">Confirmar <span>Pedido</span></h1>
          <p className="ck-hero-sub">Revisa tu información y finaliza tu compra.</p>
        </div>

        <div className="ck-main">

          {/* LEFT COLUMN */}
          <div>

            {/* DATOS DEL CLIENTE */}
            <div className="ck-card">
              <div className="ck-card-header">
                <div className="ck-card-icon"><User size={16} /></div>
                <span className="ck-card-title">Datos del Cliente</span>
              </div>
              <div className="ck-card-body">
                <div className="ck-info-grid">
                  <div className="ck-info-item">
                    <span className="ck-info-label">Nombre</span>
                    <span className="ck-info-val">{datosCliente.nombre} {datosCliente.apellidos}</span>
                  </div>
                  <div className="ck-info-item">
                    <span className="ck-info-label">Correo</span>
                    <span className="ck-info-val">{datosCliente.correo}</span>
                  </div>
                  <div className="ck-info-item">
                    <span className="ck-info-label">Teléfono</span>
                    <span className="ck-info-val">{datosCliente.telefono}</span>
                  </div>
                  <div className="ck-info-item">
                    <span className="ck-info-label">Ciudad</span>
                    <span className="ck-info-val">{datosCliente.ciudad || '—'}</span>
                  </div>
                  <div className="ck-info-item" style={{ gridColumn: '1 / -1' }}>
                    <span className="ck-info-label">Dirección</span>
                    <span className="ck-info-val">{datosCliente.direccion}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MÉTODO DE ENTREGA */}
            <div className="ck-card">
              <div className="ck-card-header">
                <div className="ck-card-icon"><Truck size={16} /></div>
                <span className="ck-card-title">Método de Entrega</span>
              </div>
              <div className="ck-card-body">
                <div className="ck-delivery-opts">
                  <button
                    className={`ck-delivery-opt${entrega === 'envio' ? ' active' : ''}`}
                    onClick={() => setEntrega('envio')}
                  >
                    <div className="ck-delivery-opt-icon"><Truck size={16} /></div>
                    <span className="ck-delivery-opt-label">Envío a domicilio</span>
                    <span className="ck-delivery-opt-sub">RD$150 · 2-4 días hábiles</span>
                  </button>
                  <button
                    className={`ck-delivery-opt${entrega === 'recogida' ? ' active' : ''}`}
                    onClick={() => setEntrega('recogida')}
                  >
                    <div className="ck-delivery-opt-icon"><MapPin size={16} /></div>
                    <span className="ck-delivery-opt-label">Recogida en planta</span>
                    <span className="ck-delivery-opt-sub">Gratis · Horario de oficina</span>
                  </button>
                </div>
              </div>
            </div>

            {/* CONFIRMAR */}
            <div className="ck-confirm-card">
              <div className="ck-confirm-note">
                <FileText size={12} /> Se generará una factura PDF automáticamente
              </div>
              <button
                onClick={handleFinalizarCompra}
                disabled={loading || cart.length === 0}
                className="ck-confirm-btn"
              >
                {loading
                  ? <><div className="ck-spinner" /> Procesando pedido...</>
                  : <><ShoppingBag size={16} /> Confirmar Pedido</>
                }
              </button>
            </div>

          </div>

          {/* RIGHT: RESUMEN */}
          <div className="ck-summary">
            <div className="ck-summary-header">
              <div className="ck-card-icon"><ShoppingBag size={16} /></div>
              <span className="ck-card-title">Tu Orden ({cart.length})</span>
            </div>

            <div className="ck-summary-items">
              {cart.map((item) => (
                <div key={item.instanceId} className="ck-summary-item">
                  <div className="ck-summary-item-img">
                    {item.img || item.image
                      ? <img src={item.img || item.image} alt={item.title} />
                      : <Package size={20} color="#cbd5e1" strokeWidth={1.5} />
                    }
                  </div>
                  <div className="ck-summary-item-info">
                    <div className="ck-summary-item-name">{item.title}</div>
                    <div className="ck-summary-item-qty">x{item.cantidad}</div>
                  </div>
                  <div className="ck-summary-item-price">
                    RD${(item.price * item.cantidad).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="ck-totals">
              <div className="ck-total-row">
                <span>Subtotal (sin ITBIS)</span>
                <span>RD${subtotal.toLocaleString('es-DO', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="ck-total-row">
                <span>ITBIS (18%)</span>
                <span>RD${itbis.toLocaleString('es-DO', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="ck-total-row">
                <span>Envío</span>
                <span>{costoEnvio === 0 ? 'Gratis' : `RD$${costoEnvio}`}</span>
              </div>
              <div className="ck-grand-row">
                <span className="ck-grand-label">Total</span>
                <span className="ck-grand-val">RD${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}