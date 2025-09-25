import HeroSubscribe from '../components/layout/HeroSubscribe'
import FunFacts from '../components/layout/FunFacts'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Home(){
  const { list, status } = useSelector(s=> s.categories)

  return (
    <>
      <HeroSubscribe />
      <FunFacts />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Categorías</h2>
        {status === 'loading' && <div>Cargando…</div>}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {list.map(c=>(
            <Link key={c.id} to={`/c/${c.slug}`} className="border rounded-xl p-6 hover:shadow">
              <h3 className="font-semibold text-lg mb-1">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.subcategories.length} subcategorías</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
