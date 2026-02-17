import { Facebook, Globe2Icon, GlobeLock, Instagram, Linkedin, Youtube } from "lucide-react";
import { FaGoogleDrive } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-10 flex flex-col gap-6 items-center">
        {/* NOMBRE / MARCA */}
        <h3 className="text-lg font-bold tracking-wide">
          GTG<span className="text-blue-500">.</span>
        </h3>

<div className="flex gap-5">
  <a href="https://www.facebook.com/GTGPlasticPackaging/" target="_blank" rel="noopener noreferrer">
    <Facebook className="w-5 h-5 text-blue-500 hover:text-white transition cursor-pointer" />
  </a>

  <a href="https://www.instagram.com/gtgplasticpackaging/followers/" target="_blank" rel="noopener noreferrer">
    <Instagram className="w-5 h-5 text-blue-500 hover:text-white transition cursor-pointer" />
  </a>

  <a href="https://www.google.com/maps/place/Global+Technology+Group/@19.474836,-70.734787,809m/data=!3m1!1e3!4m6!3m5!1s0x8eb1c6172c9818f7:0xb0a6d8e2f1fc6e5b!8m2!3d19.474836!4d-70.734787!16s%2Fg%2F11c2lg_p_g?entry=ttu&g_ep=EgoyMDI2MDExMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
    <Globe2Icon className="w-5 h-5 text-blue-500 hover:text-white transition cursor-pointer" />
  </a>
</div>

        {/* TEXTO LEGAL */}
        <p className="text-sm text-white/60 text-center">
          © 2026 GTG. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
