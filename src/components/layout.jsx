import React from "react";
import { Outlet } from "react-router-dom"; 
import Header from "./header"; // Asegúrate de que la capitalización coincida con tu archivo
import Footer from "./footer";

/**
 * El Layout actúa como el contenedor principal.
 * Recibe 'user' y 'setUser' desde App.jsx para distribuirlos.
 */
export default function Layout({ children, user, setUser }) {
  return (
    <div className="min-h-screen flex flex-col font-display bg-background-light text-text-light">
      
      {/* ✅ Pasamos los datos al Header para que la foto de perfil se actualice al instante */}
      <Header user={user} setUser={setUser} />
      
      <main className="flex-1">
        {/* Si el layout recibe children (uso manual), los muestra.
            Si se usa en App.jsx como contenedor de rutas, usa <Outlet />.
            Pasamos 'context' por si alguna página interna (como Perfil) lo necesita.
        */}
        {children || <Outlet context={{ user, setUser }} />}
      </main>
      
      <Footer />
    </div>
  );
}