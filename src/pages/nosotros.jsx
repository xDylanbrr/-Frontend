export default function Nosotros() {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative">
            <div
              className="w-full min-h-[480px] flex flex-col items-center justify-center p-4 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 22, 34, 0.6) 0%, rgba(16, 22, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUUECcpPjE5S25v5lq8D0xVcS6PvPoZylgCmk9i2CHsSwUCsu4jh1CfAyooHFRAlvAc1VzeWP7RWeKZb484i_P8N6MJkMnV4uYukYREoamsHbGphdJKJCOeiDJ0ksxue5u-ZCPtXKI1raZ703bpjcnbwbBYaV6f98Cb9j6fajfTrrOCCVMn8IhXaDQtnQ-8YwIBytpevyvQ9JK7s9YvrJvsXnLQMtVlKkV-Df5mqjQQMN4aTbO1XSwViB39pRfVE_iRjO5HXugbkIt")`
              }}
            >
              <div className="flex flex-col gap-4 text-center max-w-3xl">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-6xl">
                  Conoce a GTG
                </h1>
                <h2 className="text-gray-200 text-lg font-normal leading-normal md:text-xl">
                  Líderes en la fabricación de empaques flexibles.
                </h2>
              </div>
            </div>
          </section>

          {/* Nuestra Historia */}
          <section className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-4">
                  <h2 className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight md:text-4xl">
                    Nuestra Historia
                  </h2>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-relaxed">
                    Desde nuestra fundación, GTG se ha dedicado a la innovación y la calidad en el mundo del embalaje flexible. Nuestra trayectoria está marcada por un crecimiento constante y un compromiso inquebrantable con las necesidades de nuestros clientes, convirtiéndonos en un socio de confianza en la industria.
                  </p>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-relaxed">
                    Con décadas de experiencia, hemos perfeccionado nuestros procesos para ofrecer soluciones que no solo protegen productos, sino que también realzan marcas en el mercado global.
                  </p>
                </div>
                <div className="w-full aspect-4/3 rounded-xl overflow-hidden shadow-lg">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEe7Op5CZnx1EJgGPfgv03hHd4czrntMARF6B0_A1RBizhaHv03pDy1aN2EIiPQHNbCucFLDoyjyf7BI2dQykgvZ5UxKpEpJOf6EBNDFbbj-Lpj71u1snKGueOYhR3Oa1eMNGlWKxux5CicTYg_o6ZjDF5bHm4Uulu1kBsMB6PNzaigugjIWTrRSGnaVU3r0_JGaq9vlLmxHcEZw6cVtsVTeRG3OiJF7dQesl0BagfEaJewMxVkvK3HnCTjRZmrA_FdAVm9K6acni3")`
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Nuestros Principios */}
          <section className="bg-card-light dark:bg-card-dark py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h3 className="text-text-light dark:text-text-dark text-3xl font-bold leading-tight md:text-4xl">
                  Nuestros Principios
                </h3>
                <p className="mt-4 text-lg text-subtle-text-light dark:text-subtle-text-dark max-w-2xl mx-auto">
                  Los pilares que guían cada una de nuestras acciones y decisiones.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-4 text-center items-center rounded-xl p-8 bg-background-light dark:bg-background-dark transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/5 cursor-pointer">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 transition-colors duration-300 hover:bg-primary/20">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>rocket_launch</span>
                  </div>
                  <h4 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight">Misión</h4>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-normal">
                    Proveer soluciones de empaque innovadoras y de alta calidad que superen las expectativas de nuestros clientes, impulsando su éxito.
                  </p>
                </div>
                <div className="flex flex-col gap-4 text-center items-center rounded-xl p-8 bg-background-light dark:bg-background-dark transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/5 cursor-pointer">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 transition-colors duration-300 hover:bg-primary/20">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>visibility</span>
                  </div>
                  <h4 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight">Visión</h4>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-normal">
                    Ser el referente en la industria del empaque flexible, reconocidos por nuestra excelencia operativa, innovación constante y sostenibilidad.
                  </p>
                </div>
                <div className="flex flex-col gap-4 text-center items-center rounded-xl p-8 bg-background-light dark:bg-background-dark transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-primary/5 cursor-pointer">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 transition-colors duration-300 hover:bg-primary/20">
                    <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>shield</span>
                  </div>
                  <h4 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight">Nuestros Valores</h4>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-normal">
                    Calidad, innovación, integridad y compromiso con el cliente son los pilares fundamentales que nos definen y nos guían.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Nuestro Compromiso con la Calidad */}
          <section className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="w-full aspect-4/3 rounded-xl overflow-hidden shadow-lg">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzx-921yqZ64DCm9R_iaK0rhZK8CBrVbM_5eYEMqB0KXFOalnaXj6UO8RIyLfiWjRbGAS1M6wx8pBYyKyqa-s4uMan3TsDti8ommbWd-eqWKPI3YDHJfUdpECvo4qVt36vfDdLPugY95W45LjZFbSv6-05a7kCDaG1jDECdP-VJ_c0NqEPCtJ4hGa7I4vma2fsr22vynnNWsJsp8PHahHnriWSbzFaas5TrEXZMpA6RcAR4mWlr4T3Q9239xOhgOWG5u1BzIWCwKD-")`
                    }}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight md:text-4xl">
                    Nuestro Compromiso con la Calidad
                  </h2>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-relaxed">
                    En GTG, la calidad no es una opción, es una promesa. Nos adherimos a las más estrictas normas y certificaciones internacionales para asegurar que cada producto que sale de nuestras instalaciones cumple con los más altos estándares de excelencia.
                  </p>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-relaxed">
                    Nuestro riguroso control de calidad abarca cada etapa del proceso de producción, desde la materia prima hasta el empaque final, garantizando soluciones seguras, confiables y eficientes para nuestros clientes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sostenibilidad Ambiental */}
          <section className="bg-card-light dark:bg-card-dark py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-4">
                  <h2 className="text-text-light dark:text-text-dark tracking-light text-3xl font-bold leading-tight md:text-4xl">
                    Sostenibilidad Ambiental
                  </h2>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-relaxed">
                    Somos conscientes de nuestro impacto en el planeta. Por ello, en GTG estamos comprometidos con prácticas de producción eco-amigables, optimizando el uso de recursos y minimizando residuos.
                  </p>
                  <p className="text-subtle-text-light dark:text-subtle-text-dark text-base font-normal leading-relaxed">
                    Fomentamos activamente el uso de materiales reciclables y trabajamos constantemente en el desarrollo de soluciones de empaque más sostenibles, contribuyendo a un futuro más verde para las próximas generaciones.
                  </p>
                </div>
                <div className="w-full aspect-4/3 rounded-xl overflow-hidden shadow-lg">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{
                      backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAm9hpzXB_NrSfJ0CxidtmdFkO1Z3Pgv3lBR7Mvj1Zfs-0TvI66rHo4Tgg5SU6z1KGp0NAJYzy3YvcD7EKUBRJQa7AeJetrkZgQqICkJdl5rWbfaFnuJ1JDO33_bZ6eThaaotSasnSJapSvrAAFNe2TGUVzgCVQrqbvncjlREgF77-1NjsaDuWUY74TNZg-sECx29THavN46limJLxI7UubdofpSTjpXWs2IH-GWQnnxxeuEs4NamTrIfJ84Qm-mYFtzdxhY6KX1uHS")`
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
