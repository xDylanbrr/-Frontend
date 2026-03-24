import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/layout";

// Páginas
import Home from "./pages/home";
import Nosotros from "./pages/nosotros";
import Productos from "./pages/productos";
import Calidad from "./pages/calidad";
import Carrito from "./pages/carrito";
import DetalleProducto from "./pages/DetalleProducto"; 
import Checkout from "./pages/Checkout"; 
import PerfilUsuario from "./pages/PerfilUsuario";

// Personalización
import PersonalizarFundas from "./pages/PersonalizarFundas";
import PersonalizarEmpaques from "./pages/PersonalizarEmpaques";
import PersonalizarFilms from "./pages/PersonalizarFilms";
import PersonalizarEtiquetas from "./pages/PersonalizarEtiquetas";

// Auth
import LoginIndex from "./pages/LoginIndex";
import CompradorLogin from "./pages/CompradorLogin";
import AdminLogin from "./pages/AdminLogin";
import CompradorRegister from "./pages/CompradorRegister";

// ADMINISTRACIÓN
import DepartamentosPage from "./pages/administracion/departamentos/DepartamentosPage";
import EmpleadosPage from "./pages/administracion/empleados/EmpleadosPage";

// =======================
// LOGÍSTICA 🚚
// =======================
import TransportePage from "./pages/logistica/transporte/TransportePage";
import EmpaquePage from "./pages/logistica/empaque/EmpaquePage";
import DespachoPage from "./pages/logistica/despacho/DespachoPage";

// =======================
// PRODUCCIÓN 🏭
// =======================
import OrdenPedidoPage from "./pages/produccion/orden_pedido/OrdenPedidoPage";
import ProduccionPedidoPage from "./pages/produccion/produccion_pedido/ProduccionPedidoPage";
import PedidoTerminadoPage from "./pages/produccion/pedido_terminado/PedidoTerminadoPage"; // ✅ NUEVA IMPORTACIÓN

function App() {
  const [user, setUser] = useState(null);

  // ✅ CARGA SEGURA: Recuperamos la sesión al recargar la página
  useEffect(() => {
    const comprador = localStorage.getItem("comprador");
    const admin = localStorage.getItem("admin");

    if (comprador && comprador !== "undefined") {
      setUser({ data: JSON.parse(comprador), role: "comprador" });
    } else if (admin && admin !== "undefined") {
      setUser({ data: JSON.parse(admin), role: "admin" });
    }
  }, []);

  // ✅ ACTUALIZACIÓN DINÁMICA: Sincroniza estado y almacenamiento local
  const handleUserUpdate = (newData) => {
    if (!user) return;
    const currentRole = user.role;
    
    // Actualizamos el estado global (esto refresca el Header automáticamente)
    setUser({ data: newData, role: currentRole });
    
    // Guardamos en el localStorage para la persistencia al F5
    localStorage.setItem(currentRole, JSON.stringify(newData));
  };

  return (
    <CartProvider>
      <Routes>
        {/* 🔐 RUTAS SIN LAYOUT */}
        <Route path="/login-gtg" element={<LoginIndex />} />
        <Route path="/comprador-login" element={<CompradorLogin />} />
        
        {/* ✅ MODIFICACIÓN AQUÍ: Pasamos setUser para que el Header cambie tras el login */}
        <Route path="/admin-login" element={<AdminLogin setUser={setUser} />} />
        
        <Route path="/comprador-register" element={<CompradorRegister />} />

        {/* 🌐 RUTAS CON LAYOUT: Pasamos user y setUser como props */}
        <Route element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/calidad" element={<Calidad />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />

          {/* ✅ PERFIL: Protegido pero accesible para CUALQUIER usuario logueado */}
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute user={user}>
                <PerfilUsuario user={user?.data} onUserUpdate={handleUserUpdate} />
              </ProtectedRoute>
            } 
          />

          {/* ✅ CHECKOUT: Solo para compradores */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute user={user} role="comprador">
                <Checkout />
              </ProtectedRoute>
            } 
          />

          {/* Personalización */}
          <Route path="/personalizar/fundas" element={<PersonalizarFundas />} />
          <Route path="/personalizar/empaques" element={<PersonalizarEmpaques />} />
          <Route path="/personalizar/films" element={<PersonalizarFilms />} />
          <Route path="/personalizar/etiquetas" element={<PersonalizarEtiquetas />} />

          {/* 🛠 ADMIN: Solo para el rol administrativo */}
          <Route
            path="/administracion/departamentos"
            element={
              <ProtectedRoute user={user} role="admin">
                <DepartamentosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/administracion/empleados"
            element={
              <ProtectedRoute user={user} role="admin">
                <EmpleadosPage />
              </ProtectedRoute>
            }
          />

          {/* 🚚 LOGÍSTICA */}
          <Route
            path="/logistica/transporte"
            element={
              <ProtectedRoute user={user} role="admin">
                <TransportePage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/logistica/empaque"
            element={
              <ProtectedRoute user={user} role="admin">
                <EmpaquePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logistica/despacho"
            element={
              <ProtectedRoute user={user} role="admin">
                <DespachoPage />
              </ProtectedRoute>
            }
          />

          {/* 🏭 PRODUCCIÓN */}
          <Route
            path="/produccion/orden-pedido"
            element={
              <ProtectedRoute user={user} role="admin">
                <OrdenPedidoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/produccion/proceso"
            element={
              <ProtectedRoute user={user} role="admin">
                <ProduccionPedidoPage />
              </ProtectedRoute>
            }
          />
          {/* ✅ NUEVO: RUTA DE PEDIDO TERMINADO */}
          <Route
            path="/produccion/terminado"
            element={
              <ProtectedRoute user={user} role="admin">
                <PedidoTerminadoPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<div className="py-20 text-center font-bold">Página no encontrada</div>} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;