import { Globe2Icon, MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer style={{ background: '#162032', borderTop: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* TOP SECTION */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '52px 40px 36px',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr',
        gap: 48,
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>

        {/* BRAND COL */}
        <div>
          <div style={{
            fontSize: 24, fontWeight: 800, color: '#f1f5f9',
            letterSpacing: '-0.5px', marginBottom: 14
          }}>
            GT<span style={{ color: '#ef4444' }}>G</span>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400 }}>.</span>
          </div>
          <p style={{
            fontSize: 13, color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7, maxWidth: 240, marginBottom: 24, fontWeight: 400
          }}>
            Soluciones de empaque plástico de alta calidad para la industria dominicana y el mercado internacional.
          </p>

          {/* SOCIAL ICONS */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { href: "https://www.facebook.com/GTGPlasticPackaging/", icon: <FaFacebook size={15} />, label: "Facebook" },
              { href: "https://www.instagram.com/gtgplasticpackaging/", icon: <FaInstagram size={15} />, label: "Instagram" },
              { href: "https://www.google.com/maps/place/Global+Technology+Group/@19.474836,-70.734787", icon: <Globe2Icon size={15} />, label: "Ubicación" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = '#f1f5f9';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* LINKS COL */}
        <div>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20
          }}>
            Navegación
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Inicio', 'Nosotros', 'Productos', 'Calidad'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: 13, color: 'rgba(255,255,255,0.45)',
                  textDecoration: 'none', fontWeight: 500,
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#f1f5f9'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT COL */}
        <div>
          <div style={{
            fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20
          }}>
            Contacto
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: <MapPin size={13} />, text: 'San Francisco de Macorís, RD' },
              { icon: <Phone size={13} />, text: '+1 (809) 000-0000' },
              { icon: <Mail size={13} />, text: 'info@gtg.com.do' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  width: 28, height: 28, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: '#06b6d4'
                }}>
                  {icon}
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '18px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0, fontWeight: 400 }}>
          © 2026 GTG — Global Technology Group. Todos los derechos reservados.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacidad', 'Términos'].map(t => (
            <a key={t} href="#" style={{
              fontSize: 12, color: 'rgba(255,255,255,0.2)',
              textDecoration: 'none', transition: 'color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
            >
              {t}
            </a>
          ))}
        </div>
      </div>

    </footer>
  );
}
