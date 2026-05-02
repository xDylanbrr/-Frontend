import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, Mail, Phone, MapPin, 
  PenTool, User, ChevronRight, Edit2, 
  Check, X, Loader2, Lock, LogOut, ArrowLeft,
  BadgeInfo, Globe, Clock 
} from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .perfil-container {
    font-family: 'Inter', sans-serif;
    color: #1e293b;
    max-width: 1100px;
    margin: 40px auto;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 32px;
  }

  .main-content {
    background: #FFFFFF;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    padding: 40px;
    min-height: 450px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }

  .info-card {
    background: #FFFFFF;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    padding: 32px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }

  .nav-button {
    width: 100%;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: #64748b;
    transition: all 0.2s;
  }

  .nav-button:hover:not(.active):not(.btn-logout) {
    background: #f1f5f9;
    color: #1e293b;
  }

  .nav-button.active {
    border-color: #E63946;
    color: #E63946;
    background: rgba(230, 57, 70, 0.05);
  }

  .p-input {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    background: #f8fafc;
    color: #1e293b;
    transition: all 0.2s;
  }

  .p-input:focus { 
    border-color: #E63946; 
    background: #FFFFFF; 
    box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1); 
  }

  .p-input::placeholder { color: #94a3b8; }
  
  .p-input option {
    background: #FFFFFF;
    color: #1e293b;
  }

  .action-btn {
    padding: 10px 18px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-primary { background: #E63946; color: white; }
  .btn-primary:hover { background: #DC2626; }
  .btn-secondary { background: #f1f5f9; color: #64748b; }
  .btn-secondary:hover { background: #e2e8f0; color: #1e293b; }
  .btn-logout { background: rgba(230, 57, 70, 0.05); color: #E63946; border: 1px solid rgba(230, 57, 70, 0.1); }
  .btn-logout:hover { background: rgba(230, 57, 70, 0.1); color: #DC2626; }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

export default function PerfilUsuario({ user, onUserUpdate, setUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('datos');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estado ampliado con preferencias del sistema
  const [formData, setFormData] = useState({
    cedula: user?.cliente?.cedula || user?.cedula || '',
    correo: user?.cliente?.correo || user?.correo || user?.email || '',
    telefono: user?.cliente?.telefono || user?.telefono || '',
    direccion: user?.cliente?.direccion || user?.direccion || '',
    idioma: user?.idioma || 'es',
    zonaHoraria: user?.zonaHoraria || 'America/Santo_Domingo'
  });

  const sigCanvas = useRef({});
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    if (setUser) setUser(null);
    navigate('/login-gtg');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveInfo = async () => {
    setIsLoading(true);
    setTimeout(() => {
      if (onUserUpdate) onUserUpdate({ ...user, ...formData });
      setIsEditing(false);
      setIsLoading(false);
    }, 800);
  };

  const profileImage = user?.imagen_perfil
    ? `http://127.0.0.1:3000/uploads/perfiles/${user.imagen_perfil}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.cliente?.nombre || user?.nombre || 'U')}&background=E63946&color=fff&bold=true`;

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', padding: '20px' }}>
      <style>{css}</style>
      
      <div className="perfil-container">
        
        {/* ── SIDEBAR ── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}>
            <ArrowLeft size={16} /> Volver al inicio
          </button>

          <div className="info-card">
            <div style={{ position: 'relative', width: '90px', margin: '0 auto 15px' }}>
              <img src={profileImage} style={{ width: '90px', height: '90px', borderRadius: '28px', objectFit: 'cover', border: '2px solid #e2e8f0' }} alt="Avatar" />
              <button onClick={() => fileInputRef.current.click()} style={{ position: 'absolute', bottom: -5, right: -5, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '6px', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }} onMouseOver={(e) => {e.currentTarget.style.color = '#E63946'; e.currentTarget.style.borderColor = '#E63946'}} onMouseOut={(e) => {e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#e2e8f0'}}>
                <Upload size={14} />
              </button>
            </div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: '#1e293b' }}>{user?.cliente?.nombre || user?.nombre}</h2>
            <p style={{ fontSize: '10px', fontWeight: 800, color: '#E63946', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.5px' }}>{user?.rol}</p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
            <NavBtn active={activeTab === 'datos'} onClick={() => setActiveTab('datos')} icon={<User size={18} />} label="Configuración de Cuenta" />
            <NavBtn active={activeTab === 'firma'} onClick={() => setActiveTab('firma')} icon={<PenTool size={18} />} label="Firma Digital" />
            <NavBtn active={activeTab === 'seguridad'} onClick={() => setActiveTab('seguridad')} icon={<Lock size={18} />} label="Seguridad" />
          </nav>

          <button className="nav-button btn-logout" onClick={handleLogout}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><LogOut size={18} /> Cerrar Sesión</div>
          </button>
        </aside>

        {/* ── CONTENIDO ── */}
        <main className="main-content">
          
          {/* TAB: DATOS (CONFIGURACIÓN DE CUENTA) */}
          {activeTab === 'datos' && (
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px' }}>
                <h3 style={{ fontSize: '19px', fontWeight: 700, margin: 0, color: '#1e293b' }}>Configuración de la Cuenta</h3>
                {!isEditing ? (
                  <button className="action-btn btn-secondary" onClick={() => setIsEditing(true)}><Edit2 size={16} /> Editar</button>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="action-btn btn-secondary" onClick={() => setIsEditing(false)}><X size={16} /> Cancelar</button>
                    <button className="action-btn btn-primary" onClick={handleSaveInfo} disabled={isLoading}>
                      {isLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <><Check size={16} /> Guardar</>}
                    </button>
                  </div>
                )}
              </div>
              
              {/* SECCIÓN 1: Datos Personales */}
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginTop: '25px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Datos de Contacto
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <EditableRow isEditing={isEditing} icon={<BadgeInfo size={20} />} label="Cédula / ID" name="cedula" value={formData.cedula} onChange={handleChange} />
                <EditableRow isEditing={isEditing} icon={<Mail size={20} />} label="Correo Electrónico" name="correo" value={formData.correo} onChange={handleChange} />
                <EditableRow isEditing={isEditing} icon={<Phone size={20} />} label="Teléfono de Contacto" name="telefono" value={formData.telefono} onChange={handleChange} />
                <EditableRow isEditing={isEditing} icon={<MapPin size={20} />} label="Dirección de Residencia" name="direccion" value={formData.direccion} onChange={handleChange} />
              </div>

              {/* SECCIÓN 2: Preferencias del Sistema */}
              <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '40px', marginBottom: '20px', paddingTop: '30px', borderTop: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Preferencias del Sistema
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <EditableRow 
                  isEditing={isEditing} 
                  type="select"
                  icon={<Globe size={20} />} 
                  label="Idioma de la Interfaz" 
                  name="idioma" 
                  value={formData.idioma} 
                  onChange={handleChange}
                  options={[
                    { value: 'es', label: 'Español' },
                    { value: 'en', label: 'English' },
                    { value: 'pt', label: 'Português' }
                  ]}
                />
                <EditableRow 
                  isEditing={isEditing} 
                  type="select"
                  icon={<Clock size={20} />} 
                  label="Zona Horaria" 
                  name="zonaHoraria" 
                  value={formData.zonaHoraria} 
                  onChange={handleChange}
                  options={[
                    { value: 'America/Santo_Domingo', label: 'República Dominicana (AST)' },
                    { value: 'America/Bogota', label: 'Colombia / Perú (EST)' },
                    { value: 'America/Mexico_City', label: 'Ciudad de México (CST)' }
                  ]}
                />
              </div>
            </section>
          )}

          {/* TAB: FIRMA */}
          {activeTab === 'firma' && (
            <section>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '25px', color: '#1e293b' }}>Firma Digital</h3>
              <div style={{ maxWidth: '450px' }}> 
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)' }}>
                  <SignatureCanvas ref={sigCanvas} penColor='#1e293b' canvasProps={{ style: { width: '100%', height: 130 } }} />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button className="action-btn btn-secondary" onClick={() => sigCanvas.current.clear()}><X size={16} /> Limpiar</button>
                  <button className="action-btn btn-primary"><Check size={16} /> Guardar Firma</button>
                </div>
              </div>
            </section>
          )}

          {/* TAB: SEGURIDAD */}
          {activeTab === 'seguridad' && (
            <section>
              <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '25px', color: '#1e293b' }}>Seguridad de la Cuenta</h3>
              <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Contraseña Actual</label>
                  <div style={{ position: 'relative', marginTop: '8px' }}>
                    <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                    <input type="password" name="current" className="p-input" style={{ paddingLeft: '36px' }} placeholder="••••••••" />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Nueva Contraseña</label>
                  <div style={{ position: 'relative', marginTop: '8px' }}>
                    <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                    <input type="password" name="next" className="p-input" style={{ paddingLeft: '36px' }} placeholder="Nueva contraseña" />
                  </div>
                </div>
                <button className="action-btn btn-primary" style={{ width: 'fit-content', marginTop: '10px' }}><Check size={16} /> Actualizar Contraseña</button>
              </div>
            </section>
          )}
        </main>
      </div>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" />
    </div>
  );
}

// Auxiliares
function NavBtn({ active, onClick, icon, label }) {
  return (
    <button className={`nav-button ${active ? 'active' : ''}`} onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>{icon} {label}</div>
      <ChevronRight size={16} style={{ opacity: active ? 1 : 0.4 }} />
    </button>
  );
}

// EditableRow Mejorado: Ahora soporta inputs de texto y selectores (dropdowns)
function EditableRow({ isEditing, icon, label, value, onChange, name, type = 'text', options = [] }) {
  
  // Si no está editando y es un select, busca el label legible para mostrarlo (ej: 'Español' en vez de 'es')
  const displayValue = type === 'select' && !isEditing 
    ? (options.find(opt => opt.value === value)?.label || value)
    : value;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ width: '48px', height: '48px', flexShrink: 0, background: 'rgba(230, 57, 70, 0.05)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E63946' }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', margin: '0 0 6px', letterSpacing: '0.5px' }}>{label}</p>
        
        {isEditing ? (
          type === 'select' ? (
            <select className="p-input" name={name} value={value} onChange={onChange} style={{ width: '100%', cursor: 'pointer' }}>
              {options.map((opt, i) => (
                <option key={i} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input className="p-input" name={name} value={value} onChange={onChange} style={{ width: '100%' }} placeholder={`Añadir ${label.toLowerCase()}...`} />
          )
        ) : (
          <p style={{ fontSize: '15px', fontWeight: 500, margin: 0, color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {displayValue || 'No registrado'}
          </p>
        )}
      </div>
    </div>
  );
}