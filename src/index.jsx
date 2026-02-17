import React from "react";

const App = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-section-light dark:border-section-dark px-2 sm:px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="size-6 text-primary">
                  <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">
                  GTG
                </h2>
              </div>
              <nav className="hidden md:flex flex-1 justify-end items-center gap-8">
                <a
                  className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary-accent"
                  href="/"
                >
                  Inicio
                </a>
                <a
                  className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary-accent"
                  href="/nosotros"
                >
                  Nosotros
                </a>
                <a
                  className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary-accent"
                  href="/productos"
                >
                  Productos
                </a>
                <a
                  className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary-accent"
                  href="/calidad"
                >
                  Calidad
                </a>
                <a
                  className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary-accent"
                  href="/contacto"
                >
                  Contacto
                </a>
              </nav>
              <button className="md:hidden p-2 rounded-lg hover:bg-section-light dark:hover:bg-section-dark">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative w-full">
            <div className="@container">
              <div
                className="flex min-h-[calc(100vh-80px)] max-h-[720px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 text-center"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_LaXop1JmHJGeyXHeda1Yjy6IyNTzy-PlCMg3zyySl1PyyKzRb9gytexXhUl0nzWCOwHurHSEbFpXtYPxYs4YJDWoImHx5DzxI2Ave31sKx8YLW1WEoSbmordQd6YTqbNz9a5YMyWNLTohwXif7Ezbh4qyFy-BQ9ZySUrQ2bL6PL7QgQQLXGImSvqJFagMDrxArTpCGtW2txRGGMR-W7YL04QenKpFSQxtg6pyA6pt25akykMz0Z7_NmrgjS22VJlujQmUTKzcxrx")',
                }}
              >
                <div className="flex flex-col gap-4 max-w-3xl">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[768px]:text-6xl">
                    Soluciones Innovadoras en Empaques Flexibles
                  </h1>
                  <h2 className="text-white/90 text-base font-normal leading-normal @[480px]:text-lg">
                    Ofrecemos soluciones de empaque de alta calidad adaptadas a las necesidades de su
                    negocio, combinando innovación y sostenibilidad.
                  </h2>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-accent transition-colors">
                  <span className="truncate">Contáctanos</span>
                </button>
              </div>
            </div>
          </section>

          {/* Productos Section */}
          <section className="py-16 sm:py-24 bg-section-light dark:bg-section-dark">
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-10">
                <div className="text-center">
                  <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">
                    Nuestros Productos
                  </h2>
                  <p className="mt-2 text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
                    Explora nuestra gama de soluciones de empaque diseñadas para proteger y realzar
                    el valor de tus productos.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Producto 1 */}
                  <div className="flex flex-col gap-4 pb-4 bg-background-light dark:bg-background-dark rounded-xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKAwh_Jr-v5lPMOEBc2WBoLIJlaKN8IAndkt6FoJzLrKWX_oL_2Yb0znOYwNnNHhNVXNA-LlR8eTDIeK6aWp9mkZtOoYW8kmTr-NpZq0IQcKUBboWUJK_sqVrnYcxGQa3pp4kBSxfodc4yRmLsuKJTOkho1zNdwkOfXIYa6y_-x26J-ALPu0wkVpA0P857ni3PVm-ieuwwtiLUQrjYXCAfWFI7hxGDvWOX3WjjO-FG7XvGICmoEexPACVvgDB6Wu2g-ilyeq2Efi0R")',
                      }}
                    ></div>
                    <div className="px-5">
                      <p className="text-lg font-bold">Bolsas</p>
                      <p className="text-text-light/80 dark:text-text-dark/80 text-sm">
                        Soluciones versátiles para todo tipo de productos, desde alimentos hasta
                        industriales.
                      </p>
                    </div>
                  </div>
                  {/* Producto 2 */}
                  <div className="flex flex-col gap-4 pb-4 bg-background-light dark:bg-background-dark rounded-xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgPyXi69MN1rYv4JNv6x-_UTcxfM2lT7yaiZyUu4neHCkRLgcjjPYvBbCR1bHste1Q1ZGPLj4wFe85QTm9OKbX0qE1UIAORlCSB_ZCfWxjF3JIF1xK_VGOdvp8isIrU-fBDFHmO8-PRIvRYAgZEWCi-9lUKz1MrQ94GtuWffVvcR4rJAr7vqqksbqFtoOh_TNDWAa86NQ_BOUK_MQVUcatKDHP4moofIsQBHQop-67xYAp27DxF-MGH0rBs0F6UaoD-BT0OrV2mMfH")',
                      }}
                    ></div>
                    <div className="px-5">
                      <p className="text-lg font-bold">Films</p>
                      <p className="text-text-light/80 dark:text-text-dark/80 text-sm">
                        Películas de alta barrera para máxima protección y frescura de sus productos.
                      </p>
                    </div>
                  </div>
                  {/* Producto 3 */}
                  <div className="flex flex-col gap-4 pb-4 bg-background-light dark:bg-background-dark rounded-xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMzk7JRR-ObN_Tu4Kgzc3hEt0-qa6ac1lEEpbmmNMweVgBQag1bTqyMw3qCNXPIurtC7h-SkxyIj0IsIQvi_UqwMtA83nO9f521TepnAtDae3ZbJECoEp3GMkALPbbWBmydWxHPeUjwbv6wWO5QJiVyKpLkJiC5qU3NoZsxQzN6kcbJr6i-6F5KNLyIhgRifGZTQqiK3Qg7c7xjp33AixuqN0zZUiiaMJAaKPxg75ARL7_e1LTHomFKuGm6diLRTQUD-rqz_EVkCfF")',
                      }}
                    ></div>
                    <div className="px-5">
                      <p className="text-lg font-bold">Etiquetas</p>
                      <p className="text-text-light/80 dark:text-text-dark/80 text-sm">
                        Etiquetas personalizadas que realzan la identidad y el atractivo de su marca.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sobre Nosotros Section */}
          <section className="py-16 sm:py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-10 @container">
                <div className="flex flex-col gap-4 max-w-3xl">
                  <h1 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">
                    Sobre Nosotros
                  </h1>
                  <p className="text-text-light/80 dark:text-text-dark/80">
                    Con años de experiencia en la industria, GTG se dedica a la innovación y a la
                    excelencia, proporcionando a nuestros clientes soluciones de empaque que superan
                    los estándares de la industria.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Misión */}
                  <div className="flex flex-1 gap-4 rounded-xl border border-section-light dark:border-section-dark bg-transparent p-6 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      track_changes
                    </span>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold">Nuestra Misión</h2>
                      <p className="text-text-light/80 dark:text-text-dark/80 text-sm">
                        Proveer soluciones de empaque innovadoras y sostenibles que agreguen valor a
                        los productos de nuestros clientes, garantizando calidad y servicio
                        excepcionales.
                      </p>
                    </div>
                  </div>
                  {/* Visión */}
                  <div className="flex flex-1 gap-4 rounded-xl border border-section-light dark:border-section-dark bg-transparent p-6 flex-col">
                    <span className="material-symbols-outlined text-primary text-3xl">visibility</span>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-bold">Nuestra Visión</h2>
                      <p className="text-text-light/80 dark:text-text-dark/80 text-sm">
                        Ser el líder reconocido en la industria del empaque flexible, impulsado por la
                        calidad, el servicio al cliente y la responsabilidad ambiental en toda la región.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Calidad Section */}
          <section className="py-16 sm:py-24 bg-section-light dark:bg-section-dark">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">
                    Calidad y Sostenibilidad
                  </h2>
                  <p className="text-text-light/80 dark:text-text-dark/80">
                    Nuestro compromiso es inquebrantable. Cumplimos con los más altos estándares de
                    calidad y promovemos prácticas sostenibles en cada paso de nuestro proceso de
                    producción para un futuro más verde.
                  </p>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-primary text-4xl">verified</span>
                      <span className="text-sm font-medium">Certificación ISO 9001</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-primary text-4xl">recycling</span>
                      <span className="text-sm font-medium">Materiales Reciclables</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="material-symbols-outlined text-primary text-4xl">manufacturing</span>
                      <span className="text-sm font-medium">Procesos Eficientes</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-5 bg-transparent border-2 border-primary text-primary text-base font-bold leading-normal hover:bg-primary hover:text-white transition-colors">
                      <span className="truncate">Conocer Más</span>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <div className="aspect-w-4 aspect-h-3">
                    <div
                      className="w-full h-full bg-cover bg-center rounded-xl"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAp5GHvh9z6VIgJwaHTuOYbAYETc3Uy0_J46SUFOSv_9nuRQ-_3Xb2u7oTSnquupxKKQs2eucNH_hPRqIxr8tHQGoV5IFQP7tm6MsE0DHH5fIuzDAUM1Ja3sqQwKL4f6bVYyoULr0PMEnZ9-CLiT0NjWy5C8Kpo0GmgfIwBgk-Rppvjk0_bfvd9tBIhqmhBky4kLVcPwooxRwYrOTG_h3tb8IIIcheDJPWoMVwOe_TZpAuDDsKDlCyYdr70fRFb2C-V83NJ0grFMzoh')",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white dark:bg-background-dark border-t border-section-dark">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-bold">GTG</h3>
                <p className="mt-2 text-sm text-gray-400 max-w-md">
                  Líderes en soluciones de empaques flexibles, comprometidos con la calidad,
                  innovación y sostenibilidad para potenciar tu marca.
                </p>
              </div>
              <div>
                <h4 className="font-semibold tracking-wider uppercase">Enlaces</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a className="text-gray-400 hover:text-white" href="/productos">
                      Productos
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-400 hover:text-white" href="/nosotros">
                      Nosotros
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-400 hover:text-white" href="/calidad">
                      Calidad
                    </a>
                  </li>
                  <li>
                    <a className="text-gray-400 hover:text-white" href="/contacto">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold tracking-wider uppercase">Contacto</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2 text-gray-400">
                    <span className="material-symbols-outlined text-lg mt-0.5">location_on</span>
                    <span>Zona Industrial, Santo Domingo, RD</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <span className="material-symbols-outlined text-lg mt-0.5">call</span>
                    <span>(809) 555-1234</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-400">
                    <span className="material-symbols-outlined text-lg mt-0.5">email</span>
                    <span>info@gtg.com.do</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
              <p>© 2024 GTG (Grupo Notions RD). Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
