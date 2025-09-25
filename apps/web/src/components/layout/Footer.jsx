import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { SITE } from "../../config/site"

function SocialIcon({ type, href }) {
  const paths = {
    instagram:
      "M12 2.2c3 0 3.4 0 4.6.07 1.1.06 1.8.23 2.3.39.6.23 1 .5 1.5 1 .5.5.8.9 1 1.5.16.5.33 1.2.39 2.3.07 1.2.07 1.6.07 4.6s0 3.4-.07 4.6c-.06 1.1-.23 1.8-.39 2.3-.23.6-.5 1-.9 1.5-.5.5-.9.8-1.5 1-.5.16-1.2.33-2.3.39-1.2.07-1.6.07-4.6.07s-3.4 0-4.6-.07c-1.1-.06-1.8-.23-2.3-.39-.6-.23-1-.5-1.5-1s-.8-.9-1-1.5c-.16-.5-.33-1.2-.39-2.3C2.2 15.4 2.2 15 2.2 12s0-3.4.07-4.6c.06-1.1.23-1.8.39-2.3.23-.6.5-1 .9-1.5.5-.5.9-.8 1.5-1 .5-.16 1.2-.33 2.3-.39C8.6 2.2 9 2.2 12 2.2Zm0 2c-2.9 0-3.3 0-4.5.06-1 .05-1.6.22-2 .37-.5.2-.8.4-1.1.7-.3.3-.6.6-.7 1.1-.14.4-.31 1-.36 2C3.2 10.7 3.2 11.1 3.2 14s0 3.3.07 4.5c.05 1 .22 1.6.36 2 .2.5.4.8.7 1.1.3.3.6.6 1.1.7.4.14 1 .31 2 .36 1.2.07 1.6.07 4.5.07s3.3 0 4.5-.07c1-.05 1.6-.22 2-.36.5-.2.8-.4 1.1-.7.3-.3.6-.6.7-1.1.14-.4.31-1 .36-2 .07-1.2.07-1.6.07-4.5s0-3.3-.07-4.5c-.05-1-.22-1.6-.36-2-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.6-1.1-.7-.4-.14-1-.31-2-.36C15.3 4.2 14.9 4.2 12 4.2Zm0 2.6A5.2 5.2 0 1 1 6.8 12 5.2 5.2 0 0 1 12 6.8Zm0 2A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8Zm5.9-2.7a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2Z",
    facebook:
      "M15 3h2.5V0H15c-3 0-5 2.1-5 5v3H7v3h3v8h3v-8h3l.5-3H13V5c0-1 .7-2 2-2Z",
    tiktok:
      "M16 5.6a5.6 5.6 0 0 1-3.3-1.1V14a6 6 0 1 1-6-6c.4 0 .8 0 1.1.1v3.1a3 3 0 1 0 2.1 2.8V2h3.2a5.6 5.6 0 0 0 3.3 3.3Z",
    youtube:
      "M2 7.3C2 5.5 3.4 4 5.3 4h9.4C16.5 4 18 5.5 18 7.3V12c0 1.9-1.5 3.3-3.3 3.3H5.3C3.5 15.3 2 13.9 2 12V7.3Zm6.7 5.1 4.5-2.6-4.5-2.6v5.2Z",
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className="p-2 rounded hover:bg-green-50">
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-green-700">
        <path d={paths[type]} />
      </svg>
    </a>
  )
}

export default function Footer() {
  const cats = useSelector((s) => s.categories.list)

  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
        {/* Marca y redes */}
        <div>
          <div className="text-2xl font-extrabold text-green-700">{SITE.brand}</div>
          <p className="text-sm text-gray-600 mt-2">
            Distribuidor agrícola – calidad para el campo.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <SocialIcon type="instagram" href={SITE.social.instagram} />
            <SocialIcon type="facebook" href={SITE.social.facebook} />
            <SocialIcon type="tiktok" href={SITE.social.tiktok} />
            <SocialIcon type="youtube" href={SITE.social.youtube} />
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <div>WhatsApp: <a className="text-green-700 font-medium" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">{SITE.phone}</a></div>
            <div>Email: <a className="text-green-700" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
          </div>
        </div>

        {/* Categorías dinámicas */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Categorías</h3>
          <ul className="space-y-2 text-sm">
            {cats.slice(0, 6).map(c => (
              <li key={c.id}>
                <Link to={`/c/${c.slug}`} className="text-gray-700 hover:text-green-700">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Servicio al cliente */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Servicio al cliente</h3>
          <ul className="space-y-2 text-sm">
            {SITE.customerLinks.map((l, i) => (
              <li key={i}>
                <Link to={l.to} className="text-gray-700 hover:text-green-700">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sedes */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Sedes</h3>
          <ul className="space-y-3 text-sm">
            {SITE.locations.map((sede, i) => (
              <li key={i} className="text-gray-700">
                <div className="font-medium text-green-700">{sede.name}</div>
                <div>{sede.address}</div>
                <div className="text-gray-600">{sede.schedule}</div>
                <a className="text-green-700 hover:underline" href={sede.map} target="_blank" rel="noreferrer">
                  Ver en mapa
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Medios de pago / franja inferior */}
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
          <div className="text-gray-600">
            © {new Date().getFullYear()} {SITE.brand}. Operamos en Cali y Cumbal.
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span>Medios de pago:</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 border rounded">💳</span>
              <span className="px-2 py-1 border rounded">🏦</span>
              <span className="px-2 py-1 border rounded">Wompi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
