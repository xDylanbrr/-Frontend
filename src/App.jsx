import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isTokenExpired, clearSession } from "./utils/auth";

// Layout & Protection
import Layout from "./components/layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/home";
import Nosotros from "./pages/nosotros";
import Productos from "./pages/productos";
import Calidad from "./pages/calidad";
import Carrito from "./pages/carrito";
import DetalleProducto from "./pages/DetalleProducto";

// Auth Pages
import LoginIndex from "./pages/LoginIndex";
import CompradorLogin from "./pages/CompradorLogin";
import CompradorRegister from "./pages/CompradorRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";

// Private Pages (Comprador)
import PerfilUsuario from "./pages/PerfilUsuario";
import Checkout from "./pages/Checkout";
import PersonalizarFundas from "./pages/PersonalizarFundas";
import PersonalizarFilms from "./pages/PersonalizarFilms";
import PersonalizarEtiquetas from "./pages/PersonalizarEtiquetas";
import PersonalizarEmpaques from "./pages/PersonalizarEmpaques";

// Admin & Production Pages
import EmpleadosPage from "./pages/administracion/empleados/EmpleadosPage";
import DepartamentosPage from "./pages/administracion/departamentos/DepartamentosPage";
import OrdenPedidoPage from "./pages/produccion/orden_pedido/OrdenPedidoPage";
import ProduccionPedidoPage from "./pages/produccion/produccion_pedido/ProduccionPedidoPage";
import PedidoTerminadoPage from "./pages/produccion/pedido_terminado/PedidoTerminadoPage";
import LogisticaPage from "./pages/logistica/LogisticaPage";
import ReciclajePage from "./pages/produccion/reciclaje/ReciclajePage";
import PedidosClientesPage from "./pages/administracion/pedidos_clientes/PedidosClientesPage";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      // Si el token existe y ya expiró, cerramos sesión antes de hidratar
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        clearSession();
        return null;
      }

      const admin = localStorage.getItem("admin");
      const comprador = localStorage.getItem("comprador");
      if (admin && admin !== "undefined" && admin !== "null")
        return { role: "admin", data: JSON.parse(admin) };
      if (comprador && comprador !== "undefined" && comprador !== "null")
        return { role: "comprador", data: JSON.parse(comprador) };
    } catch {
      clearSession();
    }
    return null;
  });

  return (
    <>
      <Routes>
      <Route path="/" element={<Layout user={user} setUser={setUser} />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="productos" element={<Productos />} />
        <Route path="calidad" element={<Calidad />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="producto/:id" element={<DetalleProducto />} />

        {/* Auth Routes */}
        <Route path="login-gtg" element={<LoginIndex setUser={setUser} />} />
        <Route path="comprador-login" element={<CompradorLogin setUser={setUser} />} />
        <Route path="comprador-register" element={<CompradorRegister setUser={setUser} />} />
        <Route path="admin-login" element={<AdminLogin setUser={setUser} />} />
        <Route path="admin-register" element={<AdminRegister />} />

        {/* Protected Routes (General/Comprador) */}
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <PerfilUsuario user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute role="comprador">
              <Checkout />
            </ProtectedRoute>
          }
        />
        
        {/* Personalización — requiere sesión de comprador */}
        <Route path="personalizar-fundas" element={<ProtectedRoute role="comprador"><PersonalizarFundas /></ProtectedRoute>} />
        <Route path="personalizar-films" element={<ProtectedRoute role="comprador"><PersonalizarFilms /></ProtectedRoute>} />
        <Route path="personalizar-etiquetas" element={<ProtectedRoute role="comprador"><PersonalizarEtiquetas /></ProtectedRoute>} />
        <Route path="personalizar-empaques" element={<ProtectedRoute role="comprador"><PersonalizarEmpaques /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route
          path="administracion/empleados"
          element={
            <ProtectedRoute role="admin">
              <EmpleadosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="administracion/departamentos"
          element={
            <ProtectedRoute role="admin">
              <DepartamentosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="administracion/pedidos-clientes"
          element={
            <ProtectedRoute role="admin">
              <PedidosClientesPage />
            </ProtectedRoute>
          }
        />

        {/* Producción */}
        <Route
          path="produccion/orden-pedido"
          element={
            <ProtectedRoute role="admin">
              <OrdenPedidoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="produccion/proceso"
          element={
            <ProtectedRoute role="admin">
              <ProduccionPedidoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="produccion/terminado"
          element={
            <ProtectedRoute role="admin">
              <PedidoTerminadoPage />
            </ProtectedRoute>
          }
        />

        {/* Logística Unificada */}
        <Route
          path="logistica"
          element={
            <ProtectedRoute role="admin">
              <LogisticaPage />
            </ProtectedRoute>
          }
        />

        {/* Flujo de Reciclaje */}
        <Route
          path="produccion/reciclaje"
          element={
            <ProtectedRoute role="admin">
              <ReciclajePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}