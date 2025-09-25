export default function HeroSubscribe(){
  const bg = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop' // luego lo pasamos a assets

  function onSubmit(e){
    e.preventDefault()
    const email = new FormData(e.currentTarget).get('email')
    if(!email) return
    // por ahora abrimos WhatsApp con el correo; más adelante integramos Mailchimp/Sendgrid
    const msg = `Hola! Quiero suscribirme con el correo: ${email}`
    window.open(`https://wa.me/573001112233?text=${encodeURIComponent(msg)}`, '_blank')
    e.currentTarget.reset()
  }

  return (
    <section className="relative overflow-hidden">
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="relative max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-800">
          Bienvenido al distribuidor del campo 🌱
        </h1>
        <p className="max-w-2xl mt-2 text-gray-700">
          Recibe ofertas, tips de ganadería y novedades del agro.
        </p>

        <form onSubmit={onSubmit} className="mt-4 flex gap-2">
          <input
            name="email"
            type="email"
            placeholder="Ingresa tu correo"
            className="w-full md:w-96 border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button className="px-5 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  )
}
