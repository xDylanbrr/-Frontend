import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="font-display bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark min-h-screen">
      <Navbar />

      <main className="flex-1">

        {/* HERO */}
        <section className="relative w-full">
          <div
            className="flex min-h-[calc(100vh-80px)] max-h-[720px] flex-col gap-6 bg-cover bg-center items-center justify-center p-8 text-center"
            style={{
              backgroundImage:
                `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.6)),
                url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_LaXop1JmHJGeyXHeda1Yjy6IyNTzy-PlCMg3zyySl1PyyKzRb9gytexXhUl0nzWCOwHurHSEbFpXtYPxYs4YJDWoImHx5DzxI2Ave31sKx8YLW1WEoSbmordQd6YTqbNz9a5YMyWNLTohwXif7Ezbh4qyFy-BQ9ZySUrQ2bL6PL7QgQQLXGImSvqJFagMDrxArTpCGtW2txRGGMR-W7YL04QenKpFSQxtg6pyA6pt25akykMz0Z7_NmrgjS22VJlujQmUTKzcxrx")`,
            }}
          >
            <h1 className="text-white text-4xl font-black @[768px]:text-6xl">
              Soluciones Innovadoras en Empaques Flexibles
            </h1>
            <p className="text-white/90 max-w-2xl">
              Ofrecemos soluciones de empaque de alta calidad adaptadas a las necesidades de su negocio.
            </p>
            <button className="h-12 px-6 bg-primary text-white rounded-lg font-bold hover:bg-primary-accent transition">
              Contáctanos
            </button>
          </div>
        </section>

        {/* PRODUCTOS */}
        <section className="py-16 bg-section-light dark:bg-section-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Nuestros Productos</h2>
              <p className="text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
                Explora nuestra gama de soluciones de empaque.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Bolsas",
                  text: "Soluciones versátiles para todo tipo de productos.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKAwh_Jr-v5lPMOEBc2WBoLIJlaKN8IAndkt6FoJzLrKWX_oL_2Yb0znOYwNnNHhNVXNA-LlR8eTDIeK6aWp9mkZtOoYW8kmTr-NpZq0IQcKUBboWUJK_sqVrnYcxGQa3pp4kBSxfodc4yRmLsuKJTOkho1zNdwkOfXIYa6y_-x26J-ALPu0wkVpA0P857ni3PVm-ieuwwtiLUQrjYXCAfWFI7hxGDvWOX3WjjO-FG7XvGICmoEexPACVvgDB6Wu2g-ilyeq2Efi0R"
                },
                {
                  title: "Films",
                  text: "Películas de alta barrera para máxima protección.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgPyXi69MN1rYv4JNv6x-_UTcxfM2lT7yaiZyUu4neHCkRLgcjjPYvBbCR1bHste1Q1ZGPLj4wFe85QTm9OKbX0qE1UIAORlCSB_ZCfWxjF3JIF1xK_VGOdvp8isIrU-fBDFHmO8-PRIvRYAgZEWCi-9lUKz1MrQ94GtuWffVvcR4rJAr7vqqksbqFtoOh_TNDWAa86NQ_BOUK_MQVUcatKDHP4moofIsQBHQop-67xYAp27DxF-MGH0rBs0F6UaoD-BT0OrV2mMfH"
                },
                {
                  title: "Etiquetas",
                  text: "Etiquetas personalizadas que realzan tu marca.",
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMzk7JRR-ObN_Tu4Kgzc3hEt0-qa6ac1lEEpbmmNMweVgBQag1bTqyMw3qCNXPIurtC7h-SkxyIj0IsIQvi_UqwMtA83nO9f521TepnAtDae3ZbJECoEp3GMkALPbbWBmydWxHPeUjwbv6wWO5QJiVyKpLkJiC5qU3NoZsxQzN6kcbJr6i-6F5KNLyIhgRifGZTQqiK3Qg7c7xjp33AixuqN0zZUiiaMJAaKPxg75ARL7_e1LTHomFKuGm6diLRTQUD-rqz_EVkCfF"
                }
              ].map((item, i) => (
                <div key={i} className="bg-background-light dark:bg-background-dark rounded-xl shadow hover:-translate-y-1 transition">
                  <div
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.img})` }}
                  />
                  <div className="p-5">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-text-light/80 dark:text-text-dark/80">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE NOSOTROS */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Sobre Nosotros</h2>
            <p className="max-w-3xl text-text-light/80 dark:text-text-dark/80">
              Con años de experiencia en la industria, GTG se dedica a la innovación y excelencia.
            </p>
          </div>
        </section>

        {/* CALIDAD */}
        <section className="py-16 bg-section-light dark:bg-section-dark">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Calidad y Sostenibilidad</h2>
              <p className="text-text-light/80 dark:text-text-dark/80">
                Cumplimos con los más altos estándares de calidad y sostenibilidad.
              </p>
            </div>
            <div
              className="aspect-video rounded-xl bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAp5GHvh9z6VIgJwaHTuOYbAYETc3Uy0_J46SUFOSv_9nuRQ-_3Xb2u7oTSnquupxKKQs2eucNH_hPRqIxr8tHQGoV5IFQP7tm6MsE0DHH5fIuzDAUM1Ja3sqQwKL4f6bVYyoULr0PMEnZ9-CLiT0NjWy5C8Kpo0GmgfIwBgk-Rppvjk0_bfvd9tBIhqmhBky4kLVcPwooxRwYrOTG_h3tb8IIIcheDJPWoMVwOe_TZpAuDDsKDlCyYdr70fRFb2C-V83NJ0grFMzoh')",
              }}
            />
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white py-12 text-center">
        <p className="text-sm text-gray-400">
          © 2024 GTG (Grupo Notions RD). Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
