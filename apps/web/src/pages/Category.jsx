import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Category(){
  const { category } = useParams()
  const cat = useSelector(s => s.categories.list.find(c => c.slug === category))
  if (!cat) return <div className="max-w-6xl mx-auto p-6">Categoría no encontrada</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{cat.name}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cat.subcategories.map(s=>(
          <Link key={s.id} to={`/c/${cat.slug}/${s.slug}`} className="border rounded p-4 hover:shadow">
            {s.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
