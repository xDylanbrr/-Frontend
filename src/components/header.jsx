import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="text-2xl font-semibold tracking-tight">
          <span className="text-red-500">G</span>
          <span className="text-gray-800">T</span>
          <span className="text-gray-800">G</span>
        </h1>

        {/* NAV */}
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <Link
            to="/"
            className="transition-colors duration-200 hover:text-sky-500"
          >
            Inicio
          </Link>

          <Link
            to="/nosotros"
            className="transition-colors duration-200 hover:text-sky-500"
          >
            Nosotros
          </Link>

          <Link
            to="/productos"
            className="transition-colors duration-200 hover:text-sky-500"
          >
            Productos
          </Link>

          <Link
            to="/calidad"
            className="transition-colors duration-200 hover:text-sky-500"
          >
            Calidad
          </Link>

          <Link
            to="/carrito"
            className="transition-colors duration-200 hover:text-sky-500 flex items-center gap-2"
            aria-label="Ir al carrito"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l3-6H6.4M7 13l-1.2 4.4A2 2 0 008 20h8a2 2 0 001.8-1.4L19 13" />
            </svg>
            <span>Carrito</span>
          </Link>
        </nav>

      </div>
    </header>
  );
}
