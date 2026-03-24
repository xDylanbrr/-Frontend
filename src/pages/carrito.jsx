import React, { useState } from 'react';
import { useCart } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, MapPin, ArrowRight, Package, Lock } from 'lucide-react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .cart-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f4f8;
    min-height: 100vh;
  }

  /* HERO */
  .cart-hero {
    background: #1B3A5C;
    padding: 36px 40px 44px;
    position: relative; overflow: hidden;
  }
  .cart-hero::before {
    content: ''; position: absolute;
    top: -70px; right: -70px;
    width: 240px; height: 240px; border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }
  .cart-hero::after {
    content: ''; position: absolute;
    bottom: -50px; left: -50px;
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(230,57,70,0.08);
  }
  .cart-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 5px 14px; border-radius: 20px;
    font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.45);
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px;
  }
  .cart-hero-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
    animation: cartPulse 2s ease infinite;
  }
  @keyframes cartPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .cart-hero-title {
    font-size: 34px; font-weight: 800; color: white;
    letter-spacing: -0.5px; line-height: 1.1;
    position: relative; z-index: 1;
  }
  .cart-hero-title span { color: #E63946; }
  .cart-hero-sub {
    font-size: 13px; color: rgba(255,255,255,0.4);
    font-weight: 400; margin-top: 8px;
    position: relative; z-index: 1;
  }

  /* MAIN */
  .cart-main {
    max-width: 1160px; margin: 0 auto;
    padding: 40px 40px 72px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  /* CARD */
  .cart-card {
    background: white;
    border-radius: 24px;
    border: 1px solid rgba(27,58,92,0.06);
    box-shadow: 0 4px 20px rgba(27,58,92,0.06);
    overflow: hidden;
  }
  .cart-card-header {
    padding: 22px 26px;
    border-bottom: 1px solid #f1f5f9;
    display: flex; align-items: center; gap: 10px;
  }
  .cart-card-header-icon {
    width: 34px; height: 34px; border-radius: 10px;
    background: #f0f4f8; border: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: center;
    color: #1B3A5C;
  }
  .cart-card-header-title {
    font-size: 15px; font-weight: 800; color: #111827;
    letter-spacing: -0.2px;
  }

  /* CART ITEMS */
  .cart-items { padding: 8px 0; }
  .cart-item {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 26px;
    border-bottom: 1px solid #f8fafc;
    transition: background 0.15s;
  }
  .cart-item:last-child { border-bottom: none; }
  .cart-item:hover { background: #fafbfc; }

  .cart-item-img {
    width: 60px; height: 60px; border-radius: 12px;
    background: #f0f4f8; border: 1px solid #e2e8f0;
    overflow: hidden; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .cart-item-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.3s;
  }
  .cart-item:hover .cart-item-img img { transform: scale(1.08); }

  .cart-item-info { flex: 1; min-width: 0; }
  .cart-item-title {
    font-size: 14px; font-weight: 700; color: #111827;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-bottom: 3px;
  }
  .cart-item-format {
    font-size: 10px; font-weight: 700; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.08em;
  }
  .cart-item-price {
    font-size: 15px; font-weight: 800; color: #1B3A5C;
    white-space: nowrap;
  }

  .cart-item-controls {
    display: flex; flex-direction: column; align-items: flex-end; gap: 8px;
  }
  .cart-delete-btn {
    background: none; border: none; cursor: pointer;
    color: #cbd5e1; padding: 4px; border-radius: 8px;
    transition: color 0.15s, background 0.15s;
    display: flex; align-items: center;
  }
  .cart-delete-btn:hover { color: #ef4444; background: #fff5f5; }

  .cart-qty {
    display: flex; align-items: center;
    background: #f8fafc; border: 1.5px solid #e2e8f0;
    border-radius: 10px; overflow: hidden;
  }
  .cart-qty-btn {
    width: 30px; height: 30px; background: none; border: none;
    font-size: 16px; font-weight: 700; color: #94a3b8;
    cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .cart-qty-btn:hover { background: #1B3A5C; color: white; }
  .cart-qty-val {
    width: 32px; text-align: center;
    font-size: 13px; font-weight: 800; color: #111827;
  }

  /* EMPTY STATE */
  .cart-empty {
    padding: 56px 24px; text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 14px;
  }
  .cart-empty-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: #f0f4f8; border: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: center;
    color: #cbd5e1;
  }
  .cart-empty-text { font-size: 14px; color: #94a3b8; font-weight: 500; }
  .cart-empty-btn {
    background: #1B3A5C; color: white;
    padding: 10px 24px; border-radius: 12px;
    font-size: 13px; font-weight: 700; border: none;
    cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
    transition: background 0.2s;
  }
  .cart-empty-btn:hover { background: #15304d; }

  /* TOTALS */
  .cart-totals {
    padding: 20px 26px;
    border-top: 1px solid #f1f5f9;
    display: flex; flex-direction: column; gap: 10px;
  }
  .cart-total-row {
    display: flex; justify-content: space-between; align-items: center;
  }
  .cart-total-label { font-size: 13px; color: #64748b; font-weight: 500; }
  .cart-total-val { font-size: 13px; color: #475569; font-weight: 600; }
  .cart-grand-row {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 12px; border-top: 1px solid #f1f5f9; margin-top: 4px;
  }
  .cart-grand-label { font-size: 16px; font-weight: 800; color: #111827; }
  .cart-grand-val { font-size: 24px; font-weight: 800; color: #1B3A5C; }

  /* FORM */
  .cart-form { padding: 20px 26px; display: flex; flex-direction: column; gap: 14px; }

  .cart-field-label {
    font-size: 10px; font-weight: 800; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 6px; display: block;
  }
  .cart-input {
    width: 100%; padding: 11px 14px;
    background: #f8fafc; border: 1.5px solid #e2e8f0;
    border-radius: 12px; font-size: 13px; font-weight: 500;
    color: #111827; font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .cart-input:focus {
    border-color: #1B3A5C;
    box-shadow: 0 0 0 3px rgba(27,58,92,0.08);
    background: white;
  }
  .cart-input::placeholder { color: #cbd5e1; }

  .cart-select {
    width: 100%; padding: 11px 14px;
    background: #f8fafc; border: 1.5px solid #e2e8f0;
    border-radius: 12px; font-size: 13px; font-weight: 500;
    color: #111827; font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none; cursor: pointer; box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .cart-select:focus { border-color: #1B3A5C; }

  .cart-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .cart-row-3 { display: grid; grid-template-columns: 1fr 1fr 0.6fr; gap: 12px; }

  /* SUBMIT */
  .cart-submit-wrap { padding: 6px 26px 26px; }
  .cart-submit-btn {
    width: 100%; padding: 16px;
    background: #E63946; color: white;
    border: none; border-radius: 14px;
    font-size: 15px; font-weight: 800;
    cursor: pointer; transition: all 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 6px 20px rgba(230,57,70,0.28);
  }
  .cart-submit-btn:hover:not(:disabled) { background: #c1121f; transform: translateY(-1px); }
  .cart-submit-btn:disabled { background: #e2e8f0; color: #94a3b8; cursor: not-allowed; box-shadow: none; }

  .cart-secure-note {
    text-align: center; margin-top: 12px;
    font-size: 11px; color: #94a3b8; font-weight: 600;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    text-transform: uppercase; letter-spacing: 0.08em;
  }

  @media (max-width: 920px) {
    .cart-main { grid-template-columns: 1fr; padding: 24px 20px 60px; }
    .cart-hero { padding: 28px 20px 36px; }
    .cart-hero-title { font-size: 26px; }
    .cart-row-3 { grid-template-columns: 1fr 1fr; }
  }
`;

export default function Carrito() {
  const { cart, removeFromCart, getCartTotal, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '', pais: 'República Dominicana',
    nombre: '', apellidos: '', empresa: '',
    direccion: '', apartamento: '', ciudad: '',
    provincia: '', codigoPostal: '', telefono: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.substring(0, 10);
    let formatted = val;
    if (val.length > 3 && val.length <= 6) formatted = `${val.slice(0,3)}-${val.slice(3)}`;
    else if (val.length > 6) formatted = `${val.slice(0,3)}-${val.slice(3,6)}-${val.slice(6)}`;
    setFormData({ ...formData, telefono: formatted });
  };

  const subtotal = getCartTotal();
  const envio = cart.length > 0 ? 150 : 0;
  const total = subtotal + envio;

  const handleRealizarPedido = () => {
    if (cart.length === 0) return alert("Tu carrito está vacío");
    if (!formData.email || !formData.nombre || !formData.apellidos || !formData.direccion || !formData.ciudad || formData.telefono.length < 12) {
      return alert("Por favor, completa todos los campos obligatorios.");
    }
    localStorage.setItem('datosEnvio', JSON.stringify(formData));
    navigate('/checkout');
  };

  return (
    <>
      <style>{css}</style>
      <div className="cart-root">

        {/* HERO */}
        <div className="cart-hero">
          <div className="cart-hero-eyebrow">
            <div className="cart-hero-dot" />
            Resumen de compra
          </div>
          <h1 className="cart-hero-title">
            Tu <span>Carrito</span>
          </h1>
          <p className="cart-hero-sub">
            Revisa tus productos y completa tu información de envío.
          </p>
        </div>

        <div className="cart-main">

          {/* ── CARRITO ── */}
          <div>
            <div className="cart-card">
              <div className="cart-card-header">
                <div className="cart-card-header-icon">
                  <ShoppingCart size={16} />
                </div>
                <span className="cart-card-header-title">
                  Productos ({cart.length})
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">
                    <Package size={32} strokeWidth={1.5} />
                  </div>
                  <p className="cart-empty-text">Tu carrito está vacío</p>
                  <button className="cart-empty-btn" onClick={() => navigate('/productos')}>
                    Ver productos
                  </button>
                </div>
              ) : (
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item.instanceId} className="cart-item">
                      <div className="cart-item-img">
                        {item.img || item.image
                          ? <img src={item.img || item.image} alt={item.title} />
                          : <Package size={24} color="#cbd5e1" strokeWidth={1.5} />
                        }
                      </div>
                      <div className="cart-item-info">
                        <div className="cart-item-title">{item.title}</div>
                        <div className="cart-item-format">{item.formato || item.details?.slice(0, 30)}</div>
                      </div>
                      <div className="cart-item-price">
                        RD${(item.price * item.cantidad).toLocaleString()}
                      </div>
                      <div className="cart-item-controls">
                        <button className="cart-delete-btn" onClick={() => removeFromCart(item.instanceId)}>
                          <Trash2 size={14} />
                        </button>
                        <div className="cart-qty">
                          <button className="cart-qty-btn" onClick={() => updateQuantity(item.instanceId, item.cantidad - 1)}>−</button>
                          <span className="cart-qty-val">{item.cantidad}</span>
                          <button className="cart-qty-btn" onClick={() => updateQuantity(item.instanceId, item.cantidad + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="cart-totals">
                <div className="cart-total-row">
                  <span className="cart-total-label">Subtotal</span>
                  <span className="cart-total-val">RD${subtotal.toLocaleString()}</span>
                </div>
                <div className="cart-total-row">
                  <span className="cart-total-label">Costo de envío</span>
                  <span className="cart-total-val">RD${envio.toLocaleString()}</span>
                </div>
                <div className="cart-grand-row">
                  <span className="cart-grand-label">Total</span>
                  <span className="cart-grand-val">RD${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── ENVÍO ── */}
          <div>
            <div className="cart-card">
              <div className="cart-card-header">
                <div className="cart-card-header-icon">
                  <MapPin size={16} />
                </div>
                <span className="cart-card-header-title">Información de Envío</span>
              </div>

              <div className="cart-form">

                <div>
                  <label className="cart-field-label">Correo electrónico *</label>
                  <input name="email" value={formData.email} onChange={handleInputChange}
                    type="email" className="cart-input" placeholder="ejemplo@correo.com" />
                </div>

                <div>
                  <label className="cart-field-label">País / Región</label>
                  <select name="pais" value={formData.pais} onChange={handleInputChange} className="cart-select">
                    <option value="República Dominicana">República Dominicana</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Estados Unidos">Estados Unidos</option>
                  </select>
                </div>

                <div className="cart-row-2">
                  <input name="nombre" value={formData.nombre} onChange={handleInputChange}
                    type="text" className="cart-input" placeholder="Nombre *" />
                  <input name="apellidos" value={formData.apellidos} onChange={handleInputChange}
                    type="text" className="cart-input" placeholder="Apellidos *" />
                </div>

                <input name="empresa" value={formData.empresa} onChange={handleInputChange}
                  type="text" className="cart-input" placeholder="Empresa (opcional)" />

                <input name="direccion" value={formData.direccion} onChange={handleInputChange}
                  type="text" className="cart-input" placeholder="Dirección, calle y número *" />

                <input name="apartamento" value={formData.apartamento} onChange={handleInputChange}
                  type="text" className="cart-input" placeholder="Apartamento, suite, etc. (opcional)" />

                <div className="cart-row-3">
                  <input name="ciudad" value={formData.ciudad} onChange={handleInputChange}
                    type="text" className="cart-input" placeholder="Ciudad *" />
                  <input name="provincia" value={formData.provincia} onChange={handleInputChange}
                    type="text" className="cart-input" placeholder="Provincia *" />
                  <input name="codigoPostal" value={formData.codigoPostal} onChange={handleInputChange}
                    type="text" className="cart-input" placeholder="C. Postal" />
                </div>

                <div>
                  <label className="cart-field-label">Teléfono móvil *</label>
                  <input name="telefono" value={formData.telefono} onChange={handlePhoneChange}
                    type="tel" className="cart-input" placeholder="809-000-0000" />
                </div>

              </div>

              <div className="cart-submit-wrap">
                <button
                  onClick={handleRealizarPedido}
                  disabled={cart.length === 0}
                  className="cart-submit-btn"
                >
                  <ArrowRight size={16} /> Continuar al pago
                </button>
                <div className="cart-secure-note">
                  <Lock size={11} /> Pago 100% seguro vía WhatsApp
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}