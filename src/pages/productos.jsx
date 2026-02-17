import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Productos() {
  return (
    <main className="flex-1">

      {/* HERO */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 flex flex-col gap-12">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Nuestros Productos
            </h1>
            <p className="mt-4 text-lg text-text-light/80">
              Descubra nuestra amplia gama de soluciones de empaque flexible,
              diseñadas para satisfacer las necesidades específicas de su
              industria con la más alta calidad.
            </p>
          </div>

          {/* GRID PRODUCTOS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {productos.map((p) => (
              <div
                key={p.title}
                className="group bg-background-light dark:bg-section-dark
                rounded-xl shadow-sm overflow-hidden border border-section-light
                transform transition duration-300 hover:-translate-y-1"
              >
                <div
                  className="aspect-[4/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.img})` }}
                />

                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold group-hover:text-primary transition">
                    {p.title}
                  </h3>

                  <p className="mt-2 text-sm text-text-light/80 flex-grow">
                    {p.desc}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Ver más
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* PERSONALIZAR */}
      <section className="py-16 sm:py-24 bg-section-light">
        <div className="container mx-auto px-4 flex flex-col gap-12">

          <div className="text-center max-w-3xl mx-auto text-black">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Personaliza tus Empaques
            </h2>
            <p className="mt-4 text-lg text-black/80">
              Configure su solución de empaque a la medida. Elija el tipo,
              dimensiones y material para obtener una cotización personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {personalizacion.map((i) => (
              <div
                key={i.title}
                className="bg-white p-6 rounded-xl shadow-sm border
                flex flex-col text-black"
              >
                <h3 className="text-xl font-bold">{i.title}</h3>

                <p className="mt-2 mb-6 text-sm text-black/80 flex-grow">
                  {i.desc}
                </p>

<Link
  to={i.path}
  className="w-full py-2 rounded-lg font-semibold
  border border-blue-200
  text-blue-900
  hover:bg-blue-500 hover:text-white
  transition text-center"
>
  Personalizar
</Link>


              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

/* ================= DATA ================= */

const productos = [
  {
    title: "Bolsas de Polietileno",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKAwh_Jr-v5lPMOEBc2WBoLIJlaKN8IAndkt6FoJzLrKWX_oL_2Yb0znOYwNnNHhNVXNA-LlR8eTDIeK6aWp9mkZtOoYW8kmTr-NpZq0IQcKUBboWUJK_sqVrnYcxGQa3pp4kBSxfodc4yRmLsuKJTOkho1zNdwkOfXIYa6y_-x26J-ALPu0wkVpA0P857ni3PVm-ieuwwtiLUQrjYXCAfWFI7hxGDvWOX3WjjO-FG7XvGICmoEexPACVvgDB6Wu2g-ilyeq2Efi0R",
    desc:
      "Fabricamos bolsas de polietileno de alta y baja densidad, adaptadas a sus necesidades de resistencia y flexibilidad para diversas aplicaciones.",
  },
  {
    title: "Rollos de Plástico Termoencogible",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgPyXi69MN1rYv4JNv6x-_UTcxfM2lT7yaiZyUu4neHCkRLgcjjPYvBbCR1bHste1Q1ZGPLj4wFe85QTm9OKbX0qE1UIAORlCSB_ZCfWxjF3JIF1xK_VGOdvp8isIrU-fBDFHmO8-PRIvRYAgZEWCi-9lUKz1MrQ94GtuWffVvcR4rJAr7vqqksbqFtoOh_TNDWAa86NQ_BOUK_MQVUcatKDHP4moofIsQBHQop-67xYAp27DxF-MGH0rBs0F6UaoD-BT0OrV2mMfH",
    desc:
      "Película retráctil de alto rendimiento para agrupar y proteger productos, garantizando estabilidad y una presentación impecable durante el transporte.",
  },
  {
    title: "Empaques con Impresión Personalizada",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcMhjnY1G7Qs42n4NFXhzRsGr7rGmWVMdzETjPMVTmYZngm9v8LG8JwnkWO2IgcuYXJWKjyvgdppomMtfT0QFHUwFuWMezdXkU6mZAfdxBl-F-HkXNEoYnE36X1XYbLYbS4Hbh5CCG1p19laUqhlg7p0GKnYsEJi3qrEFVJsZ4eMtCNWej0bqyRjkzOBtdVyqOaFXgUhtlbmBIHpvN8RLbCFRqXNxBxpGdycMfuLhQxpeXyqeJOm3iqGeAhrQxVYwwbaARvasPqSz4",
    desc:
      "Soluciones de empaque con impresión flexográfica de alta calidad para que su marca destaque en el punto de venta.",
  },
  {
    title: "Láminas para Embalaje Industrial",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9NJl69ZHtXbpCV65Q6_-WYvNQvNy5dpSq8VIcMOIZDwo8mZDDNtuudNkpOy4HHreFp9ZSHayM3p156cxdE-o3htaoJdRC0VqAxmTvxv0ky3zDV6mgPI8jpOMmatkJIeBptmWor2Hx0zgb2a49M5qxiTurtwsJaJSz5iYnUCZP9JQyAWQfiEmR1LLmhZz3YdPsz8S5VIGonsEFluhmQJE9EbXhyk0lACZYccrClzesfFTSuvfn6lMVMeT-gPc8AjFWmzBYlwSySLOA",
    desc:
      "Láminas de polietileno para cubrir y proteger mercancías paletizadas, maquinaria y productos de gran volumen.",
  },
  {
    title: "Sacos de Alta Resistencia",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADJPX6yVSc3ZCMOIuvD6E7KdJDULvv69Pfv1cyg6fLIWri8bYpRP5rDoVGHt_RHS0fXp4Bdjlc6gKH3eJCpZZIJCU2-I74lSE176e7HGJs3NXYOGAguKYR2fCOPaQ_XV-FcHM_VDBqesDQxbwqYwAHZD0_ffecXkCyV4uKUQTwdSOPhjGC9ZD6UeByBqq15BxjpVU9y8EFH4WscBLTT4VIr2nk__tw1M7BrvU9gFPkH278xtyqABQ9JmWfMpSQn7XPn_uWsd3WLW5L",
    desc:
      "Sacos tejidos y de polietileno diseñados para soportar cargas pesadas en entornos industriales exigentes.",
  },
  {
    title: "Bolsas para Alimentos",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-fGKO3NKh2hwAwLBX5PbOlWtrw8u3MMxZaz-5CB96nOida4q5X763CdsTRId3vdgr47UCvQ3JIMG1yirSR7Vq3XUchctMX1Wy2qLBocLopE5TRPDrUs04k2xzkXaQYgsxh8mA8ax9CMyAonF2nayAmR8lWsQU5b1mFDbw10E4gRD3Y03kvLa3HbXWhGtLjUmLVWbxO8gdOOp5rn41sYOD7IglNOV1qP4e_VFvtoy1z5Lkj6UkBU7_FrejKIuHIKgaeqhqsfljTCVD",
    desc:
      "Bolsas fabricadas con materiales de grado alimenticio que cumplen con las normativas de seguridad.",
  },
];


const personalizacion = [
  {
    title: "Fundas",
    desc: "Personalice fundas plásticas a la medida de sus productos.",
    path: "/personalizar/fundas",  
  },
  {
    title: "Empaques",
    desc: "Diseñe empaques impresos que capturen la esencia de su marca.",
    path: "/personalizar/empaques",
  },
  {
    title: "Films",
    desc: "Especifique el calibre y material para sus rollos de película.",
    path: "/personalizar/films",
  },
  {
    title: "Etiquetas",
    desc: "Cree etiquetas adhesivas con sus especificaciones exactas.",
    path: "/personalizar/etiquetas",
  },
];
