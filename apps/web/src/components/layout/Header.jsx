import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SearchBar from "../common/SearchBar"
import MegaMenu from "./MegaMenu"
import MobileMenu from "./MobileMenu"
import TopBar from "./TopBar"

export default function Header() {
  const cats = useSelector((s) => s.categories.list)
  const [active, setActive] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    
    <header className="border-b bg-white sticky top-0 z-50">
      <TopBar />
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-green-700">
          AgroDistrib
        </Link>

        {/* Categorías (solo desktop) */}
        <nav
          className="hidden md:flex items-center gap-2 relative"
          onMouseLeave={() => setActive(null)}
        >
          {cats.map((c) => (
            <button
              key={c.id}
              className={`px-3 py-1 rounded hover:bg-green-50 ${
                active === c.slug ? "bg-green-50" : ""
              }`}
              onMouseEnter={() => setActive(c.slug)}
              onFocus={() => setActive(c.slug)}
            >
              {c.name}
            </button>
          ))}

          {active && <MegaMenu activeSlug={active} onClose={() => setActive(null)} />}
        </nav>

        {/* Buscador (desktop, derecha) */}
        <div className="ml-auto hidden md:block">
          <SearchBar placeholder="Buscar por nombre o etiqueta…" />
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="md:hidden ml-auto px-3 py-2 border rounded"
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Menú móvil */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
        
    </header>
  )
}
