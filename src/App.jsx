import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";

import Layout from "./components/layout";

// Páginas públicas
import Home from "./pages/home";
import Nosotros from "./pages/nosotros";
import Productos from "./pages/productos";
import Calidad from "./pages/calidad";
import Carrito from "./pages/carrito";

// Personalizar
import PersonalizarFundas from "./pages/PersonalizarFundas";
import PersonalizarEmpaques from "./pages/PersonalizarEmpaques";
import PersonalizarFilms from "./pages/PersonalizarFilms";
import PersonalizarEtiquetas from "./pages/PersonalizarEtiquetas";

// Auth
import LoginIndex from "./pages/LoginIndex";
import CompradorLogin from "./pages/CompradorLogin";
import AdminLogin from "./pages/AdminLogin";
import CompradorRegister from "./pages/CompradorRegister";

// 🛠 ADMINISTRACIÓN
import DepartamentosPage from "./pages/administracion/departamentos/DepartamentosPage";
import EmpleadosPage from "./pages/administracion/empleados/EmpleadosPage";

function App() {
  return (
    <CartProvider>
      <Routes>

        {/* 🔐 RUTAS SIN LAYOUT */}
        <Route path="/login-gtg" element={<LoginIndex />} />
        <Route path="/comprador-login" element={<CompradorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/comprador-register" element={<CompradorRegister />} />

        {/* 🌐 RUTAS CON LAYOUT */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/calidad" element={<Calidad />} />
                <Route path="/carrito" element={<Carrito />} />

                {/* PERSONALIZAR */}
                <Route path="/personalizar/fundas" element={<PersonalizarFundas />} />
                <Route path="/personalizar/empaques" element={<PersonalizarEmpaques />} />
                <Route path="/personalizar/films" element={<PersonalizarFilms />} />
                <Route path="/personalizar/etiquetas" element={<PersonalizarEtiquetas />} />

                {/* 🛠 ADMINISTRACIÓN */}
                <Route
                  path="/administracion/departamentos"
                  element={<DepartamentosPage />}
                />

                <Route
                  path="/administracion/empleados"
                  element={<EmpleadosPage />}
                />
              </Routes>
            </Layout>
          }
        />

      </Routes>
    </CartProvider>
  );
}

export default App;