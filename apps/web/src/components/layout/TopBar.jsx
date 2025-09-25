import { SITE } from "../../config/site"

export default function TopBar() {
  return (
    <div className="bg-green-700 text-white text-sm">
      {/* barra a todo el ancho */}
      <div className="px-4 py-2">
        {/* centrado real en cualquier tamaño */}
        <div className="w-full flex items-center justify-center gap-2 text-center">
          <span>Línea de WhatsApp:</span>
          <a
            className="font-semibold underline"
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            {SITE.phone}
          </a>
          <span className="hidden sm:inline">— Envíos locales en Cali y Cumbal</span>
        </div>
      </div>
    </div>
  )
}

