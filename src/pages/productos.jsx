import { Link } from "react-router-dom";
import { ArrowRight, Eye, Package } from "lucide-react";

export const productosData = [
  {
    id: 1,
    title: "Bolsas de ziploc Personalizadas",
    price: 190.00,
    tag: "Alimenticio",
    img: "https://http2.mlstatic.com/D_NQ_NP_2X_835713-MLC73799905083_012024-F-pack-500-bolsas-tipo-zipperziploc-de-4x6-cm.webp",
    desc: "Bolsas con cierre hermético de alta calidad, ideales para el sector alimenticio y farmacéutico. Disponibles en varios tamaños.",
  },
  {
    id: 2,
    title: "Rollos de Plástico Termoencogible",
    price: 2500.00,
    tag: "Industrial",
    img: "https://www.novamart.com/shop/image/cachewebp/catalog/Material/Termoencogible/POF/POF-16/01-400x300.webp",
    desc: "Película de polietileno de alto rendimiento que se adapta a la forma de su producto mediante calor.",
  },
  {
    id: 3,
    title: "Empaques con Impresión Personalizada",
    price: 900.00,
    tag: "Branding",
    img: "https://agenciapalmlopez.com/cdn/shop/products/BO-BLAN9-5_473x293.jpg?v=1652145634",
    desc: "Soluciones completas de empaque con diseño flexográfico personalizado para resaltar su marca.",
  },
  {
    id: 4,
    title: "Bolsas y Rollos Pigmentados",
    price: 450.00,
    tag: "Variedad",
    img: "",
    desc: "Fabricación de bolsas y rollos en polietileno de alta y baja densidad. Disponibles en opciones transparentes o pigmentadas según su requerimiento.",
  },
  {
    id: 5,
    title: "Láminas de Polietileno",
    price: 600.00,
    tag: "Protección",
    img: "https://www.plasticosyempaques.com/wp-content/uploads/2018/05/laminas-de-polietileno.jpg",
    desc: "Láminas de plástico resistentes y versátiles, ideales para procesos de corte industrial, división de productos o empaque manual.",
  },
  {
    id: 6,
    title: "Rollos Precortados (Lavandería)",
    price: 1200.00,
    tag: "Textil",
    img: "https://www.fundaexpress.com.do/wp-content/uploads/2020/07/rollos-precortados-transparente.jpg",
    desc: "Rollos con precorte especial diseñados para agilizar el trabajo en lavanderías, tintorerías y textil.",
  }
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .prod-root { font-family: 'Plus Jakarta Sans', sans-serif; background: #f0f4f8; min-height: 100vh; }

  /* HERO */
  .prod-hero {
    background: #1B3A5C;
    padding: 72px 40px 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .prod-hero::before {
    content: '';
    position: absolute; top: -100px; right: -100px;
    width: 350px; height: 350px; border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }
  .prod-hero::after {
    content: '';
    position: absolute; bottom: -80px; left: -80px;
    width: 280px; height: 280px; border-radius: 50%;
    background: rgba(255,255,255,0.03);
  }
  .prod-hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 6px 16px; border-radius: 20px;
    font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5);
    text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 20px;
  }
  .prod-hero-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
    animation: prodPulse 2s ease infinite;
  }
  @keyframes prodPulse {
    0%,100% { opacity: 1; } 50% { opacity: 0.4; }
  }
  .prod-hero-title {
    font-size: 48px; font-weight: 800; color: white;
    letter-spacing: -1px; line-height: 1.1; margin-bottom: 16px;
    position: relative; z-index: 1;
  }
  .prod-hero-title span { color: #E63946; }
  .prod-hero-sub {
    font-size: 16px; color: rgba(255,255,255,0.45);
    max-width: 480px; margin: 0 auto; line-height: 1.6; font-weight: 400;
    position: relative; z-index: 1;
  }

  /* GRID */
  .prod-grid-section {
    max-width: 1200px; margin: 0 auto;
    padding: 60px 40px;
  }
  .prod-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  /* CARD */
  .prod-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid rgba(27,58,92,0.06);
    box-shadow: 0 4px 20px rgba(27,58,92,0.06);
    display: flex; flex-direction: column;
    text-decoration: none;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .prod-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(27,58,92,0.14);
  }

  .prod-card-img {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
    background: #f8fafc;
  }
  .prod-card-img-bg {
    width: 100%; height: 100%;
    background-size: cover; background-position: center;
    transition: transform 0.6s ease;
  }
  .prod-card:hover .prod-card-img-bg { transform: scale(1.07); }

  .prod-card-img-overlay {
    position: absolute; inset: 0;
    background: rgba(27,58,92,0.5);
    opacity: 0; transition: opacity 0.3s;
    display: flex; align-items: center; justify-content: center;
  }
  .prod-card:hover .prod-card-img-overlay { opacity: 1; }
  .prod-card-eye {
    background: white; border-radius: 50%;
    width: 48px; height: 48px;
    display: flex; align-items: center; justify-content: center;
    transform: translateY(8px); transition: transform 0.3s;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
  .prod-card:hover .prod-card-eye { transform: translateY(0); }

  .prod-card-no-img {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #f0f4f8, #e2e8f0);
    color: #94a3b8;
  }

  .prod-card-tag {
    position: absolute; top: 14px; left: 14px;
    background: #1B3A5C; color: white;
    font-size: 10px; font-weight: 700;
    padding: 4px 12px; border-radius: 20px;
    letter-spacing: 0.06em; text-transform: uppercase;
  }

  .prod-card-body {
    padding: 24px; flex: 1; display: flex; flex-direction: column;
  }
  .prod-card-title {
    font-size: 17px; font-weight: 700; color: #111827;
    margin-bottom: 8px; line-height: 1.3;
    transition: color 0.2s;
  }
  .prod-card:hover .prod-card-title { color: #1B3A5C; }
  .prod-card-desc {
    font-size: 13px; color: #64748b; line-height: 1.6;
    font-weight: 400; flex: 1;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }

  .prod-card-footer {
    margin-top: 20px; padding-top: 16px;
    border-top: 1px solid #f1f5f9;
    display: flex; justify-content: space-between; align-items: center;
  }
  .prod-card-price-label {
    font-size: 9px; font-weight: 800; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 0.15em; display: block; margin-bottom: 2px;
  }
  .prod-card-price {
    font-size: 22px; font-weight: 800; color: #111827; line-height: 1;
  }
  .prod-card-btn {
    width: 40px; height: 40px; border-radius: 13px;
    background: #1B3A5C; color: white;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, transform 0.15s;
    flex-shrink: 0;
  }
  .prod-card:hover .prod-card-btn { background: #E63946; }

  /* CTA */
  .prod-cta-section {
    max-width: 1200px; margin: 0 auto;
    padding: 0 40px 80px;
  }
  .prod-cta {
    background: #1B3A5C;
    border-radius: 28px; padding: 64px 48px;
    text-align: center; position: relative; overflow: hidden;
  }
  .prod-cta::before {
    content: '';
    position: absolute; top: -60px; right: -60px;
    width: 240px; height: 240px; border-radius: 50%;
    background: rgba(230,57,70,0.12);
  }
  .prod-cta::after {
    content: '';
    position: absolute; bottom: -60px; left: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(255,255,255,0.04);
  }
  .prod-cta-title {
    font-size: 36px; font-weight: 800; color: white;
    letter-spacing: -0.5px; margin-bottom: 12px;
    position: relative; z-index: 1;
  }
  .prod-cta-sub {
    font-size: 15px; color: rgba(255,255,255,0.45);
    max-width: 420px; margin: 0 auto 36px;
    line-height: 1.6; font-weight: 400;
    position: relative; z-index: 1;
  }
  .prod-cta-btn {
    display: inline-flex; align-items: center; gap: 10px;
    background: white; color: #1B3A5C;
    padding: 14px 32px; border-radius: 14px;
    font-size: 14px; font-weight: 800;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
    position: relative; z-index: 1;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  .prod-cta-btn:hover { background: #f0f4f8; transform: translateY(-1px); }

  @media (max-width: 900px) {
    .prod-grid { grid-template-columns: repeat(2,1fr); }
    .prod-hero-title { font-size: 36px; }
  }
  @media (max-width: 600px) {
    .prod-grid { grid-template-columns: 1fr; }
    .prod-grid-section, .prod-cta-section { padding: 40px 20px; }
    .prod-hero { padding: 48px 20px 56px; }
    .prod-hero-title { font-size: 28px; }
    .prod-cta { padding: 40px 24px; }
    .prod-cta-title { font-size: 26px; }
  }
`;

export default function Productos() {
  return (
    <>
      <style>{css}</style>
      <main className="prod-root">

        {/* ── HERO ── */}
        <section className="prod-hero">
          <div className="prod-hero-eyebrow">
            <div className="prod-hero-dot" />
            Catálogo 2026
          </div>
          <h1 className="prod-hero-title">
            Nuestros <span>Productos</span>
          </h1>
          <p className="prod-hero-sub">
            Soluciones integrales en empaques flexibles para optimizar su cadena de suministro.
          </p>
        </section>

        {/* ── GRID ── */}
        <section className="prod-grid-section">
          <div className="prod-grid">
            {productosData.map((p) => (
              <Link key={p.id} to={`/producto/${p.id}`} className="prod-card">

                {/* IMAGEN */}
                <div className="prod-card-img">
                  {p.img ? (
                    <div
                      className="prod-card-img-bg"
                      style={{ backgroundImage: `url(${p.img})` }}
                    />
                  ) : (
                    <div className="prod-card-no-img">
                      <Package size={40} strokeWidth={1.5} />
                    </div>
                  )}
                  <div className="prod-card-img-overlay">
                    <div className="prod-card-eye">
                      <Eye size={20} color="#1B3A5C" />
                    </div>
                  </div>
                  <span className="prod-card-tag">{p.tag}</span>
                </div>

                {/* BODY */}
                <div className="prod-card-body">
                  <div className="prod-card-title">{p.title}</div>
                  <p className="prod-card-desc">{p.desc}</p>

                  <div className="prod-card-footer">
                    <div>
                      <span className="prod-card-price-label">Precio inicial</span>
                      <span className="prod-card-price">RD${p.price.toLocaleString()}</span>
                    </div>
                    <div className="prod-card-btn">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="prod-cta-section">
          <div className="prod-cta">
            <h2 className="prod-cta-title">¿Requiere dimensiones específicas?</h2>
            <p className="prod-cta-sub">
              Diseñamos empaques a la medida de sus necesidades técnicas y de marca.
            </p>
            <Link to="/personalizar/fundas" className="prod-cta-btn">
              Solicitar Cotización
              <ArrowRight size={16} color="#E63946" />
            </Link>
          </div>
        </section>

      </main>
    </>
  );
}