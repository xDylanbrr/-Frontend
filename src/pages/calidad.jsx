import React from 'react';

export default function Calidad() {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main>
          {/* Hero Section */}
          <div className="w-full @container">
            <div className="p-4 sm:p-6 md:p-8">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4 text-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuHYeGNxz_m9U0bfCBWd2n2jF61Uk6Th_jTcqHXjjx5mKkurxFo2LwZZaDJwjHC1Wxu_NIRHmUN3EyItSw5WeV5ZkNKUduAMw4ORDntL6WAYUyr6A5nY3qcaBKtiNmvI-Ihnc0ptecZ5IR8ksVavFFeWkhACtbyq7gzpU3M0gSwmy0EZJ-WX5wBhpf9i7k7SnkPN-q1JOh16kvhJS4jGu6hKGl0nnMg-AteJ8m2FJjOjxDwXmfBL_KZXB1D923aXNnrTal1rtdQqT0")`
                }}
              >
                <div className="flex flex-col gap-2 max-w-3xl">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Calidad y Sostenibilidad: Nuestro Compromiso
                  </h1>
                  <h2 className="text-white/90 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">
                    Destacando nuestro compromiso con los más altos estándares de calidad y responsabilidad ambiental en la fabricación de empaques flexibles.
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Section */}
          <div className="flex flex-col gap-10 px-4 py-10 @container max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 text-center items-center">
              <h1 className="text-black dark:text-black tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                Nuestros Pilares de Excelencia
              </h1>
              <p className="text-black dark:text-black text-base font-normal leading-normal max-w-[720px]">
                Construimos nuestra reputación sobre tres pilares fundamentales: adhesión a normas internacionales, control de calidad riguroso y un profundo compromiso con la sostenibilidad ambiental.
              </p>
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="flex flex-col gap-16 md:gap-24 py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section 2: Control de Calidad Riguroso */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl md:order-last"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLbzbaDOdPJBFD8qeLOuhHv7ib7X3AicPic0fEJwn4J9-JJEPX398ADE7Aw3LUSgeNwLmDgvihS7aXgVsDvl9ZSwwPYVuIGZV7-CM6MOElQiKQqHLYUWmevD9FmOATxCbgInWhcwL-6R5wR9ftz3DgJ8h0LbVTqNcuXZAxROSKQEyjT2kNNE381szwLOOCULww02XqLlRDQudcQ57c-KBTfX3qDE7YevekoUmNllOaaUgWOgBJN0uPiCVwScZkUsLyUf9Dpc-TV-T2")`
                }}
              />
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">science</span>
                  <h2 className="text-black dark:text-black text-[22px] font-bold leading-tight tracking-[-0.015em]">Control de Calidad Riguroso</h2>
                </div>
                <p className="text-black dark:text-black">Nuestro proceso de control de calidad en múltiples etapas garantiza que cada producto cumpla con criterios estrictos de rendimiento y seguridad. Desde la inspección de materia prima hasta las pruebas finales del producto, no dejamos lugar a errores.</p>
                <ul className="space-y-2 pt-2">
                  <li className="flex items-center gap-3 text-black dark:text-black">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span> Pruebas de Resistencia de Materiales
                  </li>
                  <li className="flex items-center gap-3 text-black dark:text-black">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span> Análisis de Integridad de Sellado
                  </li>
                  <li className="flex items-center gap-3 text-black dark:text-black">
                    <span className="material-symbols-outlined text-primary text-xl">check_circle</span> Calidad de Impresión y Precisión de Color
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3: Sostenibilidad Ambiental */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-accent text-3xl">eco</span>
                  <h2 className="text-black dark:text-black text-[22px] font-bold leading-tight tracking-[-0.015em]">Sostenibilidad Ambiental</h2>
                </div>
                <p className="text-black dark:text-black">Estamos dedicados a prácticas ecológicas como parte fundamental de nuestra filosofía empresarial. Innovamos continuamente para minimizar nuestro impacto ambiental y promover una economía circular.</p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-accent text-xl mt-0.5">recycling</span>
                    <div>
                      <h3 className="font-semibold text-black dark:text-black">Uso de Materiales Reciclables</h3>
                      <p className="text-sm text-black dark:text-black">Priorizando materiales que pueden ser reciclados y reutilizados.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-accent text-xl mt-0.5">compost</span>
                    <div>
                      <h3 className="font-semibold text-black dark:text-black">Programas de Reducción de Residuos</h3>
                      <p className="text-sm text-black dark:text-black">Implementando procesos eficientes para minimizar los residuos de producción.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-green-accent text-xl mt-0.5">bolt</span>
                    <div>
                      <h3 className="font-semibold text-black dark:text-black">Medidas de Eficiencia Energética</h3>
                      <p className="text-sm text-black dark:text-black">Invirtiendo en tecnología para reducir nuestro consumo de energía.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBA-NMJq5mOzLtlpJHBUqWzaA90gOn2Iz-p39wGlxnoKukQUCIt4-tFwCV0fn8PJDjobqnzL-bCoGH8PyuVmrJLS9lmG8_sp_OmqxoEPZNaVT4yPw0eBPKJJz_o8tVT14uOG_avA2B2HzxW4ExVRUYQJp7vf9WdqPd2vLDszLrxTa6WqlIomv0C0laQNfn58UAxvbxxq-zGboJETyWiFsuunMDFA3x0Sdu37oFFBZkoKkRdtRhjpQwV_WXW6dFOMlELjJJIcsq76-_2")`
                }}
              />
            </section>
          </div>

          {/* CTA Section */}
          <section className="bg-white dark:bg-background-dark py-16 sm:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-black dark:text-white text-3xl font-bold tracking-tight sm:text-4xl">Comprometidos con la Excelencia, Dedicados a Nuestro Planeta.</h2>
              <p className="mt-4 text-lg leading-8 text-black dark:text-white">
                Aprende más sobre cómo nuestras iniciativas de calidad y sostenibilidad pueden beneficiar a tu negocio.
              </p>
              <div className="mt-8 flex items-center justify-center gap-x-6">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                  <span className="truncate">Contáctanos para Más Información</span>
                </button>
                <a className="text-base font-semibold leading-6 text-black dark:text-white" href="#">Explora nuestros productos <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}