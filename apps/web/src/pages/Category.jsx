import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from '../app/store/slices/productsSlice'
import ProductCard from '../components/products/ProductCard'

export default function Category(){
  const { category } = useParams()
  const dispatch = useDispatch()
  const cat = useSelector(s => s.categories.list.find(c => c.slug === category))
  const products = useSelector(s => s.products.list)
  const status = useSelector(s => s.products.status)

  useEffect(() => {
    if (cat) {
      dispatch(fetchProducts({ category: cat.slug }))
    }
  }, [dispatch, cat])

  if (!cat) return <div className="max-w-6xl mx-auto p-6">Categoría no encontrada</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{cat.name}</h1>
      {cat.subcategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Subcategorías</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cat.subcategories.map(s=>(
              <Link key={s.id} to={`/c/${cat.slug}/${s.slug}`} className="border rounded p-4 hover:shadow">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold mb-2">Productos</h2>
        {status === 'loading' && <p>Cargando productos...</p>}
        {status === 'failed' && <p>Error cargando productos</p>}
        {status === 'succeeded' && products.length === 0 && <p>No hay productos en esta categoría</p>}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  )
}
