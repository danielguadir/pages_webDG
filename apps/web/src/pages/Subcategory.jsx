import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../app/store/slices/productsSlice'
import ProductCard from '../components/products/ProductCard'
import FilterPanel from '../components/products/FilterPanel'
import WhatsAppButton from '../components/common/WhatsAppButton'

export default function Subcategory(){
  const { category, subcategory } = useParams()
  const dispatch = useDispatch()
  const { list, status } = useSelector(s => s.products)

  // estado de filtros
  const [search, setSearch] = useState('')
  const [price, setPrice] = useState({ min: undefined, max: undefined })
  const [tag, setTag] = useState(undefined)

  useEffect(()=> {
    dispatch(fetchProducts({ category, subcategory }))
  }, [category, subcategory, dispatch])

  const filtered = useMemo(() => {
    return list.filter(p => {
      // búsqueda por nombre o tags
      const haySearch = search.trim().toLowerCase()
      if (haySearch) {
        const inName = p.name?.toLowerCase().includes(haySearch)
        const inTags = Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(haySearch))
        if (!inName && !inTags) return false
      }
      // filtro por etiqueta
      if (tag && !(Array.isArray(p.tags) && p.tags.includes(tag))) return false
      // filtro por rango de precio
      if (typeof p.price === 'number') {
        if (price.min != null && p.price < price.min) return false
        if (price.max != null && p.price > price.max) return false
      }
      return true
    })
  }, [list, search, tag, price])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{subcategory.replace(/-/g,' ')}</h1>

      {status === 'loading' && <div>Cargando productos…</div>}

      <div className="grid md:grid-cols-[260px,1fr] gap-6">
        <FilterPanel
          raw={list}
          search={search} setSearch={setSearch}
          price={price} setPrice={setPrice}
          tag={tag} setTag={setTag}
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          {filtered.length === 0 && status === 'succeeded' && (
            <div className="text-gray-600">No hay productos que coincidan con los filtros.</div>
          )}
        </div>
      </div>

      <WhatsAppButton phone="573148029030" message="Hola, vi productos en AgroDistrib y quiero cotizar." />
    </div>
  )
}

