import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import SearchBar from "../common/SearchBar"

export default function MobileMenu({ open, onClose }) {
  const cats = useSelector((s) => s.categories.list)

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 z-50 md:hidden" onClick={onClose}>
      <div
        className="absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-lg p-4 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-bold text-green-700">AgroDistrib</h2>
          <button onClick={onClose} className="text-gray-600 text-xl">✕</button>
        </div>

        {/* Buscador */}
        <SearchBar placeholder="Buscar productos…" />

        {/* Categorías */}
        <nav className="flex flex-col gap-2 mt-4">
          {cats.map((c) => (
            <Link
              key={c.id}
              to={`/c/${c.slug}`}
              className="px-2 py-1 rounded hover:bg-green-50"
              onClick={onClose}
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
