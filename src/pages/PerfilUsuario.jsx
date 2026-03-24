import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUpload, FaSpinner, FaEnvelope, 
  FaPhone, FaMapMarkerAlt, FaDownload, FaSignature, 
  FaTrash, FaSave, FaBell, FaCheckCircle, FaUser, FaCog
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import SignatureCanvas from 'react-signature-canvas';

// ─── INLINE STYLES ────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .perfil-root * { box-sizing: border-box; }
  .perfil-root { font-family: 'Plus Jakarta Sans', sans-serif; }

  .perfil-fade-in { animation: perfilFadeIn 0.5s ease both; }
  @keyframes perfilFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .perfil-card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .perfil-card-hover:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

  .perfil-notif-slide {
    animation: perfilSlideDown 0.2s ease both;
  }
  @keyframes perfilSlideDown {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .perfil-tab-active {
    background: #111827;
    color: white !important;
    box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  }

  .perfil-sig-canvas canvas { cursor: crosshair !important; }

  .perfil-info-row:hover .perfil-info-icon { 
    background: #111827; 
    color: white; 
    transform: scale(1.05); 
  }
  .perfil-info-icon { transition: all 0.2s ease; }
`;

export default function PerfilUsuario({ user, onUserUpdate }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingSignature, setIsSavingSignature] = useState(false);
  const [firmaGuardada, setFirmaGuardada] = useState(user?.firma || null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificaciones, setNotificaciones] = useState(user?.notificaciones || []);
  const [activeTab, setActiveTab] = useState('perfil');

  const fileInputRef = useRef(null);
  const sigCanvas = useRef({});
  const notifRef = useRef(null);
  const idParaEnvio = user?.id_usuario || user?.id;

  useEffect(() => {
    if (user?.notificaciones) setNotificaciones(user.notificaciones);
  }, [user]);

  // Cerrar notificaciones al hacer click fuera
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unreadCount = notificaciones.filter(n => !n.leido).length;

  const toggleNotifications = () => {
    setShowNotifications(v => !v);
    if (!showNotifications && unreadCount > 0) {
      setNotificaciones(notificaciones.map(n => ({ ...n, leido: true })));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const limpiarFirma = () => sigCanvas.current.clear();

  const guardarFirma = async () => {
    if (sigCanvas.current.isEmpty()) return alert("⚠️ Por favor, dibuja tu firma primero.");
    const imagenFirma = sigCanvas.current.getCanvas().toDataURL('image/png');
    setIsSavingSignature(true);
    try {
      const response = await fetch("https://backend-m3nj.onrender.com/api/auth/perfil/firma", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: idParaEnvio, firma: imagenFirma }),
      });
      const data = await response.json();
      if (response.ok) {
        setFirmaGuardada(imagenFirma);
        if (onUserUpdate) onUserUpdate(data.user);
        alert("✅ ¡Firma guardada!");
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch {
      alert("❌ No se pudo conectar con el servidor.");
    } finally {
      setIsSavingSignature(false);
    }
  };

  const descargarCarnet = () => {
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: [54, 85] });
    doc.setFillColor(17, 24, 39);
    doc.rect(0, 0, 54, 85, 'F');
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 54, 18, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text("GTG", 27, 12, { align: 'center' });
    doc.setFontSize(6);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text("IDENTIFICACIÓN CORPORATIVA", 27, 16, { align: 'center' });
    doc.setFillColor(37, 99, 235);
    doc.circle(27, 38, 13, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(7);
    doc.setFont(undefined, 'bold');
    doc.text(user?.nombre?.toUpperCase() || "USUARIO", 27, 57, { align: 'center' });
    doc.setFontSize(6);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(user?.rol?.toUpperCase() || "OPERARIO", 27, 63, { align: 'center' });
    doc.text(`ID: ${idParaEnvio}`, 27, 75, { align: 'center' });
    doc.save(`Carnet_GTG_${user?.nombre}.pdf`);
  };

  const handleSubmitFoto = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('imagenPerfil', selectedFile);
    formData.append('userId', idParaEnvio);
    try {
      const response = await fetch("https://backend-m3nj.onrender.com/api/auth/perfil/imagen", {
        method: "PATCH",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        onUserUpdate(data.user);
        setSelectedFile(null);
        setPreviewUrl(null);
        alert("✅ Foto actualizada");
      }
    } catch {
      alert("❌ Error de conexión");
    } finally {
      setIsLoading(false);
    }
  };

  const profileImage = user?.imagen_perfil
    ? `https://backend-m3nj.onrender.com/uploads/perfiles/${user.imagen_perfil}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nombre || 'U')}&background=111827&color=fff&bold=true&size=200`;

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: <FaUser size={11}/> },
    { id: 'firma', label: 'Firma', icon: <FaSignature size={11}/> },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="perfil-root" style={{
        minHeight: '100vh',
        background: '#f1f5f9',
        padding: '32px 24px',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }} className="perfil-fade-in">
          
          {/* ── TOP BAR ─────────────────────────────────────────── */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 28
          }}>
            <div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: 22, color: '#111827', letterSpacing: '-0.5px'
              }}>
                GTG <span style={{ color: '#3b82f6' }}>·</span> Panel de Usuario
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>
                Bienvenido de vuelta, <strong style={{ color: '#475569' }}>{user?.nombre || 'Usuario'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Notificaciones */}
              <div ref={notifRef} style={{ position: 'relative' }}>
                <button onClick={toggleNotifications} style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: 'white', border: '1px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', position: 'relative',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>
                  <FaBell style={{ color: unreadCount > 0 ? '#3b82f6' : '#94a3b8', fontSize: 16 }} />
                  {unreadCount > 0 && (
                    <span style={{
                      position: 'absolute', top: 6, right: 6,
                      width: 8, height: 8, borderRadius: '50%',
                      background: '#ef4444', border: '2px solid white'
                    }} />
                  )}
                </button>

                {showNotifications && (
                  <div className="perfil-notif-slide" style={{
                    position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                    width: 320, background: 'white', borderRadius: 20,
                    boxShadow: '0 25px 50px rgba(0,0,0,0.12)',
                    border: '1px solid #f1f5f9', zIndex: 100, overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '14px 18px', borderBottom: '1px solid #f1f5f9',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: '#111827', fontFamily: "'Syne', sans-serif" }}>
                        Notificaciones
                      </span>
                      {unreadCount === 0 && (
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>Todo al día ✓</span>
                      )}
                    </div>
                    <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                      {notificaciones.length > 0 ? notificaciones.map((n, i) => (
                        <div key={i} style={{
                          padding: '14px 18px',
                          borderBottom: '1px solid #f8fafc',
                          background: !n.leido ? '#eff6ff' : 'white',
                          display: 'flex', gap: 12, alignItems: 'flex-start'
                        }}>
                          <div style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: !n.leido ? '#3b82f6' : '#e2e8f0',
                            marginTop: 5, flexShrink: 0
                          }} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', marginBottom: 3 }}>{n.titulo}</div>
                            <div style={{ fontSize: 12, color: '#64748b' }}>{n.mensaje}</div>
                          </div>
                        </div>
                      )) : (
                        <div style={{ padding: 32, textAlign: 'center' }}>
                          <FaCheckCircle style={{ color: '#e2e8f0', fontSize: 28, marginBottom: 8 }} />
                          <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, margin: 0 }}>Sin notificaciones</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Config icon */}
              <button style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'white', border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
              }}>
                <FaCog style={{ color: '#94a3b8', fontSize: 16 }} />
              </button>
            </div>
          </div>

          {/* ── MAIN GRID ───────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, alignItems: 'stretch' }}>
            
            {/* ── LEFT COLUMN ────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* PROFILE CARD */}
              <div style={{
                background: '#1B3A5C',
                borderRadius: 24, overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(27,58,92,0.30)',
                flex: 1
              }}>
                <div style={{ padding: '32px 24px 28px', position: 'relative' }}>
                  {/* Avatar */}
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                    <img
                      src={previewUrl || profileImage}
                      style={{
                        width: 84, height: 84, borderRadius: '50%',
                        objectFit: 'cover', border: '3px solid rgba(255,255,255,0.30)'
                      }}
                      alt="Perfil"
                    />
                    <button
                      onClick={() => fileInputRef.current.click()}
                      style={{
                        position: 'absolute', bottom: 2, right: 2,
                        width: 28, height: 28, borderRadius: '50%',
                        background: 'white', color: '#1B3A5C',
                        border: '2px solid rgba(255,255,255,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontSize: 11
                      }}
                    >
                      <FaUpload size={10} />
                    </button>
                  </div>

                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800, fontSize: 22, color: 'white',
                    letterSpacing: '-0.5px', marginBottom: 4
                  }}>
                    {user?.nombre || 'Usuario'}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                    <span style={{
                      background: 'rgba(59,130,246,0.15)',
                      color: '#60a5fa', fontSize: 11, fontWeight: 700,
                      padding: '4px 12px', borderRadius: 20,
                      border: '1px solid rgba(59,130,246,0.25)',
                      letterSpacing: '0.05em', textTransform: 'uppercase'
                    }}>
                      {user?.rol || 'Cliente'}
                    </span>
                    <span style={{
                      background: 'rgba(34,197,94,0.15)',
                      color: '#4ade80', fontSize: 11, fontWeight: 700,
                      padding: '4px 12px', borderRadius: 20,
                      border: '1px solid rgba(34,197,94,0.25)'
                    }}>
                      ● Activo
                    </span>
                  </div>

                  {/* PEDIDOS STATS */}
                  <div style={{
                    background: 'rgba(255,255,255,0.07)',
                    borderRadius: 16, padding: '16px 12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: 8
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
                      textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14
                    }}>
                      Resumen de Pedidos
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                      {[
                        { value: user?.totalPedidos ?? '—', label: 'Total' },
                        { value: user?.pedidosCompletados ?? '—', label: 'Completados' },
                        { value: user?.pedidosPendientes ?? '—', label: 'Pendientes' },
                      ].map(stat => (
                        <div key={stat.label} style={{
                          background: 'rgba(255,255,255,0.06)',
                          borderRadius: 12, padding: '10px 6px',
                          textAlign: 'center'
                        }}>
                          <div style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 800, fontSize: 20, color: 'white', lineHeight: 1
                          }}>
                            {stat.value}
                          </div>
                          <div style={{
                            fontSize: 9, color: 'rgba(255,255,255,0.4)',
                            marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em'
                          }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedFile && (
                    <button
                      onClick={handleSubmitFoto}
                      disabled={isLoading}
                      style={{
                        width: '100%', padding: '12px', marginTop: 8,
                        background: '#22c55e', color: 'white',
                        border: 'none', borderRadius: 14,
                        fontWeight: 700, fontSize: 12, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      }}
                    >
                      {isLoading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : 'CONFIRMAR NUEVA FOTO'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ───────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* TABS */}
              <div style={{
                background: 'white', borderRadius: 20, padding: 6,
                display: 'flex', gap: 4,
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
              }}>
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={activeTab === t.id ? 'perfil-tab-active' : ''}
                    style={{
                      flex: 1, padding: '10px 16px',
                      border: 'none', borderRadius: 14,
                      fontWeight: 600, fontSize: 13, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      background: activeTab === t.id ? '#111827' : 'transparent',
                      color: activeTab === t.id ? 'white' : '#94a3b8',
                      transition: 'all 0.2s',
                      fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              {/* TAB: PERFIL */}
              {activeTab === 'perfil' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  
                  {/* Info personal */}
                  <div style={{
                    background: 'white', borderRadius: 20, padding: 28,
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                  }} className="perfil-card-hover">
                    <div style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800, fontSize: 14, color: '#111827',
                      marginBottom: 24, letterSpacing: '-0.2px'
                    }}>
                      Información de Contacto
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {[
                        { icon: <FaEnvelope />, label: 'Email', value: user?.correo || user?.email },
                        { icon: <FaPhone />, label: 'Teléfono', value: user?.telefono },
                        { icon: <FaMapMarkerAlt />, label: 'Dirección', value: user?.direccion },
                      ].map(item => (
                        <div key={item.label} className="perfil-info-row" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                          <div className="perfil-info-icon" style={{
                            width: 42, height: 42, borderRadius: 13,
                            background: '#f8fafc', border: '1px solid #e2e8f0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#64748b', fontSize: 15, flexShrink: 0
                          }}>
                            {item.icon}
                          </div>
                          <div>
                            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>
                              {item.label}
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>
                              {item.value || 'No registrado'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: FIRMA */}
              {activeTab === 'firma' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{
                    background: 'white', borderRadius: 20, padding: 24,
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 800, fontSize: 14, color: '#111827', marginBottom: 16
                    }}>
                      Dibuja tu Firma
                    </div>
                    <div className="perfil-sig-canvas" style={{
                      border: '2px dashed #e2e8f0', borderRadius: 16,
                      background: '#fafafa', overflow: 'hidden', marginBottom: 12
                    }}>
                      <SignatureCanvas
                        ref={sigCanvas}
                        penColor='#111827'
                        canvasProps={{ className: 'w-full', style: { width: '100%', height: 160 } }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={limpiarFirma} style={{
                        padding: '10px 16px', borderRadius: 12,
                        background: '#fee2e2', color: '#dc2626',
                        border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
                        display: 'flex', alignItems: 'center', gap: 6
                      }}>
                        <FaTrash size={11} /> Limpiar
                      </button>
                      <button onClick={guardarFirma} disabled={isSavingSignature} style={{
                        flex: 1, padding: '10px 16px', borderRadius: 12,
                        background: '#111827', color: 'white',
                        border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        opacity: isSavingSignature ? 0.6 : 1
                      }}>
                        {isSavingSignature ? <FaSpinner /> : <><FaSave size={11} /> Guardar Firma</>}
                      </button>
                    </div>
                  </div>

                  {firmaGuardada ? (
                    <div style={{
                      background: 'white', borderRadius: 20, padding: 24,
                      border: '1px solid #f1f5f9',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <div style={{
                        fontSize: 10, fontWeight: 700, color: '#94a3b8',
                        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16
                      }}>
                        Firma Registrada
                      </div>
                      <div style={{
                        background: '#f8fafc', borderRadius: 16, padding: 20,
                        border: '1px solid #e2e8f0', width: '100%', textAlign: 'center'
                      }}>
                        <img src={firmaGuardada} alt="Firma" style={{ maxHeight: 80, objectFit: 'contain', mixBlendMode: 'multiply' }} />
                      </div>
                      <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
                        Firma válida · Sincronizada con el servidor
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      background: '#f8fafc', borderRadius: 20, padding: 24,
                      border: '2px dashed #e2e8f0',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: 8
                    }}>
                      <FaSignature style={{ color: '#cbd5e1', fontSize: 32 }} />
                      <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600, textAlign: 'center' }}>
                        Sin firma registrada.<br />Dibuja y guarda tu firma.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
      </div>
    </>
  );
}