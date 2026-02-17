import { useCart } from '../components/CartContext';


            {/* Parte de los pedidos*/}

export default function Carrito() {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const envio = 150;
  const total = subtotal + envio;

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="bg-background-light dark:bg-section-dark p-6 sm:p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark border-b border-light dark:border-dark pb-4 mb-6">Carrito de Compras</h2>
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-center text-text-light/60 dark:text-text-dark/60 py-6">Tu carrito está vacío.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-text-light dark:text-text-dark">{item.title}</h3>
                      <p className="text-sm text-text-light/80 dark:text-text-dark/80 mt-1">{item.details}</p>
                      <p className="font-bold text-primary dark:text-primary-accent mt-2 text-lg">RD${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-light dark:border-dark mt-8 pt-6 space-y-3">
              <div className="flex justify-between text-text-light/80 dark:text-text-dark/80">
                <span>Subtotal</span>
                <span>RD${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-light/80 dark:text-text-dark/80">
                <span>Envío</span>
                <span>RD${envio.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl text-text-light dark:text-text-dark">
                <span>Total</span>
                <span>RD${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bg-background-light dark:bg-section-dark p-6 sm:p-8 rounded-xl shadow-lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-6">Información de Envío</h2>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-1" htmlFor="nombre">Nombre Completo</label>
                    <input className="w-full bg-section-light dark:bg-background-dark border-light dark:border-dark rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent" id="nombre" name="nombre" type="text" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-1" htmlFor="direccion">Dirección</label>
                    <input className="w-full bg-section-light dark:bg-background-dark border-light dark:border-dark rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent" id="direccion" name="direccion" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-1" htmlFor="ciudad">Ciudad</label>
                    <input className="w-full bg-section-light dark:bg-background-dark border-light dark:border-dark rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent" id="ciudad" name="ciudad" type="text" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-1" htmlFor="codigo_postal">Código Postal</label>
                    <input className="w-full bg-section-light dark:bg-background-dark border-light dark:border-dark rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent" id="codigo_postal" name="codigo_postal" type="text" />
                  </div>
                </form>
              </div>
              <div className="border-t border-light dark:border-dark"></div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-light dark:text-text-dark mb-6">Método de Pago</h2>
                <form className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-1" htmlFor="numero_tarjeta">Número de Tarjeta</label>
                    <input className="w-full pl-3 pr-12 bg-section-light dark:bg-background-dark border-light dark:border-dark rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent" id="numero_tarjeta" name="numero_tarjeta" type="text" />
                    <div className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 pointer-events-none gap-1">
                      <img alt="Visa" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVFL1fQrOXwwqiMQycHRIijYmBZc3XWxMtYnVzw4l4S6Y2_Q0VlPaDnwSXWV45JnvDLme0lgpqpxQCROpOKoyZMwtXjrlaE9-UYsDufnQMfJOOghpG8-7ivmp5xgjShgyoKONDHVrNi12OTgtQSCK2rNNXmQsLirur35Hlv4z_KFQJGS8fcErlvcnVTNLiy_YfNWMTVtguVRCNE5I4gesKBTnklj-Ku1FDXMXnc_yz503iJcSjQ5061_RVLtEOz2baUu4SO7crQtpo" />
                      <img alt="Mastercard" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0I9Ct1fIvoderL8iC4uN0JObAdPkQAxRlId7wP-IhBkgY0hgiSpgM1k_x9efE4AWr_QxKIuvZ3WJsSscBAM11pGUkPiiATaJ2yapNSqh72mYHsdbPWLO8kqZIdh_8QfPx3K6N139vDqSe2hBOARoM8_Z2mIIc_bgqcddsB7p7nwGky7WHULYZ9CdfVIKnQOsOCo65qqifnlLysAozpXqfzebOVZczGYh2Q20RqPOyK6CSMVk0I3ObhFidk2Pq54BaI2iloVSg4yBQ" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-1" htmlFor="vencimiento">Fecha de Vencimiento</label>
                      <input className="w-full bg-section-light dark:bg-background-dark border-light dark:border-dark rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent" id="vencimiento" name="vencimiento" placeholder="MM/AA" type="text" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-1" htmlFor="cvc">CVC</label>
                      <input className="w-full bg-section-light dark:bg-background-dark border-light dark:border-dark rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent" id="cvc" name="cvc" type="text" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light/80 dark:text-text-dark/80 mb-1" htmlFor="nombre_tarjeta">Nombre en la Tarjeta</label>
                    <input className="w-full bg-section-light dark:bg-background-dark border-light dark:border-dark rounded-md shadow-sm focus:ring-primary-accent focus:border-primary-accent" id="nombre_tarjeta" name="nombre_tarjeta" type="text" />
                  </div>
                </form>
              </div>

            {/* BOTÓN */}


<button
  className="group w-full bg-gradient-to-r from-blue-500 to-cyan-500
             hover:from-cyan-500 hover:to-blue-600
             text-white font-bold py-3 px-4 rounded-2xl
             text-lg flex items-center justify-center gap-3
             shadow-md hover:shadow-xl
             hover:ring-2 hover:ring-cyan-400/50
             transform hover:-translate-y-1
             transition-all duration-300 ease-out"
>
  <span className="inline-flex items-center justify-center w-9 h-9
                   bg-white/20 rounded-full
                   group-hover:bg-white/30
                   transition-all duration-300">
    <span className="material-symbols-outlined text-white text-xl
                     group-hover:scale-110
                     transition-transform duration-300">
      payments
    </span>
  </span>

  <span className="tracking-wide">Realizar Pedido</span>
</button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}