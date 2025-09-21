import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function MegaMenu({ activeSlug }){
  const cats = useSelector(s => s.categories.list)
  const cat = cats.find(c => c.slug === activeSlug)
  if (!cat) return null

  const cols = [[],[],[]]
  cat.subcategories.forEach((s,i)=> cols[i%3].push(s))

  return (
    <div className="absolute left-0 right-0 top-full bg-white shadow-xl border-b">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 p-6">
        {cols.map((group, idx)=>(
          <div key={idx} className="space-y-2">
            {group.map(s=>(
              <Link
                key={s.id}
                to={`/c/${cat.slug}/${s.slug}`}
                className="block p-2 rounded border hover:bg-green-50"
              >
                {s.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
