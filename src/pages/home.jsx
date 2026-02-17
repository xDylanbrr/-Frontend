import {
  FaBoxOpen,
  FaLayerGroup,
  FaTags,
  FaBullseye,
  FaEye,
  FaRecycle,
  FaCog,
  FaCertificate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO */}
      <section className="relative w-full">
        <div className="@container">
          <div
            className="flex min-h-[calc(100vh-80px)] max-h-[720px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 text-center"
            style={{
              backgroundImage: `
              linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.6)),
              url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_LaXop1JmHJGeyXHeda1Yjy6IyNTzy-PlCMg3zyySl1PyyKzRb9gytexXhUl0nzWCOwHurHSEbFpXtYPxYs4YJDWoImHx5DzxI2Ave31sKx8YLW1WEoSbmordQd6YTqbNz9a5YMyWNLTohwXif7Ezbh4qyFy-BQ9ZySUrQ2bL6PL7QgQQLXGImSvqJFagMDrxArTpCGtW2txRGGMR-W7YL04QenKpFSQxtg6pyA6pt25akykMz0Z7_NmrgjS22VJlujQmUTKzcxrx")
            `,
            }}
          >
            <div className="max-w-3xl flex flex-col gap-4">
              <h1 className="text-white text-4xl font-black @[768px]:text-6xl">
                Soluciones Innovadoras en Empaques Flexibles
              </h1>
              <p className="text-white/90 text-lg">
                Ofrecemos soluciones de empaque de alta calidad adaptadas a las
                necesidades de su negocio.
              </p>
            </div>

            <button className="h-14 px-10 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-black text-lg shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] hover:shadow-blue-500/50 hover:scale-110 hover:-translate-y-1 transition-all duration-300 border-2 border-blue-400/30 animate-pulse" onClick={() => navigate("/login-gtg")}>
              Regístrate
            </button>
          </div>
        </div>
      </section>

{/* PRODUCTOS */}
<section className="py-16 bg-section-light dark:bg-section-dark">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-10">
      Nuestros Productos
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Bolsas",
          desc: "Soluciones versátiles para todo tipo de productos, desde alimentos hasta industriales.",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKAwh_Jr-v5lPMOEBc2WBoLIJlaKN8IAndkt6FoJzLrKWX_oL_2Yb0znOYwNnNHhNVXNA-LlR8eTDIeK6aWp9mkZtOoYW8kmTr-NpZq0IQcKUBboWUJK_sqVrnYcxGQa3pp4kBSxfodc4yRmLsuKJTOkho1zNdwkOfXIYa6y_-x26J-ALPu0wkVpA0P857ni3PVm-ieuwwtiLUQrjYXCAfWFI7hxGDvWOX3WjjO-FG7XvGICmoEexPACVvgDB6Wu2g-ilyeq2Efi0R",
        },
        {
          title: "Films",
          desc: "Películas de alta barrera para máxima protección y frescura de sus productos.",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgPyXi69MN1rYv4JNv6x-_UTcxfM2lT7yaiZyUu4neHCkRLgcjjPYvBbCR1bHste1Q1ZGPLj4wFe85QTm9OKbX0qE1UIAORlCSB_ZCfWxjF3JIF1xK_VGOdvp8isIrU-fBDFHmO8-PRIvRYAgZEWCi-9lUKz1MrQ94GtuWffVvcR4rJAr7vqqksbqFtoOh_TNDWAa86NQ_BOUK_MQVUcatKDHP4moofIsQBHQop-67xYAp27DxF-MGH0rBs0F6UaoD-BT0OrV2mMfH",
        },
        {
          title: "Etiquetas",
          desc: "Etiquetas personalizadas que realzan la identidad y el atractivo de su marca.",
          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMzk7JRR-ObN_Tu4Kgzc3hEt0-qa6ac1lEEpbmmNMweVgBQag1bTqyMw3qCNXPIurtC7h-SkxyIj0IsIQvi_UqwMtA83nO9f521TepnAtDae3ZbJECoEp3GMkALPbbWBmydWxHPeUjwbv6wWO5QJiVyKpLkJiC5qU3NoZsxQzN6kcbJr6i-6F5KNLyIhgRifGZTQqiK3Qg7c7xjp33AixuqN0zZUiiaMJAaKPxg75ARL7_e1LTHomFKuGm6diLRTQUD-rqz_EVkCfF",
        },
      ].map((p) => (
        <div
          key={p.title}
          className="
            rounded-xl overflow-hidden bg-background-light dark:bg-background-dark
            shadow transition-transform duration-300 ease-out
            hover:-translate-y-2 hover:shadow-lg
          "
        >
          <div
            className="aspect-video bg-cover bg-center"
            style={{ backgroundImage: `url(${p.img})` }}
          />

          <div className="p-5 text-center">
            <h3 className="font-bold text-lg mb-2">{p.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {p.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* MISION / VISION */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-xl flex gap-4">
            <FaBullseye className="text-primary text-3xl" />
            <div>
              <h3 className="font-bold text-lg mb-2">Nuestra Misión</h3>
              <p>
                Proveer soluciones de empaque innovadoras y sostenibles con
                calidad excepcional.
              </p>
            </div>
          </div>

          <div className="p-6 border rounded-xl flex gap-4">
            <FaEye className="text-primary text-3xl" />
            <div>
              <h3 className="font-bold text-lg mb-2">Nuestra Visión</h3>
              <p>
                Ser líderes en la industria del empaque flexible en la región.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALIDAD */}
      <section className="py-16 bg-section-light dark:bg-section-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Calidad y Sostenibilidad
          </h2>
<div className="max-w-3xl mx-auto px-6">
  <p className="text-center text-lg leading-relaxed text-black">
    Nuestro compromiso es <span className="font-semibold">inquebrantable</span>.
    Cumplimos con los más altos estándares de calidad y promovemos prácticas
    sostenibles en cada paso de nuestro proceso de producción para un
    <span className="font-semibold"> futuro más verde</span>.
  </p>
</div>

          <div className="flex justify-center gap-16">
            <div className="flex flex-col items-center gap-2">
              <FaCertificate className="text-primary text-4xl" />
              <span>Certificación ISO 9001</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FaRecycle className="text-primary text-4xl" />
              <span>Materiales Reciclables</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <FaCog className="text-primary text-4xl" />
              <span>Procesos Eficientes</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
