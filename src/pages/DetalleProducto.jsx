import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import { productosData } from './productos';
import { ArrowLeft, ShoppingCart, Zap, Package } from 'lucide-react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .dp-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f4f8;
    min-height: 100vh;
  }

  /* HERO */
  .dp-hero {
    background: #c1121f;
    padding: 28px 40px;
    position: relative; overflow: hidden;
  }
  .dp-hero::before {
    content: ''; position: absolute;
    top: -60px; right: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }
  .dp-back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7);
    padding: 8px 16px; border-radius: 12px;
    font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    text-decoration: none;
  }
  .dp-back-btn:hover {
    background: rgba(255,255,255,0.14);
    color: white;
  }

  /* MAIN */
  .dp-main {
    max-width: 1100px; margin: 0 auto;
    padding: 40px 40px 72px;
  }

  .dp-card {
    background: white;
    border-radius: 28px;
    border: 1px solid rgba(30,27,75,0.06);
    box-shadow: 0 8px 40px rgba(30,27,75,0.08);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* IMAGE SIDE */
  .dp-img-side {
    background: #f8fafc;
    border-right: 1px solid #f1f5f9;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 48px 40px; position: relative;
    min-height: 520px;
  }
  .dp-img-tag {
    position: absolute; top: 20px; left: 20px;
    background: #1e1b4b; color: white;
    font-size: 10px; font-weight: 700;
    padding: 5px 14px; border-radius: 20px;
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .dp-img {
    max-height: 380px; width: 100%;
    object-fit: contain;
    transition: transform 0.5s ease;
  }
  .dp-img:hover { transform: scale(1.04); }
  .dp-no-img {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px; color: #cbd5e1;
  }

  /* INFO SIDE */
  .dp-info-side {
    padding: 48px 44px;
    display: flex; flex-direction: column; gap: 0;
  }

  .dp-stock {
    display: inline-flex; align-items: center; gap: 7px;
    margin-bottom: 16px;
  }
  .dp-stock-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.18);
    animation: dpPulse 2s ease infinite;
  }
  @keyframes dpPulse {
    0%,100%{ box-shadow: 0 0 0 3px rgba(34,197,94,0.18); }
    50%{ box-shadow: 0 0 0 6px rgba(34,197,94,0.06); }
  }
  .dp-stock-text {
    font-size: 12px; font-weight: 700; color: #16a34a;
    text-transform: uppercase; letter-spacing: 0.06em;
  }

  .dp-title {
    font-size: 30px; font-weight: 800; color: #111827;
    letter-spacing: -0.5px; line-height: 1.2;
    margin-bottom: 16px;
  }

  .dp-price {
    font-size: 40px; font-weight: 800; color: #1e1b4b;
    letter-spacing: -1px; margin-bottom: 28px; line-height: 1;
  }
  .dp-price-currency {
    font-size: 20px; font-weight: 600; color: #94a3b8;
    vertical-align: super;
  }

  .dp-divider {
    height: 1px; background: #f1f5f9; margin: 0 0 24px;
  }

  /* QUANTITY + ADD */
  .dp-section-label {
    font-size: 10px; font-weight: 800; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.12em;
    margin-bottom: 12px; display: block;
  }
  .dp-actions {
    display: flex; gap: 12px; margin-bottom: 14px;
  }
  .dp-qty {
    display: flex; align-items: center; gap: 0;
    background: #f8fafc; border: 1.5px solid #e2e8f0;
    border-radius: 14px; overflow: hidden;
    flex-shrink: 0;
  }
  .dp-qty-btn {
    width: 42px; height: 48px;
    background: none; border: none;
    font-size: 20px; font-weight: 700; color: #94a3b8;
    cursor: pointer; transition: color 0.15s, background 0.15s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex; align-items: center; justify-content: center;
  }
  .dp-qty-btn:hover { color: #1e1b4b; background: #e0e7ff; }
  
  /* Nuevo estilo para el input de cantidad */
  .dp-qty-input {
    width: 60px; text-align: center;
    font-size: 16px; font-weight: 800; color: #111827;
    border: none; background: transparent; outline: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
    -moz-appearance: textfield;
  }
  .dp-qty-input::-webkit-outer-spin-button,
  .dp-qty-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .dp-add-btn {
    flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
    background: #f0f4f8; color: #1e1b4b;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px; padding: 0 20px;
    font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .dp-add-btn:hover {
    background: #1e1b4b; color: white;
    border-color: #1e1b4b;
  }

  .dp-buy-btn {
    width: 100%; padding: 16px;
    background: #c1121f; color: white;
    border: none; border-radius: 14px;
    font-size: 15px; font-weight: 800;
    cursor: pointer; transition: all 0.2s;
    font-family: 'Plus Jakarta Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 6px 20px rgba(193,18,31,0.28);
    margin-bottom: 28px;
  }
  .dp-buy-btn:hover { background: #a00f1a; transform: translateY(-1px); }
  .dp-buy-btn:active { transform: translateY(0); }

  /* DESC */
  .dp-desc-label {
    font-size: 10px; font-weight: 800; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.12em;
    margin-bottom: 10px; display: block;
  }
  .dp-desc {
    font-size: 14px; color: #64748b; line-height: 1.7; font-weight: 400;
  }

  @media (max-width: 860px) {
    .dp-card { grid-template-columns: 1fr; }
    .dp-img-side { border-right: none; border-bottom: 1px solid #f1f5f9; min-height: 300px; }
    .dp-info-side { padding: 32px 28px; }
    .dp-main { padding: 24px 20px 60px; }
    .dp-hero { padding: 20px; }
    .dp-title { font-size: 24px; }
  }
`;

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const producto = productosData.find(p => p.id === parseInt(id));
  const [cantidad, setCantidad] = useState(1);

  if (!producto) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <p style={{ color: '#94a3b8', fontWeight: 700 }}>Producto no encontrado</p>
    </div>
  );

  // Nueva función para manejar el input manual de cantidad
  const handleCantidadChange = (e) => {
    const val = parseInt(e.target.value);
    if (isNaN(val) || val < 1) {
      setCantidad(1);
    } else {
      setCantidad(val);
    }
  };

  const crearItemCarrito = () => ({
    ...producto,
    instanceId: Date.now(),
    cantidad,
    price: producto.price
  });

  const handleAgregar = () => { addToCart(crearItemCarrito()); navigate('/carrito'); };
  const handleComprarAhora = () => { addToCart(crearItemCarrito()); navigate('/carrito'); };

  return (
    <>
      <style>{css}</style>
      <div className="dp-root">

        {/* HERO / BREADCRUMB */}
        <div className="dp-hero">
          <button className="dp-back-btn" onClick={() => navigate('/productos')}>
            <ArrowLeft size={14} /> Volver a Productos
          </button>
        </div>

        <div className="dp-main">
          <div className="dp-card">

            {/* IMAGEN */}
            <div className="dp-img-side">
              <span className="dp-img-tag">{producto.tag || 'GTG'}</span>
              {producto.img ? (
                <img src={producto.img} alt={producto.title} className="dp-img" />
              ) : (
                <div className="dp-no-img">
                  <Package size={56} strokeWidth={1} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Sin imagen disponible</span>
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="dp-info-side">

              <div className="dp-stock">
                <div className="dp-stock-dot" />
                <span className="dp-stock-text">Disponible en stock</span>
              </div>

              <h1 className="dp-title">{producto.title}</h1>

              <div className="dp-price">
                <span className="dp-price-currency">RD$</span>
                {producto.price.toLocaleString()}
              </div>

              <div className="dp-divider" />

              {/* CANTIDAD + AGREGAR */}
              <span className="dp-section-label">Cantidad</span>
              <div className="dp-actions">
                <div className="dp-qty">
                  <button className="dp-qty-btn" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>−</button>
                  <input 
                    type="number" 
                    className="dp-qty-input" 
                    value={cantidad} 
                    onChange={handleCantidadChange}
                  />
                  <button className="dp-qty-btn" onClick={() => setCantidad(cantidad + 1)}>+</button>
                </div>
                <button className="dp-add-btn" onClick={handleAgregar}>
                  <ShoppingCart size={16} /> Agregar al carrito
                </button>
              </div>

              {/* COMPRAR AHORA */}
              <button className="dp-buy-btn" onClick={handleComprarAhora}>
                <Zap size={16} /> Comprar ahora
              </button>

              {/* DESCRIPCIÓN */}
              <div className="dp-divider" />
              <span className="dp-desc-label">Descripción</span>
              <p className="dp-desc">{producto.desc}</p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}