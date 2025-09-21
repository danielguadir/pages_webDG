import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MegaMenu from './MegaMenu'
import { useState } from 'react'

export default function Header(){
  const cats = useSelector(s => s.categories.list)
  const [active, setActive] = useState(null)

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link to="/" className="text-xl font-bold text-green-700">AgroDistrib</Link>

        <nav className="hidden md:flex items-center gap-4 relative"
             onMouseLeave={()=> setActive(null)}>
          {cats.map(c => (
            <button
              key={c.id}
              className="px-3 py-1 rounded hover:bg-green-50"
              onMouseEnter={()=> setActive(c.slug)}
            >
              {c.name}
            </button>
          ))}

          {active && <MegaMenu activeSlug={active} onClose={()=>setActive(null)} />}
        </nav>

        <div className="flex-1" />
      </div>
    </header>
  )
}
