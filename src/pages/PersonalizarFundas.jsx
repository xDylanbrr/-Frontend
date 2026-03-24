import React, { useState } from 'react';
import { useCart } from '../components/CartContext';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .pf-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #f0f4f8;
    min-height: 100vh;
  }

  /* HERO */
  .pf-hero {
    background: #1B3A5C;
    padding: 48px 40px 56px;
    position: relative; overflow: hidden;
  }
  .pf-hero::before {
    content: ''; position: absolute;
    top: -80px; right: -80px;
    width: 280px; height: 280px; border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }
  .pf-hero::after {
    content: ''; position: absolute;
    bottom: -60px; left: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }
  .pf-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 5px 14px; border-radius: 20px;
    font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.45);
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;
  }
  .pf-hero-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
    animation: pfPulse 2s ease infinite;
  }
  @keyframes pfPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .pf-hero-title {
    font-size: 38px; font-weight: 800; color: white;
    letter-spacing: -0.5px; line-height: 1.1; margin-bottom: 10px;
    position: relative; z-index: 1;
  }
  .pf-hero-title span { color: #E63946; }
  .pf-hero-sub {
    font-size: 14px; color: rgba(255,255,255,0.4);
    font-weight: 400; position: relative; z-index: 1;
  }

  /* MAIN LAYOUT */
  .pf-main {
    max-width: 1200px; margin: 0 auto;
    padding: 40px 40px 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }

  /* PREVIEW PANEL */
  .pf-preview {
    background: white;
    border-radius: 24px;
    border: 1px solid rgba(27,58,92,0.06);
    box-shadow: 0 4px 20px rgba(27,58,92,0.06);
    padding: 32px 24px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    position: sticky; top: 24px;
    min-height: 520px;
  }
  .pf-preview-label {
    font-size: 9px; font-weight: 800; color: #cbd5e1;
    text-transform: uppercase; letter-spacing: 0.25em;
    margin-top: 24px;
  }

  /* FORM PANEL */
  .pf-form { display: flex; flex-direction: column; gap: 16px; }

  /* SECTION CARD */
  .pf-card {
    background: white;
    border-radius: 20px;
    border: 1px solid rgba(27,58,92,0.06);
    box-shadow: 0 4px 16px rgba(27,58,92,0.04);
    padding: 22px 24px;
  }
  .pf-card-title {
    font-size: 11px; font-weight: 800; color: #1B3A5C;
    text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 18px;
    display: flex; align-items: center; gap: 8px;
  }
  .pf-card-title-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #E63946; flex-shrink: 0;
  }

  /* INPUTS */
  .pf-label {
    display: block; font-size: 10px; font-weight: 700;
    color: #94a3b8; text-transform: uppercase;
    letter-spacing: 0.08em; margin-bottom: 8px;
  }
  .pf-input {
    width: 100%; padding: 11px 14px;
    background: #f8fafc; border: 1.5px solid #e2e8f0;
    border-radius: 12px; font-size: 14px; font-weight: 600;
    color: #111827; font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .pf-input:focus {
    border-color: #1B3A5C;
    box-shadow: 0 0 0 3px rgba(27,58,92,0.08);
  }
  .pf-select {
    width: 100%; padding: 11px 14px;
    background: #f8fafc; border: 1.5px solid #e2e8f0;
    border-radius: 12px; font-size: 13px; font-weight: 600;
    color: #111827; font-family: 'Plus Jakarta Sans', sans-serif;
    outline: none; cursor: pointer;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }
  .pf-select:focus { border-color: #1B3A5C; }

  /* RANGE SLIDER */
  .pf-range {
    width: 100%; height: 4px;
    background: #e2e8f0; border-radius: 2px;
    appearance: none; cursor: pointer; margin-top: 8px;
  }
  .pf-range::-webkit-slider-thumb {
    appearance: none; width: 18px; height: 18px;
    background: #1B3A5C; border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 2px 8px rgba(27,58,92,0.3);
    cursor: pointer;
  }

  /* COLOR SWATCHES */
  .pf-colors { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .pf-color-btn {
    width: 36px; height: 36px; border-radius: 50%;
    cursor: pointer; border: 3px solid white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.15s, box-shadow 0.15s;
    position: relative;
  }
  .pf-color-btn:hover { transform: scale(1.1); }
  .pf-color-btn.active {
    transform: scale(1.2);
    box-shadow: 0 0 0 2px #1B3A5C, 0 4px 12px rgba(27,58,92,0.25);
  }
  .pf-color-label {
    font-size: 10px; color: #94a3b8; font-weight: 600; margin-top: 6px;
    text-align: center;
  }

  /* LOGO POSITION BTNS */
  .pf-pos-btn {
    flex: 1; padding: 8px 4px; text-align: center;
    font-size: 11px; font-weight: 700;
    border-radius: 10px; border: 1.5px solid #e2e8f0;
    cursor: pointer; background: #f8fafc; color: #94a3b8;
    transition: all 0.15s; font-family: 'Plus Jakarta Sans', sans-serif;
  }
  .pf-pos-btn.active {
    border-color: #1B3A5C; background: #eff6ff; color: #1B3A5C;
  }

  /* FILE INPUT */
  .pf-file-wrap {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px;
    background: #f8fafc; border: 1.5px dashed #e2e8f0;
    border-radius: 12px; cursor: pointer;
    transition: border-color 0.2s;
  }
  .pf-file-wrap:hover { border-color: #1B3A5C; }
  .pf-file-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: #e0e7ff; display: flex;
    align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .pf-file-text { font-size: 12px; font-weight: 600; color: #475569; }
  .pf-file-sub { font-size: 10px; color: #94a3b8; margin-top: 1px; }

  /* TOTAL BAR */
  .pf-total {
    background: #1B3A5C;
    border-radius: 20px; padding: 24px 28px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 8px 32px rgba(27,58,92,0.25);
    position: relative; overflow: hidden;
  }
  .pf-total::before {
    content: ''; position: absolute;
    top: -30px; right: -30px;
    width: 100px; height: 100px; border-radius: 50%;
    background: rgba(230,57,70,0.15);
  }
  .pf-total-label {
    font-size: 9px; font-weight: 800; color: rgba(255,255,255,0.4);
    text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 4px;
  }
  .pf-total-price {
    font-size: 32px; font-weight: 800; color: white; line-height: 1;
  }
  .pf-confirm-btn {
    background: #E63946; color: white;
    padding: 14px 28px; border-radius: 14px;
    font-size: 14px; font-weight: 800;
    border: none; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 16px rgba(230,57,70,0.35);
    position: relative; z-index: 1;
    white-space: nowrap;
  }
  .pf-confirm-btn:hover { background: #c1121f; transform: translateY(-1px); }

  @media (max-width: 900px) {
    .pf-main { grid-template-columns: 1fr; padding: 24px 20px 48px; }
    .pf-preview { position: static; min-height: 360px; }
    .pf-hero { padding: 40px 20px 48px; }
    .pf-hero-title { font-size: 28px; }
  }
`;

export default function PersonalizarFundas() {
  const { addToCart } = useCart();

  const [ancho, setAncho] = useState(30);
  const [alto, setAlto] = useState(40);
  const [calibre, setCalibre] = useState(50);
  const [cantidad, setCantidad] = useState(100);
  const [color, setColor] = useState("Blanco");
  const [material, setMaterial] = useState("Polietileno");
  const [sello, setSello] = useState("Lateral");
  const [logo, setLogo] = useState(null);
  const [posicionLogo, setPosicionLogo] = useState("center");
  const [tamanoLogo, setTamanoLogo] = useState(30);

  const URL_BOLSA = "https://www.matrixcomercial.com/wp-content/uploads/2021/12/Funda-tipo-t-shirt-51.png";

  const coloresMap = {
    "Transparente": "rgba(200,225,255,0.4)",
    "Blanco": "#ffffff",
    "Negro": "#1e293b",
    "Azul": "#1B3A5C",
    "Rojo": "#E63946"
  };

  const precioEstimado = Math.max(
    ancho * alto * calibre * 0.002 * parseInt(cantidad || 0),
    100
  );

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(URL.createObjectURL(file));
  };

  const handleAddToCart = () => {
    if (cantidad < 100) {
      alert("⚠️ La cantidad mínima de producción es de 100 unidades.");
      return;
    }
    addToCart({
      id: Date.now(),
      title: "Funda Personalizada",
      details: `Ancho: ${ancho}cm, Alto: ${alto}cm, Calibre: ${calibre}μ, Cantidad: ${cantidad}, Color: ${color}, Material: ${material}, Sello: ${sello}`,
      price: precioEstimado,
      image: logo || URL_BOLSA
    });
    alert("¡Producto añadido al carrito!");
  };

  return (
    <>
      <style>{css}</style>
      <div className="pf-root">

        {/* ── HERO ── */}
        <div className="pf-hero">
          <div className="pf-hero-eyebrow">
            <div className="pf-hero-dot" />
            Configurador en tiempo real
          </div>
          <h1 className="pf-hero-title">
            Personaliza tu <span>Funda</span>
          </h1>
          <p className="pf-hero-sub">
            Ajusta cada detalle y visualiza tu empaque al instante.
          </p>
        </div>

        <div className="pf-main">

          {/* ── PREVIEW ── */}
          <div className="pf-preview">
            <div
              style={{
                width: `${Math.min(ancho * 10, 340)}px`,
                height: `${Math.min(alto * 10, 440)}px`,
                maxWidth: '100%',
                backgroundColor: coloresMap[color],
                borderRadius: 16,
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 24px rgba(0,0,0,0.06)',
                border: color === 'Blanco' ? '1px solid #e2e8f0' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <img
                src={URL_BOLSA}
                alt="Funda"
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  opacity: color === 'Blanco' ? 1 : 0.85,
                  pointerEvents: 'none'
                }}
              />
              {logo && (
                <div style={{
                  position: 'absolute', zIndex: 20,
                  width: `${tamanoLogo}%`, height: `${tamanoLogo}%`,
                  top: posicionLogo === 'start' ? '18%' : posicionLogo === 'end' ? '60%' : '38%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s'
                }}>
                  <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
              )}
            </div>
            <p className="pf-preview-label">Prototipo de Alta Resolución</p>
          </div>

          {/* ── FORM ── */}
          <div className="pf-form">

            {/* ARTE E IMPRESIÓN */}
            <div className="pf-card">
              <div className="pf-card-title">
                <div className="pf-card-title-dot" />
                Arte e Impresión
              </div>

              <label htmlFor="pf-logo-input" style={{ cursor: 'pointer' }}>
                <div className="pf-file-wrap">
                  <div className="pf-file-icon">🖼️</div>
                  <div>
                    <div className="pf-file-text">{logo ? 'Cambiar logo' : 'Subir logo o arte'}</div>
                    <div className="pf-file-sub">PNG, JPG, SVG recomendado</div>
                  </div>
                </div>
                <input
                  id="pf-logo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ display: 'none' }}
                />
              </label>

              {logo && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
                  <div>
                    <label className="pf-label">Tamaño del logo: {tamanoLogo}%</label>
                    <input
                      type="range" min="10" max="65" value={tamanoLogo}
                      onChange={(e) => setTamanoLogo(Number(e.target.value))}
                      className="pf-range"
                    />
                  </div>
                  <div>
                    <label className="pf-label">Posición</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[
                        { val: 'start', label: 'Arriba' },
                        { val: 'center', label: 'Centro' },
                        { val: 'end', label: 'Abajo' },
                      ].map(({ val, label }) => (
                        <button
                          key={val} type="button"
                          onClick={() => setPosicionLogo(val)}
                          className={`pf-pos-btn${posicionLogo === val ? ' active' : ''}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* DIMENSIONES */}
            <div className="pf-card">
              <div className="pf-card-title">
                <div className="pf-card-title-dot" />
                Dimensiones
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label className="pf-label">Ancho (cm)</label>
                  <input
                    type="number" value={ancho}
                    onChange={(e) => setAncho(Number(e.target.value))}
                    className="pf-input"
                  />
                </div>
                <div>
                  <label className="pf-label">Alto (cm)</label>
                  <input
                    type="number" value={alto}
                    onChange={(e) => setAlto(Number(e.target.value))}
                    className="pf-input"
                  />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <label className="pf-label">Calibre</label>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#1B3A5C' }}>{calibre}μ</span>
                </div>
                <input
                  type="range" min="20" max="200" value={calibre}
                  onChange={(e) => setCalibre(Number(e.target.value))}
                  className="pf-range"
                />
              </div>

              <div style={{ paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
                <label className="pf-label">Cantidad de unidades <span style={{ color: '#E63946' }}>(mín. 100)</span></label>
                <input
                  type="number" value={cantidad} min="100"
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="pf-input"
                />
              </div>
            </div>

            {/* ESPECIFICACIONES */}
            <div className="pf-card">
              <div className="pf-card-title">
                <div className="pf-card-title-dot" />
                Especificaciones
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label className="pf-label">Material</label>
                  <select value={material} onChange={(e) => setMaterial(e.target.value)} className="pf-select">
                    <option value="Polietileno">Polietileno</option>
                    <option value="Polipropileno">Polipropileno</option>
                  </select>
                </div>
                <div>
                  <label className="pf-label">Tipo de sello</label>
                  <select value={sello} onChange={(e) => setSello(e.target.value)} className="pf-select">
                    <option value="Lateral">Lateral</option>
                    <option value="Fondo">Fondo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="pf-label" style={{ marginBottom: 14 }}>Color del plástico</label>
                <div className="pf-colors">
                  {Object.entries(coloresMap).map(([nombre, hex]) => (
                    <div key={nombre} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setColor(nombre)}
                        className={`pf-color-btn${color === nombre ? ' active' : ''}`}
                        style={{
                          backgroundColor: nombre === 'Transparente' ? '#f1f5f9' : hex,
                          border: nombre === 'Blanco' ? '1.5px solid #e2e8f0' : 'none'
                        }}
                        title={nombre}
                      />
                      <span className="pf-color-label">{nombre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TOTAL */}
            <div className="pf-total">
              <div>
                <div className="pf-total-label">Total estimado (RD$)</div>
                <div className="pf-total-price">RD${precioEstimado.toLocaleString()}</div>
              </div>
              <button type="button" className="pf-confirm-btn" onClick={handleAddToCart}>
                Añadir al carrito
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}