import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../app/store/slices/productsSlice'

export default function Subcategory(){
  const { category, subcategory } = useParams()
  const dispatch = useDispatch()
  const { list, status } = useSelector(s => s.products)

  useEffect(()=> {
    dispatch(fetchProducts({ category, subcategory }))
  }, [category, subcategory, dispatch])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{subcategory.replace(/-/g,' ')}</h1>

      {status === 'loading' && <div>Cargando productos…</div>}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map(p=>(
          <div key={p.id} className="border rounded p-4 hover:shadow">
            <div className="h-36 bg-gray-100 rounded mb-2" />
            <h3 className="font-semibold">{p.name}</h3>
            {p.price != null && <p className="text-sm text-gray-600">${p.price}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
